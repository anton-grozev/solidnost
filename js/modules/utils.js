// ========================================
// Utilities Module - Helpers & Animations
// ========================================

export function initBackToTop() {
  const backToTopBtn = $('#backToTop');
  
  // Show/hide button based on scroll position
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      backToTopBtn.addClass('show');
    } else {
      backToTopBtn.removeClass('show');
    }
  });
  
  // Scroll to top on click
  backToTopBtn.on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
  });
}

export function initCookieConsent() {
  // Check if user has already accepted cookies
  if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(function() {
      $('#cookieConsent').fadeIn();
    }, 1000);
  }
}

window.acceptCookies = function() {
  localStorage.setItem('cookiesAccepted', 'true');
  $('#cookieConsent').fadeOut();
};

export function initSmoothScroll() {
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 80
        }, 1000);
      }
    }
  });
}

export function animateOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  // Observe elements
  $('.product-card, .service-card').each(function() {
    observer.observe(this);
  });
}
