/**
 * Simple wrapper for getting/setting items to storage
 */
define(function() {
    'use strict';

    // Basic sessionStorage shim
    var storage;
    if (Modernizr.sessionstorage) {
        storage = sessionStorage;
    } else {
        storage = {
            items: {},
            getItem: function(key) {
                return this.items[key];
            },
            setItem: function(key, value) {
                this.items[key] = value;
            },
            removeItem: function(key) {
                delete this.items[key];
            }
        }
    }


    return {
        storageAdaptor: storage,

        toType: function(obj) {
            return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
        },

        getItem: function(key) {
            var item = this.storageAdaptor.getItem(key);

            try {
                item = JSON.parse(item);
            } catch (e) {}

            return item;
        },

        setItem: function(key, value) {
            var type = this.toType(value);

            if (/object|array/.test(type)) {
                value = JSON.stringify(value);
            }

            this.storageAdaptor.setItem(key, value);
        },

        removeItem: function(key) {
            this.storageAdaptor.removeItem(key);
        }
    };
});
