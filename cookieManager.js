
// Cookie Manager
var Cookie = function (path = '/', time = '12M') {

	// Получить объект свойств 
	var cookieObject = getObject(true);

	// Проксирование доступа к свойствам объекта
	var cookieProxy = new Proxy(cookieObject, {

		get(target, term) {
			var item = getItem(term); 
			if (item) return item;
			return console.log(`No cookie: ${term}`), null;
		},

		set(target, term, value) {
			setItem(term, value);
			target[term] = value;
			return true;
		},

		deleteProperty(target, term) {
			delItem(term);
			delete target[term];
			return true;
		}
	});

	return cookieProxy;
	// -----------------------------------


	// получить объект из строки cookie
	function getObject(isExt = false) {
		var obj = {};

		// расширить прототип cookieObject
		// по умолчанию метод возвращает объект с "чистым" прототипом
		if (isExt) {
			Object.setPrototypeOf(obj, {

				getObject: 	getObject, 		
				getItem: 	getItem, 		
				setItem: 	setItem, 		
				delItem: 	delItem, 		
				search: 	search, 		
			});
		}

		document.cookie.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')
			.split('; ')
			.forEach((item) => {

				var [key, val] = item.split('=');
				obj[key] = decodeURIComponent(val);
			});

		return obj;
	}

	
	// получить значение
	function getItem(key) {
		return key in cookieObject ? cookieObject[key] : null;
	}

	// установить значение
	function setItem(key, val) {
		var _time = timeParser(time);
		var _val = encodeURIComponent(val);
		document.cookie = `${key}=${_val}; path=${path}; expires=${_time}`;
	}

	// удалить свойство
	function delItem(key) {
		var _time = timeParser(-1);
		document.cookie = `${key}=; path=; expires=${_time}`;
	}

	// Поиск имён свойств по регулярному выражению
	function search(regExp) {
		var res = {};
		Object.keys(cookieObject).forEach((e) => {

			var f = e.match(regExp);
			if (f !== null) res[f.input] = cookieObject[f.input];
		});
		return res;
	}

	// парсинг аргумента time
	function timeParser(time) {
		if (time === -1) {
			return new Date(new Date().getTime() - 100).toUTCString();
		}
		var arr = time.match(/(\d*)(\w*)/);
		var def = {
			's': 1000,
			'm': 60000,
			'h': 60000 * 60,
			'D': 60000 * 60 * 24,
			'M': 60000 * 60 * 24 * 365,
		};
		var date = new Date().getTime() + arr[1] * def[arr[2]];
		return new Date(date).toUTCString();
	}

};
