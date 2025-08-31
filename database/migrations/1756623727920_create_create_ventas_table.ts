import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ventas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('numero_ticket', 50).notNullable().unique()
      table.decimal('subtotal', 10, 2).notNullable()
      table.decimal('impuestos', 10, 2).defaultTo(0)
      table.decimal('total', 10, 2).notNullable()
      table.enum('metodo_pago', ['efectivo', 'tarjeta', 'transferencia']).notNullable()
      table.string('cliente_nombre', 200).nullable()
      table.string('cliente_telefono', 20).nullable()
      table.integer('usuario_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enum('estado', ['completada', 'cancelada', 'pendiente']).defaultTo('completada')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}