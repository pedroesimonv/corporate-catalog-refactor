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