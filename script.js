

// === Scroll suave entre seções ===


document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// === Animações de entrada (fade-in) ===
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.5});

sections.forEach(section => observer.observe(section));

// === Validação do formulário e envio com EmailJS ===
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

function showError(id, message) {
  const el = document.querySelector(`[data-error-for="${id}"]`);
  if (el) el.textContent = message || '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  let valid = true;
  
  if (!name) {
    showError('name', 'Por favor, informe seu nome.');
    valid = false;
  } else {
    showError('name', '');
  }

  if (!email || !email.includes('@')) {
    showError('email', 'Digite um e-mail válido.');
    valid = false;
  } else {
    showError('email', '');
  }

  if (!message || message.length < 10) {
    showError('message', 'Conte um pouco mais (mínimo 10 caracteres).');
    valid = false;
  } else {
    showError('message', '');
  }

  if (!valid) return;

  // Envio real via EmailJS
  emailjs.sendForm('service_w0rm5k9', 'template_yst274n', '#contact-form')
    .then(() => {
      feedback.textContent = 'Mensagem enviada com sucesso!';
      feedback.style.color = '#00d8ff';
      form.reset();
      setTimeout(() => feedback.textContent = '', 4000);
    }, (error) => {
      feedback.textContent = 'Erro ao enviar. Tente novamente.';
      feedback.style.color = '#ff6b6b';
      console.error('Erro:', error);
    });
});
