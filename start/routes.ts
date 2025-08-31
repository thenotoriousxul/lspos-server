/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const CategoriasController = () => import('#controllers/categorias_controller')
const ProductosController = () => import('#controllers/productos_controller')  
const VentasController = () => import('#controllers/ventas_controller')
const UsuariosController = () => import('#controllers/usuarios_controller')

router.get('/', async () => {
  return {
    message: 'API Lubricantes Sánchez POS',
    version: '1.0.0'
  }
})

// Rutas de autenticación
router.group(() => {
  router.post('/register', '#controllers/auth_controller.register')
  router.post('/login', '#controllers/auth_controller.login')
  router.delete('/logout', '#controllers/auth_controller.logout').use(middleware.auth())
  router.get('/me', '#controllers/auth_controller.me').use(middleware.auth())
}).prefix('/api/auth')

// Rutas protegidas del POS
router.group(() => {
  
  // Rutas de Usuarios (solo administradores)
  router.group(() => {
    router.get('/', [UsuariosController, 'index'])
    router.post('/', [UsuariosController, 'store'])
    router.get('/:id', [UsuariosController, 'show'])
    router.put('/:id', [UsuariosController, 'update'])
    router.delete('/:id', [UsuariosController, 'destroy'])
  }).prefix('/usuarios')

  // Rutas de Categorías
  router.group(() => {
    router.get('/', [CategoriasController, 'index'])
    router.post('/', [CategoriasController, 'store'])
    router.get('/:id', [CategoriasController, 'show'])
    router.put('/:id', [CategoriasController, 'update'])
    router.delete('/:id', [CategoriasController, 'destroy'])
  }).prefix('/categorias')

  // Rutas de Productos
  router.group(() => {
    router.get('/', [ProductosController, 'index'])
    router.post('/', [ProductosController, 'store'])
    router.get('/stock-bajo', [ProductosController, 'stockBajo'])
    router.get('/buscar/:codigo', [ProductosController, 'buscarPorCodigo'])
    router.get('/:id', [ProductosController, 'show'])
    router.put('/:id', [ProductosController, 'update'])
    router.delete('/:id', [ProductosController, 'destroy'])
  }).prefix('/productos')

  // Rutas de Ventas
  router.group(() => {
    router.get('/', [VentasController, 'index'])
    router.post('/', [VentasController, 'store'])
    router.get('/estadisticas', [VentasController, 'estadisticas'])
    router.get('/debug', [VentasController, 'debug'])
    router.get('/:id', [VentasController, 'show'])
    router.patch('/:id/cancelar', [VentasController, 'cancelar'])
  }).prefix('/ventas')

}).prefix('/api').use(middleware.auth())
