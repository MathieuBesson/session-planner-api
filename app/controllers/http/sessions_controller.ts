import Session from '#models/session';
import type { HttpContext } from '@adonisjs/core/http'
import moment from 'moment';
import { StatusLine } from '../../enums/status_line.js';
import { Exception } from '@adonisjs/core/exceptions';
import { SessionStatus, SessionStatusLabel } from '../../enums/session_status.js';
import User from '#models/user';

export default class SessionsController {
    async getAll({ request }: HttpContext) {
        const { start_date, end_date }: Record<string, string> = request.all();

        let query = Session.query()

        if (start_date && end_date) {
            query
                .where('date', '>=', moment(start_date, 'YYYY-MM-DD').startOf('day').format())
                .where('date', '<=', moment(end_date, 'YYYY-MM-DD').endOf('day').format())
                .where('status_line', '=', StatusLine.ACTIVE);
        } else {
            query.where('status_line', '=', StatusLine.ACTIVE);
        }

        return await query.orderBy("date").exec();
    }

    async addUserToSession({ request }: HttpContext) {
        // TODO : Vérifier que l'id utilisateur transmis est bien l'id lié à l'utilisateur du token transmis

        const userId = request.param('user_id');
        const sessionId = request.param('session_id');
        let session = await Session.query()
            .where('id', sessionId)
            .where('status_line', '=', StatusLine.ACTIVE)
            .preload('users')
            .firstOrFail()

        // Vérifier que la session est ouverte
        if (session.getStatus() !== SessionStatus.OPEN) {
            throw new Exception(`L'inscription à cette session est impossible du à son statut : "${SessionStatusLabel[session.getStatus()]}" `)
        }

        // Utilisateur déjà inscrit
        const isregistred = session.users.find(sessionUser => sessionUser.id.toString() === userId) !== undefined;

        if (isregistred === true) {
            throw new Exception(`L'utilisateur est déjà inscrit à cette session`)
        }

        // Ajout de l'utilisateur à la session
        await session.related('users').attach([userId]);
        await session.load('users');

        return session;
    }

    async removeUserFromSession({ request }: HttpContext) {
        const userId = request.param('user_id');
        const sessionId = request.param('session_id');

        let session = await Session.query()
            .where('id', sessionId)
            .where('status_line', '=', StatusLine.ACTIVE)
            .preload('users')
            .firstOrFail()

        let user = await User.query()
            .where('id', sessionId)
            .where('status_line', '=', StatusLine.ACTIVE)
            .firstOrFail()

        const isregistred = session.users.find(sessionUser => sessionUser.id === user.id) !== undefined;

        if (isregistred === false) {
            throw new Exception(`L'utilisateur n'est pas inscrit à cette session`)
        }

        await session.related('users').detach([userId]);
        await session.load('users');

        return session;
    }

    async getOne({ request }: HttpContext) {
        return await Session.query()
            .where('id', request.param('session_id'))
            .where('status_line', '=', StatusLine.ACTIVE)
            .firstOrFail()
    }

    async getSessionUser({ request }: HttpContext) {
        return await Session.query()
            .where('id', request.param('session_id'))
            .where('status_line', '=', StatusLine.ACTIVE)
            .preload('users')
            .firstOrFail()
    }

    async deleteSoft({ request }: HttpContext) {
        let session = await Session.query()
            .where('id', request.param('session_id'))
            .where('status_line', '=', StatusLine.ACTIVE)
            .firstOrFail()

        await session.merge({ statusLine: StatusLine.SOFT_DELETE }).save();

        return {};
    }

}