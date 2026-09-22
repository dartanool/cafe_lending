
    /**
     * Ханой фуд — Основной скрипт
     *
     * 1. Шапка, бургер-меню, плавный скролл, подсветка раздела
     * 2. Рестораны: кнопки в hero, вкладки, панели (данные — в locations.js)
     * 3. Просмотр меню: карусель страниц + полноэкранный просмотр с увеличением
     */

    (function () {
      'use strict';

      /* --- DOM Elements --- */
      const header = document.getElementById('header');
      const burger = document.getElementById('burger');
      const nav = document.getElementById('nav');
      const navLinks = document.querySelectorAll('.header__link');
      const sections = document.querySelectorAll('section[id]');

      const LOCATIONS = window.HANOI_LOCATIONS || [];

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
        header.classList.toggle('header--scrolled', window.scrollY > 60);
      }

      window.addEventListener('scroll', handleHeaderScroll, { passive: true });
      handleHeaderScroll();

      /* ============================================================
         MOBILE MENU — Бургер-меню
         ============================================================ */
      function setMenuOpen(isOpen) {
        nav.classList.toggle('header__nav--open', isOpen);
        burger.classList.toggle('header__burger--active', isOpen);
        // Пока меню открыто, шапка всегда со сплошным фоном
        header.classList.toggle('header--menu-open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      }

      function closeMenu() {
        setMenuOpen(false);
      }

      burger.addEventListener('click', function () {
        setMenuOpen(!nav.classList.contains('header__nav--open'));
      });

      /* ============================================================
         SMOOTH SCROLL — Плавная прокрутка к секциям
         ============================================================ */
      function scrollToElement(target, gap) {
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight - (gap || 0);
        window.scrollTo({ top: top, behavior: 'smooth' });
      }

      function smoothScrollTo(targetId) {
        scrollToElement(document.getElementById(targetId));
      }

      navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
          const href = this.getAttribute('href');

          if (href && href.startsWith('#')) {
            e.preventDefault();
            closeMenu(); // сначала снимаем блокировку прокрутки, потом скроллим
            smoothScrollTo(href.slice(1));
          }
        });
      });

      /* Остальные якорные ссылки (кнопки в hero, логотип в футере и т.д.) */
      document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        if (anchor.classList.contains('header__link')) return;
        if (anchor.hasAttribute('data-location')) return; // их обрабатывает блок «Рестораны»

        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href === '#') return;

          e.preventDefault();
          smoothScrollTo(href.slice(1));
        });
      });

      /* ============================================================
         ACTIVE LINK — Подсветка текущего раздела в навигации
         ============================================================ */
      function setActiveLink() {
        const scrollPos = window.scrollY + header.offsetHeight + 100;
        let currentSection = '';

        sections.forEach(function (section) {
          const top = section.offsetTop;
          if (scrollPos >= top && scrollPos < top + section.offsetHeight) {
            currentSection = section.getAttribute('id');
          }
        });

        navLinks.forEach(function (link) {
          link.classList.toggle(
              'header__link--active',
              link.getAttribute('href') === '#' + currentSection
          );
        });
      }

      window.addEventListener('scroll', setActiveLink, { passive: true });
      setActiveLink();

      /* ============================================================
         RESIZE — Закрытие меню при изменении размера окна
         ============================================================ */
      window.addEventListener('resize', function () {
        if (window.innerWidth > 768) closeMenu();
      });


      /* ============================================================
         РЕСТОРАНЫ — helpers
         ============================================================ */

      /** Экранирует спецсимволы, чтобы данные из locations.js не сломали разметку */
      function esc(value) {
        return String(value).replace(/[&<>"']/g, function (ch) {
          return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
      }

      /** "+7 (495) 111-11-11" → "tel:+74951111111" */
      function telHref(phone) {
        return 'tel:' + String(phone).replace(/[^\d+]/g, '');
      }

      /** Адрес для iframe с картой (Яндекс.Карты по координатам или свой embedUrl) */
      function mapEmbedSrc(loc) {
        if (loc.map.embedUrl) return loc.map.embedUrl;
        // В Яндексе порядок «долгота, широта»
        const point = loc.map.lng + '%2C' + loc.map.lat;
        return 'https://yandex.ru/map-widget/v1/?ll=' + point + '&z=16&pt=' + point + '%2Cpm2rdm';
      }

      /** Ссылка «Построить маршрут» — откроет Яндекс.Карты / приложение на телефоне */
      function routeHref(loc) {
        return 'https://yandex.ru/maps/?rtext=~' + loc.map.lat + '%2C' + loc.map.lng + '&rtt=auto';
      }

      /* ============================================================
         РЕСТОРАНЫ — разметка
         ============================================================ */
      const heroList = document.getElementById('hero-locations');
      const tabsEl = document.getElementById('loc-tabs');
      const panelsEl = document.getElementById('loc-panels');

      const CHEVRON =
          '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">' +
          '<path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';

      function renderHeroButton(loc) {
        return (
            '<li>' +
            '<a class="loc-btn" href="#locations" data-location="' + esc(loc.id) + '">' +
            '<span class="loc-btn__name">' + esc(loc.short) + '</span>' +
            '<span class="loc-btn__address">' + esc(loc.address) + '</span>' +
            '<span class="loc-btn__arrow">' + CHEVRON + '</span>' +
            '</a>' +
            '</li>'
        );
      }

      function renderTab(loc) {
        return (
            '<button class="loc-tab" type="button" role="tab"' +
            ' id="tab-' + esc(loc.id) + '"' +
            ' aria-controls="panel-' + esc(loc.id) + '"' +
            ' aria-selected="false" tabindex="-1"' +
            ' data-tab="' + esc(loc.id) + '">' + esc(loc.short) + '</button>'
        );
      }

      function renderPanel(loc) {
        const id = esc(loc.id);
        const pages = loc.menu.pages;

        const hours = loc.hours.map(function (row) {
          return '<span class="loc-info__hours-row"><span>' + esc(row[0]) + '</span><span>' + esc(row[1]) + '</span></span>';
        }).join('');

        const slides = pages.map(function (src, i) {
          return (
              '<button class="menu-slide" type="button" data-index="' + i + '"' +
              ' aria-label="Страница меню ' + (i + 1) + ' из ' + pages.length + ': открыть крупно">' +
              '<img src="' + esc(src) + '" alt="Меню ' + esc(loc.short) + ', страница ' + (i + 1) + '"' +
              ' loading="lazy" decoding="async">' +
              '</button>'
          );
        }).join('');

        const pdfLink = loc.menu.pdf
            ? '<a class="btn btn--outline btn--sm" href="' + esc(loc.menu.pdf) + '" target="_blank" rel="noopener">Открыть PDF</a>'
            : '';

        return (
            '<div class="loc-panel" role="tabpanel" id="panel-' + id + '" aria-labelledby="tab-' + id + '" data-panel="' + id + '" hidden>' +

            '<div class="loc-panel__head">' +
            '<h3 class="loc-panel__title">' + esc(loc.name) + '</h3>' +
            (loc.description ? '<p class="loc-panel__desc">' + esc(loc.description) + '</p>' : '') +
            '</div>' +

            '<div class="loc-panel__grid">' +
            '<div class="loc-info">' +
            '<ul class="loc-info__list">' +
            '<li class="loc-info__item"><span class="loc-info__label">Адрес</span>' +
            '<address class="loc-info__value">' + esc(loc.address) + '</address></li>' +
            '<li class="loc-info__item"><span class="loc-info__label">Телефон</span>' +
            '<a class="loc-info__value loc-info__link" href="' + esc(telHref(loc.phone)) + '">' + esc(loc.phone) + '</a></li>' +
            '<li class="loc-info__item"><span class="loc-info__label">Email</span>' +
            '<a class="loc-info__value loc-info__link" href="mailto:' + esc(loc.email) + '">' + esc(loc.email) + '</a></li>' +
            '<li class="loc-info__item"><span class="loc-info__label">Часы работы</span>' +
            '<span class="loc-info__value loc-info__hours">' + hours + '</span></li>' +
            '</ul>' +
            '<div class="loc-info__actions">' +
            '<a class="btn btn--primary" href="' + esc(telHref(loc.phone)) + '">Позвонить</a>' +
            '<a class="btn btn--outline" href="' + esc(routeHref(loc)) + '" target="_blank" rel="noopener">Построить маршрут</a>' +
            '</div>' +
            '</div>' +

            '<div class="loc-map">' +
            '<iframe src="' + esc(mapEmbedSrc(loc)) + '"' +
            ' title="Карта: ' + esc(loc.name) + '"' +
            ' loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
            '</div>' +
            '</div>' +

            '<div class="loc-menu">' +
            '<div class="loc-menu__head">' +
            '<div>' +
            '<h4 class="loc-menu__title">Меню</h4>' +
            '<p class="loc-menu__hint">Листайте и нажмите на страницу, чтобы рассмотреть крупно</p>' +
            '</div>' +
            pdfLink +
            '</div>' +
            '<div class="menu-viewer">' +
            '<button class="menu-viewer__btn menu-viewer__btn--prev" type="button" data-dir="-1" aria-label="Листать влево">' +
            '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>' +
            '</button>' +
            '<div class="menu-viewer__track" tabindex="0" role="region" aria-label="Страницы меню: ' + esc(loc.short) + '">' + slides + '</div>' +
            '<button class="menu-viewer__btn menu-viewer__btn--next" type="button" data-dir="1" aria-label="Листать вправо">' +
            '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>' +
            '</button>' +
            '</div>' +
            '</div>' +

            '</div>'
        );
      }

      /* ============================================================
         ПРОСМОТР МЕНЮ — карусель (scroll-snap) внутри панели
         ============================================================ */
      function initMenuViewer(panel, loc) {
        const track = panel.querySelector('.menu-viewer__track');
        const btnPrev = panel.querySelector('.menu-viewer__btn--prev');
        const btnNext = panel.querySelector('.menu-viewer__btn--next');

        function slideStep() {
          const first = track.querySelector('.menu-slide');
          const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
          return first ? first.offsetWidth + gap : track.clientWidth;
        }

        function updateArrows() {
          const max = track.scrollWidth - track.clientWidth;
          btnPrev.disabled = track.scrollLeft <= 2;
          btnNext.disabled = track.scrollLeft >= max - 2;
        }

        let ticking = false;
        track.addEventListener('scroll', function () {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(function () {
            updateArrows();
            ticking = false;
          });
        }, { passive: true });

        // Стрелки: листаем на столько страниц, сколько сейчас видно
        panel.querySelectorAll('.menu-viewer__btn').forEach(function (btn) {
          btn.addEventListener('click', function () {
            const step = slideStep();
            const visible = Math.max(1, Math.floor(track.clientWidth / step));
            track.scrollBy({ left: Number(btn.dataset.dir) * step * visible, behavior: 'smooth' });
          });
        });

        // Клик по странице — открыть крупно
        track.addEventListener('click', function (e) {
          const slide = e.target.closest('.menu-slide');
          if (slide) openLightbox(loc, Number(slide.dataset.index), track);
        });

        // Вызывается, когда панель становится видимой (у скрытой панели ширина = 0)
        panel._updateArrows = updateArrows;
        updateArrows();
      }

      /* ============================================================
         ПРОСМОТР МЕНЮ — полноэкранный просмотр с увеличением
         ============================================================ */
      const lb = {
        dlg: document.getElementById('lightbox'),
        stage: document.getElementById('lb-stage'),
        img: document.getElementById('lb-img'),
        counter: document.getElementById('lb-counter'),
        pdf: document.getElementById('lb-pdf'),
        prev: document.getElementById('lb-prev'),
        next: document.getElementById('lb-next'),
        close: document.getElementById('lb-close'),
        loc: null,
        track: null,
        index: 0,
        zoomed: false
      };

      function openLightbox(loc, index, track) {
        lb.loc = loc;
        lb.track = track;

        if (loc.menu.pdf) {
          lb.pdf.href = loc.menu.pdf;
          lb.pdf.hidden = false;
        } else {
          lb.pdf.hidden = true;
        }

        showPage(index);
        lb.dlg.showModal();
        document.body.style.overflow = 'hidden';
      }

      function showPage(i) {
        const pages = lb.loc.menu.pages;
        lb.index = (i + pages.length) % pages.length;
        lb.img.src = pages[lb.index];
        lb.img.alt = 'Меню ' + lb.loc.short + ', страница ' + (lb.index + 1);
        lb.counter.textContent = lb.loc.short + ' · страница ' + (lb.index + 1) + ' из ' + pages.length;
        setZoom(false);
      }

      /**
       * Приближение: картинка становится крупнее области просмотра,
       * а область получает прокрутку — двигать страницу можно пальцем/колёсиком.
       * Точка, на которую нажали, остаётся под пальцем.
       */
      function setZoom(on, evt) {
        let rx = 0.5;
        let ry = 0.5;

        if (on && evt) {
          const r = lb.img.getBoundingClientRect();
          rx = (evt.clientX - r.left) / r.width;
          ry = (evt.clientY - r.top) / r.height;
        }

        lb.zoomed = on;
        lb.dlg.classList.toggle('lightbox--zoomed', on);

        if (on) {
          lb.stage.scrollLeft = rx * lb.img.offsetWidth - lb.stage.clientWidth / 2;
          lb.stage.scrollTop = ry * lb.img.offsetHeight - lb.stage.clientHeight / 2;
        } else {
          lb.stage.scrollLeft = 0;
          lb.stage.scrollTop = 0;
        }
      }

      lb.img.addEventListener('click', function (e) {
        setZoom(!lb.zoomed, e);
      });

      lb.prev.addEventListener('click', function () { showPage(lb.index - 1); });
      lb.next.addEventListener('click', function () { showPage(lb.index + 1); });
      lb.close.addEventListener('click', function () { lb.dlg.close(); });

      // Клавиатура: стрелки листают (Esc закрывает <dialog> сам)
      document.addEventListener('keydown', function (e) {
        if (!lb.dlg.open) return;
        if (e.key === 'ArrowLeft') showPage(lb.index - 1);
        if (e.key === 'ArrowRight') showPage(lb.index + 1);
      });

      // Свайп влево/вправо на телефоне (только когда нет увеличения)
      let touchX = 0;
      let touchY = 0;

      lb.stage.addEventListener('touchstart', function (e) {
        if (lb.zoomed || e.touches.length !== 1) return;
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
      }, { passive: true });

      lb.stage.addEventListener('touchend', function (e) {
        if (lb.zoomed) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touchX;
        const dy = t.clientY - touchY;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          showPage(lb.index + (dx < 0 ? 1 : -1));
        }
      }, { passive: true });

      // При закрытии: снимаем блокировку и подводим карусель к последней просмотренной странице
      lb.dlg.addEventListener('close', function () {
        document.body.style.overflow = '';
        setZoom(false);

        if (lb.track) {
          const slide = lb.track.children[lb.index];
          if (slide) lb.track.scrollTo({ left: slide.offsetLeft - 4, behavior: 'instant' });
        }
      });

      /* ============================================================
         РЕСТОРАНЫ — вкладки, панели, ссылки
         ============================================================ */
      const HASH_PREFIX = '#loc-';
      let tabs = [];
      let panels = [];

      function selectLocation(id, opts) {
        opts = opts || {};
        const loc = LOCATIONS.find(function (l) { return l.id === id; }) || LOCATIONS[0];
        if (!loc) return;

        tabs.forEach(function (tab) {
          const on = tab.dataset.tab === loc.id;
          tab.classList.toggle('loc-tab--active', on);
          tab.setAttribute('aria-selected', String(on));
          tab.tabIndex = on ? 0 : -1;
        });

        panels.forEach(function (panel) {
          const on = panel.dataset.panel === loc.id;
          panel.hidden = !on;
          if (on && panel._updateArrows) panel._updateArrows();
        });

        // Обновляем адрес страницы, чтобы ссылкой на ресторан можно было поделиться
        if (opts.updateHash) {
          try {
            history.replaceState(null, '', HASH_PREFIX + loc.id);
          } catch (err) { /* например, при открытии файла с диска */ }
        }
      }

      function initLocations() {
        if (!LOCATIONS.length) return;

        heroList.innerHTML = LOCATIONS.map(renderHeroButton).join('');
        tabsEl.innerHTML = LOCATIONS.map(renderTab).join('');
        panelsEl.innerHTML = LOCATIONS.map(renderPanel).join('');

        tabs = Array.from(tabsEl.querySelectorAll('.loc-tab'));
        panels = Array.from(panelsEl.querySelectorAll('.loc-panel'));

        panels.forEach(function (panel, i) {
          initMenuViewer(panel, LOCATIONS[i]);
        });

        // Если ресторан один, вкладки не нужны
        tabsEl.hidden = LOCATIONS.length < 2;

        // Клик по вкладке
        tabsEl.addEventListener('click', function (e) {
          const tab = e.target.closest('.loc-tab');
          if (tab) selectLocation(tab.dataset.tab, { updateHash: true });
        });

        // Стрелки ← → между вкладками
        tabsEl.addEventListener('keydown', function (e) {
          if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
          const current = tabs.findIndex(function (t) { return t.tabIndex === 0; });
          const next = (current + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
          tabs[next].focus();
          selectLocation(tabs[next].dataset.tab, { updateHash: true });
        });

        // Клик по любой ссылке с data-location (кнопки в hero): выбрать точку и прокрутить
        document.addEventListener('click', function (e) {
          const link = e.target.closest('[data-location]');
          if (!link) return;
          e.preventDefault();
          closeMenu();
          selectLocation(link.dataset.location, { updateHash: true });
          scrollToElement(tabsEl.hidden ? document.getElementById('locations') : tabsEl, 16);
        });

        // Открытие по прямой ссылке вида  сайт/#loc-arbat
        const fromHash = location.hash.indexOf(HASH_PREFIX) === 0 ? location.hash.slice(HASH_PREFIX.length) : null;
        selectLocation(fromHash || LOCATIONS[0].id);

        if (fromHash) {
          window.addEventListener('load', function () {
            scrollToElement(tabsEl, 16);
          });
        }

        // Кнопки «назад/вперёд» и ручная правка адреса
        window.addEventListener('hashchange', function () {
          if (location.hash.indexOf(HASH_PREFIX) === 0) {
            selectLocation(location.hash.slice(HASH_PREFIX.length));
          }
        });
      }

      initLocations();

    })();