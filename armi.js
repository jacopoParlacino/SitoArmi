document.addEventListener('DOMContentLoaded', function() {
    // Gestione delle tab delle categorie
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categoryContents = document.querySelectorAll('.category-content');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Rimuovi la classe active da tutte le tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Aggiungi la classe active alla tab cliccata
            this.classList.add('active');
            
            // Nascondi tutti i contenuti
            categoryContents.forEach(content => content.classList.remove('active'));
            
            // Mostra il contenuto corrispondente alla tab cliccata
            const categoryToShow = this.dataset.category;
            document.getElementById(`${categoryToShow}-content`).classList.add('active');
        });
    });

    // Gestione del carrello con localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    function updateCart() {
        const cartList = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total-amount');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        
        if (!cartList || !cartTotal || !emptyCartMessage) return;

        cartList.innerHTML = '';
        let total = 0;

        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
            
            cartItems.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = `${item.name} (${item.quantity}x) - ${item.price}`;
                
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Rimuovi';
                removeButton.onclick = () => removeFromCart(index);
                
                li.appendChild(removeButton);
                cartList.appendChild(li);
                
                total += parseFloat(item.price.replace('€', '').replace('.', '').replace(',', '.')) * item.quantity;
            });
        }

        cartTotal.textContent = `€${total.toFixed(2)}`;
        // Salva nel localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function addToCart(product, price, quantity = 1) {
        const existingItemIndex = cartItems.findIndex(item => item.name === product);
        
        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            cartItems.push({
                name: product,
                price: price,
                quantity: quantity
            });
        }
        updateCart();
    }

    function removeFromCart(index) {
        cartItems.splice(index, 1);
        updateCart();
    }

    // Rendi le funzioni disponibili globalmente
    window.addToCart = addToCart;
    window.updateCart = updateCart;
    window.removeFromCart = removeFromCart;
    
    // Aggiorna il carrello all'avvio
    updateCart();
});