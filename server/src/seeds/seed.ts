import { Staff } from '../staff/staff.model';
import { Menu } from '../menu/menu.model';
import { News } from '../news/news.model';
import { Booking } from '../booking/booking.model';
import * as bcrypt from 'bcryptjs';

export async function seedDatabase() {
  try {
    console.log('🌱 Начинаем заполнение базы данных...');

    // Очищаем существующие данные
    await Booking.destroy({ where: {} });
    await News.destroy({ where: {} });
    await Menu.destroy({ where: {} });
    await Staff.destroy({ where: {} });

    // Создаем сотрудников
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const staff = await Staff.bulkCreate([
      {
        name: 'Администратор Системы',
        email: 'admin@cafe.com',
        phone: '+375291234567',
        role: 'Администратор',
        password: hashedPassword
      },
      {
        name: 'Менеджер Зала',
        email: 'manager@cafe.com',
        phone: '+375291234568',
        role: 'Менеджер',
        password: hashedPassword
      },
      {
        name: 'Официант Петр',
        email: 'waiter1@cafe.com',
        phone: '+375291234569',
        role: 'Официант',
        password: hashedPassword
      },
      {
        name: 'Повар Анна',
        email: 'chef@cafe.com',
        phone: '+375291234570',
        role: 'Повар',
        password: hashedPassword
      }
    ]);

    console.log('✅ Сотрудники созданы:', staff.length);

    // Создаем меню
    const menuItems = await Menu.bulkCreate([
      {
        name: 'Паста Карбонара',
        description: 'Классическая паста с беконом, яйцами и пармезаном в сливочном соусе',
        price: 18.50,
        category: 'Основные блюда',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400',
        isAvailable: true
      },
      {
        name: 'Стейк Рибай',
        description: 'Сочный стейк из говядины с картофелем фри и овощами гриль',
        price: 32.00,
        category: 'Основные блюда',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
        isAvailable: true
      },
      {
        name: 'Цезарь с курицей',
        description: 'Свежий салат с куриной грудкой, пармезаном и соусом цезарь',
        price: 14.00,
        category: 'Салаты',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        isAvailable: true
      },
      {
        name: 'Тирамису',
        description: 'Классический итальянский десерт с кофе и маскарпоне',
        price: 12.00,
        category: 'Десерты',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
        isAvailable: true
      },
      {
        name: 'Мохито',
        description: 'Освежающий коктейль с мятой, лаймом и белым ромом',
        price: 8.50,
        category: 'Напитки',
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400',
        isAvailable: true
      },
      {
        name: 'Лазанья Болоньезе',
        description: 'Слоеная паста с мясным соусом болоньезе и сыром моцарелла',
        price: 20.00,
        category: 'Основные блюда',
        image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400',
        isAvailable: false
      },
      {
        name: 'Греческий салат',
        description: 'Свежие овощи с фетой, оливками и оливковым маслом',
        price: 13.50,
        category: 'Салаты',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        isAvailable: true
      },
      {
        name: 'Чизкейк Нью-Йорк',
        description: 'Классический чизкейк с ягодным соусом',
        price: 11.00,
        category: 'Десерты',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
        isAvailable: true
      }
    ]);

    console.log('✅ Позиции меню созданы:', menuItems.length);

    // Создаем новости
    const news = await News.bulkCreate([
      {
        title: 'Новое меню сезона!',
        content: 'Мы рады представить вам обновленное меню с новыми блюдами и сезонными ингредиентами. Попробуйте наши новые десерты и коктейли!',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
        staffId: staff[0].id
      },
      {
        title: 'Специальные предложения на выходные',
        content: 'Каждые выходные с 18:00 до 22:00 действуют скидки 20% на все основные блюда. Приходите и наслаждайтесь вкусной едой по выгодным ценам!',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
        staffId: staff[1].id
      },
      {
        title: 'Мастер-класс по приготовлению пасты',
        content: 'Приглашаем всех желающих на мастер-класс по приготовлению итальянской пасты. Наш шеф-повар поделится секретами создания идеального блюда.',
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600',
        staffId: staff[3].id
      },
      {
        title: 'Новые коктейли в баре',
        content: 'Наш бармен создал уникальную коллекцию коктейлей с использованием местных ингредиентов. Обязательно попробуйте "Летний бриз" и "Минский закат"!',
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600',
        staffId: staff[1].id
      }
    ]);

    console.log('✅ Новости созданы:', news.length);

    // Создаем бронирования
    const bookings = await Booking.bulkCreate([
      {
        staffId: staff[2].id,
        tableNumber: 5,
        date: new Date('2024-09-20'),
        time: '19:00',
        customerName: 'Иван Петров',
        customerPhone: '+375291111111',
        createdBy: 'staff'
      },
      {
        staffId: staff[2].id,
        tableNumber: 3,
        date: new Date('2024-09-21'),
        time: '18:30',
        customerName: 'Мария Сидорова',
        customerPhone: '+375292222222',
        createdBy: 'staff'
      },
      {
        tableNumber: 7,
        date: new Date('2024-09-22'),
        time: '20:00',
        customerName: 'Алексей Козлов',
        customerPhone: '+375293333333',
        createdBy: 'user'
      },
      {
        staffId: staff[1].id,
        tableNumber: 2,
        date: new Date('2024-09-23'),
        time: '19:30',
        customerName: 'Елена Морозова',
        customerPhone: '+375294444444',
        createdBy: 'staff'
      },
      {
        tableNumber: 8,
        date: new Date('2024-09-24'),
        time: '18:00',
        customerName: 'Дмитрий Волков',
        customerPhone: '+375295555555',
        createdBy: 'user'
      }
    ]);

    console.log('✅ Бронирования созданы:', bookings.length);

    console.log('🎉 База данных успешно заполнена!');
    console.log('📊 Статистика:');
    console.log(`   - Сотрудники: ${staff.length}`);
    console.log(`   - Позиции меню: ${menuItems.length}`);
    console.log(`   - Новости: ${news.length}`);
    console.log(`   - Бронирования: ${bookings.length}`);

  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error);
    throw error;
  }
}
