import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Venta from './venta.js'
import Producto from './producto.js'

export default class DetalleVenta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ventaId: number

  @column()
  declare productoId: number

  @column()
  declare cantidad: number

  @column()
  declare precioUnitario: number

  @column()
  declare subtotal: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Venta)
  declare venta: BelongsTo<typeof Venta>

  @belongsTo(() => Producto)
  declare producto: BelongsTo<typeof Producto>
}
