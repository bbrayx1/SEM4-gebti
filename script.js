document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. LÓGICA DEL CARRITO DE COMPRAS
    ========================================= */
    const botonesAgregar = document.querySelectorAll('.btn-add-cart');
    const contadorCarrito = document.querySelector('.cart-count');
    let cantidadCarrito = parseInt(contadorCarrito?.textContent) || 0;

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function() {
            cantidadCarrito++;
            if(contadorCarrito) contadorCarrito.textContent = cantidadCarrito;

            const textoOriginal = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> ¡Agregado!';
            this.style.backgroundColor = 'var(--success-color, #27ae60)'; 
            this.style.color = '#fff';
            this.style.borderColor = 'var(--success-color, #27ae60)';

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
    // 2 días, 14 horas, 45 minutos en segundos
    let tiempoRestante = (2 * 24 * 60 * 60) + (14 * 60 * 60) + (45 * 60); 

    function actualizarContador() {
        if (tiempoRestante <= 0) return; 

        const dias = Math.floor(tiempoRestante / (24 * 60 * 60));
        const horas = Math.floor((tiempoRestante % (24 * 60 * 60)) / (60 * 60));
        const minutos = Math.floor((tiempoRestante % (60 * 60)) / 60);
        const segundos = Math.floor(tiempoRestante % 60);

        const elDays = document.getElementById('days');
        const elHours = document.getElementById('hours');
        const elMins = document.getElementById('mins');
        const elSecs = document.getElementById('secs');

        if(elDays) elDays.textContent = dias.toString().padStart(2, '0');
        if(elHours) elHours.textContent = horas.toString().padStart(2, '0');
        if(elMins) elMins.textContent = minutos.toString().padStart(2, '0');
        if(elSecs) elSecs.textContent = segundos.toString().padStart(2, '0');

        tiempoRestante--;
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

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if(icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if(icon) icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    /* =========================================
       5. EFECTO SCROLL EN HEADER
    ========================================= */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* =========================================
       6. PESTAÑAS DE PRODUCTOS (FILTRADO)
    ========================================= */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Quitar la clase 'active' de todos los botones
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // 2. Agregar la clase 'active' al botón presionado
            btn.classList.add('active');

            // 3. Obtener qué categoría queremos filtrar
            const filterValue = btn.getAttribute('data-filter');

            // 4. Recorrer todas las tarjetas para mostrarlas u ocultarlas
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex'; 
                    
                    card.style.animation = 'none';
                    card.offsetHeight; 
                    card.style.animation = null; 
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});