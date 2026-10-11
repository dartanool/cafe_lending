/**
 * Ханой Фуд — данные о ресторанах.
 *
 * Это  файл, который нужно править, чтобы:
 *   • изменить адрес / телефон / часы работы / фотографии любой точки;
 *   • добавить новую точку (скопируйте один блок { ... } и поменяйте данные);
 *   • убрать точку (удалите её блок).
 *
 * Общее меню сети (window.HANOI_MENU) находится в конце этого файла.
 */

window.HANOI_TELEGRAM_URL = 'https://t.me/hanoi_foodmsk';

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

    // Фотографии ресторана (карусель). Сейчас стоят заглушки — замените на свои,
    // например: 'images/belorusskaya/1.jpg'. Фото может быть сколько угодно.
    photos: [
      'assets/images/b/b-1.jpeg',
      'assets/images/b/b-2.jpeg',
      'assets/images/b/b-3.jpeg',
      'assets/images/b/b-4.jpeg',
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


    // Фотографии ресторана (карусель). Сейчас стоят заглушки — замените на свои,
    // например: 'images/belorusskaya/1.jpg'. Фото может быть сколько угодно.
    photos: [
      'assets/images/a/a-1.jpeg',
      'assets/images/a/a-2.jpeg',
      'assets/images/a/a-3.jpeg',
      'assets/images/a/a-4.jpeg',
      'assets/images/a/a-5.jpeg',
      'assets/images/a/a-6.jpeg',
      'assets/images/a/a-7.jpeg',
      'assets/images/a/a-8.jpeg',
      'assets/images/a/a-9.jpeg',
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

    // Фотографии ресторана (карусель). Сейчас стоят заглушки — замените на свои,
    // например: 'images/belorusskaya/1.jpg'. Фото может быть сколько угодно.
    photos: [
      'assets/images/m/m-1.jpeg',
      'assets/images/m/m-2.jpeg',
      'assets/images/m/m-3.jpeg',
      'assets/images/m/m-4.jpeg',
      'assets/images/m/m-5.jpeg',
      'assets/images/m/m-6.jpeg',
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
    'assets/menu/business-lunch.jpeg',
    'assets/menu/menu-1.jpeg',
    'assets/menu/menu-2.jpeg',
    'assets/menu/menu-3.jpeg',
    'assets/menu/menu-4.jpeg',
    'assets/menu/menu-5.jpeg',
  ],
};


// window.COMMON_PROMOS = [
//   {
//     icon: 'icons/lunch.svg',
//     title: 'Бизнес-ланч',
//     text: 'В будние дни с 12:00 до 16:00 у нас действует бизнес-ланч.',
//     badge: 'Пн–Пт, 12:00 – 16:00',
//   },
//   {
//     icon: 'icons/pastry.svg',
//     title: 'Скидка на день рождения',
//     text: 'Дарим скидку 15%(пожалуйста, возьмите с собой паспорт).',
//     badge: '-15%',
//   },
//   {
//     icon: 'icons/map-pin.svg',
//     title: 'Открытие новых точек',
//     text: 'На открытие новых точек сети — скидка 20%.',
//     badge: '-20%',
//   },
// ];