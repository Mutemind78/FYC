document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const cartItemsContainer = document.getElementById('cartItems');
    const itemsCountEl = document.querySelector('.items-count');
    const subtotalEl = document.querySelector('.subtotal');
    const totalEl = document.querySelector('.total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const cartCountEl = document.querySelector('.cart-count');
    
    // Cart data
    let cart = JSON.parse(localStorage.getItem('fruitYardCart')) || [];
    
    // Initialize
    renderCartItems();
    updateSummary();
    updateCartCount();
    
    // ===== CART RENDERING =====
    function renderCartItems() {
      if (cart.length === 0) {
        showEmptyCart();
        return;
      }
      
      cartItemsContainer.innerHTML = '';
      
      cart.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.dataset.id = item.id;
        
        itemEl.innerHTML = `
          <div class="item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="item-details">
            <h3 class="item-name">${item.name}</h3>
            <p class="item-category">${item.category.replace('-', ' ')}</p>
            <div class="item-actions">
              <button class="remove-item" data-index="${index}">Remove</button>
            </div>
          </div>
          <div class="item-controls">
            <span class="item-price">$${(parseFloat(item.price.replace('$', '')) * item.quantity)}</span>
            <div class="quantity-controls">
              <button class="quantity-btn minus" data-index="${index}">-</button>
              <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
              <button class="quantity-btn plus" data-index="${index}">+</button>
            </div>
          </div>
        `;
        
        cartItemsContainer.appendChild(itemEl);
      });
      
      // Add event listeners to new elements
      addItemEventListeners();
    }
    
    function showEmptyCart() {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <img src="images/empty-cart.png" alt="Empty cart" class="empty-cart-img">
          <p>Your cart is empty</p>
          <a href="shop.html" class="btn-shop">Continue Shopping</a>
        </div>
      `;
      checkoutBtn.disabled = true;
    }
    
    // ===== EVENT LISTENERS =====
    function addItemEventListeners() {
      // Remove buttons
      document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
          const index = this.dataset.index;
          removeItem(index);
        });
      });
      
      // Quantity minus
      document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
          const index = this.dataset.index;
          updateQuantity(index, -1);
        });
      });
      
      // Quantity plus
      document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
          const index = this.dataset.index;
          updateQuantity(index, 1);
        });
      });
      
      // Quantity input changes
      document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
          const index = this.dataset.index;
          setQuantity(index, parseInt(this.value));
        });
      });
    }
    
    // ===== CART OPERATIONS =====
    function removeItem(index) {
      cart.splice(index, 1);
      saveCart();
      renderCartItems();
      updateSummary();
      updateCartCount();
    }
    
    function updateQuantity(index, change) {
      const newQuantity = cart[index].quantity + change;
      if (newQuantity < 1) return;
      
      cart[index].quantity = newQuantity;
      saveCart();
      updateItemDisplay(index);
      updateSummary();
      updateCartCount();
    }
    
    function setQuantity(index, quantity) {
      if (quantity < 1) quantity = 1;
      
      cart[index].quantity = quantity;
      saveCart();
      updateItemDisplay(index);
      updateSummary();
      updateCartCount();
    }
    
    function updateItemDisplay(index) {
      const item = cart[index];
      const itemEl = document.querySelector(`.cart-item[data-id="${item.id}"]`);
      if (!itemEl) return;
      
      itemEl.querySelector('.item-price').textContent = `$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}`;
      itemEl.querySelector('.quantity-input').value = item.quantity;
    }
    
    // ===== SUMMARY CALCULATIONS =====
    function updateSummary() {
      const subtotal = calculateSubtotal();
      const delivery = subtotal > 50 ? 0 : 5.99;
      const total = subtotal + delivery;
      
      itemsCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
      subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      document.querySelector('.delivery').textContent = delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`;
      totalEl.textContent = `$${total.toFixed(2)}`;
      
      checkoutBtn.disabled = cart.length === 0;
    }
    
    function calculateSubtotal() {
      return cart.reduce((sum, item) => {
        return sum + (parseFloat(item.price.replace('$', '')) * item.quantity);
      }, 0);
    }
    
    // ===== CART PERSISTENCE =====
    function saveCart() {
      localStorage.setItem('fruitYardCart', JSON.stringify(cart));
    }
    
    function updateCartCount() {
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCountEl.textContent = count;
      
      // Update all cart counts in case other pages are open
      localStorage.setItem('fruitYardCartCount', count);
    }
    
    // ===== CHECKOUT BUTTON =====
    checkoutBtn.addEventListener('click', function() {
      // In a real implementation, this would redirect to checkout
      alert('Proceeding to checkout! This would redirect to a payment page in a real implementation.');
    });
    
    // Listen for cart updates from other tabs
    window.addEventListener('storage', function(e) {
      if (e.key === 'fruitYardCart') {
        cart = JSON.parse(e.newValue) || [];
        renderCartItems();
        updateSummary();
        updateCartCount();
      }
    });
  });