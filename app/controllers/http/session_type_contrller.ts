import { StatusLine } from "../../enums/status_line.js";
import SessionType from "#models/session_type";

export default class SessionTypeController {

    async getAll() {
        return await SessionType.query()
            .where('status_line', '=', StatusLine.ACTIVE);
    }
}