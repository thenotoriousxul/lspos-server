import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const usuarios = [
      {
        fullName: 'Saúl Sánchez',
        email: 'saulsanchezlopez999@gmail.com',
        password: '12345678',
        role: 'admin' as const
      },
      {
        fullName: 'Omar Ernesto Sánchez De La Cruz',
        email: 'omarsdelacruz@hotmail.com',
        password: '12345678',
        role: 'employee' as const
      }
    ]

    // Usar firstOrCreate para evitar duplicados
    for (const usuarioData of usuarios) {
      await User.firstOrCreate(
        { email: usuarioData.email },
        usuarioData
      )
    }
  }
}