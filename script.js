/**
 * Verde Café — Основной скрипт
 * Плавный скролл, навигация, анимации AOS
 */

(function () {
  'use strict';

  /* --- DOM Elements --- */
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.header__link');
  const sections = document.querySelectorAll('section[id]');

  /* ============================================================
     AOS — Анимации при прокрутке
     ============================================================ */
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80
  });

  /* ============================================================
     HEADER — Эффект при прокрутке
     ============================================================ */
  function handleHeaderScroll() {
    if (window.scrollY > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ============================================================
     MOBILE MENU — Бургер-меню
     ============================================================ */
  function toggleMenu() {
    const isOpen = nav.classList.toggle('header__nav--open');
    burger.classList.toggle('header__burger--active', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    nav.classList.remove('header__nav--open');
    burger.classList.remove('header__burger--active');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', toggleMenu);

  /* ============================================================
     SMOOTH SCROLL — Плавная прокрутка к секциям
     ============================================================ */
  function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const headerHeight = header.offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.slice(1);
        smoothScrollTo(targetId);
        closeMenu();
      }
    });
  });

  /* Также обрабатываем кнопки в hero и footer */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    if (anchor.classList.contains('header__link')) return;

    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const targetId = href.slice(1);
      smoothScrollTo(targetId);
    });
  });

  /* ============================================================
     ACTIVE LINK — Подсветка текущего раздела в навигации
     ============================================================ */
  function setActiveLink() {
    const scrollPos = window.scrollY + header.offsetHeight + 100;

    let currentSection = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('header__link--active');

      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('header__link--active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ============================================================
     RESIZE — Закрытие меню при изменении размера окна
     ============================================================ */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

})();
