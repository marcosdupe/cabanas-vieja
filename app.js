/* -------------------------------------------------------------
   CABAÑAS ONLY BIKERS - JAVASCRIPT LOGIC
   Features: Mobile Nav, Price Calculator, WhatsApp Redirect,
             Local Storage DB, Hidden Admin Dashboard, Lightbox
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // Default Tariff Configuration
    const TARIFF_PER_CABIN_PER_NIGHT = 45000; // in ARS

    // 1. DOM Elements
    const mainHeader = document.getElementById('mainHeader');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Form & Estimator Elements
    const reservationForm = document.getElementById('reservationForm');
    const cabinSelect = document.getElementById('cabinSelect');
    const checkinInput = document.getElementById('checkinDate');
    const checkoutInput = document.getElementById('checkoutDate');
    const guestsSelect = document.getElementById('guestsNumber');
    const summaryNights = document.getElementById('summaryNights');
    const summaryBasePrice = document.getElementById('summaryBasePrice');
    const summaryTotal = document.getElementById('summaryTotal');
    const priceSummaryBox = document.getElementById('priceSummary');
    
    const btnSubmitWhatsApp = document.getElementById('btnSubmitWhatsApp');
    const btnSubmitWeb = document.getElementById('btnSubmitWeb');
    
    // Lightbox Elements
    const imageLightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxFileName = document.getElementById('lightboxFileName');
    const lightboxNotice = document.getElementById('lightboxNotice');
    
    // Admin Panel Elements
    const adminPanel = document.getElementById('adminPanel');
    const btnAdminAccess = document.getElementById('btnAdminAccess');
    const adminClose = document.getElementById('adminClose');
    const adminOverlay = document.getElementById('adminOverlay');
    const queriesTableBody = document.getElementById('queriesTableBody');
    const statTotalQueries = document.getElementById('statTotalQueries');
    const statNewQueries = document.getElementById('statNewQueries');


    // 2. Mobile Menu & Navigation Interaction
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Set active class
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Scrolled Header Style
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });


    // 3. Dynamic Date Picker & Price Estimator
    
    // Set minimum dates (today for checkin, tomorrow for checkout)
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    checkinInput.min = todayFormatted;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
    checkoutInput.min = tomorrowFormatted;

    // Set default checkin (today) and checkout (tomorrow)
    checkinInput.value = todayFormatted;
    checkoutInput.value = tomorrowFormatted;

    // Listeners for calculator
    checkinInput.addEventListener('change', () => {
        // Checkout must be at least checkin + 1 day
        const checkinVal = new Date(checkinInput.value);
        const minCheckoutDate = new Date(checkinVal);
        minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
        
        const minCheckoutFormatted = minCheckoutDate.toISOString().split('T')[0];
        checkoutInput.min = minCheckoutFormatted;
        
        if (new Date(checkoutInput.value) <= checkinVal) {
            checkoutInput.value = minCheckoutFormatted;
        }
        calculatePrice();
    });

    checkoutInput.addEventListener('change', calculatePrice);
    cabinSelect.addEventListener('change', calculatePrice);
    guestsSelect.addEventListener('change', () => {
        // Business logic: if guests > 3, force both cabins
        const guests = parseInt(guestsSelect.value);
        if (guests > 3) {
            cabinSelect.value = "Completo (Ambas)";
        } else {
            // If they had "both" selected but choose <= 3 guests, keep choice or leave it
        }
        calculatePrice();
    });

    function calculatePrice() {
        const checkin = new Date(checkinInput.value);
        const checkout = new Date(checkoutInput.value);
        const cabin = cabinSelect.value;
        const guests = parseInt(guestsSelect.value);
        
        // Auto-correct cabin selection based on guests
        if (guests > 3 && cabin !== "Completo (Ambas)") {
            cabinSelect.value = "Completo (Ambas)";
        }

        if (isNaN(checkin.getTime()) || isNaN(checkout.getTime()) || checkout <= checkin) {
            summaryNights.textContent = "0 noches";
            summaryBasePrice.textContent = "$0 ARS";
            summaryTotal.textContent = "$0 ARS";
            return 0;
        }

        // Calculate nights
        const differenceInTime = checkout.getTime() - checkin.getTime();
        const nights = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        
        // Calculate cabin multiplier
        let cabinCount = 1;
        if (cabin === "Completo (Ambas)") {
            cabinCount = 2;
        }

        const baseRate = TARIFF_PER_CABIN_PER_NIGHT * cabinCount;
        const total = baseRate * nights;

        // Update UI
        summaryNights.textContent = `${nights} ${nights === 1 ? 'noche' : 'noches'}`;
        summaryBasePrice.textContent = `$${baseRate.toLocaleString('es-AR')} ARS / noche`;
        summaryTotal.textContent = `$${total.toLocaleString('es-AR')} ARS`;

        return {
            nights,
            baseRate,
            total,
            cabin,
            guests,
            checkin: checkinInput.value,
            checkout: checkoutInput.value
        };
    }

    // Run initial calculation
    calculatePrice();


    // 4. Inquiries Local Storage DB & WhatsApp Builder
    
    // Initialize mock database if empty
    if (!localStorage.getItem('only_bikers_queries')) {
        const mockQueries = [
            {
                id: 'q_' + Math.random().toString(36).substr(2, 9),
                date: new Date(Date.now() - 3600000 * 12).toLocaleString('es-AR'), // 12 hours ago
                name: 'Facundo Roncagliolo',
                phone: '11 5493 8472',
                email: 'facundo.r@gravelargentina.com',
                cabin: 'Completo (Ambas)',
                checkin: '2026-10-12',
                checkout: '2026-10-15',
                guests: '4',
                nights: 3,
                message: 'Hola, somos un grupo de 4 ciclistas entrenando para el campeonato de Gravel. Vamos con bicicletas de alta gama, queremos saber si el fogón tiene asador criollo.',
                status: 'new'
            },
            {
                id: 'q_' + Math.random().toString(36).substr(2, 9),
                date: new Date(Date.now() - 3600000 * 48).toLocaleString('es-AR'), // 2 days ago
                name: 'Sofia Anchorena',
                phone: '11 6573 2291',
                email: 'sofia.an@gmail.com',
                cabin: 'Cabaña Aromo',
                checkin: '2026-11-01',
                checkout: '2026-11-03',
                guests: '2',
                nights: 2,
                message: 'Hola! Buscamos desconexión total el fin de semana. Vi que no hay wifi y es perfecto para nosotros. ¿El desayuno incluye opciones sin TACC?',
                status: 'read'
            }
        ];
        localStorage.setItem('only_bikers_queries', JSON.stringify(mockQueries));
    }

    // Save inquiry helper
    function saveInquiry(data) {
        const queries = JSON.parse(localStorage.getItem('only_bikers_queries')) || [];
        queries.unshift(data); // Add to the top
        localStorage.setItem('only_bikers_queries', JSON.stringify(queries));
        updateAdminStats();
    }

    // Capture form values
    function getFormData() {
        const calcData = calculatePrice();
        if (!calcData) return null;

        const name = document.getElementById('contactName').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !phone) {
            alert('Por favor, completa Nombre y Teléfono.');
            return null;
        }

        return {
            id: 'q_' + Math.random().toString(36).substr(2, 9),
            date: new Date().toLocaleString('es-AR'),
            name,
            phone,
            email,
            cabin: calcData.cabin,
            checkin: calcData.checkin,
            checkout: calcData.checkout,
            guests: calcData.guests.toString(),
            nights: calcData.nights,
            message: message || '(Sin mensaje adicional)',
            status: 'new'
        };
    }

    // Action A: Send via WhatsApp (direct booking tool)
    btnSubmitWhatsApp.addEventListener('click', (e) => {
        const inquiry = getFormData();
        if (!inquiry) return;

        // Save locally first
        saveInquiry(inquiry);

        // Build WhatsApp prefilled message
        const waPhone = '5491131963906';
        const formattedTotal = (TARIFF_PER_CABIN_PER_NIGHT * (inquiry.cabin === 'Completo (Ambas)' ? 2 : 1) * inquiry.nights).toLocaleString('es-AR');
        
        const text = `*Consulta de Reserva - Cabañas Only Bikers*%0A%0A` +
                     `🚲 *Cliente:* ${inquiry.name}%0A` +
                     `📞 *Teléfono:* ${inquiry.phone}%0A` +
                     `🏠 *Cabaña:* ${inquiry.cabin}%0A` +
                     `📅 *Entrada:* ${inquiry.checkin}%0A` +
                     `📅 *Salida:* ${inquiry.checkout}%0A` +
                     `👥 *Huéspedes:* ${inquiry.guests}%0A` +
                     `🌙 *Noches:* ${inquiry.nights}%0A` +
                     `💰 *Costo Est.:* $${formattedTotal} ARS%0A%0A` +
                     `💬 *Mensaje:* ${inquiry.message}`;

        const waUrl = `https://wa.me/${waPhone}?text=${text}`;
        
        // Success notice and redirect
        alert('¡Consulta generada! Ahora te redirigiremos a WhatsApp para enviar el mensaje directamente a Cabañas Only Bikers.');
        window.open(waUrl, '_blank');
        
        // Reset form
        reservationForm.reset();
        calculatePrice();
    });

    // Action B: Traditional Web Submit (saved in local db only)
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inquiry = getFormData();
        if (!inquiry) return;

        saveInquiry(inquiry);

        alert(`¡Consulta guardada con éxito!\n\nGracias ${inquiry.name}. Cabañas Only Bikers se pondrá en contacto al teléfono ${inquiry.phone} a la brevedad.`);
        
        // Reset form
        reservationForm.reset();
        calculatePrice();
    });


    // 5. Image Lightbox Reference Helper
    // For placing real pictures from Google Maps
    const placeholders = document.querySelectorAll('.image-placeholder');
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            const targetImageName = placeholder.getAttribute('data-image');
            const basename = targetImageName.split('/').pop();
            
            // Setup content in lightbox
            lightboxTitle.textContent = placeholder.querySelector('.placeholder-text').textContent;
            lightboxFileName.textContent = basename;
            
            // Set image preview if user wants to see it
            lightboxImg.src = targetImageName;
            lightboxImg.onerror = () => {
                // If the real image does not exist yet (error triggers), show notice
                lightboxImg.style.display = 'none';
                lightboxNotice.style.display = 'block';
            };
            lightboxImg.onload = () => {
                // If the user already uploaded the real image, display it in full preview!
                lightboxImg.style.display = 'block';
                lightboxNotice.style.display = 'none';
            };

            // Open Lightbox
            imageLightbox.classList.add('active');
        });
    });

    // Close lightbox
    function closeImgLightbox() {
        imageLightbox.classList.remove('active');
    }
    lightboxClose.addEventListener('click', closeImgLightbox);
    lightboxOverlay.addEventListener('click', closeImgLightbox);


    // 6. Hidden Admin Panel / Query Manager Dashboard
    
    // Open admin view on button click
    btnAdminAccess.addEventListener('click', (e) => {
        e.preventDefault();
        openAdminDashboard();
    });

    // Close admin view
    function closeAdminDashboard() {
        adminPanel.classList.remove('active');
    }
    adminClose.addEventListener('click', closeAdminDashboard);
    adminOverlay.addEventListener('click', closeAdminDashboard);

    // Keyboard shortcut: Ctrl + Shift + A to open Admin Panel
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'A') {
            e.preventDefault();
            openAdminDashboard();
        }
    });

    function openAdminDashboard() {
        renderQueries();
        adminPanel.classList.add('active');
    }

    function renderQueries() {
        const queries = JSON.parse(localStorage.getItem('only_bikers_queries')) || [];
        queriesTableBody.innerHTML = '';

        if (queries.length === 0) {
            queriesTableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center" style="padding:40px; color:#888;">
                        🚲 No hay consultas recibidas aún.
                    </td>
                </tr>
            `;
            updateAdminStats();
            return;
        }

        queries.forEach((q) => {
            const tr = document.createElement('tr');
            if (q.status === 'new') {
                tr.classList.add('new-query');
            }

            const checkinDateStr = new Date(q.checkin + 'T12:00:00').toLocaleDateString('es-AR');
            const checkoutDateStr = new Date(q.checkout + 'T12:00:00').toLocaleDateString('es-AR');

            tr.innerHTML = `
                <td>${q.date}</td>
                <td><strong>${q.name}</strong></td>
                <td>
                    <div style="display:flex; flex-direction:column; gap:4px;">
                        <span>📞 ${q.phone}</span>
                        ${q.email ? `<span style="font-size:0.75rem; color:#666;">✉️ ${q.email}</span>` : ''}
                    </div>
                </td>
                <td>${q.cabin}</td>
                <td>
                    <div style="font-size:0.8rem;">
                        <span>Entrada: ${checkinDateStr}</span><br>
                        <span>Salida: ${checkoutDateStr}</span>
                    </div>
                </td>
                <td class="text-center">${q.nights}</td>
                <td style="max-width: 250px; font-size: 0.8rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${q.message}">
                    ${q.message}
                </td>
                <td>
                    <div class="action-btns">
                        ${q.status === 'new' ? 
                            `<button class="btn-table btn-table-read" onclick="markAsRead('${q.id}')">Leído</button>` : 
                            `<span class="badge badge-read">Leído</span>`
                        }
                        <button class="btn-table btn-table-del" onclick="deleteQuery('${q.id}')">Borrar</button>
                    </div>
                </td>
            `;
            queriesTableBody.appendChild(tr);
        });

        updateAdminStats();
    }

    function updateAdminStats() {
        const queries = JSON.parse(localStorage.getItem('only_bikers_queries')) || [];
        const total = queries.length;
        const newCount = queries.filter(q => q.status === 'new').length;

        statTotalQueries.textContent = total;
        statNewQueries.textContent = newCount;
    }

    // Exposed functions to global window scope for click handling inside HTML string templates
    window.markAsRead = function(id) {
        const queries = JSON.parse(localStorage.getItem('only_bikers_queries')) || [];
        const updated = queries.map(q => {
            if (q.id === id) {
                return { ...q, status: 'read' };
            }
            return q;
        });
        localStorage.setItem('only_bikers_queries', JSON.stringify(updated));
        renderQueries();
    };

    window.deleteQuery = function(id) {
        if (!confirm('¿Estás seguro de que quieres eliminar esta consulta?')) return;
        const queries = JSON.parse(localStorage.getItem('only_bikers_queries')) || [];
        const filtered = queries.filter(q => q.id !== id);
        localStorage.setItem('only_bikers_queries', JSON.stringify(filtered));
        renderQueries();
    };
});
