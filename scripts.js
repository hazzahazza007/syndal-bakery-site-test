// Hamburger toggle for mobile nav menu
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !expanded);
  navMenu.classList.toggle('nav-menu-visible');
});

// Sticky header shadow and logo fade on scroll
const header = document.getElementById('site-header');
const logo = document.querySelector('.header-logo');

window.addEventListener('scroll', () => {
  if (window.scrollY > 15) {
    header.classList.add('scrolled');
    logo.style.opacity = '0.7';
  } else {
    header.classList.remove('scrolled');
    logo.style.opacity = '1';
  }
});

// Initialize Animate on Scroll (AOS)
AOS.init({
  duration: 700,
  once: true,
});
