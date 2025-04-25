document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
      {
        id: 1,
        name: "Tropical Fruit Bouquet",
        price: 49.99,
        category: "bouquets",
        image: "images/product1.jpg",
        description: "A vibrant mix of tropical fruits arranged beautifully"
      },
      {
        id: 2,
        name: "Chocolate Dipped Strawberries",
        price: 29.99,
        category: "chocolate",
        image: "images/product2.jpg",
        description: "Fresh strawberries dipped in premium chocolate"
      },
      {
        id: 3,
        name: "Fruit Garland",
        price: 39.99,
        category: "garlands",
        image: "images/product3.jpg",
        description: "Decorative fruit garland for special events"
      },
      {
        id: 4,
        name: "Carved Watermelon Basket",
        price: 59.99,
        category: "carved",
        image: "images/product4.jpg",
        description: "Artistically carved watermelon filled with mixed fruits"
      },
      {
        id: 5,
        name: "Berry Bliss Bouquet",
        price: 44.99,
        category: "bouquets",
        image: "images/product5.jpg",
        description: "Assorted berries arranged in a beautiful bouquet"
      },
      {
        id: 6,
        name: "Chocolate Fruit Box",
        price: 34.99,
        category: "chocolate",
        image: "images/product6.jpeg",
        description: "Assorted fruits with chocolate dipping sauce"
      },
      {
        id: 7,
        name: "Citrus Garland",
        price: 37.99,
        category: "garlands",
        image: "images/product7.jpg",
        description: "Colorful citrus fruit garland"
      },
      {
        id: 8,
        name: "Carved Pineapple Vase",
        price: 54.99,
        category: "carved",
        image: "images/product8.jpeg",
        description: "Pineapple carved into a vase with flower fruits"
      }
    ];
  
    // DOM Elements
    const productGrid = document.getElementById('product-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort');
    const cartCount = document.querySelector('.cart-count');
    
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let filteredProducts = [...products];
  
    // Initialize
    renderProducts(products);
    updateCartCount();
  
    // Filter Products
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Filter products
        const category = this.dataset.category;
        if (category === 'all') {
          filteredProducts = [...products];
        } else {
          filteredProducts = products.filter(p => p.category === category);
        }
        
        // Re-render
        renderProducts(filteredProducts);
      });
    });
  
    // Sort Products
    sortSelect.addEventListener('change', function() {
      const sortValue = this.value;
      let sortedProducts = [...filteredProducts];
      
      switch(sortValue) {
        case 'price-low':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          // Default sorting (by ID)
          sortedProducts.sort((a, b) => a.id - b.id);
      }
      
      renderProducts(sortedProducts);
    });
  
    // Render Products
    function renderProducts(productsToRender) {
      productGrid.innerHTML = '';
      
      if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p class="no-products">No products found in this category.</p>';
        return;
      }
      
      productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <h3>${product.name}</h3>
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        `;
        productGrid.appendChild(productCard);
      });
  
      // Add event listeners to new buttons
      document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
      });
    }
  
    // Add to Cart
    function addToCart(e) {
      const productId = parseInt(e.target.dataset.id);
      const product = products.find(p => p.id === productId);

      // Add to your existing JS (like carved.js)
document.querySelector('.logo-container').addEventListener('click', function(e) {
  e.preventDefault();
  window.location.href = 'home.html'; // Link to homepage
});
      
      // Check if already in cart
      const existingItem = cartItems.find(item => item.id === productId);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          ...product,
          quantity: 1
        });
      }
      
      // Update UI and storage
      updateCartCount();
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      // Visual feedback
      e.target.textContent = 'Added!';
      e.target.style.backgroundColor = '#FF4081';
      setTimeout(() => {
        e.target.textContent = 'Add to Cart';
        e.target.style.backgroundColor = '#4CAF50';
      }, 1000);
    }
  
    // Update Cart Count
    function updateCartCount() {
      const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
      
      // Animation
      cartCount.classList.add('pulse');
      setTimeout(() => cartCount.classList.remove('pulse'), 300);
    }
  });