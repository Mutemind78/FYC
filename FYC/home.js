document.addEventListener('DOMContentLoaded', function() {
    // Slideshow functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slideInterval = 5000; // 5 seconds
    
    // Function to show a specific slide
    function showSlide(index) {
      // Hide all slides
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show the selected slide
      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }
    
    // Function to go to next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    // Set up automatic slideshow
    let slideTimer = setInterval(nextSlide, slideInterval);
    
    // Add click event to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        // Reset timer when manually changing slides
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, slideInterval);
      });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Get product details (could be expanded)
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('p').textContent;
        
        // Update cart count
        cartItems++;
        cartCount.textContent = cartItems;
        cartCount.classList.add('pulse');
        
        // Remove animation class after it completes
        setTimeout(() => {
          cartCount.classList.remove('pulse');
        }, 300);
        
        // Show confirmation (could be replaced with a proper cart system)
        alert(`${productName} (${productPrice}) added to cart!`);
        
        // Here you would normally add to a cart array or send to server
      });
    });

    // Add to your existing JS (like carved.js)
document.querySelector('.logo-container').addEventListener('click', function(e) {
  e.preventDefault();
  window.location.href = 'home.html'; // Link to homepage
});
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Simple validation
        if (email && email.includes('@')) {
          alert(`Thank you for subscribing with ${email}!`);
          this.reset();
        } else {
          alert('Please enter a valid email address.');
        }
      });
    }
  });