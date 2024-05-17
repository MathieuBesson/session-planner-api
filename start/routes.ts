import SessionsController from '#controllers/http/sessions_controller'
import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'

router.get('/test-database', async ({ response }) => {
  try {
    await db.rawQuery('select * from information_schema.tables where table_schema=\'public\'')
    response.status(200).send('Database connection is successful 1')
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
})


router.get('sessions', [SessionsController, 'index'])

router.get('sessions/:id/register', [SessionsController, 'register'])
