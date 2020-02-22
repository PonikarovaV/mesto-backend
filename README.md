# Mesto-backend

Backend для проекта место.

## Задачи первого этапа:

- в проекте есть package.json;
- в проекте есть .editorconfig;
- в проекте есть .eslintrc, расширяющий конфигурацию airbnb-base, а также необходимые для работы линтера dev-зависимости;
- в проекте есть .gitignore;
- команда npm run start запускает сервер на localhost:3000;
- команда npm run dev запускает сервер на localhost:3000 с хот релоудом;
- адрес localhost:3000 загружает фронтенд проекта Mesto, который вы делали;
- в ответ на запрос GET localhost:3000/users сервер вернёт JSON-объект из файла users.json;
- в ответ на запрос GET localhost:3000/cards сервер вернёт JSON-объект из файла cards.json;
- в ответ на запрос GET localhost:3000/users/8340d0ec33270a25f2413b69, сервер вернёт JSON-объект пользователя с переданным после /users идентификатором;
- если пользователя с запрошенным идентификатором нет, API должен возвращать 404 статус ответа и JSON: 

```
{ "message": "Нет пользователя с таким id" }
```
- при запросе на несуществующий адрес, API должен возвращать 404 статус ответа и JSON: 

```
{ "message": "Запрашиваемый ресурс не найден" }
```

## Запуск проекта

Склонируйте репозиторий
```
https://github.com/PonikarovaV/mesto-backend.git
```
Установите зависимости
```
npm install
```

### Рабочие команды
Запуск сервера на localhost:3000
```
npm run start
```
Запуск сервера с hot reload
```
npm run dev
```
