import Session from '#models/session';
import type { HttpContext } from '@adonisjs/core/http'
import moment from 'moment';
import { StatusLine } from '../../enums/status_line.js';
import { Exception } from '@adonisjs/core/exceptions';
import { SessionStatus, SessionStatusLabel } from '../../enums/session_status.js';
import User from '#models/user';
import Hall from '#models/hall';

export default class SessionsController {
    async getAll({ request }: HttpContext) {
        const { start_date, end_date }: Record<string, string> = request.all();

        let query = Session.query().preload('users')

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
        const isregistred = session.users.find(user => user.id.toString() === userId) !== undefined;

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
            .where('id', userId)
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
            .preload('hall')
            .preload('users')
            .preload('sessionType')
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

        return { "success": true };
    }

    async validateSessionData(
        { request, response }: { request: HttpContext['request'], response: HttpContext['response'] },
        sessionData: any,
        sessionId = null
    ) {
        // Vérifier que la capacité max demandée n'est pas supérieure à la limite max de la salle associée
        const hall = await Hall.findBy('id', sessionData.hallId);
        if (!hall) {
            return response.badRequest({ error: 'La salle spécifiée n\'existe pas' });
        }
        if (sessionData.maxCapacity > hall.maxCapacity) {
            return response.badRequest({ error: 'La capacité maximale demandée est supérieure à la limite maximale de la salle' });
        }

        // Vérifier toutes les sessions de cette date à cette heure pour voir si le nombre de places restantes est bien supérieur à la capacité demandée pour cette session
        // (Notez que nous avons ajouté une condition pour ignorer la session actuelle dans le cas de la fonction update)
        const query = Session.query()

        const dateMorning = moment(sessionData.date).startOf('day')
        const dateEvening = moment(sessionData.date).endOf('day')

        query.where('hall_id', sessionData.hallId)
            .where((query) => {
                query.where((subQuery) => {
                    subQuery
                        .where('date', '>=', dateMorning.toISOString())
                        .where('date', '<=', dateEvening.toISOString())
                })
            })
            .where((query) => {
                query.where((subQuery) => {
                    subQuery
                        .where('end_time', '>=', sessionData.startTime)
                        .where('start_time', '<=', sessionData.startTime)
                })
                    .orWhere((subQuery) => {
                        subQuery
                            .where('end_time', '>=', sessionData.endTime)
                            .where('start_time', '<=', sessionData.endTime)
                    })
            })

        if (sessionId) {
            query.whereNot('id', sessionId)
        }

        const overlappingSessions = await query.exec()

        let totalCapacity = 0;
        for (const session of overlappingSessions) {
            totalCapacity += session.maxCapacity;
        }

        if (totalCapacity + sessionData.maxCapacity > hall.maxCapacity) {
            return response.badRequest({ error: `Il n'y a pas assez de places disponibles pour cette session, le nombre de places éventuel pour cette session est de ${hall.maxCapacity - totalCapacity} places` });
        }

        // Si aucune erreur n'est trouvée, la fonction ne renvoie rien (ou true)
        return true;
    }

    async create({ request, response }: HttpContext) {
        const sessionData = request.only([
            'hallId',
            'sessionTypeId',
            'delayBeforeRegistration',
            'startTime',
            'endTime',
            'maxCapacity',
            'name',
            'note',
            'date',
        ]);

        // Appeler la fonction de validation
        const validationResult = await this.validateSessionData({ request, response }, sessionData);
        if (validationResult !== true) {
            return validationResult;
        }

        // Créer la nouvelle session
        return await Session.create(sessionData);
    }


    async update({ request, response }: HttpContext) {
        const sessionId = request.param('session_id');

        // Récupérer la session à mettre à jour
        const sessionToUpdate = await Session.findBy('id', sessionId);
        if (!sessionToUpdate) {
            return response.badRequest({ error: 'La session spécifiée n\'existe pas' });
        }

        const sessionData = request.only([
            'hallId',
            'sessionTypeId',
            'delayBeforeRegistration',
            'startTime',
            'endTime',
            'maxCapacity',
            'name',
            'note',
            'cancelled',
            'date',
        ]);

        // Vérifier les contraintes de la session en utilisant la fonction séparée
        const validationResult = await this.validateSessionData({ request, response }, sessionData, sessionId);
        if (validationResult !== true) {
            return validationResult;
        }

        // Mettre à jour la session
        sessionToUpdate.merge(sessionData);
        await sessionToUpdate.save();

        return response.ok(sessionToUpdate);
    }


}