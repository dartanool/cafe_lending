# Ханой фуд — Landing Page

Статический одностраничный сайт сети вьетнамских ресторанов. HTML5, CSS3 и Vanilla JavaScript без сборщиков и фреймворков.

## Структура проекта

```
/
├── index.html          # Разметка страницы (hero, о нас, акции, меню, рестораны, footer, lightbox)
├── style.css           # Стили, адаптивность, карусели, вкладки ресторанов
├── script.js           # Навигация, меню, рестораны, карты, QR-коды, lightbox
├── locations.js        # Данные точек сети и страниц меню (главный файл для контента)
├── README.md
│
├── assets/
│   ├── favicon.svg
│   ├── images/         # Hero, постер и фото «О нас», фото ресторанов (b/, a/, m/…)
│   ├── menu/           # Страницы меню (JPEG/WebP)
│   └── video/          # Видео для блока «О нас» (например restaurant.mp4)
│
└── icons/              # SVG: логотип, иконки акций, соцсети
```

## Разделы сайта

| Блок | ID | Где править |
|------|-----|-------------|
| Главный экран | `#hero` | `index.html` (тексты), `style.css` (фон), кнопки ресторанов — из `locations.js` |
| О нас | `#about` | `index.html`, медиа в `assets/images/`, `assets/video/` |
| Акции (общие) | `#promotions` | `index.html` |
| Меню (картинки страниц) | `#menu` | `locations.js` → `window.HANOI_MENU` |
| Рестораны | `#locations` | `locations.js` → `window.HANOI_LOCATIONS` |

Навигация в шапке: **Главная**, **О нас**, **Акции**, **Меню**, **Рестораны**.

На каждую точку можно дать прямую ссылку: `https://ваш-сайт.ru/#loc-belorusskaya` (id задаётся в `locations.js`).

---

## Как изменить рестораны и контакты

Основной файл: **`locations.js`**.

### Добавить или изменить точку

В массиве `window.HANOI_LOCATIONS` каждый ресторан — объект с полями:

| Поле | Назначение |
|------|------------|
| `id` | Латиница без пробелов, для ссылки `#loc-{id}` |
| `short` | Короткое имя (вкладка, кнопка на hero) |
| `name`, `description` | Заголовок и текст панели |
| `metro`, `address`, `phone`, `email` | Контакты |
| `hours` | Массив пар `[['Подпись', '10:00 – 22:00'], …]` |
| `photos` | Пути к фото карусели, например `'assets/images/b/b-1.jpeg'` |
| `map` | Карта Яндекса (см. ниже) |

**Новая точка:** скопируйте блок `{ … }`, измените `id` и данные, добавьте фото в `assets/images/`.

**Удалить точку:** удалите соответствующий объект из массива.

### Карта (Яндекс)

В объекте `map`:

- **`query`** — поиск по тексту («название + адрес»), если нет `orgId`.
- **`orgId`** — номер организации на [Яндекс.Картах](https://yandex.ru/maps) (из URL: `…/org/…/198904300384/` → `198904300384`).
- **`lat`**, **`lng`** — координаты (опционально, для маршрута и уточнения карты).
- **`embedUrl`** — свой URL iframe, если нужен полный контроль.

Кнопка «Построить маршрут» формируется в `script.js` из тех же данных.

### Telegram и QR-код

В начале `locations.js`:

```javascript
window.HANOI_TELEGRAM_URL = 'https://t.me/hanoi_foodmsk';
```

Рядом с телефоном в карточке ресторана показывается QR-код на этот URL (библиотека QRCode с CDN).

---

## Как изменить меню

В **`locations.js`**, объект **`window.HANOI_MENU`**:

```javascript
window.HANOI_MENU = {
  pages: [
    'assets/menu/business-lunch.jpeg',
    'assets/menu/menu-1.jpeg',
    // … добавляйте страницы по порядку
  ],
};
```

- Положите файлы в **`assets/menu/`**.
- Рекомендуемая ширина страниц: от **1600 px**, формат JPG или WebP.
- На сайте: горизонтальная карусель; по клику — полноэкранный просмотр (lightbox) с листанием и увеличением.

Разметка меню в `index.html` только контейнер `#menu-standalone` — содержимое строит `script.js`.

---

## Как изменить акции

**Общие акции** для всей сети — секция `#promotions` в **`index.html`** (карточки `.promo-card`).

**Акции одной точки** — массив `promos` внутри объекта ресторана в **`locations.js`** (поля `icon`, `title`, `text`, `badge`). В `locations.js` есть закомментированный пример `window.COMMON_PROMOS` для справки.

---

## Как заменить изображения и видео

### Hero (фон первого экрана)

В **`style.css`**, блок `.hero`:

```css
background: url("assets/images/hero-laptop.jpg") center / cover no-repeat;
```

На узких экранах используется `hero-mobile.jpg` (медиазапрос в том же файле).

### Блок «О нас»

В **`index.html`**:

- Видео: `assets/video/restaurant.mp4`, постер `assets/images/about-poster.jpg`.
- На мобильных показывается статичное изображение `.about__mobile-image` (тот же постер).

### Фото ресторанов

Пути в **`locations.js`** → `photos` каждой точки. Храните файлы, например:

- `assets/images/b/` — Белорусская  
- `assets/images/a/` — Автозаводская  
- `assets/images/m/` — Марксистская  

### Open Graph

В `<head>` **`index.html`**:

```html
<meta property="og:image" content="https://ваш-домен.ru/assets/images/og-preview.jpg">
```

---

## Как изменить тексты и SEO

Файл **`index.html`**:

- `<title>`, `description`, `keywords`, Open Graph (`og:title`, `og:description`, `og:url`).
- Тексты hero, блока «О нас», акций, footer.
- Ссылки соцсетей в footer (сейчас Instagram и Telegram).

Название бренда: **«Ханой фуд»** / **«Ханой Фуд»** — в шапке, hero, footer, copyright.

---

## Как заменить цвета

В начале **`style.css`**, блок `:root`:

```css
:root {
  --color-primary: #0B1E0F;
  --color-primary-light: #1C3019;
  --color-accent: #BD8443;
  --color-accent-dark: #A66F35;
  --color-olive: #77693B;
  --color-beige: #F2EEE1;
  --color-text: #0B1E0F;
  --color-text-light: #77693B;
  --color-bg: #F2EEE1;
  --color-bg-alt: #FFFFFF;
  /* … */
}
```

Шрифты: **Playfair Display** (заголовки), **Inter** (текст) — подключены в `index.html` через Google Fonts.

---

## Как загрузить сайт на хостинг через FTP

1. Подключитесь к хостингу (FileZilla, Cyberduck и т.п.): хост, логин, пароль, порт **21** (или SFTP по инструкции провайдера).
2. Откройте корень сайта: `public_html`, `www` или `htdocs`.
3. Загрузите **все** файлы и папки:
   - `index.html`, `style.css`, `script.js`, `locations.js`
   - `assets/` (включая `images/`, `menu/`, `video/`)
   - `icons/`
4. Убедитесь, что `index.html` в корне домена.
5. Проверьте меню, переключение ресторанов, карты и мобильную версию.

---

## Какие файлы редактировать

| Задача | Файл |
|--------|------|
| Рестораны, телефоны, часы, фото точек, страницы меню, Telegram URL | `locations.js` |
| Тексты hero, «О нас», общие акции, SEO, соцсети | `index.html` |
| Цвета, фоны hero, вёрстка, адаптив | `style.css` |
| Поведение (скролл, вкладки, карусели, lightbox, карты, QR) | `script.js` |
| Логотип и иконки | `icons/` |
| Фото, видео, сканы меню | `assets/` |
| Favicon | `assets/favicon.svg` |

---

## Используемые технологии

- **HTML5** — семантическая разметка, `<dialog>` для просмотра меню
- **CSS3** — Flexbox, Grid, CSS Variables, адаптив (desktop / tablet / mobile)
- **JavaScript (ES6)** — без React/Vue и сборщиков
- **Google Fonts** — Playfair Display, Inter
- **AOS 2.3.4** (CDN) — анимации при прокрутке
- **qrcode 1.5.1** (jsDelivr) — QR-коды на Telegram
- **Яндекс.Карты** — embed iframe без API-ключа
