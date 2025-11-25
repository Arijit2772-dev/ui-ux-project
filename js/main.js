document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollAnimations();
  initFooterYear();
  initBiosLoader();
});

function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const themeIcon = document.querySelector('.theme-icon');

  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'neon' : 'dark';

      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme, themeIcon);
    });
  }
}

function updateThemeIcon(theme, iconElement) {
  if (iconElement) {
    iconElement.textContent = theme === 'dark' ? '🌙' : '✨';
  }
}

function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
}


function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    fadeElements.forEach(el => {
      observer.observe(el);
    });
  } else {
    fadeElements.forEach(el => {
      el.classList.add('visible');
    });
  }
}

function initFooterYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function initBiosLoader() {
  const biosLoader = document.getElementById('bios-loader');

  if (!biosLoader) return;

  const biosText = document.getElementById('bios-text');
  const bootSequence = [
    'Booting Arijit OS...',
    'Initializing systems...',
    'Loading portfolio modules...',
    'Checking memory...',
    'Mounting file systems...',
    'Starting network services...',
    'Ready.'
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentLine = '';

  function typeWriter() {
    if (lineIndex < bootSequence.length) {
      if (charIndex < bootSequence[lineIndex].length) {
        currentLine += bootSequence[lineIndex][charIndex];
        charIndex++;

        const displayText = bootSequence.slice(0, lineIndex).join('\n') +
          (lineIndex > 0 ? '\n' : '') + currentLine;
        biosText.textContent = displayText;

        setTimeout(typeWriter, 30);
      } else {
        charIndex = 0;
        currentLine = '';
        lineIndex++;
        setTimeout(typeWriter, 200);
      }
    } else {
      setTimeout(() => {
        biosLoader.classList.add('hidden');
        setTimeout(() => {
          biosLoader.style.display = 'none';
        }, 500);
      }, 500);
    }
  }

  typeWriter();
}
