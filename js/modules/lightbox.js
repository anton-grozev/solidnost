// ========================================
// Lightbox Module - SimpleLightbox Gallery
// ========================================

export function initLightbox() {
  if ($('.lightbox').length) {
    $('.lightbox').simpleLightbox({
      nav: true,
      showCounter: true,
      enableKeyboard: true,
      docClose: true
    });
  }
}
