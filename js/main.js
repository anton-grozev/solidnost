// Main JavaScript File
(function($) {
  'use strict';

  // Language translations object
  let translations = {};
  let currentLang = localStorage.getItem('language') || 'bg';

  $(document).ready(function() {
    
    // Initialize Language System
    initLanguage();
    
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

  // Language System
  function initLanguage() {
    // Load translations
    $.getJSON('../translations.json')
      .done(function(data) {
        translations = data;
        updateLanguage(currentLang);
        updateLanguageButtons();
      })
      .fail(function() {
        // Fallback for root directory
        $.getJSON('translations.json')
          .done(function(data) {
            translations = data;
            updateLanguage(currentLang);
            updateLanguageButtons();
          })
          .fail(function() {
            console.error('Failed to load translations');
          });
      });

    // Language switcher click handlers
    $(document).on('click', '.lang-btn', function() {
      const lang = $(this).data('lang');
      if (lang && lang !== currentLang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        updateLanguage(lang);
        updateLanguageButtons();
      }
    });
  }

  function updateLanguage(lang) {
    if (!translations[lang]) {
      console.error('Language not found:', lang);
      return;
    }

    const t = translations[lang];

    // Update all elements with data-i18n attribute
    $('[data-i18n]').each(function() {
      const key = $(this).data('i18n');
      const keys = key.split('.');
      let value = t;
      
      // Navigate through nested object
      for (let k of keys) {
        if (value && value[k]) {
          value = value[k];
        } else {
          console.warn('Translation key not found:', key);
          return;
        }
      }
      
      // Update element
      if ($(this).is('input, textarea')) {
        $(this).attr('placeholder', value);
      } else if ($(this).data('i18n-html')) {
        $(this).html(value);
      } else {
        $(this).text(value);
      }
    });

    // Update document language attribute
    $('html').attr('lang', lang);
  }

  function updateLanguageButtons() {
    $('.lang-btn').removeClass('active');
    $('.lang-btn[data-lang="' + currentLang + '"]').addClass('active');
  }

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

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

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

  function initCookieConsent() {
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


  $('.navbar-nav .nav-link').on('click', function() {
    if ($(window).width() < 992) {
      $('.navbar-collapse').collapse('hide');
    }
  });

  // Set active navigation item based on current page
  function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Remove all active classes first
    $('.navbar-nav .nav-link').removeClass('active');
    
    // Set active class based on current page
    $('.navbar-nav .nav-link').each(function() {
      const href = $(this).attr('href');
      
      if (href) {
        const linkPage = href.split('/').pop();
        
        // Check if current page matches
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && href === '../index.html')) {
          $(this).addClass('active');
        }
        
        // Check for dropdown items
        if ($(this).hasClass('dropdown-toggle')) {
          const dropdownItems = $(this).next('.dropdown-menu').find('.dropdown-item');
          dropdownItems.each(function() {
            const dropdownHref = $(this).attr('href');
            if (dropdownHref) {
              const dropdownPage = dropdownHref.split('/').pop();
              if (dropdownPage === currentPage) {
                $(this).addClass('active');
                $(this).closest('.nav-item').find('.dropdown-toggle').addClass('active');
              }
            }
          });
        }
      }
    });
  }
  
  // Call on page load
  setActiveNavItem();

})(jQuery);

