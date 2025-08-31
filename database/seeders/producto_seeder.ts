import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Producto from '#models/producto'

export default class extends BaseSeeder {
  async run() {
    await Producto.createMany([
      {
        codigo: 'ACE001',
        nombre: 'Aceite Motor 20W-50 Mineral 4L',
        descripcion: 'Aceite mineral para motor 20W-50, envase de 4 litros',
        precio: 450.00,
        costo: 320.00,
        stock: 25,
        stockMinimo: 5,
        categoriaId: 1
      },
      {
        codigo: 'ACE002',
        nombre: 'Aceite Motor 5W-30 Sintético 4L',
        descripcion: 'Aceite sintético para motor 5W-30, envase de 4 litros',
        precio: 850.00,
        costo: 650.00,
        stock: 15,
        stockMinimo: 3,
        categoriaId: 1
      },
      {
        codigo: 'ACE003',
        nombre: 'Aceite Transmisión ATF 1L',
        descripcion: 'Aceite para transmisión automática ATF, envase de 1 litro',
        precio: 180.00,
        costo: 130.00,
        stock: 20,
        stockMinimo: 5,
        categoriaId: 1
      },

      {
        codigo: 'FIL001',
        nombre: 'Filtro Aceite Universal',
        descripcion: 'Filtro de aceite universal para vehículos ligeros',
        precio: 120.00,
        costo: 85.00,
        stock: 50,
        stockMinimo: 10,
        categoriaId: 2
      },
      {
        codigo: 'FIL002',
        nombre: 'Filtro Aire Motor',
        descripcion: 'Filtro de aire para motor, aplicación universal',
        precio: 250.00,
        costo: 180.00,
        stock: 30,
        stockMinimo: 8,
        categoriaId: 2
      },
      {
        codigo: 'FIL003',
        nombre: 'Filtro Combustible',
        descripcion: 'Filtro de combustible para vehículos a gasolina',
        precio: 180.00,
        costo: 125.00,
        stock: 25,
        stockMinimo: 5,
        categoriaId: 2
      },

      {
        codigo: 'BAT001',
        nombre: 'Batería 12V 45AH',
        descripcion: 'Batería para automóvil 12V 45 amperes/hora',
        precio: 1250.00,
        costo: 950.00,
        stock: 8,
        stockMinimo: 2,
        categoriaId: 3
      },
      {
        codigo: 'BAT002',
        nombre: 'Batería 12V 65AH',
        descripcion: 'Batería para automóvil 12V 65 amperes/hora',
        precio: 1650.00,
        costo: 1250.00,
        stock: 6,
        stockMinimo: 2,
        categoriaId: 3
      },

      {
        codigo: 'FRE001',
        nombre: 'Pastillas Freno Delanteras',
        descripcion: 'Pastillas de freno delanteras, aplicación universal',
        precio: 380.00,
        costo: 270.00,
        stock: 20,
        stockMinimo: 4,
        categoriaId: 4
      },
      {
        codigo: 'FRE002',
        nombre: 'Líquido de Frenos DOT 3',
        descripcion: 'Líquido de frenos DOT 3, envase de 500ml',
        precio: 95.00,
        costo: 68.00,
        stock: 40,
        stockMinimo: 10,
        categoriaId: 4
      },

      {
        codigo: 'SUS001',
        nombre: 'Amortiguador Delantero',
        descripcion: 'Amortiguador delantero para vehículo ligero',
        precio: 650.00,
        costo: 480.00,
        stock: 12,
        stockMinimo: 3,
        categoriaId: 5
      },
      {
        codigo: 'SUS002',
        nombre: 'Amortiguador Trasero',
        descripcion: 'Amortiguador trasero para vehículo ligero',
        precio: 580.00,
        costo: 420.00,
        stock: 10,
        stockMinimo: 3,
        categoriaId: 5
      },

      {
        codigo: 'MOT001',
        nombre: 'Bujías Set 4 Piezas',
        descripcion: 'Juego de 4 bujías para motor 4 cilindros',
        precio: 280.00,
        costo: 200.00,
        stock: 15,
        stockMinimo: 5,
        categoriaId: 6
      },
      {
        codigo: 'MOT002',
        nombre: 'Banda de Distribución',
        descripcion: 'Banda de distribución para motor',
        precio: 450.00,
        costo: 320.00,
        stock: 8,
        stockMinimo: 2,
        categoriaId: 6
      },

      {
        codigo: 'HER001',
        nombre: 'Llave Inglesa 12"',
        descripcion: 'Llave inglesa ajustable de 12 pulgadas',
        precio: 320.00,
        costo: 230.00,
        stock: 5,
        stockMinimo: 2,
        categoriaId: 9
      },
      {
        codigo: 'HER002',
        nombre: 'Destornillador Phillips',
        descripcion: 'Destornillador Phillips mediano',
        precio: 85.00,
        costo: 60.00,
        stock: 12,
        stockMinimo: 3,
        categoriaId: 9
      },

      {
        codigo: 'ACC001',
        nombre: 'Limpiador Tablero 500ml',
        descripcion: 'Limpiador y protector para tablero, envase de 500ml',
        precio: 125.00,
        costo: 90.00,
        stock: 30,
        stockMinimo: 8,
        categoriaId: 10
      },
      {
        codigo: 'ACC002',
        nombre: 'Aromatizante Auto',
        descripcion: 'Aromatizante para automóvil, fragancia vainilla',
        precio: 45.00,
        costo: 32.00,
        stock: 50,
        stockMinimo: 15,
        categoriaId: 10
      }
    ])

  }
}