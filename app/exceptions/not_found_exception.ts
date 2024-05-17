import { Exception } from '@adonisjs/core/exceptions'

export default class NotFoundException extends Exception {
  // static status = 404

  // public async handle(error: this, ctx: HttpContext) {
  //   ctx.response.status(error.status).send(error.message)
  // }

  constructor(message: string) {
    super(message, {status : 404})
  }

}