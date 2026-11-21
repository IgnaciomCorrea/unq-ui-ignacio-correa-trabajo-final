# Palabras Encadenadas

Juego de palabras encadenadas hecho con React para el Trabajo Final Integrador de Interfaces de Usuario.

## Requisitos

- [Node.js](https://nodejs.org/) 22.13 o superior
- [Git](https://git-scm.com/)

## Cómo levantar la app por primera vez

### 1. Descargar el proyecto

```bash
git clone https://github.com/IgnaciomCorrea/unq-ui-ignacio-correa-trabajo-final.git
cd unq-ui-ignacio-correa-trabajo-final
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Crear el archivo `.env`

La app lee su configuración de un archivo `.env` ubicado en la raíz del proyecto, al lado de `package.json`. Ese archivo no está en el repositorio, así que hay que crearlo con un editor de texto y este contenido:

```dotenv
URL_LOCAL=http://localhost:8080
VITE_URL_API=https://word-api-hmlg.vercel.app
VITE_ROUTE_WORD_VALIDATION=/api/validate
```

| Variable | Descripción |
| --- | --- |
| `URL_LOCAL` | URL `http` donde se levanta la app. De ella se toman el host y el puerto del servidor local. |
| `VITE_URL_API` | URL base (`http` o `https`) de la API de la cátedra que valida las palabras. |
| `VITE_ROUTE_WORD_VALIDATION` | Ruta de esa API que valida si una palabra existe. Tiene que empezar con `/`. |

Las tres variables son obligatorias: si falta alguna o tiene un valor inválido, la app no arranca y el error indica cuál hay que corregir. `npm run build` también exige las dos de la API, porque quedan incluidas en la app compilada.

Las variables de la API llevan el prefijo `VITE_` porque las usa el código de la app en el navegador, y Vite solo le pasa las que tienen ese prefijo.

### 4. Levantar la app

```bash
npm run dev
```

La app queda disponible en la URL definida en `URL_LOCAL`. Con el ejemplo anterior, en http://localhost:8080.

## Cómo correr los tests

```bash
npm test
```

Ese comando corre todos los tests una vez. Para que se vuelvan a correr solos cada vez que se guarda un archivo, se usa `npm run test:watch`.

Los tests no necesitan el archivo `.env` ni conexión a internet. La API de palabras está simulada, así que nunca se le hacen pedidos reales.

Todos los tests están en la carpeta `tests/`, que repite la estructura de `src/`: por ejemplo, los de `src/features/game/utils.ts` están en `tests/features/game/utils.test.ts`. Las herramientas que comparten, como el diccionario simulado, están en `tests/helpers/`.

Están hechos con [Vitest](https://vitest.dev/) y [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), y prueban la app como la usaría una persona: escriben palabras, esperan la respuesta del diccionario, dejan correr el reloj y abandonan la partida.

## Problemas frecuentes

**Aparece el error "Falta la variable de entorno..."**

El archivo `.env` no existe, no está en la raíz del proyecto o alguna variable falta o tiene un valor inválido. El error nombra cada variable que hay que corregir. Revisar el paso 3.

Si el archivo parece correcto y se creó desde Windows PowerShell (por ejemplo, con `echo ... > .env`), seguramente quedó guardado en UTF-16 o en UTF-8 con BOM, y las variables no se pueden leer. Hay que crearlo de nuevo con un editor de texto y guardarlo como UTF-8.

**Al jugar aparece "No pudimos validar..."**

La app no pudo comunicarse con la API de palabras: no hay conexión a internet, la API no respondió a tiempo o `VITE_URL_API` / `VITE_ROUTE_WORD_VALIDATION` apuntan a otro lado. La palabra no se suma, pero se puede volver a enviar mientras quede tiempo. Si se cambia el `.env`, hay que detener la app y volver a ejecutar `npm run dev`.

**El puerto está ocupado**

Si aparece el error "Port ... is already in use", o si en la URL se ve otra aplicación, hay otro programa usando ese puerto. La app no cambia de puerto por su cuenta, para respetar `URL_LOCAL`. Hay que cerrar ese programa o elegir otro puerto en el `.env`, por ejemplo `URL_LOCAL=http://localhost:5173`.
