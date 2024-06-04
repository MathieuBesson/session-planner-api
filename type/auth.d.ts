import '@adonisjs/http-server'

declare module '@adonisjs/http-server/request' {
    interface Request {
      user?: any
    }
  }
  
