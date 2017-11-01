
// CookieManager
// -------------------------------------------------------------

var App = App || {};
(function (app, config) {
	
    var def = {
	// стандартные методы (с просторов интернета)
        getCookie: function (name) {
            var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : false;
        },
        setCookie: function (name, val) {
            var date = new Date(new Date().getTime() +360 * 24 * 60 * 60 * 1000);
            document.cookie = name+"="+val+"; path=/; expires=" + date.toUTCString();
        },
        delCookie: function (name) {
            var date = new Date(new Date().getTime() -100);
            document.cookie = name+'=""; path=/; expires=' + date.toUTCString();
        },
        toObject: function () {
            var items = {};
            var arr = document.cookie.split('; ');

            for (var i = 0; i < arr.length; i++) {
                var curent = arr[i].split('=');
                items[curent[0]] = curent[1];
            }
            return items;
        }
    };

	
    if (config.proxyble) {
        // если вклено проксирование

        var cookie = def.toObject();
        var methods = {

            toString: function () {
                return document.cookie;
            },
            toObject: function () {
                var obj = {};
                Object.assign(obj, cookie);
                return obj;
            }, 
            toArray: function () {
                var arr = [];
                Object.keys(cookie).forEach(function(e) {
                    arr.push([e, cookie[e]]);
                });
                return arr;
            }, 
            toJson: function (format=false) {
                return JSON.stringify(this.toObject());
            },
            format: function (before='', delim=':', after=';') {
                // Возвращает форматированную строку.
                var obj = this.toObject();
                var res = '';
                for (var i in obj) res += before+i+delim+obj[i]+after;
                return res;
            },
            search: function (regExp) {
                // Производит поиск имён свойств по регулярному выражению
                // Возвращает объект найденных пар
                var res = {};
                Object.keys(cookie).forEach(function(e) {
                    var f = e.match(regExp);
                    if (f !== null) {
                        res[f.input] = cookie[f.input];
                    }
                });
                return res;
            }
        };

	    
        app[config.name] = new Proxy(cookie, {
            get(target, term) {
                // если это метод - вернуть его 
                if (term in methods) {
                    return methods[term]; 
                }
                // если есть такие сookie - вернуть их 
                var item = def.getCookie(term);
                if (item) { 
                    return item;
                }
                // если ничего из вышеперечисленного - вернуть false
                return console.log(`No cookie: ${term}`), false;
            },
            set(target, term, value) {
                def.setCookie(term, value);
                target[term] = value;
                return true;
            },
            deleteProperty(target, term) {
                def.delCookie(term);
                delete target[term];
                return true;
            }
        });

    } else {
        // если вЫклено проксирование
        // вернуть стандартный набор методов
        app[config.name] = def;
    }

    config.ready();

})(App, {

    name: 'cookie',
    // если proxyble: false - будет возвращен стандартный набор методов
    proxyble: true,  
    ready: function () {
        console.log('cookie::ready');
    }
});



/*
    var cookie = app.cookie; // {object}

    // доступ к значениям
    cookie.foo = 'bar';   // set
    cookie.foo;           // get
    delete cookie.foo;    // del

    // Приводит cookie к соответствующему типу
    cookie.toString();    // стандартная строка cookie
    cookie.toObject();    // объект (чистый, без прокси)
    cookie.toArray();     // массив массивов.[[key, val], ...]
    cookie.toJson();      // json

    // Поиск ключей по регулярному выражению
    cookie.search(/name/);  // {object}

    // Форматирует строку, расставляя символы 
    // до ключа, между ключем и значением, и после значения
    cookie.format('[', ':', ']');

    // проверка вхождения
    'foo' in cookie;    

    // итерация
    for (var i in cookie) { cookie[i] };
*/
