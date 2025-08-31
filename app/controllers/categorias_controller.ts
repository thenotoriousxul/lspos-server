import type { HttpContext } from '@adonisjs/core/http'
import Categoria from '#models/categoria'

export default class CategoriasController {
  /**
   * Obtener todas las categorías activas
   */
  async index({ response }: HttpContext) {
    try {
      const categorias = await Categoria.query()
        .where('activa', true)
        .withCount('productos')
        .orderBy('nombre', 'asc')

      return response.ok({
        success: true,
        data: categorias
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Error al obtener categorías',
        error: error.message
      })
    }
  }

  /**
   * Crear nueva categoría
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['nombre', 'descripcion'])
      
      const categoria = await Categoria.create(data)

      return response.created({
        success: true,
        message: 'Categoría creada exitosamente',
        data: categoria
      })
    } catch (error) {
      return response.badRequest({
        success: false,
        message: 'Error al crear categoría',
        error: error.message
      })
    }
  }

  /**
   * Obtener categoría por ID
   */
  async show({ params, response }: HttpContext) {
    try {
      const categoria = await Categoria.query()
        .where('id', params.id)
        .preload('productos', (query) => {
          query.where('activo', true)
        })
        .firstOrFail()

      return response.ok({
        success: true,
        data: categoria
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Categoría no encontrada'
      })
    }
  }

  /**
   * Actualizar categoría
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const categoria = await Categoria.findOrFail(params.id)
      const data = request.only(['nombre', 'descripcion', 'activa'])

      categoria.merge(data)
      await categoria.save()

      return response.ok({
        success: true,
        message: 'Categoría actualizada exitosamente',
        data: categoria
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Categoría no encontrada'
      })
    }
  }

  /**
   * Eliminar categoría (soft delete)
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const categoria = await Categoria.findOrFail(params.id)
      
      categoria.activa = false
      await categoria.save()

      return response.ok({
        success: true,
        message: 'Categoría desactivada exitosamente'
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Categoría no encontrada'
      })
    }
  }
}