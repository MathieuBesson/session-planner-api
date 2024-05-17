import Session from '#models/session';
import type { HttpContext } from '@adonisjs/core/http'
import moment from 'moment';
import NotFoundException from '#exceptions/not_found_exception';
import { StatusLine } from '../../enums/status_line.js';

export default class SessionsController {
    async index({ request }: HttpContext) {
        const { start_date, end_date }: Record<string, string> = request.all();

        // TODO : Ajouter la validation de donnée

        let sessions: Session[] = [];
        if (start_date && end_date) {
            sessions = await Session.query()
                .where('date', '>=', moment(start_date, 'YYYY-MM-DD').startOf('day').format())
                .where('date', '<=', moment(end_date, 'YYYY-MM-DD').endOf('day').format())
                .where('status_line', '=', StatusLine.ACTIVE);
        } else {
            sessions = await Session.query()
                .where('status_line', '=', StatusLine.ACTIVE);
        }

        return sessions;
    }

    async register({ request }: HttpContext) {
        // TODO : user par le token
        // /session/1/register

        const sessionId = request.param('id')

        // TODO : Ajouter la validation de donnée

        const session = await Session.find(sessionId)

        // return session;

        if (session === null) {
            throw new NotFoundException('You are not authorized')
        }

    }
}