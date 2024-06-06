import { StatusLine } from "../../enums/status_line.js";
import Hall from "#models/hall";
import { HttpContext } from "@adonisjs/core/http";

export default class HallController {

    async getAll({ request }: HttpContext) {
        console.log(request.toJSON())
        return await Hall.query()
            .where('status_line', '=', StatusLine.ACTIVE);
    }
}