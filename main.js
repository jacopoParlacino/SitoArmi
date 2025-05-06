document.addEventListener('DOMContentLoaded', function() {
    // Elementi del DOM
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const clearCartBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Carrello
    let cart = [];
    
    // Carica il carrello dal localStorage se esiste
    if (localStorage.getItem('cartItems')) {
        cart = JSON.parse(localStorage.getItem('cartItems'));
    }
    
    // Aggiorna la visualizzazione del carrello
    function updateCartDisplay() {
        // Svuota il contenuto attuale del carrello
        cartItems.innerHTML = '';
        
        // Mostra o nascondi il messaggio "carrello vuoto"
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartTotalAmount.textContent = '€0.00';
            return;
        } else {
            emptyCartMessage.style.display = 'none';
        }
        
        // Calcola il totale
        let total = 0;
        
        // Aggiungi ogni elemento al carrello
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            
            // Calcola il prezzo totale per questo articolo
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            li.innerHTML = `
                <div class="item-name">${item.name}</div>
                <div class="item-quantity">
                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                </div>
                <div class="item-price">€${itemTotal.toFixed(2)}</div>
                <button class="remove-btn" data-index="${index}">X</button>
            `;
            
            cartItems.appendChild(li);
        });
        
        // Aggiorna il totale
        cartTotalAmount.textContent = `€${total.toFixed(2)}`;
        
        // Salva il carrello nel localStorage
        localStorage.setItem('cartItems', JSON.stringify(cart));
        
        // Aggiungi event listener ai pulsanti di quantità e rimozione
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
    }
    
    // Diminuisci la quantità di un elemento
    function decreaseQuantity() {
        const index = this.dataset.index;
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
            updateCartDisplay();
        }
    }
    
    // Aumenta la quantità di un elemento
    function increaseQuantity() {
        const index = this.dataset.index;
        cart[index].quantity++;
        updateCartDisplay();
    }
    
    // Rimuovi un elemento dal carrello
    function removeItem() {
        const index = this.dataset.index;
        cart.splice(index, 1);
        updateCartDisplay();
    }
    
    // Aggiungi un prodotto al carrello
    function addToCart(event) {
        const productName = this.dataset.product;
        const productCard = this.closest('.product-card');
        const priceText = productCard.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('€', '').replace('.', '').replace(',', '.').trim());
        
        // Controlla se il prodotto è già nel carrello
        const existingItemIndex = cart.findIndex(item => item.name.toLowerCase() === productName.toLowerCase());
        
        if (existingItemIndex !== -1) {
            // Se il prodotto è già nel carrello, aumenta la quantità
            cart[existingItemIndex].quantity++;
        } else {
            // Altrimenti, aggiungi un nuovo elemento al carrello
            cart.push({
                name: productName.charAt(0).toUpperCase() + productName.slice(1),
                price: price,
                quantity: 1
            });
        }
        
        // Aggiorna la visualizzazione del carrello
        updateCartDisplay();
    }
    
    // Svuota il carrello
    function clearCart() {
        cart = [];
        updateCartDisplay();
    }
    
    // Procedi all'acquisto
    // Gestione del pulsante "PROCEDI ALL'ACQUISTO"
    document.getElementById('checkout').addEventListener('click', function() {
        // Verifica se ci sono elementi nel carrello
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems.length === 0) {
            alert('Il carrello è vuoto. Aggiungi prodotti per procedere all\'acquisto.');
            return;
        }
        
        // Reindirizza alla pagina di acquisto
        window.location.href = 'acquisto.html';
    });
    
    // Aggiungi event listener ai pulsanti
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    clearCartBtn.addEventListener('click', clearCart);
    checkoutBtn.addEventListener('click', checkout);
    
    // Inizializza la visualizzazione del carrello
    updateCartDisplay();
});