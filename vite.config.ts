import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type CommonServerOptions } from 'vite'
import { z } from 'zod'

const DEFAULT_HTTP_PORT = 80

const INVALID_LOCAL_URL_MESSAGE =
  'Falta la variable de entorno URL_LOCAL o no es una URL http válida. Definila en el archivo .env de la raíz del proyecto (ver README.md), por ejemplo: URL_LOCAL=http://localhost:8080'

const INVALID_API_URL_MESSAGE =
  'Falta la variable de entorno VITE_URL_API o no es una URL http o https válida. Definila en el archivo .env de la raíz del proyecto (ver README.md), por ejemplo: VITE_URL_API=https://word-api-hmlg.vercel.app'

const INVALID_VALIDATION_ROUTE_MESSAGE =
  'Falta la variable de entorno VITE_ROUTE_WORD_VALIDATION o no empieza con "/". Definila en el archivo .env de la raíz del proyecto (ver README.md), por ejemplo: VITE_ROUTE_WORD_VALIDATION=/api/validate'

const clientEnvSchema = z.object({
  VITE_URL_API: z.url({
    protocol: /^https?$/,
    error: INVALID_API_URL_MESSAGE,
  }),
  VITE_ROUTE_WORD_VALIDATION: z
    .string({ error: INVALID_VALIDATION_ROUTE_MESSAGE })
    .startsWith('/', { error: INVALID_VALIDATION_ROUTE_MESSAGE }),
})

const serverEnvSchema = clientEnvSchema.extend({
  URL_LOCAL: z.url({ protocol: /^http$/, error: INVALID_LOCAL_URL_MESSAGE }),
})

function parseEnv<Schema extends z.ZodType>(
  schema: Schema,
  mode: string,
): z.infer<Schema> {
  const env = schema.safeParse(loadEnv(mode, process.cwd(), ''))

  if (!env.success) {
    throw new Error(z.prettifyError(env.error))
  }

  return env.data
}

function toServerOptions(localUrl: string): CommonServerOptions {
  const { hostname, port } = new URL(localUrl)

  return {
    host: hostname,
    port: Number(port) || DEFAULT_HTTP_PORT,
    strictPort: true,
  }
}

export default defineConfig(({ command, mode }) => {
  const plugins = [react(), tailwindcss()]

  if (command === 'build') {
    parseEnv(clientEnvSchema, mode)

    return { plugins }
  }

  const env = parseEnv(serverEnvSchema, mode)
  const serverOptions = toServerOptions(env.URL_LOCAL)

  return {
    plugins,
    server: serverOptions,
    preview: serverOptions,
  }
})
