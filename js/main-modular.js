// ========================================
// Main JavaScript Entry Point
// Модулна структура за лесно поддържане
// ========================================

import { initCarousel } from './modules/carousel.js';
import { initContactForm } from './modules/forms.js';
import { setActiveNavItem, initMobileNav } from './modules/navigation.js';
import { initLightbox } from './modules/lightbox.js';
import { initBackToTop, initCookieConsent, initSmoothScroll, animateOnScroll } from './modules/utils.js';

(function($) {
  'use strict';

  $(document).ready(function() {
    
    // Initialize Owl Carousel
    initCarousel();
    
    // Initialize Contact Form
    initContactForm();
    
    // Initialize Navigation
    setActiveNavItem();
    initMobileNav();
    
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

})(jQuery);
