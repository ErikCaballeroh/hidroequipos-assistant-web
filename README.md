# hidroequipos-assistant-web

Frontend del asistente de diagnóstico y mantenimiento de albercas de **Hidroequipos y Albercas**. Herramienta interna: los empleados usan el chat y los supervisores administran catálogo, base de conocimiento, plantillas, usuarios, métricas y trazabilidad.

El backend vive en el repositorio hermano `hidroequipos-assistant-api` (NestJS). Este frontend consume su API real en todas las pantallas; no quedan datos de ejemplo.

## Empezar

1. Copia `.env.example` a `.env.local` y ajusta `NEXT_PUBLIC_API_URL` si hace falta (por defecto `http://localhost:3001/api`).
2. Con el backend corriendo:

```bash
pnpm install
pnpm dev
```

3. Abre [http://localhost:3000](http://localhost:3000).

## Comandos

- `pnpm dev` — desarrollo (puerto 3000)
- `pnpm build` — build de producción; debe pasar antes de cada PR
- `pnpm lint` — linter; debe pasar antes de cada PR
- `pnpm test` — pruebas unitarias con Vitest; debe pasar antes de cada PR
- `pnpm api:sync` — descarga el OpenAPI del backend (debe estar corriendo) y regenera `src/lib/api/schema.d.ts`

## Convenciones y arquitectura

Ver [`CLAUDE.md`](./CLAUDE.md): estructura por features, reglas de componentes, manejo de datos/API, autenticación y convenciones de trabajo del equipo.
