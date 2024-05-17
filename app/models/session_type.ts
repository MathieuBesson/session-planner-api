import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Session from './session.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { StatusLine } from '../enums/status_line.js'

export default class SessionType extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @hasMany(() => Session)
  declare sessions: HasMany<typeof Session> 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare statusLine: StatusLine
}