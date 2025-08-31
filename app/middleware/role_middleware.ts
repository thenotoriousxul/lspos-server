import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, allowedRoles: string[]) {
    const user = ctx.auth.user

    if (!user) {
      return ctx.response.unauthorized({ message: 'Usuario no autenticado' })
    }

    // Verificar si el usuario tiene uno de los roles permitidos
    if (!allowedRoles.includes(user.role)) {
      return ctx.response.forbidden({ 
        message: 'No tienes permisos para acceder a este recurso',
        requiredRoles: allowedRoles,
        userRole: user.role
      })
    }

    return next()
  }
}