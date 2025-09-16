# API для панели администратора кафе

## Обзор

REST API для управления кафе, включающий в себя endpoints для:
- Управления сотрудниками
- Управления бронированиями
- Управления новостями
- Управления меню

## Аутентификация

Все админские endpoints требуют JWT токен в заголовке `Authorization: Bearer <token>`.

## API Endpoints

### Сотрудники

#### `GET /admin/staffs`
Получить список всех сотрудников.

**Ответ:**
```json
[
  {
    "id": 1,
    "name": "Иванов Иван",
    "email": "ivan@example.com",
    "phone": "+375291119996",
    "role": "Администратор"
  }
]
```

#### `POST /admin/staffs`
Создать нового сотрудника.

**Тело запроса:**
```json
{
  "name": "Петров Петр",
  "email": "petr@example.com",
  "phone": "+375291119997",
  "role": "Официант",
  "password": "password123"
}
```

#### `PUT /admin/staffs/:id`
Обновить информацию о сотруднике.

**Тело запроса:** (аналогично POST, пароль опциональный)

#### `DELETE /admin/staffs/:id`
Удалить сотрудника.

#### `GET /admin/staffs/:id`
Получить информацию о конкретном сотруднике.

### Бронирования

#### `GET /admin/bookings`
Получить список всех бронирований.

**Ответ:**
```json
[
  {
    "id": 1,
    "tableNumber": 5,
    "date": "2024-01-15",
    "time": "18:00",
    "customerName": "Иван Иванов",
    "customerPhone": "+375291119996",
    "createdBy": "staff"
  }
]
```

#### `POST /admin/bookings`
Создать новое бронирование.

**Тело запроса:**
```json
{
  "tableNumber": 3,
  "date": "2024-01-16",
  "time": "19:00",
  "customerName": "Петр Петров",
  "customerPhone": "+375291119997"
}
```

#### `PUT /admin/bookings/:id`
Обновить бронирование.

#### `DELETE /admin/bookings/:id`
Удалить бронирование.

#### `GET /admin/bookings/:id`
Получить информацию о конкретном бронировании.

### Новости

#### `GET /admin/news`
Получить список всех новостей.

**Ответ:**
```json
[
  {
    "id": 1,
    "title": "Новое меню",
    "content": "Мы обновили наше меню...",
    "image": "http://example.com/image.jpg",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
]
```

#### `POST /news`
Создать новую новость.

**Тело запроса:**
```json
{
  "title": "Специальное предложение",
  "content": "Скидка 20% на все блюда...",
  "image": "http://example.com/promo.jpg"
}
```

#### `PUT /admin/news/:id`
Обновить новость.

#### `DELETE /admin/news/:id`
Удалить новость.

#### `GET /admin/news/:id`
Получить информацию о конкретной новости.

### Меню

#### `GET /admin/menu`
Получить список всех позиций меню.

**Ответ:**
```json
[
  {
    "id": 1,
    "name": "Паста Карбонара",
    "description": "Классическая паста с беконом",
    "price": 15.99,
    "category": "Основные блюда",
    "image": "http://example.com/pasta.jpg",
    "isAvailable": true
  }
]
```

#### `POST /admin/menu`
Создать новую позицию меню.

**Тело запроса:**
```json
{
  "name": "Салат Цезарь",
  "description": "Свежий салат с курицей",
  "price": 12.50,
  "category": "Салаты",
  "image": "http://example.com/salad.jpg",
  "isAvailable": true
}
```

#### `PUT /admin/menu/:id`
Обновить позицию меню.

#### `DELETE /admin/menu/:id`
Удалить позицию меню.

#### `GET /admin/menu/:id`
Получить информацию о конкретной позиции меню.

#### `GET /admin/menu/category/:category`
Получить позиции меню по категории.

#### `GET /admin/menu/available`
Получить только доступные позиции меню.

## Валидация данных

Все endpoints используют валидацию с помощью class-validator:

### Сотрудники
- `name`: строка, обязательное
- `email`: валидный email, обязательное
- `phone`: строка, обязательное
- `role`: строка, обязательное
- `password`: строка, минимум 6 символов, опциональное при обновлении

### Бронирования
- `tableNumber`: число, минимум 1, обязательное
- `date`: дата в формате ISO, обязательное
- `time`: строка, обязательное
- `customerName`: строка, обязательное
- `customerPhone`: строка, обязательное

### Новости
- `title`: строка, обязательное
- `content`: строка, обязательное
- `image`: строка, опциональное
- `staffId`: число, опциональное

### Меню
- `name`: строка, обязательное
- `description`: строка, обязательное
- `price`: число, минимум 0, обязательное
- `category`: строка, обязательное
- `image`: строка, опциональное
- `isAvailable`: булево значение, опциональное

## Обработка ошибок

API возвращает стандартные HTTP коды статуса:

- `200` - Успешный запрос
- `201` - Ресурс создан
- `400` - Ошибка валидации
- `401` - Не авторизован
- `404` - Ресурс не найден
- `409` - Конфликт (например, email уже существует)
- `500` - Внутренняя ошибка сервера

**Пример ошибки:**
```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

## Swagger документация

Документация API доступна по адресу: `http://localhost:5000/api/docs`

## Запуск сервера

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run start:dev

# Запуск в продакшене
npm run start:prod
```

## Переменные окружения

Создайте файл `.development.env`:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=cafe_db
PORT=5000
JWT_SECRET=your_jwt_secret
```

## База данных

API использует PostgreSQL с Sequelize ORM. Модели автоматически создаются при запуске.

### Таблицы:
- `staff` - сотрудники
- `bookings` - бронирования
- `news` - новости
- `menu` - позиции меню
