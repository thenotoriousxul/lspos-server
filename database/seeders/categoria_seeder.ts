import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Categoria from '#models/categoria'

export default class extends BaseSeeder {
  async run() {
    await Categoria.createMany([
      {
        nombre: 'Aceites y Lubricantes',
        descripcion: 'Aceites para motor, transmisión, hidráulicos y lubricantes industriales'
      },
      {
        nombre: 'Filtros',
        descripcion: 'Filtros de aceite, aire, combustible y cabina para vehículos'
      },
      {
        nombre: 'Baterías',
        descripcion: 'Baterías para automóviles, camiones y equipo pesado'
      },
      {
        nombre: 'Frenos',
        descripcion: 'Pastillas, discos, tambores y líquido de frenos'
      },
      {
        nombre: 'Suspensión',
        descripcion: 'Amortiguadores, resortes y componentes de suspensión'
      },
      {
        nombre: 'Motor',
        descripcion: 'Refacciones y componentes para motor'
      },
      {
        nombre: 'Transmisión',
        descripcion: 'Componentes y refacciones para transmisión'
      },
      {
        nombre: 'Eléctrico',
        descripcion: 'Componentes eléctricos y electrónicos'
      },
      {
        nombre: 'Herramientas',
        descripcion: 'Herramientas para taller y mantenimiento'
      },
      {
        nombre: 'Accesorios',
        descripcion: 'Accesorios diversos para vehículos'
      }
    ])

  }
}