import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import SessionType from './session_type.js'
import Hall from './hall.js'
import { DateTime } from 'luxon'
import { StatusLine } from '../enums/status_line.js'
import { SessionStatus } from '../enums/session_status.js'
import moment from 'moment'
import { Exception } from '@adonisjs/core/exceptions'

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
  declare name: string

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

  public getStatus(): SessionStatus {

    const dateFormated = ('toISO' in this.date) ? this.date.toISO() : this.date;

    const sessionDate = moment(dateFormated);
    const startRegistrationDate = moment(dateFormated).subtract(this.delayBeforeRegistration, 'd');
    const today = moment();

    switch (true) {
      case this.cancelled === true:
        return SessionStatus.CANCEL;

      case this.users && this.users.length >= this.maxCapacity:
        return SessionStatus.COMPLETE;

      case today < startRegistrationDate:
        return SessionStatus.FUTURE;

      case startRegistrationDate <= today && today <= sessionDate:
        return SessionStatus.OPEN;

      case today > sessionDate:
        return SessionStatus.FINISH;

      default:
        throw new Exception("Impossible de déterminer le status de la session")
    }
  }
}