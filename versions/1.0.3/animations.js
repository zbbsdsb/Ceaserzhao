/**
 * v1.0.3 Animation Utilities - The Ethereal Architect
 * Self-contained animation functions for this version
 */

/**
 * Initialize project archive slider functionality
 */
function initProjectArchiveSlider() {
  const slider = document.getElementById('archiveSlider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.querySelectorAll('.indicator');
  const archivePages = document.querySelectorAll('.archive-page');
  
  if (!slider || !prevBtn || !nextBtn || indicators.length === 0 || archivePages.length === 0) {
    return;
  }
  
  let currentIndex = 0;
  const totalPages = archivePages.length;
  
  /**
   * Update slider position
   */
  function updateSlider() {
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
    
    // Update button states
    prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
    prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    
    nextBtn.style.opacity = currentIndex === totalPages - 1 ? '0.3' : '1';
    nextBtn.style.pointerEvents = currentIndex === totalPages - 1 ? 'none' : 'auto';
  }
  
  /**
   * Go to specific slide
   * @param {number} index - Slide index
   */
  function goToSlide(index) {
    if (index < 0 || index >= totalPages) return;
    
    currentIndex = index;
    updateSlider();
  }
  
  // Event listeners
  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index);
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      goToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      goToSlide(currentIndex + 1);
    }
  });
  
  // Touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left
      goToSlide(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right
      goToSlide(currentIndex - 1);
    }
  }
  
  // Initialize
  updateSlider();
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.timeline-node, .bento-item, .org-card, .gallery-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(element);
  });
}

/**
 * Initialize custom cursor functionality
 */
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  
  if (!cursor || !follower) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;
  
  // Update mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate dot position
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });
  
  // Smooth follower animation
  function animateFollower() {
    // Lerp for smooth following
    const lerpFactor = 0.15;
    followerX += (mouseX - followerX) * lerpFactor;
    followerY += (mouseY - followerY) * lerpFactor;
    
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    
    requestAnimationFrame(animateFollower);
  }
  
  animateFollower();
  
  // Hover states
  const interactables = document.querySelectorAll('a, button, .indicator, .bento-item, .org-card, .timeline-card, .project-link');
  
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
  
  // Click state
  window.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-active');
  });
  
  window.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-active');
  });
}

/**
 * Initialize all animations
 */
function initAnimations() {
  initProjectArchiveSlider();
  initScrollAnimations();
  initCustomCursor();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}
