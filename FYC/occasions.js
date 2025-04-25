document.addEventListener('DOMContentLoaded', function() {
    // Tab Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');

        // Add to your existing JS (like carved.js)
document.querySelector('.logo-container').addEventListener('click', function(e) {
  e.preventDefault();
  window.location.href = 'home.html'; // Link to homepage
});
        
        // Show corresponding content
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  
    // Update Cart Count
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      document.querySelector('.cart-count').textContent = totalItems;
    }
  
    // Initialize
    updateCartCount();
  
    // Month Highlighting (Seasonal Tab)
    function highlightCurrentMonth() {
      const months = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
      ];
      const currentMonth = new Date().getMonth();
      const currentMonthName = months[currentMonth];
      
      document.querySelectorAll('.occasion-card').forEach(card => {
        if (card.dataset.month === currentMonthName) {
          card.querySelector('.month-badge').style.backgroundColor = '#FF4081';
          card.style.boxShadow = '0 5px 15px rgba(76, 175, 80, 0.3)';
        }
      });
    }
  
    highlightCurrentMonth();
  });