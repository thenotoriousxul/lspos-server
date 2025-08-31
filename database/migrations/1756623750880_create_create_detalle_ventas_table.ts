import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'detalle_ventas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('venta_id').unsigned().references('id').inTable('ventas').onDelete('CASCADE')
      table.integer('producto_id').unsigned().references('id').inTable('productos').onDelete('CASCADE')
      table.integer('cantidad').notNullable()
      table.decimal('precio_unitario', 10, 2).notNullable()
      table.decimal('subtotal', 10, 2).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}