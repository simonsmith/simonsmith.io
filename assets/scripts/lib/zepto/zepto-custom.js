if ('__proto__' in {}) {
    define(['zepto', 'deferred'], function(Zepto, Deferred) {
        Deferred.installInto(Zepto);
        return Zepto;
    });
} else {
    define(['jquery'], function(jQuery) {
        return jQuery;
    });
}


