define(['handlebars'], function(Handlebars) {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['work_item.mustache'] = template(function(Handlebars, depth0, helpers, partials, data) {
        helpers = helpers || Handlebars.helpers;
        var buffer = "", stack1, foundHelper, functionType = "function", escapeExpression = this.escapeExpression;

        buffer += "<article class=\"work-item\">\n    <h1 class=\"hdr hdr-excerpt\"><a href=\"";
        foundHelper = helpers.url;
        if ( foundHelper ) {
            stack1 = foundHelper.call(depth0, {hash: {}});
        }
        else {
            stack1 = depth0.url;
            stack1 = typeof stack1 === functionType ? stack1() : stack1;
        }
        buffer += escapeExpression(stack1) + "\">";
        foundHelper = helpers.title;
        if ( foundHelper ) {
            stack1 = foundHelper.call(depth0, {hash: {}});
        }
        else {
            stack1 = depth0.title;
            stack1 = typeof stack1 === functionType ? stack1() : stack1;
        }
        if ( stack1 || stack1 === 0 ) {
            buffer += stack1;
        }
        buffer += "</a></h1>\n    <p>";
        foundHelper = helpers.excerpt;
        if ( foundHelper ) {
            stack1 = foundHelper.call(depth0, {hash: {}});
        }
        else {
            stack1 = depth0.excerpt;
            stack1 = typeof stack1 === functionType ? stack1() : stack1;
        }
        if ( stack1 || stack1 === 0 ) {
            buffer += stack1;
        }
        buffer += "</p>\n    <a href=\"";
        foundHelper = helpers.url;
        if ( foundHelper ) {
            stack1 = foundHelper.call(depth0, {hash: {}});
        }
        else {
            stack1 = depth0.url;
            stack1 = typeof stack1 === functionType ? stack1() : stack1;
        }
        buffer += escapeExpression(stack1) + "\" class=\"work-img work-img-mini\">";
        foundHelper = helpers.image;
        if ( foundHelper ) {
            stack1 = foundHelper.call(depth0, {hash: {}});
        }
        else {
            stack1 = depth0.image;
            stack1 = typeof stack1 === functionType ? stack1() : stack1;
        }
        if ( stack1 || stack1 === 0 ) {
            buffer += stack1;
        }
        buffer += "</a>\n</article>\n";
        return buffer;
    });
});
