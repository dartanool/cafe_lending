# Verde Café — Landing Page

Статический одностраничный сайт для кафе. Создан на чистом HTML5, CSS3 и Vanilla JavaScript без сборщиков и фреймворков.

## Структура проекта

```
/
├── index.html          # Главная страница (вся разметка)
├── style.css           # Стили, адаптивность, анимации hover
├── script.js           # Навигация, скролл, AOS, мобильное меню
├── README.md           # Документация
│
├── images/             # Локальные изображения (замените заглушки)
├── icons/              # SVG-иконки (логотип, соцсети, акции)
└── assets/             # Favicon и прочие ресурсы
```

## Как открыть сайт локально

1. Скачайте или склонируйте проект.
2. Откройте файл `index.html` двойным кликом в браузере.

Или запустите локальный сервер (рекомендуется для корректной загрузки внешних изображений):

```bash
# Python 3
python3 -m http.server 8080

# Node.js (если установлен npx)
npx serve .
```

Затем откройте в браузере: `http://localhost:8080`

## Как заменить изображения

### Hero (фон главного экрана)

В файле `style.css` найдите блок `.hero` и замените URL:

```css
background: url('images/hero.jpg') center / cover no-repeat;
```

Положите файл `hero.jpg` в папку `images/`.

### Блок «О кафе»

В `index.html` найдите секцию `#about` и измените атрибут `src` у тега `<img>`:

```html
<img src="images/about.jpg" alt="Интерьер кафе" ...>
```

### Галерея

В секции `#gallery` замените URL у каждого `<img>`:

```html
<img src="images/gallery-1.jpg" alt="..." ...>
```

Рекомендуемый размер: 600×600 px или больше (квадрат).

### Open Graph (превью в соцсетях)

В `<head>` файла `index.html` измените:

```html
<meta property="og:image" content="images/og-preview.jpg">
```

## Как изменить меню

Откройте `index.html`, найдите секцию `#menu`. Каждая категория — это `<article class="menu-card">`.

Чтобы добавить позицию, скопируйте элемент списка:

```html
<li class="menu-card__item">
  <span class="menu-card__name">Название блюда</span>
  <span class="menu-card__price">300 ₽</span>
</li>
```

Чтобы добавить новую категорию, скопируйте целиком блок `<article class="menu-card">...</article>`.

## Как изменить контакты

В секции `#contacts` в `index.html` обновите:

| Поле | Где искать |
|------|------------|
| Адрес | `<address class="contacts__value">` |
| Телефон | `href="tel:..."` и текст ссылки |
| Email | `href="mailto:..."` и текст ссылки |
| Часы работы | `<span class="contacts__value">` в последнем пункте списка |

Кнопки «Позвонить» и «Написать» также используют `tel:` и `mailto:` — обновите их ссылки.

### Встроенная карта

Замените блок `.contacts__map-placeholder` на iframe с Яндекс.Картами или Google Maps:

```html
<div class="contacts__map">
  <iframe
    src="https://yandex.ru/map-widget/v1/..."
    width="100%"
    height="360"
    style="border:0;"
    allowfullscreen
    loading="lazy">
  </iframe>
</div>
```

## Как изменить акции

Секция `#promotions` в `index.html`. Каждая акция — `<article class="promo-card">`.

Измените заголовок (`.promo-card__title`), описание (`.promo-card__text`) и бейдж (`.promo-card__badge`).

## Как заменить цвета

Все цвета заданы через CSS-переменные в начале файла `style.css`:

```css
:root {
  --color-primary: #24452F;       /* основной тёмно-зелёный */
  --color-primary-light: #2E6B4A; /* светлее зелёный */
  --color-accent: #3A8A5C;        /* акцентный зелёный */
  --color-beige: #E8DCC8;         /* бежевый / песочный */
  --color-white: #FFFFFF;
  --color-text: #2D2D2D;
  --color-text-light: #5A5A5A;
  --color-bg: #F7F4EE;            /* светлый фон */
  --color-bg-alt: #FFFFFF;
}
```

Измените значения — цвета обновятся по всему сайту.

## Как изменить название кафе

Замените «Verde Café» в следующих местах файла `index.html`:

- `<title>` и meta-теги в `<head>`
- Логотип в шапке и футере (`.header__logo-text`, `.footer__logo`)
- Заголовок Hero (`.hero__title`)
- Копирайт в футере

## Как загрузить сайт на хостинг через FTP

1. Подключитесь к хостингу через FTP-клиент (FileZilla, Cyberduck и т.п.).
2. Введите данные от хостинг-провайдера: хост, логин, пароль, порт (обычно 21).
3. Перейдите в корневую папку сайта (`public_html`, `www` или `htdocs`).
4. Загрузите **все файлы и папки** проекта:
   - `index.html`
   - `style.css`
   - `script.js`
   - папки `images/`, `icons/`, `assets/`
5. Убедитесь, что `index.html` лежит в корне — он станет главной страницей.
6. Откройте ваш домен в браузере и проверьте работу сайта.

> **Совет:** если заменили picsum-заглушки на локальные фото, загрузите их в `images/` до публикации.

## Какие файлы редактировать

| Задача | Файл |
|--------|------|
| Тексты, меню, контакты, SEO | `index.html` |
| Цвета, шрифты, отступы, адаптив | `style.css` |
| Скролл, меню, анимации | `script.js` |
| Логотип, иконки | `icons/` |
| Фотографии | `images/` |
| Favicon | `assets/favicon.svg` |

## Используемые технологии

- **HTML5** — семантическая разметка
- **CSS3** — Flexbox, Grid, CSS Variables, адаптивность
- **JavaScript ES6** — без фреймворков
- **Google Fonts** — Playfair Display, Inter
- **AOS** — анимации при прокрутке (CDN)
- **picsum.photos** — изображения-заглушки (замените на свои)

## Лицензия

Проект создан как шаблон. Свободно используйте и адаптируйте под своё кафе.
