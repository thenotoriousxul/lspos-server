import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Saúl Sánchez',
        email: 'saulsanchezlopez999@gmail.com',
        password: '12345678'
      },
      {
        fullName: 'Omar Ernesto Sánchez De La Cruz',
        email: 'omarsdelacruz@hotmail.com',
        password: '12345678'
      }
    ])
  }
}