// Мок-данные для демонстрации
export const mockStaff = [
  {
    id: 1,
    name: 'Администратор Системы',
    email: 'admin@cafe.com',
    phone: '+375291234567',
    role: 'Администратор',
    password: 'hashed_password'
  },
  {
    id: 2,
    name: 'Менеджер Зала',
    email: 'manager@cafe.com',
    phone: '+375291234568',
    role: 'Менеджер',
    password: 'hashed_password'
  },
  {
    id: 3,
    name: 'Официант Петр',
    email: 'waiter1@cafe.com',
    phone: '+375291234569',
    role: 'Официант',
    password: 'hashed_password'
  },
  {
    id: 4,
    name: 'Повар Анна',
    email: 'chef@cafe.com',
    phone: '+375291234570',
    role: 'Повар',
    password: 'hashed_password'
  }
];

export const mockMenu = [
  {
    id: 1,
    name: 'Паста Карбонара',
    description: 'Классическая паста с беконом, яйцами и пармезаном в сливочном соусе',
    price: 18.50,
    category: 'Основные блюда',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400',
    isAvailable: true,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: 2,
    name: 'Стейк Рибай',
    description: 'Сочный стейк из говядины с картофелем фри и овощами гриль',
    price: 32.00,
    category: 'Основные блюда',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    isAvailable: true,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: 3,
    name: 'Цезарь с курицей',
    description: 'Свежий салат с куриной грудкой, пармезаном и соусом цезарь',
    price: 14.00,
    category: 'Салаты',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    isAvailable: true,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: 4,
    name: 'Тирамису',
    description: 'Классический итальянский десерт с кофе и маскарпоне',
    price: 12.00,
    category: 'Десерты',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    isAvailable: true,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: 5,
    name: 'Мохито',
    description: 'Освежающий коктейль с мятой, лаймом и белым ромом',
    price: 8.50,
    category: 'Напитки',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400',
    isAvailable: true,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: 6,
    name: 'Лазанья Болоньезе',
    description: 'Слоеная паста с мясным соусом болоньезе и сыром моцарелла',
    price: 20.00,
    category: 'Основные блюда',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400',
    isAvailable: false,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: 7,
    name: 'Греческий салат',
    description: 'Свежие овощи с фетой, оливками и оливковым маслом',
    price: 13.50,
    category: 'Салаты',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    isAvailable: true,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: 8,
    name: 'Чизкейк Нью-Йорк',
    description: 'Классический чизкейк с ягодным соусом',
    price: 11.00,
    category: 'Десерты',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    isAvailable: true,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01')
  }
];

export const mockNews = [
  {
    id: 1,
    title: 'Новое меню сезона!',
    content: 'Мы рады представить вам обновленное меню с новыми блюдами и сезонными ингредиентами. Попробуйте наши новые десерты и коктейли!',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
    staffId: 1,
    author: mockStaff[0]
  },
  {
    id: 2,
    title: 'Специальные предложения на выходные',
    content: 'Каждые выходные с 18:00 до 22:00 действуют скидки 20% на все основные блюда. Приходите и наслаждайтесь вкусной едой по выгодным ценам!',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
    staffId: 2,
    author: mockStaff[1]
  },
  {
    id: 3,
    title: 'Мастер-класс по приготовлению пасты',
    content: 'Приглашаем всех желающих на мастер-класс по приготовлению итальянской пасты. Наш шеф-повар поделится секретами создания идеального блюда.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600',
    staffId: 4,
    author: mockStaff[3]
  },
  {
    id: 4,
    title: 'Новые коктейли в баре',
    content: 'Наш бармен создал уникальную коллекцию коктейлей с использованием местных ингредиентов. Обязательно попробуйте "Летний бриз" и "Минский закат"!',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600',
    staffId: 2,
    author: mockStaff[1]
  }
];

export const mockBookings = [
  {
    id: 1,
    staffId: 3,
    tableNumber: 5,
    date: new Date('2024-09-20'),
    time: '19:00',
    customerName: 'Иван Петров',
    customerPhone: '+375291111111',
    createdBy: 'staff' as const,
    staff: mockStaff[2]
  },
  {
    id: 2,
    staffId: 3,
    tableNumber: 3,
    date: new Date('2024-09-21'),
    time: '18:30',
    customerName: 'Мария Сидорова',
    customerPhone: '+375292222222',
    createdBy: 'staff' as const,
    staff: mockStaff[2]
  },
  {
    id: 3,
    tableNumber: 7,
    date: new Date('2024-09-22'),
    time: '20:00',
    customerName: 'Алексей Козлов',
    customerPhone: '+375293333333',
    createdBy: 'user' as const
  },
  {
    id: 4,
    staffId: 2,
    tableNumber: 2,
    date: new Date('2024-09-23'),
    time: '19:30',
    customerName: 'Елена Морозова',
    customerPhone: '+375294444444',
    createdBy: 'staff' as const,
    staff: mockStaff[1]
  },
  {
    id: 5,
    tableNumber: 8,
    date: new Date('2024-09-24'),
    time: '18:00',
    customerName: 'Дмитрий Волков',
    customerPhone: '+375295555555',
    createdBy: 'user' as const
  }
];

export const mockTables = [
  {
    id: 1,
    number: 1,
    capacity: 4,
    floor: 1,
    section: 'Основной зал',
    isActive: true,
    x: 100,
    y: 100,
    width: 80,
    height: 80,
    shape: 'circle' as const
  },
  {
    id: 2,
    number: 2,
    capacity: 2,
    floor: 1,
    section: 'Основной зал',
    isActive: true,
    x: 200,
    y: 100,
    width: 60,
    height: 60,
    shape: 'circle' as const
  },
  {
    id: 3,
    number: 3,
    capacity: 6,
    floor: 1,
    section: 'VIP',
    isActive: true,
    x: 300,
    y: 100,
    width: 100,
    height: 100,
    shape: 'oval' as const
  },
  {
    id: 4,
    number: 4,
    capacity: 4,
    floor: 1,
    section: 'Основной зал',
    isActive: true,
    x: 100,
    y: 200,
    width: 80,
    height: 80,
    shape: 'rectangle' as const
  },
  {
    id: 5,
    number: 5,
    capacity: 8,
    floor: 1,
    section: 'VIP',
    isActive: true,
    x: 200,
    y: 200,
    width: 120,
    height: 120,
    shape: 'oval' as const
  },
  {
    id: 6,
    number: 6,
    capacity: 2,
    floor: 2,
    section: 'Терраса',
    isActive: true,
    x: 100,
    y: 100,
    width: 60,
    height: 60,
    shape: 'circle' as const
  },
  {
    id: 7,
    number: 7,
    capacity: 4,
    floor: 2,
    section: 'Терраса',
    isActive: true,
    x: 200,
    y: 100,
    width: 80,
    height: 80,
    shape: 'rectangle' as const
  },
  {
    id: 8,
    number: 8,
    capacity: 6,
    floor: 2,
    section: 'Основной зал',
    isActive: true,
    x: 300,
    y: 100,
    width: 100,
    height: 100,
    shape: 'oval' as const
  },
  {
    id: 9,
    number: 9,
    capacity: 2,
    floor: 2,
    section: 'Терраса',
    isActive: false,
    x: 100,
    y: 200,
    width: 60,
    height: 60,
    shape: 'circle' as const
  },
  {
    id: 10,
    number: 10,
    capacity: 4,
    floor: 2,
    section: 'Основной зал',
    isActive: true,
    x: 200,
    y: 200,
    width: 80,
    height: 80,
    shape: 'rectangle' as const
  }
];