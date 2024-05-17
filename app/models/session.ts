import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import SessionType from './session_type.js'
import Hall from './hall.js'
import { DateTime } from 'luxon'
import { StatusLine } from '../enums/status_line.js'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare startTime: number

  @column()
  declare endTime: number

  @column()
  declare maxCapacity: number

  @column()
  declare note: string | null

  @column()
  declare date: DateTime

  @column()
  declare cancelled: boolean

  @column()
  declare delayBeforeRegistration: number

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @belongsTo(() => SessionType)
  declare sessionType: BelongsTo<typeof SessionType>

  @column()
  public sessionTypeId: number | null = null

  @belongsTo(() => Hall)
  declare hall: BelongsTo<typeof Hall>

  @column()
  public hallId: number | null = null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare statusLine: StatusLine
}