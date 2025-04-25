document.addEventListener('DOMContentLoaded', function() {
    // Thumbnail Gallery Functionality
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', function() {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        this.classList.add('active');
        
        // Update main image
        const newSrc = this.src.replace('-thumb-', '-large-');
        mainImage.src = newSrc;
        mainImage.alt = this.alt;
      });
    });
  
    // Quantity Selector
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');
    
    minusBtn.addEventListener('click', function() {
      let currentVal = parseInt(qtyInput.value);
      if (currentVal > 1) {
        qtyInput.value = currentVal - 1;
      }
    });
    
    plusBtn.addEventListener('click', function() {
      let currentVal = parseInt(qtyInput.value);
      qtyInput.value = currentVal + 1;
    });
  
    // Size Selection
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
      option.addEventListener('click', function() {
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
      });
    });
  
    // Add to Cart Functionality
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    
    addToCartBtn.addEventListener('click', function() {
      // Get product details
      const productName = document.querySelector('.product-info h1').textContent;
      const price = document.querySelector('.price').textContent;
      const quantity = parseInt(qtyInput.value);
      const size = document.querySelector('.size-option.active').textContent;
      const hasChocolate = document.getElementById('chocolate-dip').checked;
      
      // Create cart item object
      const cartItem = {
        name: productName,
        price: price,
        quantity: quantity,
        size: size,
        chocolate: hasChocolate,
        image: mainImage.src
      };
      
      // Get existing cart or create new one
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Add new item to cart
      cart.push(cartItem);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update cart count
      updateCartCount();
      
      // Visual feedback
      this.textContent = 'Added to Cart!';
      this.style.backgroundColor = '#FF4081';
      
      setTimeout(() => {
        this.textContent = 'Add to Cart';
        this.style.backgroundColor = '#4CAF50';
      }, 2000);
    });
  
    // Load Related Products
    function loadRelatedProducts() {
      const relatedGrid = document.querySelector('.related-grid');
      
      // Sample related products data
      const relatedProducts = [
        {
          id: 2,
          name: "Berry Bliss Bouquet",
          price: "$44.99",
          image: "images/product5.jpg"
        },
        {
          id: 6,
          name: "Chocolate Fruit Box",
          price: "$34.99",
          image: "images/product6.jpg"
        },
        {
          id: 4,
          name: "Carved Watermelon Basket",
          price: "$59.99",
          image: "images/product4.jpg"
        }
      ];
      
      // Generate HTML for related products
      relatedProducts.forEach(product => {
        const productHTML = `
          <div class="related-item">
            <a href="product.html?id=${product.id}">
              <div class="related-image">
                <img src="${product.image}" alt="${product.name}">
              </div>
              <div class="related-info">
                <h3>${product.name}</h3>
                <div class="related-price">${product.price}</div>
              </div>
            </a>
          </div>
        `;
        relatedGrid.innerHTML += productHTML;
      });
    }
  
    // Update Cart Count
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
      
      // Animation
      cartCount.classList.add('pulse');
      setTimeout(() => cartCount.classList.remove('pulse'), 300);
    }
  
    // Initialize
    loadRelatedProducts();
    updateCartCount();
  });