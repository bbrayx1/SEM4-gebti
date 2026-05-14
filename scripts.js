/* =========================================
   1. LÓGICA DEL CARRITO DE COMPRAS
========================================= */
const botonesAgregar = document.querySelectorAll('.btn-add-cart');
const contadorCarrito = document.querySelector('.cart-count');
let cantidadCarrito = parseInt(contadorCarrito.textContent) || 0;

botonesAgregar.forEach(boton => {
    boton.addEventListener('click', function() {
        cantidadCarrito++;
        contadorCarrito.textContent = cantidadCarrito;

        // Efecto visual de confirmación en el botón
        const textoOriginal = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> ¡Agregado!';
        this.style.backgroundColor = 'var(--success-color)'; 
        this.style.color = '#fff';
        this.style.borderColor = 'var(--success-color)';

        setTimeout(() => {
            this.innerHTML = textoOriginal;
            this.style.backgroundColor = '';
            this.style.color = '';
            this.style.borderColor = '';
        }, 2000);
    });
});

/* =========================================
   2. CUENTA REGRESIVA PARA LA OFERTA
========================================= */
let tiempoRestante = (2 * 24 * 60 * 60) + (14 * 60 * 60) + (45 * 60); 

function actualizarContador() {
    const dias = Math.floor(tiempoRestante / (24 * 60 * 60));
    const horas = Math.floor((tiempoRestante % (24 * 60 * 60)) / (60 * 60));
    const minutos = Math.floor((tiempoRestante % (60 * 60)) / 60);
    const segundos = Math.floor(tiempoRestante % 60); // Añadidos segundos

    document.getElementById('days').textContent = dias.toString().padStart(2, '0');
    document.getElementById('hours').textContent = horas.toString().padStart(2, '0');
    document.getElementById('mins').textContent = minutos.toString().padStart(2, '0');
    
    const secElement = document.getElementById('secs');
    if(secElement) secElement.textContent = segundos.toString().padStart(2, '0');

    if (tiempoRestante > 0) {
        tiempoRestante--;
    }
}
setInterval(actualizarContador, 1000);

/* =========================================
   3. FORMULARIO DE SUSCRIPCIÓN (NEWSLETTER)
========================================= */
const formNewsletter = document.querySelector('.newsletter-form');
if (formNewsletter) {
    formNewsletter.addEventListener('submit', function(evento) {
        evento.preventDefault(); 
        const emailInput = this.querySelector('input[type="email"]');
        alert(`¡Excelente! Hemos enviado tu cupón de S/ 20.00 al correo:\n${emailInput.value}`);
        emailInput.value = ''; 
    });
}

/* =========================================
   4. MENÚ MÓVIL (HAMBURGUESA)
========================================= */
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Cambiar el ícono de hamburguesa a una "X" (opcional)
        const icon = mobileMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
}

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});

/* =========================================
   5. EFECTO SCROLL EN HEADER
========================================= */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* =========================================
   6. PESTAÑAS DE PRODUCTOS (FILTRADO)
========================================= */
const tabBtns = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Quitar la clase active de todos los botones
        tabBtns.forEach(b => b.classList.remove('active'));
        // Agregar la clase active al botón clickeado
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            // Lógica para mostrar/ocultar
            if (filterValue === 'all' || filterValue === category) {
                card.style.display = 'flex'; // Usamos flex porque tu CSS base usa display:flex direction:column
            } else {
                card.style.display = 'none';
            }
        });
    });
});