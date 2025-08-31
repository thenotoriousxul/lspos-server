import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  /**
   * Registrar nuevo usuario
   */
  async register({ request, response }: HttpContext) {
    try {
      const data = request.only(['fullName', 'email', 'password'])
      
      const user = await User.create(data)
      const token = await User.accessTokens.create(user)

      return response.created({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: {
          user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email
          },
          token
        }
      })
    } catch (error) {
      return response.badRequest({
        success: false,
        message: 'Error al registrar usuario',
        error: error.message
      })
    }
  }

  /**
   * Iniciar sesión
   */
  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)

      return response.ok({
        success: true,
        message: 'Sesión iniciada exitosamente',
        data: {
          user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email
          },
          token
        }
      })
    } catch (error) {
      return response.unauthorized({
        success: false,
        message: 'Credenciales inválidas'
      })
    }
  }

  /**
   * Cerrar sesión
   */
  async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const token = auth.user?.currentAccessToken

      if (token) {
        await User.accessTokens.delete(user, token.identifier)
      }

      return response.ok({
        success: true,
        message: 'Sesión cerrada exitosamente'
      })
    } catch (error) {
      return response.badRequest({
        success: false,
        message: 'Error al cerrar sesión'
      })
    }
  }

  /**
   * Obtener información del usuario autenticado
   */
  async me({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()

      return response.ok({
        success: true,
        data: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt
        }
      })
    } catch (error) {
      return response.unauthorized({
        success: false,
        message: 'Usuario no autenticado'
      })
    }
  }
}