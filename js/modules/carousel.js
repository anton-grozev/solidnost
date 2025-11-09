// ========================================
// Carousel Module - Owl Carousel Slider
// ========================================

export function initCarousel() {
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
