import type { HttpContext } from '@adonisjs/core/http'
import Producto from '#models/producto'

export default class ProductosController {
  /**
   * Obtener todos los productos activos con paginación
   */
  async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 20)
      const search = request.input('search', '')
      const categoriaId = request.input('categoria_id')

      let query = Producto.query()
        .where('activo', true)
        .preload('categoria')

      if (search) {
        query = query.where((builder) => {
          builder
            .whereILike('nombre', `%${search}%`)
            .orWhereILike('codigo', `%${search}%`)
            .orWhereILike('descripcion', `%${search}%`)
        })
      }

      if (categoriaId) {
        query = query.where('categoriaId', categoriaId)
      }

      const productos = await query
        .orderBy('nombre', 'asc')
        .paginate(page, limit)

      return response.ok({
        success: true,
        data: productos
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Error al obtener productos',
        error: error.message
      })
    }
  }

  /**
   * Crear nuevo producto
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'codigo', 'nombre', 'descripcion', 'precio', 'costo', 
        'stock', 'stockMinimo', 'categoriaId', 'imagen'
      ])
      
      const producto = await Producto.create(data)
      await producto.load('categoria')

      return response.created({
        success: true,
        message: 'Producto creado exitosamente',
        data: producto
      })
    } catch (error) {
      return response.badRequest({
        success: false,
        message: 'Error al crear producto',
        error: error.message
      })
    }
  }

  /**
   * Obtener producto por ID
   */
  async show({ params, response }: HttpContext) {
    try {
      const producto = await Producto.query()
        .where('id', params.id)
        .preload('categoria')
        .firstOrFail()

      return response.ok({
        success: true,
        data: producto
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Producto no encontrado'
      })
    }
  }

  /**
   * Actualizar producto
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const producto = await Producto.findOrFail(params.id)
      const data = request.only([
        'codigo', 'nombre', 'descripcion', 'precio', 'costo', 
        'stock', 'stockMinimo', 'categoriaId', 'activo', 'imagen'
      ])

      producto.merge(data)
      await producto.save()
      await producto.load('categoria')

      return response.ok({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: producto
      })
    } catch (error) {
      return response.badRequest({
        success: false,
        message: 'Error al actualizar producto',
        error: error.message
      })
    }
  }

  /**
   * Eliminar producto (soft delete)
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const producto = await Producto.findOrFail(params.id)
      
      producto.activo = false
      await producto.save()

      return response.ok({
        success: true,
        message: 'Producto desactivado exitosamente'
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Producto no encontrado'
      })
    }
  }

  /**
   * Obtener productos con stock bajo
   */
  async stockBajo({ response }: HttpContext) {
    try {
      const productos = await Producto.query()
        .where('activo', true)
        .whereColumn('stock', '<=', 'stock_minimo')
        .preload('categoria')
        .orderBy('stock', 'asc')

      return response.ok({
        success: true,
        data: productos
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Error al obtener productos con stock bajo',
        error: error.message
      })
    }
  }

  /**
   * Buscar productos por código de barras
   */
  async buscarPorCodigo({ params, response }: HttpContext) {
    try {
      const producto = await Producto.query()
        .where('codigo', params.codigo)
        .where('activo', true)
        .preload('categoria')
        .first()

      if (!producto) {
        return response.notFound({
          success: false,
          message: 'Producto no encontrado'
        })
      }

      return response.ok({
        success: true,
        data: producto
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Error al buscar producto',
        error: error.message
      })
    }
  }
}