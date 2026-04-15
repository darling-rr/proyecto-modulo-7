# Proyecto Integrador JS – Módulo 8
API RESTful segura con JWT y subida de archivos

## Descripción

Este proyecto corresponde a la tercera etapa del proyecto integrador del curso.  
En esta fase se implementó una API RESTful sobre la aplicación desarrollada en los módulos anteriores, incorporando autenticación mediante JSON Web Tokens (JWT), protección de rutas y subida de archivos al servidor.

La aplicación está construida con Node.js, Express y Sequelize, y permite gestionar usuarios y pedidos, además de exponer endpoints protegidos que pueden ser consumidos por clientes externos.

## Tecnologías utilizadas

- Node.js
- Express
- Sequelize
- PostgreSQL
- JSON Web Token (jsonwebtoken)
- Multer
- Thunder Client
- Postman

## Objetivos del módulo

- Exponer la lógica del backend mediante una API RESTful
- Implementar autenticación con JWT
- Proteger rutas mediante middleware
- Permitir subida de archivos al servidor
- Validar tipo y tamaño de archivo
- Mantener una arquitectura modular con rutas, controladores y middlewares

## Estructura del proyecto

controllers/
  authController.js
  homeController.js
  statusController.js
  uploadController.js
  userController.js

middlewares/
  authMiddleware.js
  uploadMiddleware.js
  visitLogger.js

models/
  User.js
  Order.js
  index.js

routes/
  authRoutes.js
  uploadRoutes.js
  users.js
  index.js

uploads/
public/
index.js

## Funcionalidades implementadas

### Autenticación

- Login de usuario mediante `POST /login`
- Generación de token JWT válido
- Validación de token con middleware

### Rutas protegidas

- Protección de rutas mediante header `Authorization`
- Acceso restringido a endpoints sin token o con token inválido

### Gestión de usuarios

- Obtener todos los usuarios
- Obtener usuario por ID
- Crear usuario
- Actualizar usuario
- Eliminar usuario

### Gestión de pedidos

- Crear pedidos asociados a un usuario
- Obtener usuario con sus pedidos

### Subida de archivos

- Endpoint `POST /upload`
- Almacenamiento en carpeta `uploads/`
- Validación de tipo de archivo
- Validación de tamaño máximo

## Endpoints principales

### Autenticación
- `POST /login`

### Usuarios
- `GET /usuarios`
- `GET /usuarios/:id`
- `POST /usuarios`
- `PUT /usuarios/:id`
- `DELETE /usuarios/:id`

### Pedidos
- `POST /pedidos`
- `GET /usuarios/:id/pedidos`

### Archivos
- `POST /upload`

## Seguridad

Se protegieron rutas usando JWT mediante el header:

Authorization: Bearer TU_TOKEN

Además, la contraseña del usuario se excluye de las respuestas del servidor utilizando:

attributes: { exclude: ["password"] }

## Subida de archivos

La subida de archivos se implementó con Multer.  
Los archivos se almacenan en la carpeta `uploads/` con nombre único generado automáticamente.

Se validan:
- tipo de archivo permitido
- tamaño máximo del archivo

## Pruebas realizadas

Las pruebas se realizaron utilizando Thunder Client y Postman, verificando:

- login exitoso
- generación de token JWT
- acceso denegado sin token
- acceso permitido con token válido
- subida correcta de archivo
- consulta de usuarios protegida
- consulta de usuario con pedidos
- validaciones de error

## Autor

Darling Rebolledo
