/**
 * Ханой Фуд — данные о ресторанах.
 *
 * Это ЕДИНСТВЕННЫЙ файл, который нужно править, чтобы:
 *   • изменить адрес / телефон / часы работы / акции / фотографии любой точки;
 *   • добавить новую точку (скопируйте один блок { ... } и поменяйте данные);
 *   • убрать точку (удалите её блок).
 *
 * Общее меню сети (window.HANOI_MENU) находится в конце этого файла.
 */
/**
 * Акции. Сейчас у всех точек один и тот же набор (COMMON_PROMOS).
 * Чтобы у ресторана были свои акции, замените в его блоке
 *   promos: COMMON_PROMOS
 * на свой список [ { icon, title, text, badge }, ... ].
 * Если акций нет — удалите строку promos, блок «Акции» не появится.
 *
 * icon  — картинка из папки icons/ (coffee.svg, pastry.svg, lunch.svg)
 * badge — короткая плашка внизу карточки
 */
const COMMON_PROMOS = [
  {
    icon: 'icons/lunch.svg',
    title: 'Бизнес-ланч',
    text: 'В будние дни с 12:00 до 16:00 у нас действует бизнес-ланч.',
    badge: 'Пн–Пт, 12:00 – 16:00',
  },
  {
    icon: 'icons/pastry.svg',
    title: 'Скидка на день рождения',
    text: 'Дарим скидку 15%(пожалуйста, возьмите с собой паспорт).',
    badge: '-15%',
  },
  {
    icon: 'icons/map-pin.svg',
    title: 'Открытие новых точек',
    text: 'На открытие новых точек сети — скидка 20%.',
    badge: '-20%',
  },
];

window.HANOI_LOCATIONS = [
  {
    // Латиницей, без пробелов. Попадает в ссылку: сайт.ru/#loc-belorusskaya
    id: 'belorusskaya',

    // Название на вкладке и в кнопке на первом экране
    short: 'Белорусская',
    // Заголовок блока
    name: 'Ханой Фуд у метро Белорусская',
    description: 'Вьетнамская кухня рядом с метро Белорусская.',

    metro: 'Белорусская',
    address: 'г. Москва, ул. Большая Грузинская, 57с1',
    phone: '+7 (920) 228-55-83',
    email: '2020.hanoi.food@gmail.com',
    hours: [
      ['Ежедневно', '10:00 – 22:00'],
    ],

    promos: COMMON_PROMOS,

    // Фотографии ресторана (карусель). Сейчас стоят заглушки — замените на свои,
    // например: 'images/belorusskaya/1.jpg'. Фото может быть сколько угодно.
    photos: [
      'https://picsum.photos/seed/belorusskaya-1/1200/900',
      'https://picsum.photos/seed/belorusskaya-2/1200/900',
      'https://picsum.photos/seed/belorusskaya-3/1200/900',
      'https://picsum.photos/seed/belorusskaya-4/1200/900',
      'https://picsum.photos/seed/belorusskaya-5/1200/900',
      'https://picsum.photos/seed/belorusskaya-6/1200/900',
    ],

    // Яндекс.Карта. Чтобы на карте был виден именно ресторан (с названием и карточкой),
    // укажите orgId — номер организации на Яндекс.Картах: откройте ресторан на yandex.ru/maps,
    // в адресной строке ссылка вида  .../maps/org/название/198904300384/  — нужен последний номер.
    // Пока orgId нет, ресторан ищется по тексту query («название + адрес»).
    // Дополнительно можно указать координаты (lat, lng) или свой embedUrl.
    map: {
      query: 'Ханой Фуд, Москва, ул. Большая Грузинская, 57с1',
    },
  },

  {
    id: 'avtozavodskaya',
    short: 'Автозаводская',
    name: 'Ханой Фуд у метро Автозаводская',
    description: 'Вьетнамская кухня рядом с метро Автозаводская.',

    metro: 'Автозаводская',
    address: 'г. Москва, ул. Мастеркова, 6Ас4',
    phone: '+7 (920) 228-55-83',
    email: '2020.hanoi.food@gmail.com',
    hours: [
      ['Ежедневно', '10:00 – 22:00'],
    ],

    promos: COMMON_PROMOS,

    // Фотографии ресторана (карусель). Сейчас стоят заглушки — замените на свои,
    // например: 'images/belorusskaya/1.jpg'. Фото может быть сколько угодно.
    photos: [
      'https://picsum.photos/seed/avtozavodskaya-1/1200/900',
      'https://picsum.photos/seed/avtozavodskaya-2/1200/900',
      'https://picsum.photos/seed/avtozavodskaya-3/1200/900',
      'https://picsum.photos/seed/avtozavodskaya-4/1200/900',
      'https://picsum.photos/seed/avtozavodskaya-5/1200/900',
      'https://picsum.photos/seed/avtozavodskaya-6/1200/900',
    ],

    map: {
      query: 'Ханой Фуд, Москва, ул. Мастеркова, 6Ас4',
    },
  },

  {
    id: 'marksistskaya',
    short: 'Марксистская',
    name: 'Ханой Фуд у метро Марксистская',
    description: 'Вьетнамская кухня рядом с метро Марксистская.',

    metro: 'Марксистская',
    address: 'г. Москва, ул. Марксистская, 3с1',
    phone: '+7 (920) 228-55-83',
    email: '2020.hanoi.food@gmail.com',
    hours: [
      ['Ежедневно', '10:00 – 22:00'],
    ],

    promos: COMMON_PROMOS,

    // Фотографии ресторана (карусель). Сейчас стоят заглушки — замените на свои,
    // например: 'images/belorusskaya/1.jpg'. Фото может быть сколько угодно.
    photos: [
      'https://picsum.photos/seed/marksistskaya-1/1200/900',
      'https://picsum.photos/seed/marksistskaya-2/1200/900',
      'https://picsum.photos/seed/marksistskaya-3/1200/900',
      'https://picsum.photos/seed/marksistskaya-4/1200/900',
      'https://picsum.photos/seed/marksistskaya-5/1200/900',
      'https://picsum.photos/seed/marksistskaya-6/1200/900',
    ],

    map: {
      orgId: '198904300384',
      query: 'Ханой Фуд, Москва, ул. Марксистская, 3с1',
    },
  },
];


/**
 * Общее меню для всех ресторанов (раздел «Меню» на сайте).
 *
 * pages — страницы меню по порядку (JPG или WebP, ширина от 1600 px).
 *         Сейчас стоят случайные картинки-заглушки — замените на свои,
 *         например: 'assets/menu/menu-1.jpg'. Страниц может быть сколько угодно.
 */
window.HANOI_MENU = {
  pages: [
    'https://picsum.photos/seed/hanoi-menu-1/1200/1700',
    'https://picsum.photos/seed/hanoi-menu-2/1200/1700',
    'https://picsum.photos/seed/hanoi-menu-3/1200/1700',
    'https://picsum.photos/seed/hanoi-menu-4/1200/1700',
  ],
};