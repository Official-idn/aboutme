/* ==========================================================================
   TABLE OF CONTENTS
   ==========================================================================
    1.  Event Listener: DOMContentLoaded
    2.  Function: Inisialisasi Navbar Mobile (initMobileNavbar)
    3.  Function: Inisialisasi Efek Scroll Header (initHeaderScrollEffect)
    4.  Function: Inisialisasi Animasi Saat Scroll (initScrollAnimations)
    5.  Function: Penanganan Pengiriman Formulir Kontak (handleContactForm)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initMobileNavbar();
    initHeaderScrollEffect();
    initScrollAnimations();
    handleContactForm();
});

function initMobileNavbar() {
    const navbarToggler = document.querySelector('.navbar__toggler');
    const navbarNav = document.querySelector('.navbar__nav');

    if (navbarToggler && navbarNav) {
        navbarToggler.addEventListener('click', () => {
            navbarNav.classList.toggle('active');
        });
    }
}

function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        });
    }
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section, .timeline__item, .feature-card, .project-card, .highlight-box, .framework-item, .insight-item');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    } else {
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }
}

function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            const formStatus = document.getElementById('formStatus');
            const originalButtonText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Mengirim...';
            formStatus.textContent = '';
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            console.log("Data Formulir yang akan dikirim:", data);

            setTimeout(() => {
                const isSuccess = true;
                if (isSuccess) {
                    formStatus.textContent = 'Pesan Anda telah berhasil terkirim. Terima kasih!';
                    formStatus.style.color = '#28a745';
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'Terjadi kesalahan. Silakan coba lagi nanti.';
                    formStatus.style.color = '#dc3545';
                }
                submitBtn.disabled = false;
                submitBtn.textContent = originalButtonText;
            }, 2000);
        });
    }
}