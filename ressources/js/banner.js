  // Показ банеру при завантаженні сторінки
  window.addEventListener('load', () => {
    const banner = document.getElementById('banner-overlay');
    banner.style.display = 'flex';
  });

  // Закриття банеру
  document.getElementById('close-banner').addEventListener('click', () => {
    const banner = document.getElementById('banner-overlay');
    banner.style.opacity = '0';
    setTimeout(() => banner.remove(), 10);
  });
