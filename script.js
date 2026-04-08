const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const contactForm = document.getElementById('contactForm');
const contactFormStatus = document.getElementById('contactFormStatus');

navToggle?.addEventListener('click', () => {
  siteNav?.classList.toggle('open');
});

window.addEventListener('resize', () => {
  siteNav?.classList.remove('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav?.classList.remove('open');
  });
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactFormStatus) return;

  const name = event.target.contactName.value.trim();
  const email = event.target.contactEmail.value.trim();
  const message = event.target.contactMessage.value.trim();
  contactFormStatus.className = 'form-status';

  if (!name || !email || !message) {
    contactFormStatus.textContent = 'Please fill in all required fields.';
    contactFormStatus.classList.add('error');
    return;
  }

  contactFormStatus.textContent = 'Sending message...';

  window.setTimeout(() => {
    const preview = message.length > 120 ? `${message.slice(0, 120)}…` : message;
    contactFormStatus.textContent = `Thanks ${name}! Your note has been submitted and will be reviewed by the executive team. "${preview}"`;
    contactFormStatus.classList.add('success');
    event.target.reset();
  }, 800);
});

const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const navLink = document.querySelector(`.site-nav a[href="#${id}"]`);
      if (navLink) {
        navLink.classList.toggle('active', entry.isIntersecting);
      }
    });
  },
  { threshold: 0.45 }
);

sections.forEach((section) => observer.observe(section));
