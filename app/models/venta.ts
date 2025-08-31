import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import DetalleVenta from './detalle_venta.js'

export default class Venta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare numeroTicket: string

  @column()
  declare subtotal: number

  @column()
  declare impuestos: number

  @column()
  declare total: number

  @column()
  declare metodoPago: 'efectivo' | 'tarjeta' | 'transferencia'

  @column()
  declare clienteNombre: string | null

  @column()
  declare clienteTelefono: string | null

  @column()
  declare usuarioId: number

  @column()
  declare estado: 'completada' | 'cancelada' | 'pendiente'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'usuarioId'
  })
  declare usuario: BelongsTo<typeof User>

  @hasMany(() => DetalleVenta)
  declare detalles: HasMany<typeof DetalleVenta>
}
