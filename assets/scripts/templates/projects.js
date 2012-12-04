define(['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['projects.mustache'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.excerpt, 'excerpt', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;}

  buffer += "\n    <section>\n        <h1>Work</h1>\n\n        <div class=\"work\">\n            ";
  foundHelper = helpers.project_items;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}); }
  else { stack1 = depth0.project_items; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if (!helpers.project_items) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </section>\n";
  return buffer;});
});