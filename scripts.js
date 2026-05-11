/* =========================================
   1. LÓGICA DEL CARRITO DE COMPRAS
========================================= */
// Seleccionamos todos los botones de "Agregar al carrito" y el contador de arriba
const botonesAgregar = document.querySelectorAll('.btn-add-cart');
const contadorCarrito = document.querySelector('.cart-count');

// Rescatamos el valor actual que pusimos en el HTML (3)
let cantidadCarrito = parseInt(contadorCarrito.textContent);

botonesAgregar.forEach(boton => {
    boton.addEventListener('click', function() {
        // Aumentar el contador
        cantidadCarrito++;
        contadorCarrito.textContent = cantidadCarrito;

        // Efecto visual de confirmación en el botón
        const textoOriginal = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> ¡Agregado!';
        this.style.backgroundColor = '#27ae60'; // Color verde de éxito
        this.style.color = '#fff';
        this.style.borderColor = '#27ae60';

        // Volver al diseño original después de 2 segundos
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
// Seleccionamos las cajas donde están los números (Días, Horas, Minutos)
const timeBoxes = document.querySelectorAll('.time-box span');

// Configuramos el tiempo inicial (2 días, 14 horas, 45 min en segundos)
let tiempoRestante = (2 * 24 * 60 * 60) + (14 * 60 * 60) + (45 * 60); 

function actualizarContador() {
    // Calculamos días, horas y minutos restantes
    const dias = Math.floor(tiempoRestante / (24 * 60 * 60));
    const horas = Math.floor((tiempoRestante % (24 * 60 * 60)) / (60 * 60));
    const minutos = Math.floor((tiempoRestante % (60 * 60)) / 60);

    // Los mostramos en el HTML (padStart asegura que siempre tengan 2 dígitos, ej: "02")
    if (timeBoxes.length === 3) {
        timeBoxes[0].textContent = dias.toString().padStart(2, '0');
        timeBoxes[1].textContent = horas.toString().padStart(2, '0');
        timeBoxes[2].textContent = minutos.toString().padStart(2, '0');
    }

    // Restamos un segundo
    if (tiempoRestante > 0) {
        tiempoRestante--;
    }
}

// Ejecutamos la función cada 1000 milisegundos (1 segundo)
setInterval(actualizarContador, 1000);


/* =========================================
   3. FORMULARIO DE SUSCRIPCIÓN (NEWSLETTER)
========================================= */
const formNewsletter = document.querySelector('.newsletter-form');

if (formNewsletter) {
    formNewsletter.addEventListener('submit', function(evento) {
        // Evita que la página se recargue bruscamente al enviar el formulario
        evento.preventDefault(); 
        
        // Obtenemos el correo escrito
        const emailInput = this.querySelector('input[type="email"]');
        
        // Mostramos un mensaje amigable
        alert(`¡Excelente! Hemos enviado tu cupón de S/ 20.00 al correo:\n${emailInput.value}`);
        
        // Limpiamos la cajita para que quede vacía de nuevo
        emailInput.value = ''; 
    });
}