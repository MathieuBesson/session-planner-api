import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'pg',
  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST') as string,
        port: Number(env.get('DB_PORT')),
        user: env.get('DB_USER') as string,
        password: env.get('DB_PASSWORD') as string,
        database: env.get('DB_DATABASE') as string,
      },
      healthCheck: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      seeders: {
        paths: ['./database/seeders', '@somepackage/seeders-dir']
      }
  
    }
  },
})

export default dbConfig


