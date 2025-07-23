document.addEventListener('DOMContentLoaded', () => {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const sections = document.querySelectorAll('.menu-section');

  function showSection(targetId) {
    sections.forEach(section => {
      if (section.id === targetId) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    categoryButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === targetId);
    });
  }

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showSection(btn.dataset.target);
    });
  });
});
