/**
 * Ханой фуд — Основной скрипт
 *
 * 1. Шапка, бургер-меню, плавный скролл, подсветка раздела
 * 2. Общее меню сети: карусель страниц + полноэкранный просмотр (данные — window.HANOI_MENU)
 * 3. Рестораны: кнопки в hero, вкладки, панели с контактами и картой (данные — window.HANOI_LOCATIONS)
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
  const MENU = window.HANOI_MENU || null;

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
    const target = document.getElementById(targetId);
    if (!target) return;
    // Верхний внутренний отступ секции пропускаем: заголовок оказывается сразу под шапкой
    const pad = parseFloat(getComputedStyle(target).paddingTop) || 0;
    scrollToElement(target, -Math.max(0, pad - 24));
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
     ОБЩИЕ ПОМОЩНИКИ
     ============================================================ */

  /** Экранирует спецсимволы, чтобы данные из locations.js не сломали разметку */
  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  /** "+7 (920) 228-55-83" → "tel:+79202285583" */
  function telHref(phone) {
    return 'tel:' + String(phone).replace(/[^\d+]/g, '');
  }

  /**
   * Яндекс.Карта (без API-ключа), данные берутся из loc.map:
   *   embedUrl  — готовая ссылка iframe из Конструктора Яндекс.Карт (приоритет);
   *   lat + lng — координаты: карта с точной меткой;
   *   query     — адрес текстом: Яндекс сам найдёт место.
   */
  function hasCoords(loc) {
    return loc.map && typeof loc.map.lat === 'number' && typeof loc.map.lng === 'number';
  }

  function mapEmbedSrc(loc) {
    const map = loc.map || {};
    const base = 'https://yandex.ru/map-widget/v1/?';

    if (map.embedUrl) return map.embedUrl;

    // Организация на Яндекс.Картах: на карте виден именно ресторан (название, рейтинг, карточка)
    if (map.orgId) {
      return base + 'mode=search&oid=' + encodeURIComponent(map.orgId) + '&ol=biz&z=16' +
             (hasCoords(loc) ? '&ll=' + encodeURIComponent(map.lng + ',' + map.lat) : '');
    }

    // Только точка по координатам (в Яндексе порядок «долгота, широта»)
    if (hasCoords(loc)) {
      const point = map.lng + ',' + map.lat;
      return base + 'll=' + encodeURIComponent(point) + '&z=16&pt=' + point + ',pm2rdm';
    }

    // Поиск по тексту «название + адрес»
    return base + 'mode=search&text=' + encodeURIComponent(map.query || loc.address) + '&z=16';
  }

  /** Ссылка «Построить маршрут» — откроет Яндекс.Карты (или приложение на телефоне) */
  function routeHref(loc) {
    if (loc.map && loc.map.orgId) {
      return 'https://yandex.ru/maps/org/' + encodeURIComponent(loc.map.orgId) + '/';
    }
    if (hasCoords(loc)) {
      return 'https://yandex.ru/maps/?rtext=~' + loc.map.lat + '%2C' + loc.map.lng + '&rtt=auto';
    }
    const query = (loc.map && loc.map.query) || loc.address;
    return 'https://yandex.ru/maps/?text=' + encodeURIComponent(query);
  }

  const ARROW_LEFT =
    '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">' +
    '<path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
  const ARROW_RIGHT =
    '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">' +
    '<path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';


  /* ============================================================
     ОБЩЕЕ МЕНЮ — рендер карусели страниц (одна на весь сайт)
     ============================================================ */
  function renderMenuSlides(pages, labelPrefix, isPhoto) {
    return pages.map(function (src, i) {
      return (
        '<button class="menu-slide' + (isPhoto ? ' menu-slide--photo' : '') + '" type="button" data-index="' + i + '"' +
        ' aria-label="' + (isPhoto ? 'Фото ' : 'Страница меню ') + (i + 1) + ' из ' + pages.length + ': открыть крупно">' +
          '<img src="' + esc(src) + '" alt="' + esc(labelPrefix) + (isPhoto ? ', фото ' : ', страница ') + (i + 1) + '"' +
          ' loading="lazy" decoding="async">' +
        '</button>'
      );
    }).join('');
  }

  function initMenu() {
    if (!MENU || !MENU.pages || !MENU.pages.length) return;

    const host = document.getElementById('menu-standalone');
    if (!host) return;

    host.innerHTML =
      '<div class="menu-head">' +
        '<p class="menu-head__hint">Листайте и нажмите на страницу, чтобы рассмотреть крупно</p>' +
      '</div>' +
      '<div class="menu-viewer">' +
        '<button class="menu-viewer__btn menu-viewer__btn--prev" type="button" data-dir="-1" aria-label="Листать влево">' + ARROW_LEFT + '</button>' +
        '<div class="menu-viewer__track" tabindex="0" role="region" aria-label="Страницы меню">' + renderMenuSlides(MENU.pages, 'Меню') + '</div>' +
        '<button class="menu-viewer__btn menu-viewer__btn--next" type="button" data-dir="1" aria-label="Листать вправо">' + ARROW_RIGHT + '</button>' +
      '</div>';

    // Просмотрщик работает с тем же «lightbox», что и раньше — передаём meню как объект { short, menu }
    initMenuViewer(host, { short: 'Меню', menu: MENU });

    // Пересчитать стрелки при изменении размеров окна (иначе они «протухнут» на resize)
    window.addEventListener('resize', function () {
      if (host._updateArrows) host._updateArrows();
    });
  }

  /* ============================================================
     КАРУСЕЛЬ СТРАНИЦ МЕНЮ (scroll-snap)
     Используется как в общем разделе «Меню», так и (при желании)
     может быть переиспользована где угодно ещё — принимает
     контейнер с .menu-viewer__track/.menu-viewer__btn внутри.
     ============================================================ */
  function initMenuViewer(container, menuOwner) {
    const track = container.querySelector('.menu-viewer__track');
    const btnPrev = container.querySelector('.menu-viewer__btn--prev');
    const btnNext = container.querySelector('.menu-viewer__btn--next');
    if (!track) return;

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

    container.querySelectorAll('.menu-viewer__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const step = slideStep();
        const visible = Math.max(1, Math.floor(track.clientWidth / step));
        track.scrollBy({ left: Number(btn.dataset.dir) * step * visible, behavior: 'smooth' });
      });
    });

    // Клик по странице — открыть крупно
    track.addEventListener('click', function (e) {
      const slide = e.target.closest('.menu-slide');
      if (slide) openLightbox(menuOwner, Number(slide.dataset.index), track);
    });

    container._updateArrows = updateArrows;
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
    prev: document.getElementById('lb-prev'),
    next: document.getElementById('lb-next'),
    close: document.getElementById('lb-close'),
    owner: null,
    track: null,
    index: 0,
    zoomed: false
  };

  /* owner = { short, noun?, menu: { pages } } — и для меню, и для фото ресторана */
  function openLightbox(owner, index, track) {
    lb.owner = owner;
    lb.track = track;

    showPage(index);
    lb.dlg.showModal();
    document.body.style.overflow = 'hidden';
  }

  function showPage(i) {
    const pages = lb.owner.menu.pages;
    lb.index = (i + pages.length) % pages.length;
    lb.img.src = pages[lb.index];
    const noun = lb.owner.noun || 'страница';
    lb.img.alt = lb.owner.short + ', ' + noun + ' ' + (lb.index + 1);
    lb.counter.textContent = lb.owner.short + ' · ' + noun + ' ' + (lb.index + 1) + ' из ' + pages.length;
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

  initMenu();


  /* ============================================================
     РЕСТОРАНЫ — разметка (акции → фотографии → контакты и карта)
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

  function renderPromo(promo) {
    return (
      '<article class="promo-card">' +
        (promo.icon
          ? '<div class="promo-card__icon"><img src="' + esc(promo.icon) + '" alt="" width="48" height="48"></div>'
          : '') +
        '<h5 class="promo-card__title">' + esc(promo.title) + '</h5>' +
        '<p class="promo-card__text">' + esc(promo.text) + '</p>' +
        (promo.badge ? '<span class="promo-card__badge">' + esc(promo.badge) + '</span>' : '') +
      '</article>'
    );
  }

  const TELEGRAM_URL = window.HANOI_TELEGRAM_URL || '';

/**
 * Небольшой QR-код на Telegram-канал, встаёт рядом со строкой телефона.
 * Сам рисунок рисует библиотека QRCode — см. initQrCodes() ниже,
 * здесь только разметка с пустым <canvas>.
 */
function renderPhoneQr() {
  if (!TELEGRAM_URL) return '';
  return (
    '<div class="loc-info__qr">' +
      '<canvas class="loc-qr__canvas" data-qr-url="' + esc(TELEGRAM_URL) + '"' +
      ' width="64" height="64" aria-label="QR-код на Telegram-канал Ханой Фуд"></canvas>' +
      '<span class="loc-info__qr-label">Telegram</span>' +
    '</div>'
  );
}

  function renderPanel(loc) {
    const id = esc(loc.id);

    const hours = loc.hours.map(function (row) {
      return '<span class="loc-info__hours-row"><span>' + esc(row[0]) + '</span><span>' + esc(row[1]) + '</span></span>';
    }).join('');

    // 1) Акции ресторана
    const promosBlock = (loc.promos && loc.promos.length)
      ? '<div class="loc-block">' +
          '<h4 class="loc-block__title">Акции</h4>' +
          '<div class="promotions__grid">' + loc.promos.map(renderPromo).join('') + '</div>' +
        '</div>'
      : '';

    // 2) Фотографии ресторана (карусель)
    const photosBlock = (loc.photos && loc.photos.length)
      ? '<div class="loc-block">' +
          '<h4 class="loc-block__title">Фотографии</h4>' +
          '<div class="menu-viewer photo-viewer">' +
            '<button class="menu-viewer__btn menu-viewer__btn--prev" type="button" data-dir="-1" aria-label="Листать влево">' + ARROW_LEFT + '</button>' +
            '<div class="menu-viewer__track" tabindex="0" role="region" aria-label="Фотографии: ' + esc(loc.short) + '">' +
              renderMenuSlides(loc.photos, 'Ханой Фуд, ' + loc.short, true) +
            '</div>' +
            '<button class="menu-viewer__btn menu-viewer__btn--next" type="button" data-dir="1" aria-label="Листать вправо">' + ARROW_RIGHT + '</button>' +
          '</div>' +
        '</div>'
      : '';

    // 3) Контакты и карта
    const contactsBlock =
      '<div class="loc-block">' +
        '<h4 class="loc-block__title">Контакты и карта</h4>' +
        '<div class="loc-panel__grid">' +
          '<div class="loc-info">' +
            '<ul class="loc-info__list">' +
              (loc.metro ? '<li class="loc-info__item"><span class="loc-info__label">Метро</span>' +
                '<span class="loc-info__value">' + esc(loc.metro) + '</span></li>' : '') +
              '<li class="loc-info__item"><span class="loc-info__label">Адрес</span>' +
                '<address class="loc-info__value">' + esc(loc.address) + '</address></li>' +
              '<li class="loc-info__item loc-info__item--phone">' +
                '<div><span class="loc-info__label">Телефон</span>' +
                '<a class="loc-info__value loc-info__link" href="' + esc(telHref(loc.phone)) + '">' + esc(loc.phone) + '</a></div>' +
                renderPhoneQr() +
              '</li>' +
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
            ' title="Яндекс.Карта: ' + esc(loc.name) + '"' +
            ' loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
          '</div>' +
        '</div>' +
      '</div>';

    return (
      '<div class="loc-panel" role="tabpanel" id="panel-' + id + '" aria-labelledby="tab-' + id + '" data-panel="' + id + '" hidden>' +
        '<div class="loc-panel__head">' +
          '<h3 class="loc-panel__title">' + esc(loc.name) + '</h3>' +
          (loc.description ? '<p class="loc-panel__desc">' + esc(loc.description) + '</p>' : '') +
        '</div>' +
        promosBlock +
        photosBlock +
        contactsBlock +
      '</div>'
    );
  }

  /* ============================================================
     РЕСТОРАНЫ — вкладки, панели, ссылки
     ============================================================ */
  const HASH_PREFIX = '#loc-';
  let tabs = [];
  let panels = [];

  function updatePanelArrows(panel) {
    const viewer = panel.querySelector('.photo-viewer');
    if (viewer && viewer._updateArrows) viewer._updateArrows();
  }

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
      // У скрытой панели ширина 0 — стрелки карусели пересчитываем, когда она показана
      if (on) updatePanelArrows(panel);
    });

    // Обновляем адрес страницы, чтобы ссылкой на ресторан можно было поделиться
    if (opts.updateHash) {
      try {
        history.replaceState(null, '', HASH_PREFIX + loc.id);
      } catch (err) { /* например, при открытии файла с диска */ }
    }
  }
  /** После вставки разметки в DOM отрисовывает все канвасы с data-qr-url */
  function initQrCodes(root) {
    if (!window.QRCode) return;
    root.querySelectorAll('[data-qr-url]').forEach(function (canvas) {
      QRCode.toCanvas(
        canvas,
        canvas.dataset.qrUrl,
        { width: 104, margin: 1, color: { dark: '#0B1E0F', light: '#FFFFFF' } },
        function (err) { if (err) console.error('QR-код: не удалось отрисовать', err); }
      );
    });
  }

  function initLocations() {
    if (!LOCATIONS.length) return;

    heroList.innerHTML = LOCATIONS.map(renderHeroButton).join('');
    tabsEl.innerHTML = LOCATIONS.map(renderTab).join('');
    panelsEl.innerHTML = LOCATIONS.map(renderPanel).join('');

    // QR-коды на Telegram-канал (по одному на точку)
    initQrCodes(panelsEl);

    tabs = Array.from(tabsEl.querySelectorAll('.loc-tab'));
    panels = Array.from(panelsEl.querySelectorAll('.loc-panel'));

    // Карусель фотографий у каждого ресторана — своя
    panels.forEach(function (panel, i) {
      const viewer = panel.querySelector('.photo-viewer');
      if (!viewer) return;
      initMenuViewer(viewer, {
        short: LOCATIONS[i].short,
        noun: 'фото',
        menu: { pages: LOCATIONS[i].photos }
      });
    });

    window.addEventListener('resize', function () {
      panels.forEach(function (panel) {
        if (!panel.hidden) updatePanelArrows(panel);
      });
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

    // Открытие по прямой ссылке вида  сайт/#loc-belorusskaya
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


