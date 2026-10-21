@AGENTS.md

# CLAUDE.md — hidroequipos-assistant-web

Frontend del asistente de diagnóstico y mantenimiento de albercas de **Hidroequipos y Albercas**. Herramienta interna: los empleados usan el chat y los supervisores administran catálogo, base de conocimiento, plantillas, usuarios, métricas y trazabilidad. El backend vive en otro repositorio (`hidroequipos-assistant-api`).

Todas las pantallas ya están integradas contra el backend real; no quedan `mocks/` en el proyecto. Si se agrega una pantalla nueva antes de que exista su endpoint, se puede volver a usar temporalmente el patrón `mocks/` descrito abajo (el hook devuelve el mock hasta que el endpoint exista), pero debe eliminarse en cuanto se conecte a la API real.

Antes de escribir código de Next.js, sigue las instrucciones de `AGENTS.md`: esta versión de Next.js puede diferir de lo que conoces, así que consulta la documentación instalada en `node_modules/next/dist/docs/` y no asumas APIs de versiones anteriores.

## Stack

- Next.js (App Router, rutas en `src/app`), React y TypeScript
- pnpm como gestor de paquetes
- Axios para HTTP y TanStack Query para carga, caché y estados de error
- `openapi-typescript` (dev) para generar los tipos desde el OpenAPI del backend
- Estilos y componentes de UI: los que ya trae el proyecto desde el diseño de Figma Make. No agregar otra librería de UI o de estilos sin acordarlo
- Solo modo claro. Paleta de marca: azules y blanco

## Comandos

- `pnpm dev` — desarrollo (puerto 3000)
- `pnpm build` — compila; debe pasar antes de cada PR
- `pnpm lint` — linter; debe pasar antes de cada PR
- `pnpm test` — pruebas unitarias con Vitest; debe pasar antes de cada PR
- `pnpm api:sync` — descarga el OpenAPI del backend y regenera los tipos (se agrega en la fase de infraestructura)

Variable de entorno (ver `.env.example`):

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

La API corre en el puerto 3001 y todas sus rutas cuelgan de `/api`. La documentación está en `/api/docs`.

## Estructura

```
src/
├── app/                  # solo rutas: page.tsx y layout.tsx delgados
│   ├── (auth)/           # login, cambio de contraseña
│   └── (app)/            # chat y admin, con layout y guard de sesión
├── features/
│   └── <feature>/        # auth, chat, metrics, trace, users, catalog, ...
│       ├── components/   # componentes de la feature
│       ├── hooks/        # useX(): único punto de acceso a datos
│       ├── api/          # funciones tipadas que llaman al backend
│       ├── mocks/        # datos de ejemplo (solo los usan los hooks)
│       ├── mappers.ts    # adaptadores API -> UI, solo si hacen falta
│       └── types.ts
├── components/
│   ├── ui/               # primitivos reutilizables (tarjeta, tabla, barra...)
│   └── layout/           # sidebar, header
└── lib/
    ├── api/              # cliente axios, errores y tipos generados
    ├── auth/             # manejo de sesión
    └── utils.ts
```

`figma-prototipe/` es la referencia visual original. **No se edita ni se importa desde ningún archivo.**

## Reglas de componentes

- Los `page.tsx` solo componen: importan componentes de su feature y no contienen lógica de datos ni JSX extenso.
- Los componentes visuales reciben todo por props y no saben de dónde vienen los datos.
- Los datos entran por un hook por pantalla (`useMetrics()`, `useConversations()`...). Mientras no exista el endpoint, el hook devuelve el mock; cuando exista, llama a la API. Los componentes no cambian.
- Ningún componente ni `page.tsx` importa de `mocks/`. Solo lo hacen los hooks.
- `'use client'` solo en el componente más bajo que lo necesite.
- Un componente que supera ~150 líneas o mezcla varias responsabilidades se divide.
- Archivos nuevos en `kebab-case`; componentes exportados en `PascalCase`.
- Los textos de la interfaz van en español; los nombres de código, en inglés.

## Datos y API

- Hay una sola instancia de Axios en `lib/api/client.ts`. Nadie usa `fetch` ni crea otra instancia.
- El interceptor de petición agrega `Authorization: Bearer <token>`. El de respuesta ante un 401 limpia la sesión y redirige a `/login`.
- Los errores se normalizan a `{ status, message }`. El backend (NestJS) puede devolver `message` como texto o como lista de textos (errores de validación).
- Los tipos de la API **se generan, no se escriben a mano**: `src/lib/api/schema.d.ts` sale de `openapi/openapi.json`. Ese par de archivos no se edita manualmente; se actualiza con `pnpm api:sync`.
- No leas `openapi/openapi.json` completo, es largo. Consulta `schema.d.ts` o busca solo las rutas que necesites.
- Usa el tipo de la API directamente cuando el componente pueda mostrarlo tal cual. Crea un mapper pequeño solo si la interfaz necesita otra forma (porcentajes, fechas legibles, textos como "Éxito"/"Error", valores nulos). Si una pantalla necesita más de un par de transformaciones, van en el mapper y no dentro del JSX.
- Las funciones de `api/` son delgadas y tipadas; los hooks las envuelven con TanStack Query.

## Autenticación

- El token JWT se guarda en `localStorage`, manejado solo desde `lib/auth/`. Expira a las 8 horas.
- Como el token vive en el navegador, las llamadas a la API ocurren en componentes de cliente.
- Roles: `employee` (chat) y `supervisor` (chat y `/admin/*`). Un empleado que entra a `/admin/*` es redirigido al chat.
- No hay cambio de contraseña obligatorio: el reseteo lo hace un supervisor y el cambio propio es voluntario.

## Contratos del backend a recordar

- `similarity` llega de 0 a 1; se muestra como porcentaje en la interfaz.
- Una respuesta del chat incluye `sources` (productos y artículos con su relevancia).
- Los fallos del modelo de lenguaje llegan como 503: mostrar un mensaje claro, no un error genérico.
- El ranking de productos de Métricas son los **más consultados** (lo que recuperó la búsqueda), no necesariamente los que el modelo recomendó. Etiquétalo así.
- Un "mensaje sin match suficiente" es una respuesta sin contexto suficiente en el catálogo ni en la base de conocimiento.

## Pruebas

- Vitest + `@testing-library/react` (entorno `jsdom`), configurado en `vitest.config.mts`. Los archivos de prueba van junto al código (`archivo.test.ts`/`.tsx`), no en una carpeta `__tests__/` aparte.
- Funciones puras (`mappers.ts`, `lib/api/errors.ts`) se prueban directo, sin mocks.
- Los hooks que llaman a la API se prueban con MSW (`src/test/msw/`), que intercepta las peticiones HTTP reales en vez de reemplazar `apiClient`. `src/test/setup.ts` arranca el servidor MSW para todas las pruebas y fuerza el adaptador `fetch` de Axios (el adaptador `xhr` de jsdom no lo intercepta MSW de forma confiable); esto es solo para pruebas, no afecta `lib/api/client.ts`.
- `src/test/query-client.tsx` trae un `createWrapper()` para `renderHook` con su propio `QueryClient` por prueba.

## Convenciones de trabajo

- Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`).
- Ramas descriptivas por fase (`refactor/chat-feature`, `feat/auth-integration`) y un PR por fase.
- Antes de cada PR: `pnpm lint`, `pnpm test` y `pnpm build` sin errores.
- En los refactors, la pantalla debe verse igual que antes. Compara contra `figma-prototipe/` y el estado previo.
- Cada interfaz de datos debe cubrir cuatro estados: carga, vacío, error y contenido.

## Qué NO hacer

- No editar ni importar `figma-prototipe/`.
- No tocar el bloque de reglas de Next.js de `AGENTS.md`.
- No usar `fetch` ni más de una instancia de Axios.
- No escribir tipos de la API a mano ni editar `schema.d.ts`.
- No dejar datos de ejemplo dentro de componentes o páginas.
- No agregar librerías nuevas de UI, estado global o formularios sin acordarlo.
- No hacer commit sin que el usuario lo pida.