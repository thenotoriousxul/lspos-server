import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsuariosController {
  /**
   * Obtener todos los usuarios
   */
  async index({ auth, response }: HttpContext) {
    try {
      const currentUser = auth.getUserOrFail()
      
      // Solo administradores pueden ver la lista de usuarios
      if (currentUser.role !== 'admin') {
        return response.forbidden({
          success: false,
          message: 'No tienes permisos para acceder a esta funcionalidad'
        })
      }

      const usuarios = await User.query()
        .select('id', 'fullName', 'email', 'role', 'createdAt')
        .orderBy('createdAt', 'desc')

      return response.ok({
        success: true,
        data: usuarios
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Error al obtener usuarios',
        error: error.message
      })
    }
  }

  /**
   * Crear nuevo usuario
   */
  async store({ auth, request, response }: HttpContext) {
    try {
      const currentUser = auth.getUserOrFail()
      
      // Solo administradores pueden crear usuarios
      if (currentUser.role !== 'admin') {
        return response.forbidden({
          success: false,
          message: 'No tienes permisos para crear usuarios'
        })
      }

      const data = request.only(['fullName', 'email', 'password', 'role'])
      
      // Validar que el rol sea válido
      if (data.role && !['admin', 'employee'].includes(data.role)) {
        return response.badRequest({
          success: false,
          message: 'Rol inválido. Debe ser "admin" o "employee"'
        })
      }

      // Verificar si el email ya existe
      const existingUser = await User.findBy('email', data.email)
      if (existingUser) {
        return response.badRequest({
          success: false,
          message: 'El email ya está registrado'
        })
      }

      const user = await User.create(data)

      return response.created({
        success: true,
        message: 'Usuario creado exitosamente',
        data: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }
      })
    } catch (error) {
      return response.badRequest({
        success: false,
        message: 'Error al crear usuario',
        error: error.message
      })
    }
  }

  /**
   * Obtener usuario por ID
   */
  async show({ auth, params, response }: HttpContext) {
    try {
      const currentUser = auth.getUserOrFail()
      
      // Solo administradores pueden ver detalles de usuarios
      if (currentUser.role !== 'admin') {
        return response.forbidden({
          success: false,
          message: 'No tienes permisos para acceder a esta funcionalidad'
        })
      }

      const user = await User.query()
        .select('id', 'fullName', 'email', 'role', 'createdAt')
        .where('id', params.id)
        .firstOrFail()

      return response.ok({
        success: true,
        data: user
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Usuario no encontrado'
      })
    }
  }

  /**
   * Actualizar usuario
   */
  async update({ auth, params, request, response }: HttpContext) {
    try {
      const currentUser = auth.getUserOrFail()
      
      // Solo administradores pueden actualizar usuarios
      if (currentUser.role !== 'admin') {
        return response.forbidden({
          success: false,
          message: 'No tienes permisos para actualizar usuarios'
        })
      }

      const user = await User.findOrFail(params.id)
      const data = request.only(['fullName', 'email', 'role'])

      // Validar que el rol sea válido
      if (data.role && !['admin', 'employee'].includes(data.role)) {
        return response.badRequest({
          success: false,
          message: 'Rol inválido. Debe ser "admin" o "employee"'
        })
      }

      // Verificar si el email ya existe (excluyendo el usuario actual)
      if (data.email && data.email !== user.email) {
        const existingUser = await User.findBy('email', data.email)
        if (existingUser) {
          return response.badRequest({
            success: false,
            message: 'El email ya está registrado'
          })
        }
      }

      user.merge(data)
      await user.save()

      return response.ok({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Usuario no encontrado'
      })
    }
  }

  /**
   * Eliminar usuario
   */
  async destroy({ auth, params, response }: HttpContext) {
    try {
      const currentUser = auth.getUserOrFail()
      
      // Solo administradores pueden eliminar usuarios
      if (currentUser.role !== 'admin') {
        return response.forbidden({
          success: false,
          message: 'No tienes permisos para eliminar usuarios'
        })
      }

      const user = await User.findOrFail(params.id)

      // No permitir eliminar el propio usuario
      if (user.id === currentUser.id) {
        return response.badRequest({
          success: false,
          message: 'No puedes eliminar tu propia cuenta'
        })
      }

      await user.delete()

      return response.ok({
        success: true,
        message: 'Usuario eliminado exitosamente'
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Usuario no encontrado'
      })
    }
  }
}
