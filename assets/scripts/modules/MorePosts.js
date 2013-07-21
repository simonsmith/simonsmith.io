define(function(require) {
    'use strict';
    var $          = require('zepto');
    var Handlebars = require('handlebars');
    var mediator   = require('mediator-js');
    var prime      = require('prime');
                     require('templates/compiled-templates');
    var template   = Handlebars.partials['excerpt'];

    return prime({
        constructor: function(container, postList, events) {
            this.container = $(container);
            this.postList = $(postList);
            this.postListSelector = this.postList.selector;

            this.offset = 5;
            this.incrementBy = 5;

            this.loadBtn = $('<button></button>', {
                'class': 'load-posts js-load-posts',
                html: '<span>Load 5 more posts</span>'
            });

            this.attachEvents(events.render);
        },

        attachEvents: function(renderEvent) {
            this.container.on('click', '.js-load-posts', this.btnPress.bind(this));
            mediator.subscribe(renderEvent, this.checkPage, null, this);
            mediator.subscribe(renderEvent, this.resetBtnText, null, this);
            mediator.subscribe('posts:get:done', this.addPostsToPage, null, this);
            mediator.subscribe('posts:get:before', this.showLoading, null, this);
            mediator.subscribe('posts:get:done', this.hideLoading, null, this);
        },

        checkPage: function(meta) {
            if (meta.body_class.match(/home/)) {
                this.addBtn();
            } else {
                this.resetIncrement();
                this.removeBtn();
            }
        },

        resetBtnText: function() {
            this.loadBtn.find('span').text('Load 5 more posts');
        },

        addBtn: function() {
            this.loadBtn.appendTo(this.postListSelector);
        },

        removeBtn: function() {
            this.loadBtn.detach();
        },

        btnPress: function(event) {
            this.getPosts();
            event && event.preventDefault();
        },

        showLoading: function() {
            this.loadBtn.addClass('posts-loading');
        },

        hideLoading: function() {
            this.loadBtn.removeClass('posts-loading');
        },

        getPosts: function() {
            mediator.publish('posts:get:before');

            $.getJSON('/more-posts/?limit=5&offset=' + this.offset, function(response) {
                mediator.publish('posts:get:done', response);
            });
        },

        addPostsToPage: function(response) {
            var html = '';
            $.each(response.posts, function(key, value) {
                html += template(value);
            });

            this.offset += this.incrementBy;
            this.loadBtn
                .before(html)
                .find('span')
                .text('Load ' + response.posts_remaining + ' more posts');

            if (response.posts_remaining == 0) {
                this.removeBtn();
                this.resetIncrement();
            }
        },

        resetIncrement: function() {
            this.offset = 5;
        }
    });
});
