// ========================================
// Forms Module - Contact Form Handler
// ========================================

export function initContactForm() {
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
    
    // AJAX request to send form
    $.ajax({
      url: 'send-contact.php',
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
