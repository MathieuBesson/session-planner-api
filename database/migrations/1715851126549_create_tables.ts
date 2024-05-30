import { BaseSchema } from '@adonisjs/lucid/schema'
import { StatusLine } from '../../app/enums/status_line.js'

export default class extends BaseSchema {

  async up() {
    this.schema.createTable('users', (table) => {
      table.increments('id').notNullable()
      table.string('external_id', 200).notNullable()
      table.string('first_name', 200).nullable()
      table.string('last_name', 200).nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 200).notNullable()
      table.integer('role_id').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.integer('status_line').nullable().defaultTo(StatusLine.ACTIVE)
    })

    this.schema.createTable('session_types', (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.integer('status_line').nullable().defaultTo(StatusLine.ACTIVE)
    })

    this.schema.createTable('halls', (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table.integer('max_capacity').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.integer('status_line').nullable().defaultTo(StatusLine.ACTIVE)
    })

    this.schema.createTable('sessions', (table) => {
      table.increments('id').notNullable()
      table.integer('start_time').notNullable()
      table.integer('end_time').notNullable()
      table.integer('max_capacity').notNullable()
      table.text('note').nullable()
      table.timestamp('date').notNullable()
      table.boolean('cancelled').notNullable().defaultTo(false)
      table.integer('delay_before_registration').notNullable().defaultTo(0)
      table.integer('session_type_id').unsigned().references('session_types.id')
      table.integer('hall_id').unsigned().references('halls.id')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.integer('status_line').nullable().defaultTo(StatusLine.ACTIVE)
    })

    this.schema.createTable('session_user', (table) => {
      table.increments('id').notNullable()
      table.integer('user_id').unsigned().references('users.id')
      table.integer('session_id').unsigned().references('sessions.id')
      table.unique(['user_id', 'session_id'])
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('status_line').nullable().defaultTo(StatusLine.ACTIVE)
    })
  }

  async down() {
    this.schema.dropTable('users')
    this.schema.dropTable('sessions')
    this.schema.dropTable('session_user')
    this.schema.dropTable('session_types')
    this.schema.dropTable('halls')
  }
}