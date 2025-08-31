import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'productos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('codigo', 50).notNullable().unique()
      table.string('nombre', 200).notNullable()
      table.text('descripcion').nullable()
      table.decimal('precio', 10, 2).notNullable()
      table.decimal('costo', 10, 2).notNullable()
      table.integer('stock').defaultTo(0)
      table.integer('stock_minimo').defaultTo(0)
      table.integer('categoria_id').unsigned().references('id').inTable('categorias').onDelete('CASCADE')
      table.boolean('activo').defaultTo(true)
      table.string('imagen').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}