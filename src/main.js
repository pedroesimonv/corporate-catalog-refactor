import './style.css'

// Función para cargar componentes HTML
async function cargarComponente(id, path) {
    const elemento = document.getElementById(id);
    if (elemento) {
        try {
            const response = await fetch(path);
            const html = await response.text();
            elemento.outerHTML = html; // Sustituye el div vacío por el HTML real
        } catch (error) {
            console.error(`Error cargando el componente ${path}:`, error);
        }
    }
}

// Ejecutamos la carga cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    cargarComponente('header-main', '/componentes/header.html');
    cargarComponente('footer-main', '/componentes/footer.html');
});

// Lógica de Filtrado de Productos
document.addEventListener('input', (e) => {
    if (e.target.id === 'buscador') {
        const busqueda = e.target.value.toLowerCase();
        const productos = document.querySelectorAll('article[data-categoria]');
        
        productos.forEach(prod => {
            const nombre = prod.querySelector('h3').textContent.toLowerCase();
            // Si el nombre incluye lo que buscamos, lo mostramos, si no, lo ocultamos con una clase de Tailwind
            if (nombre.includes(busqueda)) {
                prod.classList.remove('hidden');
                prod.classList.add('block');
            } else {
                prod.classList.remove('block');
                prod.classList.add('hidden');
            }
        });
    }
});

// Lógica de los Botones de Filtro
document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-categoria');
        const productos = document.querySelectorAll('article[data-categoria]');

        productos.forEach(prod => {
            if (cat === 'todos' || prod.getAttribute('data-categoria') === cat) {
                prod.classList.remove('hidden');
                prod.classList.add('block');
            } else {
                prod.classList.remove('block');
                prod.classList.add('hidden');
            }
        });

        // Feedback visual: cambiar estilo del botón activo
        document.querySelectorAll('.filtro-btn').forEach(b => {
            b.classList.remove('bg-farwind-blue', 'text-white');
            b.classList.add('bg-gray-100', 'text-gray-600');
        });
        btn.classList.add('bg-farwind-blue', 'text-white');
    });
});

// --- Lógica del Modal de Productos ---
const modal = document.getElementById('modal-producto');
const overlay = document.getElementById('modal-overlay');
const closeBtn = document.getElementById('close-modal');

// Elementos internos del modal para rellenar
const mTitle = document.getElementById('modal-title');
const mDesc = document.getElementById('modal-desc');
const mPrice = document.getElementById('modal-price');
const mImg = document.getElementById('modal-img');

// Función para abrir el modal
document.addEventListener('click', (e) => {
    const card = e.target.closest('.producto-card');
    
    if (card) {
        // Extraemos la info de los atributos data
        mTitle.textContent = card.dataset.nombre;
        mDesc.textContent = card.dataset.desc;
        mPrice.textContent = card.dataset.precio;
        mImg.src = card.dataset.img;

        // Mostramos el modal
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); // Evita scroll de fondo
    }
});

// Función para cerrar
const cerrarModal = () => {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
};

if(closeBtn) closeBtn.onclick = cerrarModal;
if(overlay) overlay.onclick = cerrarModal;

// Cerrar con la tecla ESC
window.onkeydown = (e) => {
    if (e.key === "Escape") cerrarModal();
};

async function renderizarProductos(categoriaFiltro) {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return; // Solo ejecuta si estamos en una página de productos

    try {
        const response = await fetch('http://localhost/farwind-api/get_productos.php');
        const productos = await response.json();

        // Limpiamos el contenedor por si acaso
        contenedor.innerHTML = '';

        // Filtramos solo los productos de la categoría de esta página
        const productosFiltrados = productos.filter(p => p.categoria === categoriaFiltro);

        productosFiltrados.forEach(prod => {
            // Lógica de Rareza: Definimos el color según el campo de la DB
            let colorRareza = 'bg-gray-400'; // Común por defecto
            if (prod.rareza === 'raro') colorRareza = 'bg-blue-500';
            if (prod.rareza === 'epico') colorRareza = 'bg-purple-600';
            if (prod.rareza === 'legendario') colorRareza = 'bg-orange-500';

            // Creamos la estructura de la tarjeta (Template String)
            const card = `
                <div class="producto-card cursor-pointer group bg-white p-4 rounded-2xl shadow-md border border-gray-100 hover:border-farwind-gold transition-all relative"
                     data-nombre="${prod.nombre}" 
                     data-precio="${prod.precio}"
                     data-desc="${prod.descripcion}"
                     data-img="${prod.imagen_url}">
                    
                    <span class="absolute top-4 right-4 ${colorRareza} text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase z-10">
                        ${prod.rareza}
                    </span>

                    <div class="overflow-hidden rounded-xl mb-4 bg-gray-50 aspect-square flex items-center justify-center">
                        <img src="${prod.imagen_url}" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <h3 class="text-xl font-bold text-farwind-blue">${prod.nombre}</h3>
                    <p class="text-farwind-gold font-bold">${prod.precio}</p>
                </div>
            `;
            contenedor.innerHTML += card;
        });

    } catch (error) {
        console.error("Error al cargar productos:", error);
        contenedor.innerHTML = '<p class="text-red-500">Error al conectar con el inventario del gremio.</p>';
    }
}

// Para que funcione, detectamos en qué página estamos
// --- Lógica de arranque según la página ---
const seccionProductos = document.getElementById('pagina-categoria');
if (seccionProductos) {
    const cat = seccionProductos.dataset.categoriaActual;
    renderizarProductos(cat);
}

// --- Lógica de arranque inteligente ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargamos Header y Footer (esto ya lo tienes)
    cargarComponente('header-main', '/componentes/header.html');
    cargarComponente('footer-main', '/componentes/footer.html');

    // 2. Detectamos si estamos en una página de categoría y cargamos sus productos
    const seccionCat = document.getElementById('pagina-categoria');
    if (seccionCat) {
        const categoriaParaCargar = seccionCat.dataset.categoriaActual;
        renderizarProductos(categoriaParaCargar);
    }
});