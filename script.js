const toggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeIcon.classList.toggle('fa-sun', isLight);
    themeIcon.classList.toggle('fa-moon', !isLight);
});