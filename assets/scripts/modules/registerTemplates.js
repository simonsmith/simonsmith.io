
    define(function(require) {
        var Handlebars = require('handlebars');

        return function() {
            // Templates
            require('templates/single');
            require('templates/single_project');
            require('templates/home');
            require('templates/projects');

            // Partials
            require('templates/partials/attachment');
            require('templates/partials/post_excerpt');
            require('templates/partials/work_item');

            Handlebars.registerPartial({
                'work_item': Handlebars.templates['work_item.mustache'],
                'attachment': Handlebars.templates['attachment.mustache'],
                'post_excerpt': Handlebars.templates['post_excerpt.mustache']
            });

        };

    });
