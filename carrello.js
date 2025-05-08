// Funzioni per la gestione del carrello

document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
});

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartContent = document.getElementById('cart-content');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Recupera gli elementi del carrello dal localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Mostra/nascondi messaggi appropriati in base allo stato del carrello
    if (!cartItems || cartItems.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    } else {
        cartEmptyMessage.style.display = 'none';
        cartContent.style.display = 'block';
    }
    
    // Svuota il contenitore
    cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    // Aggiungi ogni elemento del carrello
    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        // Determina l'immagine in base a parole chiave nel nome
        let imagePath = getItemImage(item.name);
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-product">
                <img src="./${imagePath}" alt="${item.name}" class="cart-item-image" onerror="this.src='default.jpg'">
                <div class="cart-item-name">${item.name}</div>
            </div>
            <div class="cart-item-price">€ ${item.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="decrementQuantity(${index})">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" onchange="updateQuantity(${index}, this.value)">
                <button class="quantity-btn" onclick="incrementQuantity(${index})">+</button>
            </div>
            <div class="cart-item-total">€ ${itemTotal.toFixed(2)}</div>
            <div class="cart-item-actions">
                <button class="remove-item-btn" onclick="removeItem(${index})">✕</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    // Calcola e aggiorna i totali
    const tax = subtotal * 0.22;
    const total = subtotal + tax;
    
    document.getElementById('cart-subtotal').textContent = `€ ${subtotal.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `€ ${tax.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `€ ${total.toFixed(2)}`;
}

function getItemImage(itemName) {
    // Normalizza il nome dell'articolo
    const normalizedName = itemName.toLowerCase().trim();
    
    // Determina l'immagine in base a parole chiave nel nome
    if (normalizedName.includes('munizioni 9mm') || normalizedName.includes('9x19mm')) {
        return '9mm Parabellum FMJ.jpeg';
    } else if (normalizedName.includes('jhp')) {
        return 'Munizioni 9mm JHP.jpeg';
    } else if (normalizedName.includes('munizioni 5.56') || normalizedName.includes('5.56x45mm')) {
        if (normalizedName.includes('traccianti')) {
            return 'Munizioni 5.56mm Traccianti.jpeg';
        }
        return '5.56mm.jpeg';
    } else if (normalizedName.includes('munizioni 50bmg') || normalizedName.includes('.50 bmg')) {
        return '50BMG.jpeg';
    } else if (normalizedName.includes('munizioni 45acp') || normalizedName.includes('.45 acp')) {
        return '45 ACP.jpeg';
    } else if (normalizedName.includes('12 gauge') || normalizedName.includes('buckshot')) {
        return 'Cartucce 12 Gauge Buckshot.jpeg';
    } else if (normalizedName.includes('giubbotto')) {
        return 'Giubbotto Antiproiettile Livello IV.jpeg';
    } else if (normalizedName.includes('laugo') || normalizedName.includes('alien')) {
        return 'pistola.jpeg';
    } else if (normalizedName.includes('m4 carabine')) {
        return 'm4 carabine.jpeg';
    } else if (normalizedName.includes('benelli')) {
        return 'Benelli M4.webp';
    } else if (normalizedName.includes('beretta') || normalizedName.includes('arx160')) {
        return 'Beretta ARX160.jpg';
    } else if (normalizedName.includes('glock')) {
        return 'Glock 17.jpg';
    } else if (normalizedName.includes('barrett') || normalizedName.includes('m82')) {
        return 'Barrett M82A1.jpg';
    } else if (normalizedName.includes('accuracy') || normalizedName.includes('ax50')) {
        return 'accuracy-ax50.jpg';
    }
    
    // Immagine predefinita se non viene trovata una corrispondenza
    return 'default.jpg';
}

function updateQuantity(index, newQuantity) {
    // Recupera gli elementi del carrello
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Verifica che l'indice sia valido
    if (index < 0 || index >= cartItems.length) return;
    
    // Converti la quantità in un numero intero e assicurati che sia almeno 1
    newQuantity = parseInt(newQuantity);
    if (isNaN(newQuantity) || newQuantity < 1) newQuantity = 1;
    
    // Aggiorna la quantità
    cartItems[index].quantity = newQuantity;
    
    // Salva il carrello aggiornato
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Ricarica gli elementi del carrello
    loadCartItems();
}

function incrementQuantity(index) {
    // Recupera gli elementi del carrello
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Verifica che l'indice sia valido
    if (index < 0 || index >= cartItems.length) return;
    
    // Incrementa la quantità
    cartItems[index].quantity++;
    
    // Salva il carrello aggiornato
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Ricarica gli elementi del carrello
    loadCartItems();
}

function decrementQuantity(index) {
    // Recupera gli elementi del carrello
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Verifica che l'indice sia valido
    if (index < 0 || index >= cartItems.length) return;
    
    // Decrementa la quantità, ma assicurati che sia almeno 1
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        
        // Salva il carrello aggiornato
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Ricarica gli elementi del carrello
        loadCartItems();
    }
}

function removeItem(index) {
    // Recupera gli elementi del carrello
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Verifica che l'indice sia valido
    if (index < 0 || index >= cartItems.length) return;
    
    // Rimuovi l'elemento
    cartItems.splice(index, 1);
    
    // Salva il carrello aggiornato
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Ricarica gli elementi del carrello
    loadCartItems();
}

// Funzione per svuotare completamente il carrello
function clearCart() {
    // Rimuovi gli elementi del carrello dal localStorage
    localStorage.removeItem('cartItems');
    
    // Ricarica gli elementi del carrello
    loadCartItems();
}

// Funzione per aggiungere un prodotto al carrello (da utilizzare nelle altre pagine)
function addToCart(productName, price, quantity = 1) {
    // Recupera gli elementi del carrello
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Cerca se il prodotto è già nel carrello
    const existingItemIndex = cartItems.findIndex(item => item.name === productName);
    
    if (existingItemIndex !== -1) {
        // Se il prodotto è già nel carrello, incrementa la quantità
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        // Altrimenti, aggiungi un nuovo elemento
        cartItems.push({
            name: productName,
            price: price,
            quantity: quantity
        });
    }
    
    // Salva il carrello aggiornato
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Mostra un messaggio di conferma
    alert(`${productName} aggiunto al carrello!`);
}