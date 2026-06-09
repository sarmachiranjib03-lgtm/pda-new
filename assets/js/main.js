// PDA General Scripts

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initSmoothScroll();
});

/**
 * Smooth-scroll: ONLY intercepts links whose href is a pure #hash anchor
 * (e.g. #home, #about, #programs). Any link containing a '/' — including
 * /school/, /higher-secondary/, /integrated-coaching/, /message/ etc. —
 * is left completely alone so the browser performs normal page navigation.
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only handle pure #hash links — skip everything else
    if (!href || !href.startsWith('#') || href.includes('/')) return;

    link.addEventListener('click', function(e) {
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initHeroSlider() {
  const wrapper = document.getElementById('heroWrapper');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const dotsContainer = document.getElementById('heroDots');
  const slides = document.querySelectorAll('.hero-slide');
  
  if (!wrapper || slides.length === 0) return;
  
  let currentIndex = 0;
  const slideCount = slides.length;
  let autoplayInterval;
  const autoplayDelay = 5000; // 5 seconds per slide
  
  // Get dots
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.hero-dot') : [];
  
  function updateSlider() {
    // Slide transition by translating the wrapper horizontally
    wrapper.style.transform = `translateX(-${currentIndex * (100 / slideCount)}%)`;
    
    // Update active dot indicator
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
  }
  
  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, autoplayDelay);
  }
  
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }
  
  // Arrow navigation event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay(); // Reset auto-play timer on interaction
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay(); // Reset auto-play timer on interaction
    });
  }
  
  // Dot navigation event listeners
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
      startAutoplay(); // Reset auto-play timer on interaction
    });
  });
  
  // Pause slider when hovering over the hero container
  const heroContainer = document.querySelector('.hero');
  if (heroContainer) {
    heroContainer.addEventListener('mouseenter', stopAutoplay);
    heroContainer.addEventListener('mouseleave', startAutoplay);
  }
  
  // Start the autoplay cycle
  startAutoplay();
}

