// ===================================
// Main JavaScript File
// ===================================

(function($) {
  'use strict';

  // ===================================
  // Document Ready
  // ===================================
  $(document).ready(function() {
    
    // Initialize Owl Carousel
    initCarousel();
    
    // Initialize Contact Form
    initContactForm();
    
    // Initialize Back to Top Button
    initBackToTop();
    
    // Initialize Cookie Consent
    initCookieConsent();
    
    // Initialize Smooth Scroll
    initSmoothScroll();
    
    // Initialize Lightbox
    initLightbox();
    
    // Add fade-in animation to elements
    animateOnScroll();
    
  });

  // ===================================
  // Initialize Owl Carousel
  // ===================================
  function initCarousel() {
    if ($('.owl-carousel').length) {
      $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        nav: true,
        navText: [
          '<i class="fas fa-chevron-left"></i>',
          '<i class="fas fa-chevron-right"></i>'
        ],
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1000,
        responsive: {
          0: {
            nav: false
          },
          768: {
            nav: true
          }
        }
      });
    }
  }

  // ===================================
  // Initialize Contact Form
  // ===================================
  function initContactForm() {
    $('#contactForm').on('submit', function(e) {
      e.preventDefault();
      
      const form = $(this);
      const formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        subject: $('#subject').val(),
        message: $('#message').val()
      };
      
      // Validate form
      if (!validateEmail(formData.email)) {
        showFormMessage('Моля, въведете валиден имейл адрес.', 'danger');
        return;
      }
      
      if (!formData.phone) {
        showFormMessage('Моля, въведете телефон за контакт.', 'danger');
        return;
      }
      
      // Disable submit button
      const submitBtn = form.find('button[type="submit"]');
      submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>Изпраща се...');
      
      // AJAX request to send form (replace with your endpoint)
      $.ajax({
        url: 'send-contact.php', // Replace with your actual endpoint
        type: 'POST',
        data: formData,
        dataType: 'json',
        success: function(response) {
          if (response.success) {
            showFormMessage('Съобщението е изпратено успешно! Ще се свържем с вас скоро.', 'success');
            form[0].reset();
          } else {
            showFormMessage('Възникна грешка. Моля, опитайте отново или се свържете с нас директно.', 'danger');
          }
        },
        error: function() {
          // For demo purposes, show success message
          showFormMessage('Демо режим: Формата е валидна и готова за изпращане. За да работи реално, добавете send-contact.php файл.', 'info');
          form[0].reset();
        },
        complete: function() {
          submitBtn.prop('disabled', false).html('<i class="fas fa-paper-plane me-2"></i>Изпрати');
        }
      });
    });
  }

  // ===================================
  // Validate Email
  // ===================================
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // ===================================
  // Show Form Message
  // ===================================
  function showFormMessage(message, type) {
    const alertClass = `alert alert-${type}`;
    const html = `
      <div class="${alertClass} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    $('#formMessage').html(html);
    
    // Auto dismiss after 5 seconds
    setTimeout(function() {
      $('#formMessage .alert').fadeOut(500, function() {
        $(this).remove();
      });
    }, 5000);
  }

  // ===================================
  // Back to Top Button
  // ===================================
  function initBackToTop() {
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

  // ===================================
  // Cookie Consent
  // ===================================
  function initCookieConsent() {
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
      setTimeout(function() {
        $('#cookieConsent').fadeIn();
      }, 1000);
    }
  }

  // Accept cookies function (global)
  window.acceptCookies = function() {
    localStorage.setItem('cookiesAccepted', 'true');
    $('#cookieConsent').fadeOut();
    
    // Initialize Google Analytics or other tracking here
    initAnalytics();
  };

  // ===================================
  // Initialize Analytics
  // ===================================
  function initAnalytics() {
    // Add Google Analytics code here
    // Example:
    // gtag('config', 'GA_MEASUREMENT_ID');
    console.log('Analytics initialized');
  }

  // ===================================
  // Smooth Scroll
  // ===================================
  function initSmoothScroll() {
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

  // ===================================
  // Initialize Lightbox
  // ===================================
  function initLightbox() {
    if ($('.lightbox').length) {
      $('.lightbox').simpleLightbox({
        nav: true,
        showCounter: true,
        enableKeyboard: true,
        docClose: true
      });
    }
  }

  // ===================================
  // Animate on Scroll
  // ===================================
  function animateOnScroll() {
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

  // ===================================
  // Navbar Scroll Effect
  // ===================================
  $(window).scroll(function() {
    const navbar = $('.navbar');
    if ($(this).scrollTop() > 50) {
      navbar.addClass('scrolled');
    } else {
      navbar.removeClass('scrolled');
    }
  });

  // ===================================
  // Mobile Menu Auto Close
  // ===================================
  $('.navbar-nav .nav-link').on('click', function() {
    if ($(window).width() < 992) {
      $('.navbar-collapse').collapse('hide');
    }
  });

  // ===================================
  // Form Input Focus Effect
  // ===================================
  $('.form-control, .form-select').on('focus', function() {
    $(this).parent().addClass('focused');
  }).on('blur', function() {
    if (!$(this).val()) {
      $(this).parent().removeClass('focused');
    }
  });

  // ===================================
  // Lazy Loading Images
  // ===================================
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    $('img[data-src]').each(function() {
      $(this).attr('src', $(this).attr('data-src'));
      $(this).attr('loading', 'lazy');
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ===================================
  // Print Page Function
  // ===================================
  window.printPage = function() {
    window.print();
  };

  // ===================================
  // Share on Social Media
  // ===================================
  window.shareOnFacebook = function(url) {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, 'facebook-share', 'width=600,height=400');
  };

  window.shareOnLinkedIn = function(url) {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, 'linkedin-share', 'width=600,height=400');
  };

  // ===================================
  // Console Welcome Message
  // ===================================
  console.log(
    '%c👋 Здравейте от Солидност! ',
    'background: #002f4d; color: white; font-size: 20px; padding: 10px;'
  );
  console.log(
    '%cИнтересувате ли се от сътрудничество? Свържете се с нас: office@solidnost.com',
    'font-size: 14px; color: #0066cc;'
  );

})(jQuery);

// ===================================
// Service Worker Registration (PWA)
// ===================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Uncomment when you create a service worker file
    // navigator.serviceWorker.register('/sw.js').then(
    //   function(registration) {
    //     console.log('ServiceWorker registration successful');
    //   },
    //   function(err) {
    //     console.log('ServiceWorker registration failed: ', err);
    //   }
    // );
  });
}
