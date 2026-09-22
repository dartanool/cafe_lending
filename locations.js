/**
 * Ханой фуд — данные о ресторанах.
 *
 * Это ЕДИНСТВЕННЫЙ файл, который нужно править, чтобы:
 *   • изменить адрес / телефон / часы работы / меню любой точки;
 *   • добавить новую точку (скопируйте один блок { ... } и поменяйте данные);
 *   • убрать точку (удалите её блок).
 *
 * Кнопки в первом экране, вкладки, карта и просмотр меню
 * строятся из этих данных автоматически (см. script.js).
 *
 * ВАЖНО: всё ниже — примерные данные. Замените их на настоящие.
 */
window.HANOI_LOCATIONS = [
    {
        // Латиницей, без пробелов. Попадает в ссылку: сайт.ru/#loc-arbat
        id: 'arbat',

        // Название на вкладке и в кнопке на первом экране
        short: 'Арбат',
        // Заголовок блока
        name: 'Ханой фуд на Арбате',
        description: 'Наш первый ресторан: открытая кухня, бульон, который варится всю ночь, и летняя веранда.',

        address: 'г. Москва, ул. Арбат, 10',
        phone: '+7 (495) 111-11-11',
        email: 'arbat@hanoifood.ru',
        hours: [
            ['Пн–Пт', '10:00 – 23:00'],
            ['Сб–Вс', '11:00 – 00:00'],
        ],

        // Координаты: lat — широта, lng — долгота.
        // Как их получить — в пошаговой инструкции в ответе.
        map: {
            lat: 55.7522,
            lng: 37.5928,
            // Необязательно: свой iframe-адрес (например, из Google Maps).
            // Если указан — используется вместо Яндекс.Карт.
            // embedUrl: 'https://www.google.com/maps/embed?pb=...',
        },

        menu: {
            // Страницы меню по порядку. Лучше JPG/WebP шириной от 1600 px.
            // Сейчас стоят случайные фото-заглушки — замените на свои страницы меню.
            pages: [
                'assets/menu/arbat-1.jpg',
                'assets/menu/arbat-2.jpg',
                'assets/menu/arbat-3.jpg',
                'assets/menu/arbat-4.jpg',
            ],
            // PDF-версия для скачивания/печати. Если не нужна — удалите строку.
            pdf: 'assets/menu/arbat.pdf',
        },
    },

    {
        id: 'patriki',
        short: 'Патриаршие',
        name: 'Ханой фуд на Патриарших',
        description: 'Камерный зал на 30 мест, чай и кофе по-вьетнамски и десерты собственного приготовления.',

        address: 'г. Москва, Малый Козихинский пер., 5',
        phone: '+7 (495) 222-22-22',
        email: 'patriki@hanoifood.ru',
        hours: [
            ['Ежедневно', '09:00 – 23:00'],
        ],

        map: {
            lat: 55.7644,
            lng: 37.5930,
        },

        menu: {
            pages: [
                'https://picsum.photos/seed/patriki-menu-1/1200/1700',
                'https://picsum.photos/seed/patriki-menu-2/1200/1700',
                'https://picsum.photos/seed/patriki-menu-3/1200/1700',
            ],
            pdf: 'assets/menu/patriki.pdf',
        },
    },

    {
        id: 'kitay-gorod',
        short: 'Китай-город',
        name: 'Ханой фуд на Маросейке',
        description: 'Самый быстрый бизнес-ланч в сети: пять минут от заказа до горячего супа.',

        address: 'г. Москва, ул. Маросейка, 7',
        phone: '+7 (495) 333-33-33',
        email: 'maroseyka@hanoifood.ru',
        hours: [
            ['Пн–Пт', '08:00 – 22:00'],
            ['Сб–Вс', '10:00 – 22:00'],
        ],

        map: {
            lat: 55.7566,
            lng: 37.6395,
        },

        menu: {
            pages: [
                'https://picsum.photos/seed/maroseyka-menu-1/1200/1700',
                'https://picsum.photos/seed/maroseyka-menu-2/1200/1700',
                'https://picsum.photos/seed/maroseyka-menu-3/1200/1700',
                'https://picsum.photos/seed/maroseyka-menu-4/1200/1700',
                'https://picsum.photos/seed/maroseyka-menu-5/1200/1700',
            ],
            pdf: 'assets/menu/maroseyka.pdf',
        },
    },
];

