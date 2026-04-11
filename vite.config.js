import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path' // Necesario para gestionar las rutas de los archivos

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        // Mantenemos el index y añadimos todas tus páginas secundarias
        main: resolve(__dirname, 'index.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        productos: resolve(__dirname, 'productos.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        pociones: resolve(__dirname, 'pociones.html'),
        ingredientes: resolve(__dirname, 'ingredientes.html'),
        armaduras: resolve(__dirname, 'armaduras.html'),
      }
    }
  }
})