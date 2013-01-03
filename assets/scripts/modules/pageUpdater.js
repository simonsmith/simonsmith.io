
define(function(require) {
    var $ = require('jquery');
    var Handlebars = require('handlebars');
    var registerTemplates = require('modules/registerTemplates');

    registerTemplates();

    return {
        init: function(nav, injectTarget) {
            this.nav = $(nav);
            this.injectTarget = injectTarget;
            this.body = $(document.body);
        },

        title: function(title) {
            var titleParts = document.title.split('|');
            document.title = [title, ' | ', $.trim(titleParts[1])].join('');
        },

        navigation: function(navMenu) {
            this.nav.html(navMenu);
        },

        bodyClass: function(bodyClass) {
            this.body.removeClass().addClass(bodyClass);
        },

        content: function(clickedElem, json) {
            this.renderTemplate(json.template, json);
            history.pushState(json, json.page_meta.page_title, clickedElem.attr('href'));
        },

        renderTemplate: function(tplName, data) {
            var tpl = Handlebars.templates[tplName];
            this.injectTarget.html(tpl(data));
        }
    };
});
