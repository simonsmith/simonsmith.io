
define(function(require) {
    'use strict';
    var Handlebars = require('handlebars');

    return function() {
        // Templates
        require('templates/single');
        require('templates/single_project');
        require('templates/home');
        require('templates/projects');
        require('templates/cv');
        require('templates/tag');

        // Partials
        require('templates/partials/attachment');
        require('templates/partials/excerpt');
        require('templates/partials/tags');

        Handlebars.registerPartial('attachment', Handlebars.templates['attachment.mustache']);
        Handlebars.registerPartial('excerpt', Handlebars.templates['excerpt.mustache']);
        Handlebars.registerPartial('tags', Handlebars.templates['tags.mustache']);
    };
});
