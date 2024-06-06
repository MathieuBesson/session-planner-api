import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Session from './session.js'
import { StatusLine } from '../enums/status_line.js'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare externalId: string | null

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare picture: string | null

  @column()
  declare roleId: number

  @manyToMany(() => Session)
  declare sessions: ManyToMany<typeof Session>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare statusLine: StatusLine

  static accessTokens = DbAccessTokensProvider.forModel(User,
    {
      expiresIn: '30 days',
      prefix: 'oat_',
      table: 'auth_access_tokens',
      type: 'auth_token',
      tokenSecretLength: 40,
    }
  )
}