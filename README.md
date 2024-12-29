# Task Manager API

API RESTful desarrollada con NestJS para gestionar tareas (Task Manager). Permite crear, leer, actualizar y eliminar tareas, así como marcarlas como completadas.

## Características

- CRUD completo para tareas
- Validación de datos con class-validator
- Documentación con Swagger
- Base de datos MongoDB con Mongoose
- Pruebas unitarias con Jest
- TypeScript
- Arquitectura limpia y modular

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB instalado y corriendo localmente
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/JUNIORCEDE/task-manager-backend.git
cd task-manager-backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo .env en la raíz del proyecto:
```env
MONGODB_URI=mongodb://localhost:27017
PORT=3000
```

## Ejecución

### Desarrollo
```bash
# Modo desarrollo
npm run start:dev

# Modo debug
npm run start:debug
```

### Producción
```bash
# Construir la aplicación
npm run build

# Ejecutar en producción
npm run start:prod
```

## Pruebas

```bash
# Pruebas unitarias
npm run test

# Pruebas con watch mode
npm run test:watch

# Cobertura de pruebas
npm run test:cov
```

## Documentación API

La documentación de la API está disponible mediante Swagger UI. Una vez que el servidor esté corriendo, puedes acceder a:

```
http://localhost:3000/api
```

## Estructura del Proyecto

```
src/
├── config/
│   └── database.config.ts
├── tasks/
│   ├── dto/
│   │   ├── create-task.dto.ts
│   │   └── update-task.dto.ts
│   ├── schemas/
│   │   └── task.schema.ts
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── tasks.module.ts
├── app.module.ts
└── main.ts
```

## Endpoints API

### Tareas

- `GET /api/tasks` - Obtener todas las tareas
- `GET /api/tasks/:id` - Obtener una tarea específica
- `POST /api/tasks` - Crear una nueva tarea
- `PUT /api/tasks/:id` - Actualizar una tarea existente
- `DELETE /api/tasks/:id` - Eliminar una tarea

### Ejemplos de Uso

#### Crear una Tarea

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi tarea",
    "description": "Descripción de la tarea"
  }'
```

#### Obtener Todas las Tareas

```bash
curl http://localhost:3000/api/tasks
```

## Modelos

### Task

```typescript
{
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}
```

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Scripts Disponibles

- `npm run start:dev` - Inicia la aplicación en modo desarrollo
- `npm run build` - Compila la aplicación
- `npm run start:prod` - Inicia la aplicación en modo producción
- `npm run test` - Ejecuta pruebas unitarias
- `npm run test:watch` - Ejecuta pruebas en modo watch
- `npm run test:cov` - Genera reporte de cobertura de pruebas
- `npm run test:e2e` - Ejecuta pruebas end-to-end

## Variables de Entorno

La aplicación utiliza las siguientes variables de entorno:

| Variable     | Descripción                    | Valor por defecto             |
|-------------|--------------------------------|------------------------------|
| MONGODB_URI | URI de conexión a MongoDB      | mongodb://localhost:27017    |
| PORT        | Puerto del servidor            | 3000                        |

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
