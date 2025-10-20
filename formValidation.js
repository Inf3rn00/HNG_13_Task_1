    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Contact form validation
    const form = document.getElementById('contactForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const successMsg = document.querySelector('[data-testid="test-contact-success"]');

    const errorElements = {
      name: document.getElementById('error-name'),
      email: document.getElementById('error-email'),
      subject: document.getElementById('error-subject'),
      message: document.getElementById('error-message')
    };

    function validateEmail(value) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(value);
    }

    function showError(field, errorEl) {
      field.classList.add('error');
      errorEl.classList.add('show');
    }

    function hideError(field, errorEl) {
      field.classList.remove('error');
      errorEl.classList.remove('show');
    }

    function validateField(field, errorEl, validator) {
      if (validator()) {
        hideError(field, errorEl);
        return true;
      } else {
        showError(field, errorEl);
        return false;
      }
    }

    fullName.addEventListener('blur', () => {
      validateField(fullName, errorElements.name, () => fullName.value.trim() !== '');
    });

    email.addEventListener('blur', () => {
      validateField(email, errorElements.email, () => 
        email.value.trim() !== '' && validateEmail(email.value.trim())
      );
    });

    subject.addEventListener('blur', () => {
      validateField(subject, errorElements.subject, () => subject.value.trim() !== '');
    });

    message.addEventListener('blur', () => {
      validateField(message, errorElements.message, () => message.value.trim().length >= 10);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      successMsg.classList.remove('show');

      const isNameValid = validateField(
        fullName, 
        errorElements.name, 
        () => fullName.value.trim() !== ''
      );

      const isEmailValid = validateField(
        email, 
        errorElements.email, 
        () => email.value.trim() !== '' && validateEmail(email.value.trim())
      );

      const isSubjectValid = validateField(
        subject, 
        errorElements.subject, 
        () => subject.value.trim() !== ''
      );

      const isMessageValid = validateField(
        message, 
        errorElements.message, 
        () => message.value.trim().length >= 10
      );

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        successMsg.classList.add('show');
        form.reset();
        
        Object.values(errorElements).forEach(el => el.classList.remove('show'));
        [fullName, email, subject, message].forEach(field => field.classList.remove('error'));
      }
    });
