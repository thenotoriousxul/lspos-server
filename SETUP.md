# 🚀 Configuración del Backend - Lubricantes Sánchez POS

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- MySQL 8.0 o superior
- npm o yarn

## ⚙️ Configuración

### 1. Instalar Dependencias
```bash
cd ls-back
npm install
```

### 2. Configurar Base de Datos
Crear un archivo `.env` en la raíz del proyecto `ls-back` con el siguiente contenido:

```env
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=tu_clave_secreta_aqui

NODE_ENV=development

# Database Configuration for MySQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password_mysql
DB_DATABASE=lubricantes_sanchez_pos

# Session Configuration
SESSION_DRIVER=cookie
```

### 3. Crear Base de Datos
```sql
CREATE DATABASE lubricantes_sanchez_pos;
```

### 4. Generar APP_KEY
```bash
node ace generate:key
```

### 5. Ejecutar Migraciones
```bash
node ace migration:run
```

### 6. Ejecutar Seeders (Datos de Prueba)
```bash
node ace db:seed --files=main_seeder.ts
```

### 7. Iniciar Servidor
```bash
node ace serve --watch
```

## 👥 Usuarios de Prueba Creados

| Rol | Email | Contraseña | Descripción |
|-----|-------|------------|-------------|
| Admin | admin@lubricantessanchez.com | admin123 | Administrador principal |
| Gerente | gerente@lubricantessanchez.com | gerente123 | Gerente de tienda |
| Vendedor | vendedor1@lubricantessanchez.com | vendedor123 | Vendedor 1 |
| Vendedor | vendedor2@lubricantessanchez.com | vendedor123 | Vendedor 2 |
| Cajero | cajero@lubricantessanchez.com | cajero123 | Cajero |

## 📦 Datos de Prueba Incluidos

- **10 Categorías**: Aceites, Filtros, Baterías, Frenos, Suspensión, etc.
- **18 Productos**: Productos típicos de refaccionaria con precios y stock
- **5 Usuarios**: Diferentes roles para probar el sistema

## 🌐 API Endpoints

El servidor estará disponible en: `http://localhost:3333`

### Principales endpoints:
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/productos` - Obtener productos
- `POST /api/ventas` - Crear venta
- `GET /api/ventas/estadisticas` - Estadísticas de ventas

## 🔧 Comandos Útiles

```bash
# Revertir migraciones
node ace migration:rollback

# Ejecutar seeder específico
node ace db:seed --files=user_seeder.ts

# Limpiar y recargar datos
node ace migration:rollback --batch=0
node ace migration:run
node ace db:seed --files=main_seeder.ts
```

## 🚨 Solución de Problemas

### Error de conexión MySQL
- Verificar que MySQL esté ejecutándose
- Comprobar credenciales en `.env`
- Asegurar que la base de datos existe

### Error de APP_KEY
```bash
node ace generate:key
```

### Error de permisos
- Verificar permisos de escritura en directorio
- Ejecutar como administrador si es necesario
