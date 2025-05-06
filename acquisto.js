document.addEventListener('DOMContentLoaded', function() {
    // Genera un numero di riferimento per l'ordine
    const orderReference = 'ORD-' + Date.now().toString().slice(-6);
    const orderReferenceElement = document.getElementById('order-reference');
    if (orderReferenceElement) {
        orderReferenceElement.textContent = orderReference;
    }
    
    // Gestione dei metodi di pagamento
    const cartaRadio = document.getElementById('carta');
    const bonificoRadio = document.getElementById('bonifico');
    const cartaDetails = document.getElementById('carta-details');
    const bonificoDetails = document.getElementById('bonifico-details');
    
    if (cartaRadio && bonificoRadio && cartaDetails && bonificoDetails) {
        cartaRadio.addEventListener('change', function() {
            cartaDetails.style.display = 'block';
            bonificoDetails.style.display = 'none';
        });
        
        bonificoRadio.addEventListener('change', function() {
            cartaDetails.style.display = 'none';
            bonificoDetails.style.display = 'block';
        });
    }
    
    // Carica gli elementi dal carrello
    loadCheckoutItems();
    
    // Gestione del form di acquisto
    const purchaseForm = document.getElementById('purchase-form');
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validazione del form
            if (validateForm()) {
                // Simulazione di invio dell'ordine
                showOrderConfirmation();
            }
        });
    }
    
    // Gestione dei metodi di pagamento
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const creditCardFields = document.getElementById('credit-card-fields');
    
    if (paymentMethods && creditCardFields) {
        paymentMethods.forEach(method => {
            method.addEventListener('change', function() {
                if (this.id === 'carta') {
                    creditCardFields.style.display = 'block';
                } else {
                    creditCardFields.style.display = 'none';
                }
            });
        });
    }
});

// Funzione per caricare gli elementi dal carrello
function loadCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    if (!checkoutItemsContainer) return;
    
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    if (cartItems.length === 0) {
        // Reindirizza alla home se il carrello è vuoto
        window.location.href = 'index.html';
        return;
    }
    
    let subtotal = 0;
    
    // Svuota il contenitore
    checkoutItemsContainer.innerHTML = '';
    
    // Aggiungi ogni elemento del carrello
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        // Stampa il nome dell'articolo per debug
        console.log("Nome articolo nel carrello:", item.name);
        
        // Usa un approccio diverso per le immagini
        let imagePath = 'default.jpg'; // Immagine predefinita
        
        // Determina l'immagine in base a parole chiave nel nome
        const normalizedName = item.name.toLowerCase().trim();
        
        if (normalizedName.includes('munizioni 9mm') || normalizedName.includes('9x19mm')) {
            imagePath = '9mm.jpg';
        } else if (normalizedName.includes('munizioni 5.56') || normalizedName.includes('5.56x45mm')) {
            imagePath = '5.56mm.jpeg';
        } else if (normalizedName.includes('munizioni 50bmg') || normalizedName.includes('.50 bmg')) {
            imagePath = '50BMG.jpeg';
        } else if (normalizedName.includes('munizioni 45acp') || normalizedName.includes('.45 acp')) {
            imagePath = '45 ACP.jpeg';
        } else if (normalizedName.includes('calibro 12')) {
            imagePath = 'calibro 12.jpg';
        } else if (normalizedName.includes('giubbotto')) {
            imagePath = 'Giubbotto Antiproiettile Livello IV.jpeg';
        } else if (normalizedName.includes('elmetto')) {
            imagePath = 'elmetto.jpg';
        } else if (normalizedName.includes('uniforme')) {
            imagePath = 'uniforme.png';
        } else if (normalizedName.includes('stivali')) {
            imagePath = 'stivali.jpg';
        } else if (normalizedName.includes('guanti')) {
            imagePath = 'guanti.jpg';
        } else if (normalizedName.includes('fondina')) {
            imagePath = 'fondina.jpg';
        } else if (normalizedName.includes('laugo') || normalizedName.includes('alien')) {
            imagePath = 'pistola.jpeg';
        } else if (normalizedName.includes('m4 carabine')) {
            imagePath = 'm4 carabine.jpeg';
        } else if (normalizedName.includes('benelli')) {
            imagePath = 'Benelli M4.webp';
        } else if (normalizedName.includes('beretta') || normalizedName.includes('arx160')) {
            imagePath = 'Beretta ARX160.jpg';
        } else if (normalizedName.includes('glock')) {
            imagePath = 'Glock 17.jpg';
        } else if (normalizedName.includes('barrett') || normalizedName.includes('m82')) {
            imagePath = 'Barrett M82A1.jpg';
        } else {
            // Fallback alla funzione originale
            imagePath = getItemImage(normalizedName);
        }
        
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        itemElement.innerHTML = `
            <img src="./${imagePath}" alt="${item.name}" class="checkout-item-image" onerror="this.src='default.jpg'">
            <div class="checkout-item-details">
                <div class="checkout-item-name">${item.name}</div>
                <div class="checkout-item-price">€ ${item.price.toFixed(2)}</div>
                <div class="checkout-item-quantity">Quantità: ${item.quantity}</div>
            </div>
        `;
        
        checkoutItemsContainer.appendChild(itemElement);
    });
    
    // Calcola e aggiorna i totali
    const shipping = 15.00;
    const tax = subtotal * 0.22;
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal-amount').textContent = `€ ${subtotal.toFixed(2)}`;
    document.getElementById('shipping-amount').textContent = `€ ${shipping.toFixed(2)}`;
    document.getElementById('tax-amount').textContent = `€ ${tax.toFixed(2)}`;
    document.getElementById('total-amount').textContent = `€ ${total.toFixed(2)}`;
}

// Funzione per ottenere l'immagine dell'elemento
function getItemImage(itemName) {
    // Mappa dei nomi dei prodotti alle loro immagini
    const imageMap = {
        'laugo arms alien': 'pistola.jpeg',
        'm4 carabine': 'm4 carabine.jpeg',
        'benelli m4': 'Benelli M4.webp',
        'beretta arx160': 'Beretta ARX160.jpg',
        'glock 17': 'Glock 17.jpg',
        'barrett m82': 'Barrett M82A1.jpg',
        'munizioni 9x19mm parabellum': '9mm.jpg',
        'munizioni 9mm': '9mm.jpg',
        'munizioni 5.56x45mm nato': '5.56mm.jpeg',
        'munizioni 5.56': '5.56mm.jpeg',
        'munizioni calibro 12': 'calibro 12.jpg',
        'munizioni .50 bmg': '50BMG.jpeg',
        'munizioni 50bmg': '50BMG.jpeg',
        'munizioni .45 acp': '45 ACP.jpeg',
        'munizioni 45acp': '45 ACP.jpeg',
        'giubbotto antiproiettile livello iv': 'Giubbotto Antiproiettile Livello IV.jpeg',
        'giubbotto antiproiettile': 'Giubbotto Antiproiettile Livello IV.jpeg',
        'elmetto balistico tattico': 'elmetto.jpg',
        'elmetto balistico': 'elmetto.jpg',
        'uniforme tattica completa': 'uniforme.png',
        'uniforme tattica': 'uniforme.png',
        'stivali tattici professionali': 'stivali.jpg',
        'stivali tattici': 'stivali.jpg',
        'guanti tattici': 'guanti.jpg',
        'fondina tattica': 'fondina.jpg'
    };
    
    return imageMap[itemName] || 'default.jpg';
}

// Funzione per validare il form
function validateForm() {
    // Implementazione semplice di validazione
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value) {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '#ccc';
        }
    });
    
    // Validazione specifica per carta di credito se selezionata
    const cartaRadio = document.getElementById('carta');
    if (cartaRadio && cartaRadio.checked) {
        const cardNumber = document.getElementById('card-number');
        const expiry = document.getElementById('expiry');
        const cvv = document.getElementById('cvv');
        
        if (cardNumber && expiry && cvv) {
            if (!cardNumber.value || !expiry.value || !cvv.value) {
                if (!cardNumber.value) cardNumber.style.borderColor = 'red';
                if (!expiry.value) expiry.style.borderColor = 'red';
                if (!cvv.value) cvv.style.borderColor = 'red';
                isValid = false;
            }
        }
    }
    
    return isValid;
}

// Funzione per mostrare la conferma dell'ordine
function showOrderConfirmation() {
    // Simulazione di invio dell'ordine
    
    // Salva i dati del form (in un'applicazione reale, questi verrebbero inviati al server)
    const formElement = document.getElementById('purchase-form');
    if (!formElement) return;
    
    const formData = new FormData(formElement);
    
    // Svuota il carrello
    localStorage.removeItem('cartItems');
    
    // Ottieni il numero di riferimento dell'ordine
    const orderRefElement = document.getElementById('order-reference');
    const orderRef = orderRefElement ? orderRefElement.textContent : 'ORD-UNKNOWN';
    
    // Reindirizza alla pagina di ringraziamento
    window.location.href = `grazie.html?ref=${orderRef}`;
}