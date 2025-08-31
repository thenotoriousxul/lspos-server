import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  private async runSeeder(seederName: string) {
    const seederModule = await import(`./${seederName}.js`)
    const seeder = new seederModule.default()
    await seeder.run()
  }

  async run() {
    console.log('🌱 Iniciando seeders para Lubricantes Sánchez POS...\n')

    // Ejecutar seeders en orden correcto (respetando dependencias)
    console.log('👥 Creando usuarios...')
    await this.runSeeder('user_seeder')

    console.log('\n📁 Creando categorías...')
    await this.runSeeder('categoria_seeder')

    console.log('\n📦 Creando productos...')
    await this.runSeeder('producto_seeder')

    console.log('\n✅ ¡Todos los seeders ejecutados exitosamente!')
    console.log('\n📋 Resumen de datos creados:')
    console.log('   • 5 usuarios del sistema')
    console.log('   • 10 categorías de productos')
    console.log('   • 18 productos de refaccionaria')
    console.log('\n🔐 Credenciales de acceso:')
    console.log('   • Administrador: admin@lubricantessanchez.com / admin123')
    console.log('   • Gerente: gerente@lubricantessanchez.com / gerente123')
    console.log('   • Vendedor: vendedor1@lubricantessanchez.com / vendedor123')
    console.log('\n🚀 El sistema está listo para usar!')
  }
}