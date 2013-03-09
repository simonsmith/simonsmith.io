define(function(require) {
    'use strict';
    var $                 = require('jquery');
    var Handlebars        = require('handlebars');
    var mediator          = require('mediator');
    var registerTemplates = require('modules/registerTemplates');

    registerTemplates();

    var PageUpdater = function(nav, injectTarget, events) {
        this.nav = $(nav);
        this.injectTarget = $(injectTarget);
        this.body = $(document.body);

        this.attachEvents(events.contentLoad);
    };

    PageUpdater.prototype = {

        attachEvents: function(contentLoadEvent) {
            mediator.subscribe(contentLoadEvent, this.updatePage, null, this);
        },

        updatePage: function(data) {
            var json = data.response;

            this.updateNavigation(json.page_meta.nav_menu);
            this.updateBodyClass(json.page_meta.body_class);
            this.updateTitle(json.page_meta.page_title);

            if (data.type == 'ajax') {
                this.updateContent(data.element, json);
            }

            if (data.type == 'popstate') {
                this.renderTemplate(json.template, json);
            }
        },

        updateTitle: function(title) {
            var titleParts = document.title.split('|');
            document.title = [title, ' | ', $.trim(titleParts[1])].join('');
        },

        updateNavigation: function(navMenu) {
            this.nav.html(navMenu);
        },

        updateBodyClass: function(bodyClass) {
            this.body.removeClass().addClass(bodyClass);
        },

        updateContent: function(clickedElem, json) {
            this.renderTemplate(json.template, json);
            history.pushState(json, null, clickedElem.attr('href'));
        },

        renderTemplate: function(tplName, data) {
            var tpl = Handlebars.templates[tplName];
            this.injectTarget.html(tpl(data));
            
            mediator.publish('content:rendered', data.page_meta.body_class);
        }

    };

    return PageUpdater;
});
