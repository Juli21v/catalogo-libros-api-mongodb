# Biblioteca Toile — API CRUD de libros

Backend **Node.js + Express + MongoDB (Mongoose)** para registrar y consultar **libros** en una base de datos: título, descripción y metadatos asociados según el modelo definido en el código.

**Autora del repositorio:** [@Juli21v](https://github.com/Juli21v)

## Stack

- Node.js (ES modules)
- Express
- Mongoose
- dotenv, CORS

## API REST (`/api/book`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Estado del servicio |
| GET | `/api/book` | Lista libros activos (`?all/true` incluye archivados) |
| GET | `/api/book/:id` | Detalle por id de MongoDB |
| POST | `/api/book` | Crear (`name`, `description`) |
| PUT | `/api/book/:id` | Actualizar campos parciales |
| DELETE | `/api/book/:id` | Archivar (soft delete: `dbStatus: false`) |

Ejemplos en `backend/api-requests.http` (REST Client / VS Code).

## Estructura del repositorio

```
Biblioteca-toile/
└── backend/
    ├── index.js           # Servidor Express
    ├── db/db.js           # Conexión a MongoDB
    ├── models/Book.js     # Esquema Mongoose
    ├── controllers/Book.js
    ├── routes/Book.js
    └── package.json
```

## Requisitos

- Node.js
- Instancia de MongoDB accesible

## Configuración

Crea `backend/.env` a partir del ejemplo:

```bash
cd backend
cp .env.example .env
# Ajusta PORT y DB_CONNECTION
```

## Puesta en marcha

```bash
cd backend
npm install
npm start
```

El servidor escuchará en el puerto definido en `PORT`.

## Idea para reclutadores

Ejercicio claro de **API REST con persistencia**: separación en rutas, controlador y modelo, apto para extender con frontend o tests automatizados.
