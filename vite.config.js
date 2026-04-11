import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        // 1. Raíz
        main: resolve(__dirname, 'index.html'),

        // 2. Carpeta "paginas"
        contacto: resolve(__dirname, 'paginas/contacto.html'),
        nosotros: resolve(__dirname, 'paginas/nosotros.html'),
        productos: resolve(__dirname, 'paginas/productos.html'),

        // 3. Carpeta "paginas/categorias.productos"
        ingredientes: resolve(__dirname, 'paginas/categorias-productos/ingredientes.html'),
        armaduras: resolve(__dirname, 'paginas/categorias-productos/armaduras.html'),
        pociones: resolve(__dirname, 'paginas/categorias-productos/pociones.html'),
      }
    }
  }
})