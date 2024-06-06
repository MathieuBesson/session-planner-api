import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {

    const userPayload = request.only([
      'firstName',
      'lastName',
      'email',
      'password',
    ]);

    const userAlreadyInDatabase = await User.query().where('email', userPayload.email).first()

    if (userAlreadyInDatabase) {
      return response.badRequest({ error: `Impossible de créer un compte avec cette addresse mail` })
    }

    const user = await User.create(userPayload)
    user.refresh()
    const token = await User.accessTokens.create(user)

    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only([
      'email',
      'password',
    ]);

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }

  async checkToken({ auth, response }: HttpContext) {
    return auth.getUserOrFail()
  }
}