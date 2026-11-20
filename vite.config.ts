import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type CommonServerOptions } from 'vite'
import { z } from 'zod'

const DEFAULT_HTTP_PORT = 80

const INVALID_LOCAL_URL_MESSAGE =
  'Falta la variable de entorno URL_LOCAL o no es una URL http válida. Definila en el archivo .env de la raíz del proyecto (ver README.md), por ejemplo: URL_LOCAL=http://localhost:8080'

const serverEnvSchema = z.object({
  URL_LOCAL: z.url({ protocol: /^http$/ }),
})

function resolveServerOptions(mode: string): CommonServerOptions {
  const env = serverEnvSchema.safeParse(loadEnv(mode, process.cwd(), ''))

  if (!env.success) {
    throw new Error(INVALID_LOCAL_URL_MESSAGE)
  }

  const localUrl = new URL(env.data.URL_LOCAL)

  return {
    host: localUrl.hostname,
    port: Number(localUrl.port) || DEFAULT_HTTP_PORT,
    strictPort: true,
  }
}

export default defineConfig(({ command, mode }) => {
  const plugins = [react(), tailwindcss()]

  if (command === 'build') {
    return { plugins }
  }

  const serverOptions = resolveServerOptions(mode)

  return {
    plugins,
    server: serverOptions,
    preview: serverOptions,
  }
})
