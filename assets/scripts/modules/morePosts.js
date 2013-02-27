
define(function(require) {
                     require('templates/partials/excerpt');
    var $          = require('jquery');
    var Handlebars = require('handlebars');
    var template   = Handlebars.templates['excerpt.mustache'];

    return {
        offset: 5,
        offsetIncrement: 5,

        init: function(container) {
            this.container = $(container);
            this.loadBtn = $('<button></button>', {
                'class': 'load-posts',
                text: 'Load more posts'
            });

            this.loadBtn.appendTo(this.container);
            this.attachEvents();
        },

        attachEvents: function() {
            this.loadBtn.on('click', this.getPosts.bind(this));
        },
        
        getPosts: function(event) {
            var html = '';

            $.getJSON('more-posts/?limit=5&offset=' + this.offset, function(response) {
                if (response.length == 0) {
                    this.loadBtn.remove();
                    this.resetCounter();
                    return;
                }

                $.each(response, function(key, value) {
                    html += template(value);
                });

                this.offset += this.offsetIncrement;
                this.loadBtn.before(html);
            }.bind(this));

            event && event.preventDefault();
            return this;
        },

        resetCounter: function() {
            this.offset = 5;
            this.offsetIncrement = 5;

            return this;
        }
    };
});
