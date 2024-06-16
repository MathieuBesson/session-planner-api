import User from "#models/user";
import { HttpContext } from "@adonisjs/core/http";
import { StatusLine } from "../../enums/status_line.js";

export default class UsersController {

    async getAll({ request }: HttpContext) {
        const { username = null, limit = null }: Record<string, string | null> = request.all();

        let query = User.query().where('status_line', '=', StatusLine.ACTIVE)

        if (username !== null) {
            const usernameWords: string[] = username.toLowerCase().split(' ');
            usernameWords.forEach((keyword) => {
                query.where('first_name', 'ilike', `%${keyword}%`)
                query.orWhere('last_name', 'ilike', `%${keyword}%`)
            })
        }

        if (limit !== null) {
            query.limit(parseInt(limit));
        }

        return await query.orderBy('last_name').exec();
    }

    async patchOne({ request }: HttpContext) {
        const userId = request.param('user_id');
        const payload = request.body();

        let user = await User.query()
            .where('id', userId)
            .where('status_line', '=', StatusLine.ACTIVE)
            .firstOrFail()


        await user.merge(payload).save(); 

        return user;
    }

    async getOne({ request }: HttpContext) {
        return await User.query()
            .where('id', request.param('user_id'))
            .where('status_line', '=', StatusLine.ACTIVE)
            .firstOrFail()
    }
}