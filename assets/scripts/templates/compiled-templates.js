define(['handlebars'], function(Handlebars) {

this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

Handlebars.registerPartial("attachment", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<figure class=\"work-img-container\">\n    <a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"highslide\">\n        <img class=\"work-img work-img-large img-border\" src=\"";
  if (stack1 = helpers.thumb) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.thumb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (stack1 = helpers.alt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.alt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" width=\"200\">\n    </a>\n</figure>\n";
  return buffer;
  }));

Handlebars.registerPartial("excerpt", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return " excerpt-work";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <time class=\"post-date\" datetime=\"";
  if (stack1 = helpers.w3c_date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.w3c_date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</time>\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"ajax\">";
  if (stack1 = helpers.image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n        ";
  return buffer;
  }

  buffer += "<div class=\"excerpt";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.has_image) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.has_image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.has_image) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n    <div class=\"excerpt-title post-title\">\n        <h2 class=\"hdr hdr-post\">\n            <a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"ajax link-dark\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n        </h2>\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  if (stack1 = helpers.has_date) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.has_date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.has_date) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = self.invokePartial(partials.tags, 'tags', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    <div class=\"excerpt-content\">\n        <p>";
  if (stack1 = helpers.excerpt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.excerpt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
  if (stack1 = helpers.has_image) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.has_image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.has_image) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>\n";
  return buffer;
  }));

Handlebars.registerPartial("tags", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dd><a href=\"";
  if (stack1 = helpers.site_root) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.site_root; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/tag/";
  if (stack1 = helpers.slug) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.slug; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"link-lighter ajax\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></dd>\n";
  return buffer;
  }

  buffer += "<dl class=\"post-tags\">\n    <dt class=\"visuallyhidden\">Post tags</dt>\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.post_tags) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.post_tags; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.post_tags) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</dl>\n";
  return buffer;
  }));

this["Handlebars"]["templates"]["cv.mustache"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "\n    <div class=\"hresume\">\n\n        <h1 class=\"hdr hdr-section\">CV</h1>\n\n        <p class=\"recruiter-warning\">This CV can be found in it's original format - <a href=\"http://simonsmith.io/cv\">http://simonsmith.io/cv</a></p>\n\n        <div id=\"profile\" class=\"summary\">\n            <h2 class=\"hdr hdr-main\">Profile</h2>\n            <p>I've been doing things with websites professionally for over six years and I make things happen with HTML5, CSS3, JavaScript and mobile first responsive design.</p>\n        </div>\n\n        <div id=\"employment\" class=\"layout-entries\">\n            <h2 class=\"hdr hdr-main\">Employment</h2>\n\n            <div id=\"universal\" class=\"entry vcalendar\">\n                <header class=\"experience vevent\">\n                    <h3 class=\"fn org hdr hdr-item\">Universal Music (Contract)</h3>\n                    <p class=\"company-url location\"><a href=\"http://www.universalmusic.com/\">www.universalmusic.com</a></p>\n                    <dl class=\"employment-dates cf\">\n                        <dt>From</dt>\n                        <dd><time datetime=\"2012-08-12\" class=\"dtstart\">August 2013</time></dd>\n                        <dt>To</dt>\n                        <dd>Present</dd>\n                    </dl>\n                </header>\n                <div class=\"summary\">\n                    <p>Working on an internal AngularJS single page application. Using Bootstrap 3, Grunt and Git.</p>\n                </div>\n            </div>\n\n            <div id=\"im\" class=\"entry vcalendar\">\n                <header class=\"experience vevent\">\n                    <h3 class=\"fn org hdr hdr-item\">Immediate Media</h3>\n                    <p class=\"company-url location\"><a href=\"http://www.immediatemedia.co.uk/\">www.immediatemedia.co.uk</a></p>\n                    <dl class=\"employment-dates cf\">\n                        <dt>From</dt>\n                        <dd><time datetime=\"2012-10-29\" class=\"dtstart\">October 2012</time></dd>\n                        <dt>To</dt>\n                        <dd><time datetime=\"2013-08-09\">August 2013</time></dd>\n                    </dl>\n                </header>\n                <div class=\"summary\">\n                    <p>Worked on a mobile-first responsive TV listings grid for Radio Times using Twitter's <a href=\"http://twitter.github.com/flight/\">Flight JS library</a>, <a href=\"http://handlebarsjs.com/\">Handlebars</a>, <a href=\"http://pivotal.github.io/jasmine/\">Jasmine</a> and Sass.</p>\n                    <p>Ran workshops with other members of the UI team on topics such as <a href=\"http://requirejs.org\">RequireJS</a>, <a href=\"http://smacss.com/\">SMACSS</a> and jQuery plugin development</p>\n                    <p>Implemented Bootstrap 3 and modular HTML/CSS workflows on a new responsive website for <a href=\"http://www.youandyourwedding.co.uk/venues\">You &amp; Your Wedding</a>.</p>\n                </div>\n            </div>\n\n            <div id=\"qmetric\" class=\"entry vcalendar\">\n                <header class=\"experience vevent\">\n                    <h3 class=\"fn org hdr hdr-item\">QMetric</h3>\n                    <p class=\"company-url location\"><a href=\"http://www.qmetric.co.uk\">www.qmetric.co.uk</a></p>\n                    <dl class=\"employment-dates cf\">\n                        <dt>From</dt>\n                        <dd><time datetime=\"2011-12-05\" class=\"dtstart\">December 2011</time></dd>\n                        <dt>To</dt>\n                        <dd><time datetime=\"2012-11-26\" class=\"dtend\">October 2012</time></dd>\n                    </dl>\n                </header>\n                <div class=\"summary\">\n                    <p>Worked on <a href=\"http://www.policyexpert.co.uk\">www.policyexpert.co.uk</a> and an internal Back Office Ajax application.</p>\n                    <p>Used HTML5, CSS3 (via LESS), Twitter bootstrap and Mootools</p>\n                    <p>Led development on a mobile first, responsive design and rebuild of <a href=\"http://www.policyexpert.co.uk\">the Policy Expert site</a>. Also running on Wordpress</p>\n                    <p>Launched responsive version of the <a href=\"http://qmetric.co.uk\">QMetric company website</a>. Source on <a href=\"https://github.com/qmetric/qmg-website\">GitHub</a></p>\n                </div>\n            </div>\n\n            <div id=\"bbc-worldwide\" class=\"entry vcalendar\">\n                <header class=\"experience vevent\">\n                    <h3 class=\"fn org hdr hdr-item\">BBC Worldwide</h3>\n                    <p class=\"company-url location\"><a href=\"http://www.bbcworldwide.com\">www.bbcworldwide.com</a></p>\n                    <dl class=\"employment-dates cf\">\n                        <dt>From</dt>\n                        <dd><time datetime=\"2009-08-30\" class=\"dtstart\">August 2009</time></dd>\n                        <dt>To</dt>\n                        <dd><time datetime=\"2011-12-02\" class=\"dtend\">December 2011</time></dd>\n                    </dl>\n                </header>\n                <div class=\"summary\">\n                    <p>Led UI development on <a href=\"http://radiotimes.com\">the new Radio Times</a>.</p>\n                    <p>Used the latest and greatest front-end tech on a major BBC site. (HTML5, CSS3, Modernizr, MooTools)</p>\n                    <p>Providing feedback to PM, Product Owner and design agency regarding user experience best practices and accessibility guidelines.</p>\n                    <p>Worked with another front-end developer to architect a <a href=\"http://topgear.com\">new Top Gear homepage</a>, news article page and car model section. Created clean, semantic code and took care to ensure the user experience was acceptable on multiple browsers, environments and languages.</p>\n                    <p>Maintained front-end code on <a href=\"http://www.bbcgoodfood.com/\">GoodFood</a> and <a href=\"http://www.gardenersworld.com/\">Gardener's World</a></p>\n                </div>\n            </div>\n\n            <div id=\"sas-design\" class=\"entry vcalendar\">\n                <header class=\"experience vevent\">\n                    <h3 class=\"fn org hdr hdr-item\">SAS Design</h3>\n                    <p class=\"company-url location\"><a href=\"http://www.saslondon.com/\">http://www.saslondon.com/</a></p>\n                    <dl class=\"employment-dates cf\">\n                        <dt>From</dt>\n                        <dd><time datetime=\"2009-04-15\" class=\"dtstart\">April 2009</time></dd>\n                        <dt>To</dt>\n                        <dd><time datetime=\"2009-06-24\" class=\"dtend\">June 2009</time></dd>\n                    </dl>\n                </header>\n                <div class=\"summary\">\n                    <p>Worked from Photoshop design mock-ups to create static web pages using valid, standards based code which performed in various browser environments.</p>\n                </div>\n            </div>\n\n            <div id=\"de-construct\" class=\"entry vcalendar\">\n                <header class=\"experience vevent\">\n                    <h3 class=\"fn org hdr hdr-item\">De-construct</h3>\n                    <p class=\"company-url location\"><a href=\"http://www.de-construct.com/\">de-construct.com</a></p>\n                    <dl class=\"employment-dates cf\">\n                        <dt>From</dt>\n                        <dd><time datetime=\"2009-03-08\" class=\"dtstart\">March 2009</time></dd>\n                        <dt>To</dt>\n                        <dd><time datetime=\"2009-04-10\" class=\"dtend\">April 2009</time></dd>\n                    </dl>\n                </header>\n                <div class=\"summary\">\n                    <p>Constructed a mini site based on existing designs using front-end technologies.</p>\n                </div>\n            </div>\n\n            <div id=\"dgtl\" class=\"entry vcalendar\">\n                <header class=\"experience vevent\">\n                    <h3 class=\"fn org hdr hdr-item\">DGTL</h3>\n                    <p class=\"company-url location\"><a href=\"http://www.dgtl.net/\">dgtl.net</a></p>\n                    <dl class=\"employment-dates cf\">\n                        <dt>From</dt>\n                        <dd><time datetime=\"2008-11-24\" class=\"dtstart\">November 2008</time></dd>\n                        <dt>To</dt>\n                        <dd><time datetime=\"2009-03-02\" class=\"dtend\">March 2009</time></dd>\n                    </dl>\n                </header>\n                <div class=\"summary\">\n                    <p>Responsible for all front-end code on <a href=\"http://www.pentland.com/\">www.pentland.com</a> and exact duplication of site designs were required in various browser environments.</p>\n                </div>\n            </div>\n\n            <div id=\"focus\" class=\"entry vcalendar\">\n                <header class=\"experience vevent\">\n                    <h3 class=\"fn org hdr hdr-item\">Focus</h3>\n                    <p class=\"company-url location\"><a href=\"http://www.focusintegrated.co.uk/\">focusintegrated.co.uk</a></p>\n                    <dl class=\"employment-dates cf\">\n                        <dt>From</dt>\n                        <dd><time datetime=\"2008-10-04\" class=\"dtstart\">October 2008</time></dd>\n                        <dt>To</dt>\n                        <dd><time datetime=\"2008-11-08\" class=\"dtend\">November 2008</time></dd>\n                    </dl>\n                </header>\n                <div class=\"summary\">\n                    <p>Several small sites required development from Photoshop designs into fully working web pages.</p>\n                </div>\n            </div>\n\n            <div id=\"akqa\" class=\"entry vcalendar\">\n                <header class=\"experience vevent\">\n                    <h3 class=\"fn org hdr hdr-item\">AKQA</h3>\n                    <p class=\"company-url location\"><a href=\"http://www.akqa.com/\">akqa.com</a></p>\n                    <dl class=\"employment-dates cf\">\n                        <dt>From</dt>\n                        <dd><time datetime=\"2008-06-30\" class=\"dtstart\">June 2008</time></dd>\n                        <dt>To</dt>\n                        <dd><time datetime=\"2008-09-13\" class=\"dtend\">September 2008</time></dd>\n                    </dl>\n                </header>\n                <div class=\"summary\">\n                    <p>Responsible for front-end development and bug fixing on <a href=\"http://www.sainsburys.co.uk\">www.sainsburys.co.uk</a> whilst working in a small project team.</p>\n                </div>\n            </div>\n\n            <div id=\"aat\" class=\"entry vcalendar\">\n                <header class=\"experience vevent\">\n                    <h3 class=\"fn org hdr hdr-item\"><abbr title=\"Association of Accounting Technicians\">AAT</abbr></h3>\n                    <p class=\"company-url location\"><a href=\"http://www.aat.org\">aat.org</a></p>\n                    <dl class=\"employment-dates cf\">\n                        <dt>From</dt>\n                        <dd><time datetime=\"2007-06-30\" class=\"dtstart\">June 2007</time></dd>\n                        <dt>To</dt>\n                        <dd><time datetime=\"2008-06-28\" class=\"dtend\">June 2008</time></dd>\n                    </dl>\n                </header>\n                <div class=\"summary\">\n                    <p>Part of the front-end development team working in a Java environment. Working closely with project managers and back-end developers to create web applications on the VYRE Unify CMS.</p>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"layout-spacing-bottom\">\n            <h2 class=\"hdr hdr-main\">Skills</h2>\n            <ul class=\"skills\">\n                <li>HTML5</li>\n                <li>CSS3</li>\n                <li>JavaScript</li>\n                <li>Sass</li>\n                <li>LESS</li>\n                <li>Grunt</li>\n                <li>jQuery</li>\n                <li>AngularJS</li>\n                <li>Git</li>\n                <li>Node JS</li>\n                <li>Mobile First Responsive Design</li>\n                <li>MooTools</li>\n            </ul>\n        </div>\n\n        <div id=\"additional\" class=\"layout-entries\">\n            <h2 class=\"hdr hdr-main\">Additional Information</h2>\n\n            <div id=\"personal\" class=\"entry\">\n                <h3 class=\"hdr hdr-item\">Personal Web Projects</h3>\n                <p>Creating, owning and maintaining a hugely popular gaming community - <a href=\"http://www.interlopers.net\">www.interlopers.net</a>. The site receives thousands of page visits per day and has an expanding community of nearly 10,000 members.</p>\n                <p>Started in 2004, the site has grown considerably and I am responsible for all front-end code on the site. Working closely with a PHP developer has allowed various web applications\n                to be built that have been received well by the user base.</p>\n                <p>I have begun re-writing the entire site using the <a href=\"http://laravel.com\">Laravel framework</a>. A preview is visible at <a href=\"http://stage.interlopers.net\">stage.interlopers.net</a>.</p>\n                <p>Not so long ago I worked with another developer to release Boxjs, a new way for users to load scripts into their pages. The service will take multiple scripts and deliver them to the browser as one,\n                compressed and cached file. A small JS library was necessary to ensure loading files was an easy task and the site also implements a fully responsive design.</p>\n            </div>\n\n            <div id=\"interests\" class=\"entry\">\n                <h3 class=\"hdr hdr-item\">Interests</h3>\n                <p>I play drums in <a href=\"http://fashodacrisis.com\">a loud rock band</a>. We've completed three tours of Eastern Europe and released multiple CDs independently.</p>\n                <p>I've also had the remarkable experience of <a href=\"http://www.flickr.com/photos/simonblink24/sets/72157625051285708/\">visiting Chernobyl in September 2010</a> and returning radiation free! A bit different to ‘Badminton, socialising and reading blogs’ usually found here!</p>\n            </div>\n        </div>\n\n    </div>\n";
  });

this["Handlebars"]["templates"]["home.mustache"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = self.invokePartial(partials.excerpt, 'excerpt', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }

  buffer += "<h1 class=\"hdr hdr-page\">Blog</h1>\n\n<div class=\"layout-excerpt js-post-list\">\n    ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.blog_posts) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.blog_posts; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.blog_posts) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["projects.mustache"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = self.invokePartial(partials.excerpt, 'excerpt', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }

  buffer += "\n    <h1 class=\"hdr hdr-section\">Projects</h1>\n\n    <div class=\"layout-excerpt layout-excerpt-grid cf\">\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.project_items) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.project_items; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.project_items) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["single.mustache"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "    <header class=\"post-title\">\n        <h1 class=\"hdr hdr-post\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h1>\n        <time class=\"post-date\" datetime=\"";
  if (stack1 = helpers.w3c_date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.w3c_date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</time>\n        ";
  stack1 = self.invokePartial(partials.tags, 'tags', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </header>\n    <div class=\"post-content\">\n        ";
  if (stack1 = helpers.content) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.content; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    <footer class=\"post-footer\">\n        <p>Fancy a comment? <a href=\"http://twitter.com/blinkdesign\">Hit me up on twitter</a></p>\n    </footer>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["single_project.mustache"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = self.invokePartial(partials.attachment, 'attachment', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }

  buffer += "\n    <header class=\"post-title\">\n        <h1 class=\"hdr hdr-post\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h1>\n        <p class=\"url\"><a href=\"http://";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">www.";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></p>\n        <p class=\"description\">";
  if (stack1 = helpers.excerpt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.excerpt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n    </header>\n    <div class=\"post-content\">\n        ";
  if (stack1 = helpers.content) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.content; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    <div class=\"work-images\">\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.attachments) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.attachments; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.attachments) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["tag.mustache"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, options, self=this, functionType="function", escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = self.invokePartial(partials.excerpt, 'excerpt', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }

  buffer += "<h1 class=\"hdr hdr-page\">Posts tagged as: ";
  if (stack1 = helpers.tag) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tag; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\n\n<div class=\"layout-excerpt js-post-list\">\n    ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.blog_posts) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.blog_posts; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.blog_posts) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  });

return this["Handlebars"]["templates"];

});