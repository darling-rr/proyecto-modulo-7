# Proyecto Módulo 6 - Node & Express Web App

## 📌 Descripción

Este proyecto corresponde al desarrollo de un backend utilizando Node.js y Express.
Se implementa una estructura modular que incluye controladores, rutas, middlewares y archivos estáticos.

Además, se incorpora un middleware personalizado que registra cada visita en un archivo de logs.

---

## 🧠 ¿Por qué elegí `index.js`?

Elegí `index.js` como archivo principal porque es una convención ampliamente utilizada en proyectos Node.js para definir el punto de entrada de la aplicación.
Esto facilita la comprensión del proyecto por parte de otros desarrolladores.

---

## ⚙️ Tecnologías usadas

* Node.js
* Express.js
* dotenv
* nodemon

---

## 💻 Requisitos

* Node.js v18 o superior
* npm

---

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
cd proyecto-modulo-6
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en la raíz:

```env
PORT=3001
```

---

## 🚀 Ejecución

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

---

## 🌐 Rutas disponibles

* `/` → Página HTML principal
* `/status` → Estado del servidor en formato JSON

---

## 🧾 Middleware

El proyecto incluye un middleware personalizado (`visitLogger`) que:

* Registra cada visita
* Guarda fecha, hora y ruta
* Almacena la información en `logs/log.txt`

---

## 📁 Estructura del proyecto

```
controllers/
middlewares/
routes/
public/
logs/
index.js
.env
package.json
```

---

## 📌 Notas

* El puerto es configurable mediante variables de entorno.
* Se utiliza `nodemon` para reinicio automático en desarrollo.
