import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Categoria from './categoria.js'
import DetalleVenta from './detalle_venta.js'

export default class Producto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare codigo: string

  @column()
  declare nombre: string

  @column()
  declare descripcion: string | null

  @column()
  declare precio: number

  @column()
  declare costo: number

  @column()
  declare stock: number

  @column()
  declare stockMinimo: number

  @column()
  declare categoriaId: number

  @column()
  declare activo: boolean

  @column()
  declare imagen: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Categoria)
  declare categoria: BelongsTo<typeof Categoria>

  @hasMany(() => DetalleVenta)
  declare detallesVenta: HasMany<typeof DetalleVenta>
}
