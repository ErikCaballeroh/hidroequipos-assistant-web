# hidroequipos-assistant-web

Frontend del asistente de diagnóstico y mantenimiento de albercas de **Hidroequipos y Albercas**.

Los empleados usan un chat para describir el síntoma de una alberca en lenguaje natural — agua verde, bomba ruidosa, olor fuerte a cloro — y reciben el diagnóstico y las fuentes (productos y artículos) que generó el backend. Los supervisores, además, administran el catálogo de productos, la base de conocimiento, los atajos de consulta frecuente, los usuarios, y monitorean métricas y trazabilidad de las respuestas del asistente.

El backend (API, base de datos, integración con Gemini) vive en el repositorio hermano [`hidroequipos-assistant-api`](https://github.com/ErikCaballeroh/hidroequipos-assistant-api). Este frontend consume su API real en todas las pantallas; no quedan datos de ejemplo.

## Descripción

El proyecto está construido con **Next.js** (App Router) y **TypeScript**, usa **TanStack Query** para carga, caché e invalidación de datos, **Axios** como único cliente HTTP, y **Tailwind CSS** con los componentes y estilos heredados del diseño de Figma Make. Los tipos de la API se generan automáticamente desde el OpenAPI del backend con `openapi-typescript`.

## Tecnologías

- Next.js (App Router)
- React 19 + TypeScript
- TanStack Query
- Axios
- Tailwind CSS
- `openapi-typescript` (generación de tipos desde el OpenAPI del backend)
- Vitest + Testing Library + MSW (pruebas unitarias)

## Estructura funcional

El frontend organiza las pantallas en los siguientes bloques:

- Autenticación (login, cambio de contraseña) y guard de sesión por rol
- Chat de diagnóstico, con fuentes citadas (productos y artículos) y feedback (👍/👎) por respuesta
- Atajos de consulta frecuente, compactados como un botón en la barra del chat
- Catálogo de productos (administración, solo supervisores)
- Base de conocimiento técnico (administración, solo supervisores)
- Plantillas rápidas de consulta (administración y reordenamiento, solo supervisores)
- Usuarios con roles (reseteo de contraseña, alta/baja, solo supervisores)
- Métricas (productos más consultados, aprobación de feedback, mensajes sin match, salud de la API de Gemini) y trazabilidad de respuestas (solo supervisores)

## Requisitos

- Node.js 22 o superior
- pnpm 9 o superior (el repo fija `pnpm@12.8.1` en `package.json`)
- El backend (`hidroequipos-assistant-api`) corriendo y accesible en la URL que apunte `NEXT_PUBLIC_API_URL`

## Instalación

1. Clona el repositorio.

```bash
git clone https://github.com/ErikCaballeroh/hidroequipos-assistant-web.git
cd hidroequipos-assistant-web
```

2. Instala dependencias.

```bash
pnpm install
```

3. Copia `.env.example` a `.env.local` y ajusta `NEXT_PUBLIC_API_URL` si hace falta (por defecto `http://localhost:3001/api`).

4. Con el backend corriendo, levanta el servidor de desarrollo.

```bash
pnpm dev
```

5. Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Descripción | Requerida |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | URL base de la API del backend, incluyendo el prefijo `/api` (ej. `http://localhost:3001/api`) | Sí |

## Scripts

| Script | Descripción |
| --- | --- |
| `pnpm dev` | Levanta el servidor de desarrollo (puerto 3000) |
| `pnpm build` | Compila el build de producción; debe pasar antes de cada PR |
| `pnpm start` | Ejecuta el build compilado |
| `pnpm lint` | Corre el linter; debe pasar antes de cada PR |
| `pnpm test` | Corre las pruebas unitarias con Vitest; debe pasar antes de cada PR |
| `pnpm api:sync` | Descarga el OpenAPI del backend (debe estar corriendo) y regenera `src/lib/api/schema.d.ts` |

## Ejecución

### Desarrollo

```bash
pnpm dev
```

La app queda disponible en `http://localhost:3000`.

### Build de producción

```bash
pnpm build
pnpm start
```

## Pruebas

Las pruebas unitarias usan **Vitest** con **Testing Library** (entorno `jsdom`) y **MSW** para mockear la capa HTTP:

```bash
pnpm test
```

- Las funciones puras (`mappers.ts`, normalización de errores) se prueban directo, sin mocks.
- Los hooks que llaman a la API se prueban interceptando las peticiones reales con MSW (`src/test/msw/`) en vez de reemplazar el cliente Axios, así se ejercita el flujo real de TanStack Query + Axios.
- Los archivos de prueba van junto al código (`archivo.test.ts`/`.tsx`), no en una carpeta `__tests__/` aparte.

El detalle de la configuración vive en `vitest.config.mts`, `src/test/setup.ts` y la sección **Pruebas** de `CLAUDE.md`.

## Autenticación

El token JWT se guarda en `localStorage` (manejado solo desde `src/lib/auth/`) y expira a las 8 horas. Hay dos roles:

- `employee`: acceso al chat.
- `supervisor`: acceso al chat y a todas las pantallas de `/admin/*`.

Un empleado que intenta entrar a `/admin/*` es redirigido al chat. El reseteo de contraseña lo hace un supervisor; el cambio propio es voluntario (no hay cambio de contraseña obligatorio).

## Estructura del proyecto

```
src/
├── app/                  # rutas: page.tsx y layout.tsx delgados
│   ├── (auth)/           # login, cambio de contraseña
│   └── (app)/            # chat y admin, con layout y guard de sesión
├── features/
│   ├── auth/              → login, perfil, cambio de contraseña
│   ├── chat/                → conversaciones, mensajes, fuentes, feedback, plantillas
│   ├── catalog/               → administración del catálogo de productos
│   ├── knowledge-base/          → administración de la base de conocimiento
│   ├── templates/                 → plantillas rápidas de consulta
│   ├── users/                       → gestión de usuarios
│   ├── metrics/                       → panel de métricas
│   └── trace/                           → trazabilidad de respuestas
│       ├── components/   # componentes de la feature
│       ├── hooks/        # useX(): único punto de acceso a datos
│       ├── api/          # funciones tipadas que llaman al backend
│       ├── mappers.ts    # adaptadores API -> UI, solo si hacen falta
│       └── types.ts
├── components/
│   ├── ui/               # primitivos reutilizables (tarjeta, tabla, paginación...)
│   └── layout/           # sidebar, header
├── lib/
│   ├── api/              # cliente axios, errores y tipos generados
│   └── auth/              # manejo de sesión
└── test/                   # setup de Vitest, cliente de pruebas y handlers de MSW
```

`figma-prototipe/` es la referencia visual original. **No se edita ni se importa desde ningún archivo.**

## Convenciones y arquitectura

Ver [`CLAUDE.md`](./CLAUDE.md): reglas de componentes, manejo de datos/API, autenticación, pruebas y convenciones de trabajo del equipo.
