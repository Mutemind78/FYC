// ==============================================
// FRUITYARD CREATIONS - CARVED FRUITS PAGE
// Complete JavaScript Implementation
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    // 1. PRODUCT SLIDESHOW CLASS
    class ProductSlideshow {
      constructor() {
        this.slides = document.querySelectorAll('.carving-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        this.currentIndex = 0;
        this.interval = null;
        this.intervalTime = 5000; // 5 seconds
  
        this.init();
      }
  
      init() {
        if (this.slides.length === 0) return;
  
        // Initialize controls
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
  
        // Dot navigation
        this.dots.forEach((dot, index) => {
          dot.addEventListener('click', () => this.goToSlide(index));
        });
  
        // Start slideshow
        this.showSlide(0);
        this.startAutoPlay();
  
        // Pause on hover
        const slideshowContainer = document.querySelector('.slideshow-container');
        slideshowContainer?.addEventListener('mouseenter', () => this.pauseAutoPlay());
        slideshowContainer?.addEventListener('mouseleave', () => this.resumeAutoPlay());
      }
  
      showSlide(index) {
        // Validate and normalize index
        index = (index % this.slides.length + this.slides.length) % this.slides.length;
        this.currentIndex = index;
  
        // Update slides visibility
        this.slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
        });
  
        // Update dot indicators
        this.dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
  
      nextSlide() {
        this.showSlide(this.currentIndex + 1);
      }
  
      prevSlide() {
        this.showSlide(this.currentIndex - 1);
      }
  
      goToSlide(index) {
        this.showSlide(index);
      }
  
      startAutoPlay() {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => this.nextSlide(), this.intervalTime);
      }
  
      pauseAutoPlay() {
        clearInterval(this.interval);
      }
  
      resumeAutoPlay() {
        this.startAutoPlay();
      }
  
      resetAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
      }
    }
  
    // 2. SHOPPING CART SYSTEM
    class ShoppingCart {
      constructor() {
        this.cartKey = 'fruitYardCart';
        this.cartCountEl = document.querySelector('.cart-count');
        this.addToCartBtns = document.querySelectorAll('.add-to-cart');
        this.cart = this.loadCart();
  
        this.init();
      }
  
      init() {
        this.setupProductData();
        this.setupEventListeners();
        this.updateCartCount();
      }
  
      loadCart() {
        try {
          return JSON.parse(localStorage.getItem(this.cartKey)) || [];
        } catch (e) {
          console.error('Error loading cart:', e);
          return [];
        }
      }
  
      saveCart() {
        try {
          localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
          return true;
        } catch (e) {
          console.error('Error saving cart:', e);
          return false;
        }
      }
  
      setupProductData() {
        document.querySelectorAll('.product-card').forEach((card, index) => {
          if (!card.dataset.id) {
            card.dataset.id = `carved-${index}-${Date.now()}`;
          }
        });
      }
  
      setupEventListeners() {
        this.addToCartBtns.forEach(btn => {
          btn.addEventListener('click', (e) => this.handleAddToCart(e));
        });
      }
  
      getProductData(productCard) {
        return {
          id: productCard.dataset.id,
          name: productCard.querySelector('h3').textContent.trim(),
          price: productCard.querySelector('.price').textContent.trim(),
          image: productCard.querySelector('img').src,
          category: 'carved-fruits',
          quantity: 1,
          addedAt: new Date().toISOString()
        };
      }
  
      addProductToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          this.cart.push(product);
        }
  
        return this.saveCart();
      }
  
      handleAddToCart(event) {
        const button = event.currentTarget;
        const productCard = button.closest('.product-card');
        
        // Visual feedback - loading state
        button.disabled = true;
        button.innerHTML = '<span class="spinner"></span> Adding...';
  
        // Get product data
        const product = this.getProductData(productCard);
  
        // Add to cart
        const success = this.addProductToCart(product);
  
        // Update UI
        this.updateCartCount();
  
        // Visual feedback - result state
        setTimeout(() => {
          if (success) {
            button.textContent = '✓ Added!';
            button.style.backgroundColor = '#4CAF50';
            this.animateCartAddition(productCard);
          } else {
            button.textContent = '✗ Try Again';
            button.style.backgroundColor = '#FF4081';
          }
  
          // Reset button after delay
          setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '#4CAF50';
            button.disabled = false;
          }, 1500);
        }, 500);
      }
  
      animateCartAddition(productCard) {
        // Create animation element
        const anim = document.createElement('div');
        anim.className = 'cart-animation';
        
        // Clone product image
        const imgClone = productCard.querySelector('img').cloneNode();
        imgClone.style.width = '50px';
        imgClone.style.height = '50px';
        imgClone.style.objectFit = 'cover';
        imgClone.style.borderRadius = '50%';
        imgClone.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        
        anim.appendChild(imgClone);
        document.body.appendChild(anim);
  
        // Get positions
        const productRect = productCard.getBoundingClientRect();
        const cartRect = this.cartCountEl.getBoundingClientRect();
        
        // Set initial position
        anim.style.position = 'fixed';
        anim.style.left = `${productRect.left + productRect.width/2 - 25}px`;
        anim.style.top = `${productRect.top}px`;
        anim.style.zIndex = '1000';
        anim.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  
        // Animate to cart
        setTimeout(() => {
          anim.style.left = `${cartRect.left + cartRect.width/2 - 25}px`;
          anim.style.top = `${cartRect.top}px`;
          anim.style.opacity = '0';
          anim.style.transform = 'scale(0.5)';
        }, 10);
  
        // Remove after animation
        setTimeout(() => {
          anim.remove();
        }, 600);
      }
  
      updateCartCount() {
        const itemCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        this.cartCountEl.textContent = itemCount;
        this.animateCartCount();
      }
  
      animateCartCount() {
        this.cartCountEl.classList.add('pulse');
        setTimeout(() => {
          this.cartCountEl.classList.remove('pulse');
        }, 300);
      }
    }
  
    // 3. UTILITY FUNCTIONS
    function setupMobileMenu() {
      const menuToggle = document.createElement('button');
      menuToggle.className = 'mobile-menu-toggle';
      menuToggle.innerHTML = '☰';
      
      const nav = document.querySelector('.nav-links');
      document.querySelector('.navbar')?.prepend(menuToggle);
      
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }
  
    function handleResize() {
      // Close mobile menu if screen gets larger
      if (window.innerWidth > 768) {
        document.querySelector('.nav-links')?.classList.remove('active');
        document.querySelector('.mobile-menu-toggle')?.classList.remove('active');
      }
    }
  
    // 4. INITIALIZATION
    try {
      // Initialize components
      new ProductSlideshow();
      new ShoppingCart();
      
      // Setup mobile menu
      if (window.innerWidth <= 768) {
        setupMobileMenu();
      }
      
      // Handle window resize
      window.addEventListener('resize', debounce(handleResize, 250));
  
      // Debugging helper
      console.log('Current cart:', new ShoppingCart().cart);
  
    } catch (error) {
      console.error('Initialization error:', error);
      // Fallback: Ensure cart count shows 0 if there are errors
      document.querySelector('.cart-count').textContent = '0';
    }
  
    // Utility: Debounce function
    function debounce(func, wait) {
      let timeout;
      return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
      };
    }
  });