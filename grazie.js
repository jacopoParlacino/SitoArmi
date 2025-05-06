document.addEventListener('DOMContentLoaded', function() {
    // Recupera i parametri dall'URL
    const urlParams = new URLSearchParams(window.location.search);
    const orderRef = urlParams.get('ref');
    
    // Se c'è un riferimento nell'URL, usalo, altrimenti genera un nuovo riferimento
    if (orderRef) {
        document.getElementById('order-reference').textContent = orderRef;
    } else {
        // Genera un numero di riferimento per l'ordine se non è presente nell'URL
        const orderReference = 'ORD-' + Date.now().toString().slice(-6);
        document.getElementById('order-reference').textContent = orderReference;
    }
    
    // Imposta la data dell'ordine
    const today = new Date();
    const formattedDate = today.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    document.getElementById('order-date').textContent = formattedDate;
    
    // Svuota il carrello se non è già stato fatto
    if (localStorage.getItem('cartItems')) {
        localStorage.removeItem('cartItems');
    }
});