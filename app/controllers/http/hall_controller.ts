import { StatusLine } from "../../enums/status_line.js";
import Hall from "#models/hall";

export default class HallController {

    async getAll() {
        return await Hall.query()
            .where('status_line', '=', StatusLine.ACTIVE);
    }
}