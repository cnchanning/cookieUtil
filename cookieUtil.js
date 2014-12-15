
!function (name, definition) {

    var hasDefine = typeof define === "function";
    var hasExports = typeof module !== "undefined" && module.exports;
    if (hasDefine) {
        define(definition);
    } else if (hasExports) {
        module.exports = definition();
    }
    else {
        this[name] = definition();
    }

}("cookie", function () {
    function cookie() {
    }

    cookie.get = function (name, filter) {
        validateName(name);

        var cookies = parseCookie(document.cookie);
        if (isFunction(filter)) {
            return filter(cookies[name]);
        }
        return cookies[name];

    };

    cookie.set = function (name, value, options) {
        validateName(name);

        options = options || {};
        var expires = options['expires'];
        var domain = options['domain'];
        var path = options['path'];

        var text = name + '=' + encode(String(value));;

        var date = expires;
        if (isNumber(date)) {
            date = new Date();
            date.setDate(date.getDate() + expires);
        }
        if (date instanceof Date) {
            text += '; expires=' + date.toUTCString();
        }

        if (isString(domain) && domain !== "") {
            text += '; domain=' + domain;
        }

        if (isString(path) && path !== "") {
            text += '; path=' + path;
        }

        if (options['secure']) {
            text += '; secure';
        }

        document.cookie = text;
        return text;
    };

    cookie.remove = function (name, options) {
        options = options || {};
        options['expires'] = new Date(0);
        return this.set(name, '', options);
    };


    function parseCookie(text) {
        var cookies = {};

        if (isString(text) && text.length > 0) {
            var cookieArr = text.split(/;\s/g);
            var cookieNameArr, cookieName, cookieValue;
            for (var i = 0; i < cookieArr.length; i++) {
                cookieNameArr = cookieArr[i].match(/([^=]+)=?/i);
                if (isArray(cookieNameArr) && cookieNameArr[0] !== cookieNameArr[1]) {
                    cookieName = decode(cookieNameArr[1]);
                    cookieValue = decode(cookieArr[i].substring(cookieNameArr[0].length));
                }
                else {
                    cookieName = decode(cookieNameArr[0]);
                    cookieValue = '';
                }
                if (cookieName) {
                    cookies[cookieName] = cookieValue;
                }
            }
        }
        return cookies;
    }

    function isType(type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']'
        }
    }

    function validateName(name) {
        if (!(isString(name) && name !== "")) {
            throw new Error("name must be a non-empty string")
        }
    }

    var isString = isType("String");
    var isArray = isType("Array");
    var isFunction = isType("Function");
    var isNumber = isType("Number");
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    return cookie;

});
