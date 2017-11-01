## Cookie Manager

**Простой интерфейс для работы с Сookies**

Подключение
    
    <script src="cookieManager.js"></script>
    
Использование
    
    var cookie = App.cookie; // {object}
    
Доступ к значениям
    
    cookie.foo;            // get
    cookie.foo = 'bar';    // set
    delete cookie.foo;     // del
    
Привести данные к типу

    cookie.toString();     // стандартная строка cookie
    cookie.toObject();     // объект (чистый, без прокси)
    cookie.toArray();      // массив массивов.[[key, val], ...]
    cookie.toJson();       // json
    
Поиск ключей по регулярному выражению

    cookie.search(/name/);  // {object}
    
Форматирует строку, расставляя символы до ключа, между ключем и значением, и после значения

    cookie.format('[', ':', ']');
    
Проверка на вхождение

    'foo' in cookie;
    
Итерируются как объект

    for (var i in cookie) { cookie[i] };
