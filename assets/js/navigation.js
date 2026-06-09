function toggleMobileMenu() {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('menuBtn');
  var isOpen = nav.classList.toggle('open');
  document.body.classList.toggle('mobile-menu-open', isOpen);
  btn.textContent = isOpen ? '✕' : '☰';
}
function closeMobileMenu() {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('menuBtn');
  if (nav && btn) {
    nav.classList.remove('open');
    document.body.classList.remove('mobile-menu-open');
    btn.textContent = '☰';
  }
}
document.addEventListener('click', function(e) {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('menuBtn');
  if (nav && nav.classList.contains('open') && !nav.contains(e.target) && e.target !== btn) {
    closeMobileMenu();
  }
});

// Scroll Reveal Navbar Logic
document.addEventListener('DOMContentLoaded', function() {
  var navbar = document.querySelector('nav');
  if (!navbar) return;

  var isHomePage = document.body.classList.contains('is-home');

  if (isHomePage) {
    var handleScroll = function() {
      if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
    };
    
    // Check initial state (if page loaded/reloaded already scrolled)
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
});
