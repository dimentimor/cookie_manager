## Cookie Manager

**Интерфейс предоставляет возможность работать с cookie как с объектом**

Создание экземпляра

```javascript
var cookie = Cookie();
```

Доступ к свойствам

```javascript
cookie.user                 // Чтение. Возвращает значение свойства user или null
cookie.user = 'Jack'        // Установка. Возвращает установленное значение 'Jack'
delete cookie.user          // Удаление. Возвращает true в случае успеха

'foo' in cookie             // Проверка существования свойства
for (var i in cookie) {};   // Итерация
```

Методы прототипа

```javascript
cookie.getObject()                  // Парсит cookie строку и возвращает объект

cookie.getItem('name')              // Чтение 
cookie.setItem('name', 'Bob')       // Установка
cookie.delItem('name')              // Удаление

var obj = cookie.search(/^_.*/)     // Поиск имён свойств по регулярному выражению

```

Время жизни указывается в формате "ЧислоБуква". Можно создавать несколько экземпляров объекта для разных путей и времён.

    s - sec, m - min, h - hour, D - day, M - month


```javascript
var cookie = Cookie();              // По умолчанию: path - "/", expires - 12 месяцев

var foo = Cookie('/foo', '14D');    // path - "/foo",   expires - "14 дней"
var bar = Cookie('/bar', '8h');     // path - "/bar",   expires - 8 часов
var bar = Cookie('/', '666m');      // path - "/",      expires - 666 минут

```
