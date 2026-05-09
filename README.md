#Renn Farwind

## Corporative & E-commerce Showcase

**Renn Farwind** es una plataforma corporativa de temática fantástica diseñada como un catálogo digital dinámico. Este proyecto nació como una refactorización de una estructura tradicional en PHP hacia una arquitectura moderna, escalable y de alto rendimiento.

---

## Características principales

- **Catálogo dinámico**: renderizado de productos (pociones, armaduras, ingredientes) en función de datos en tiempo real.
- **Arquitectura híbrida de datos**: alterna entre MySQL (vía API PHP) en entorno local y JSON estático para despliegues en producción (Vercel).
- **UI/UX premium**: diseño minimalista con Tailwind CSS v4, menús desplegables fluidos y modales de producto optimizados.
- **Single source of truth**: componentes reutilizables (`Header`, `Footer`) inyectados mediante JavaScript asíncrono.

---

##Tech Stack

### Frontend
- Vite (Build Tool)
- Tailwind CSS v4
- JavaScript ES6+

### Backend
- PHP 8.x (API REST)
- MySQL (Base de datos)
- JSON (Mocking)

### Herramientas
- Git / GitHub
- Vercel (Deploy)
- XAMPP (Servidor local)

---

##Estructura del proyecto

```text
farwind-refactor/
+-- public/                 # Recursos estáticos y componentes inyectables
¦   +-- componentes/        # Header y Footer compartidos
¦   +-- productos.json      # Base de datos para entorno de producción
+-- paginas/                # Vistas corporativas
¦   +-- categorias-productos/ # Catálogos específicos
¦   +-- ...                 # Nosotros, Contacto, Productos
+-- src/                    # Lógica de negocio y estilos
¦   +-- main.js             # Renderizado dinámico y lógica híbrida
¦   +-- style.css           # Directivas y estilos Tailwind
+-- index.html              # Punto de entrada principal
+-- vite.config.js          # Configuración multi-página para el build
```

---

##Configuración local

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar el backend:
- Mover la carpeta `farwind-api` a tu servidor local (`XAMPP/htdocs`).
- Importar el archivo SQL incluido en la base de datos MySQL.

4. Ejecutar en modo desarrollo:

```bash
npm run dev
```

---

##Proceso de refactorización

- **Migración**: de una web multipágina estática a una estructura gestionada por Vite.
- **Optimización**: implementación de Tailwind v4 para reducir el peso del CSS y mejorar el tiempo de desarrollo.
- **Modernización**: sustitución de la carga manual de elementos por Fetch API y filtrado dinámico de objetos JSON.
