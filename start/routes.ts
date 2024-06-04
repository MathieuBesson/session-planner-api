import HallController from '#controllers/http/hall_controller'
import SessionTypeController from '#controllers/http/session_type_contrller'
import SessionsController from '#controllers/http/sessions_controller'
import UsersController from '#controllers/http/users_controller'
import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'
// import { middleware } from './kernel.js'

router.get('/test-database', async ({ response }) => {
  try {
    await db.rawQuery('select * from information_schema.tables where table_schema=\'public\'')
    response.status(200).send('Database connection is successful 1')
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
})

// sessions
router.get('sessions', [SessionsController, 'getAll'])
router.get('sessions/:session_id', [SessionsController, 'getOne'])
router.get('sessions/:session_id/users', [SessionsController, 'getSessionUser'])

router.post('sessions/:session_id/users/:user_id', [SessionsController, 'addUserToSession'])
router.delete('sessions/:session_id/users/:user_id', [SessionsController, 'removeUserFromSession'])
router.delete('sessions/:session_id', [SessionsController, 'deleteSoft'])
router.post('sessions/', [SessionsController, 'create'])
router.put('sessions/:session_id', [SessionsController, 'update'])

// users
router.get('users', [UsersController, 'getAll'])
router.get('users/:user_id', [UsersController, 'getOne'])
router.put('users/:user_id', [UsersController, 'patchOne'])

// halls
router.get('halls', [HallController, 'getAll'])
// .use(middleware.auth())

// session_types
router.get('session-types', [SessionTypeController, 'getAll'])

// router.post('auth/check-token', [AuthController, 'checkToken'])
// router.post('auth/authenticate', [AuthController, 'getOrCreateUser'])
