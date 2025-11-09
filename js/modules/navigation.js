// ========================================
// Navigation Module - Active states & Mobile
// ========================================

export function setActiveNavItem() {
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

export function initMobileNav() {
  // Close mobile menu when nav link is clicked
  $('.navbar-nav .nav-link').on('click', function() {
    if ($(window).width() < 992) {
      $('.navbar-collapse').collapse('hide');
    }
  });
}
