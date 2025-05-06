// Script per la pagina contatti

document.addEventListener('DOMContentLoaded', function() {
    // Gestione del form di contatto
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validazione base del form
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const oggetto = document.getElementById('oggetto').value;
            const messaggio = document.getElementById('messaggio').value;
            const privacy = document.getElementById('privacy').checked;
            
            if (!nome || !email || !oggetto || !messaggio || !privacy) {
                alert('Per favore, compila tutti i campi obbligatori.');
                return;
            }
            
            // Simulazione invio form
            alert('Grazie per averci contattato! Ti risponderemo al più presto.');
            contactForm.reset();
        });
    }
    
    // Animazione per le icone delle certificazioni
    const certificazioni = document.querySelectorAll('.certificazione');
    
    if (certificazioni.length > 0) {
        certificazioni.forEach(cert => {
            cert.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            cert.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
});