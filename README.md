## Cookie Manager

**Простой интерфейс для работы с Сookies**

Подключение
    
    // Объект для экспорта модуля
    var App = App || {};
    
    
    // Файл cookieManager.js
    (function (app, config) {
        // Код модуля ...
    
    // Объект для экспорта (или window)
    })(App, {
    
        // Настройки
        name: 'coockie',        // Имя модуля в глобальном объекте
        proxyble: true,         // Если false - будет возвращен стандартный набор методов
    });
    
    
    // Использование
    var cookie = App.cookie;    // {object}
    
Доступ к значениям
    
    cookie.foo;            // получить
    cookie.foo = 'bar';    // установить
    delete cookie.foo;     // удалить
    
Приведение к типу

    cookie.toString();     // стандартная строка cookie
    cookie.toObject();     // объект (чистый, без прокси)
    cookie.toArray();      // массив массивов.[[key, val], ...]
    cookie.toJson();       // json
    
Поиск ключей по регулярному выражению

    cookie.search(/name/);  // {object}
    
Форматирует строку, расставляя символы до ключа, между ключем и значением, и после значения

    cookie.format('[', ':', ']');
    
Проверка вхождения

    'foo' in cookie;
    
Итерация

    for (var i in cookie) { cookie[i] };
