import { mkdir, writeFile } from "node:fs/promises";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";
const docsUrl = `${apiUrl}/docs-json`;

const res = await fetch(docsUrl);
if (!res.ok) {
  throw new Error(`No se pudo descargar el OpenAPI de ${docsUrl}: ${res.status} ${res.statusText}`);
}

const spec = await res.json();

await mkdir("openapi", { recursive: true });
await writeFile("openapi/openapi.json", `${JSON.stringify(spec, null, 2)}\n`);

console.log(`OpenAPI descargado desde ${docsUrl} -> openapi/openapi.json`);
