var requirejs,require,define;(function(global){function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){if(e){var n;for(n=0;e.length>n&&(!e[n]||!t(e[n],n,e));n+=1);}}function eachReverse(e,t){if(e){var n;for(n=e.length-1;n>-1&&(!e[n]||!t(e[n],n,e));n-=1);}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var n;for(n in e)if(hasProp(e,n)&&t(e[n],n))break}function mixin(e,t,n,r){return t&&eachProp(t,function(t,i){(n||!hasProp(e,i))&&(r&&"string"!=typeof t?(e[i]||(e[i]={}),mixin(e[i],t,n,r)):e[i]=t)}),e}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,n,r){var i=Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e);return i.requireType=e,i.requireModules=r,n&&(i.originalError=n),i}function newContext(e){function t(e){var t,n;for(t=0;e[t];t+=1)if(n=e[t],"."===n)e.splice(t,1),t-=1;else if(".."===n){if(1===t&&(".."===e[2]||".."===e[0]))break;t>0&&(e.splice(t-1,2),t-=2)}}function n(e,n,r){var i,a,s,o,l,c,u,p,d,h,f,m=n&&n.split("/"),g=m,v=S.map,y=v&&v["*"];if(e&&"."===e.charAt(0)&&(n?(g=getOwn(S.pkgs,n)?m=[n]:m.slice(0,m.length-1),e=g.concat(e.split("/")),t(e),a=getOwn(S.pkgs,i=e[0]),e=e.join("/"),a&&e===i+"/"+a.main&&(e=i)):0===e.indexOf("./")&&(e=e.substring(2))),r&&v&&(m||y)){for(o=e.split("/"),l=o.length;l>0;l-=1){if(u=o.slice(0,l).join("/"),m)for(c=m.length;c>0;c-=1)if(s=getOwn(v,m.slice(0,c).join("/")),s&&(s=getOwn(s,u))){p=s,d=l;break}if(p)break;!h&&y&&getOwn(y,u)&&(h=getOwn(y,u),f=l)}!p&&h&&(p=h,d=f),p&&(o.splice(0,d,p),e=o.join("/"))}return e}function r(e){isBrowser&&each(scripts(),function(t){return t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===x.contextName?(t.parentNode.removeChild(t),!0):void 0})}function i(e){var t=getOwn(S.paths,e);return t&&isArray(t)&&t.length>1?(r(e),t.shift(),x.require.undef(e),x.require([e]),!0):void 0}function a(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function s(e,t,r,i){var s,o,l,c,u=null,p=t?t.name:null,d=e,h=!0,f="";return e||(h=!1,e="_@r"+(P+=1)),c=a(e),u=c[0],e=c[1],u&&(u=n(u,p,i),o=getOwn(N,u)),e&&(u?f=o&&o.normalize?o.normalize(e,function(e){return n(e,p,i)}):n(e,p,i):(f=n(e,p,i),c=a(f),u=c[0],f=c[1],r=!0,s=x.nameToUrl(f))),l=!u||o||r?"":"_unnormalized"+(M+=1),{prefix:u,name:f,parentMap:t,unnormalized:!!l,url:s,originalName:d,isDefine:h,id:(u?u+"!"+f:f)+l}}function o(e){var t=e.id,n=getOwn(T,t);return n||(n=T[t]=new x.Module(e)),n}function l(e,t,n){var r=e.id,i=getOwn(T,r);!hasProp(N,r)||i&&!i.defineEmitComplete?(i=o(e),i.error&&"error"===t?n(i.error):i.on(t,n)):"defined"===t&&n(N[r])}function c(e,t){var n=e.requireModules,r=!1;t?t(e):(each(n,function(t){var n=getOwn(T,t);n&&(n.error=e,n.events.error&&(r=!0,n.emit("error",e)))}),r||req.onError(e))}function u(){globalDefQueue.length&&(apsp.apply(j,[j.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function p(e){delete T[e],delete C[e]}function d(e,t,n){var r=e.map.id;e.error?e.emit("error",e.error):(t[r]=!0,each(e.depMaps,function(r,i){var a=r.id,s=getOwn(T,a);!s||e.depMatched[i]||n[a]||(getOwn(t,a)?(e.defineDep(i,N[a]),e.check()):d(s,t,n))}),n[r]=!0)}function h(){var e,t,n,a,s=1e3*S.waitSeconds,o=s&&x.startTime+s<(new Date).getTime(),l=[],u=[],p=!1,f=!0;if(!y){if(y=!0,eachProp(C,function(n){if(e=n.map,t=e.id,n.enabled&&(e.isDefine||u.push(n),!n.error))if(!n.inited&&o)i(t)?(a=!0,p=!0):(l.push(t),r(t));else if(!n.inited&&n.fetched&&e.isDefine&&(p=!0,!e.prefix))return f=!1}),o&&l.length)return n=makeError("timeout","Load timeout for modules: "+l,null,l),n.contextName=x.contextName,c(n);f&&each(u,function(e){d(e,{},{})}),o&&!a||!p||!isBrowser&&!isWebWorker||k||(k=setTimeout(function(){k=0,h()},50)),y=!1}}function f(e){hasProp(N,e[0])||o(s(e[0],null,!0)).init(e[1],e[2])}function m(e,t,n,r){e.detachEvent&&!isOpera?r&&e.detachEvent(r,t):e.removeEventListener(n,t,!1)}function g(e){var t=e.currentTarget||e.srcElement;return m(t,x.onScriptLoad,"load","onreadystatechange"),m(t,x.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function v(){var e;for(u();j.length;){if(e=j.shift(),null===e[0])return c(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));f(e)}}var y,b,x,w,k,S={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},T={},C={},E={},j=[],N={},q={},P=1,M=1;return w={require:function(e){return e.require?e.require:e.require=x.makeRequire(e.map)},exports:function(e){return e.usingExports=!0,e.map.isDefine?e.exports?e.exports:e.exports=N[e.map.id]={}:void 0},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){var t,n=getOwn(S.pkgs,e.map.id);return t=n?getOwn(S.config,e.map.id+"/"+n.main):getOwn(S.config,e.map.id),t||{}},exports:N[e.map.id]}}},b=function(e){this.events=getOwn(E,e.id)||{},this.map=e,this.shim=getOwn(S.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},b.prototype={init:function(e,t,n,r){r=r||{},this.inited||(this.factory=t,n?this.on("error",n):this.events.error&&(n=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=n,this.inited=!0,this.ignore=r.ignore,r.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,x.startTime=(new Date).getTime();var e=this.map;return this.shim?(x.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()})),void 0):e.prefix?this.callPlugin():this.load()}},load:function(){var e=this.map.url;q[e]||(q[e]=!0,x.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var e,t,n=this.map.id,r=this.depExports,i=this.exports,a=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,1>this.depCount&&!this.defined){if(isFunction(a)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{i=x.execCb(n,a,r,i)}catch(s){e=s}else i=x.execCb(n,a,r,i);if(this.map.isDefine&&(t=this.module,t&&void 0!==t.exports&&t.exports!==this.exports?i=t.exports:void 0===i&&this.usingExports&&(i=this.exports)),e)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",c(this.error=e)}else i=a;this.exports=i,this.map.isDefine&&!this.ignore&&(N[n]=i,req.onResourceLoad&&req.onResourceLoad(x,this.map,this.depMaps)),p(n),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var e=this.map,t=e.id,r=s(e.prefix);this.depMaps.push(r),l(r,"defined",bind(this,function(r){var i,a,u,d=this.map.name,h=this.map.parentMap?this.map.parentMap.name:null,f=x.makeRequire(e.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(r.normalize&&(d=r.normalize(d,function(e){return n(e,h,!0)})||""),a=s(e.prefix+"!"+d,this.map.parentMap),l(a,"defined",bind(this,function(e){this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),u=getOwn(T,a.id),u&&(this.depMaps.push(a),this.events.error&&u.on("error",bind(this,function(e){this.emit("error",e)})),u.enable()),void 0):(i=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),i.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],eachProp(T,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&p(e.map.id)}),c(e)}),i.fromText=bind(this,function(n,r){var a=e.name,l=s(a),u=useInteractive;r&&(n=r),u&&(useInteractive=!1),o(l),hasProp(S.config,t)&&(S.config[a]=S.config[t]);try{req.exec(n)}catch(p){return c(makeError("fromtexteval","fromText eval for "+t+" failed: "+p,p,[t]))}u&&(useInteractive=!0),this.depMaps.push(l),x.completeLoad(a),f([a],i)}),r.load(e.name,f,i,S),void 0)})),x.enable(r,this),this.pluginMaps[r.id]=r},enable:function(){C[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var n,r,i;if("string"==typeof e){if(e=s(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,i=getOwn(w,e.id))return this.depExports[t]=i(this),void 0;this.depCount+=1,l(e,"defined",bind(this,function(e){this.defineDep(t,e),this.check()})),this.errback&&l(e,"error",bind(this,this.errback))}n=e.id,r=T[n],hasProp(w,n)||!r||r.enabled||x.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(T,e.id);t&&!t.enabled&&x.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var n=this.events[e];n||(n=this.events[e]=[]),n.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},x={config:S,contextName:e,registry:T,defined:N,urlFetched:q,defQueue:j,Module:b,makeModuleMap:s,nextTick:req.nextTick,onError:c,configure:function(e){e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/");var t=S.pkgs,n=S.shim,r={paths:!0,config:!0,map:!0};eachProp(e,function(e,t){r[t]?"map"===t?(S.map||(S.map={}),mixin(S[t],e,!0,!0)):mixin(S[t],e,!0):S[t]=e}),e.shim&&(eachProp(e.shim,function(e,t){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=x.makeShimExports(e)),n[t]=e}),S.shim=n),e.packages&&(each(e.packages,function(e){var n;e="string"==typeof e?{name:e}:e,n=e.location,t[e.name]={name:e.name,location:n||e.name,main:(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),S.pkgs=t),eachProp(T,function(e,t){e.inited||e.map.unnormalized||(e.map=s(t))}),(e.deps||e.callback)&&x.require(e.deps||[],e.callback)},makeShimExports:function(e){function t(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}return t},makeRequire:function(t,r){function i(n,a,l){var u,p,d;return r.enableBuildCallback&&a&&isFunction(a)&&(a.__requireJsBuild=!0),"string"==typeof n?isFunction(a)?c(makeError("requireargs","Invalid require call"),l):t&&hasProp(w,n)?w[n](T[t.id]):req.get?req.get(x,n,t,i):(p=s(n,t,!1,!0),u=p.id,hasProp(N,u)?N[u]:c(makeError("notloaded",'Module name "'+u+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(v(),x.nextTick(function(){v(),d=o(s(null,t)),d.skipMap=r.skipMap,d.init(n,a,l,{enabled:!0}),h()}),i)}return r=r||{},mixin(i,{isBrowser:isBrowser,toUrl:function(e){var r,i=e.lastIndexOf("."),a=e.split("/")[0],s="."===a||".."===a;return-1!==i&&(!s||i>1)&&(r=e.substring(i,e.length),e=e.substring(0,i)),x.nameToUrl(n(e,t&&t.id,!0),r,!0)},defined:function(e){return hasProp(N,s(e,t,!1,!0).id)},specified:function(e){return e=s(e,t,!1,!0).id,hasProp(N,e)||hasProp(T,e)}}),t||(i.undef=function(e){u();var n=s(e,t,!0),r=getOwn(T,e);delete N[e],delete q[n.url],delete E[e],r&&(r.events.defined&&(E[e]=r.events),p(e))}),i},enable:function(e){var t=getOwn(T,e.id);t&&o(e).enable()},completeLoad:function(e){var t,n,r,a=getOwn(S.shim,e)||{},s=a.exports;for(u();j.length;){if(n=j.shift(),null===n[0]){if(n[0]=e,t)break;t=!0}else n[0]===e&&(t=!0);f(n)}if(r=getOwn(T,e),!t&&!hasProp(N,e)&&r&&!r.inited){if(!(!S.enforceDefine||s&&getGlobal(s)))return i(e)?void 0:c(makeError("nodefine","No define call for "+e,null,[e]));f([e,a.deps||[],a.exportsFn])}h()},nameToUrl:function(e,t,n){var r,i,a,s,o,l,c,u,p;if(req.jsExtRegExp.test(e))u=e+(t||"");else{for(r=S.paths,i=S.pkgs,o=e.split("/"),l=o.length;l>0;l-=1){if(c=o.slice(0,l).join("/"),a=getOwn(i,c),p=getOwn(r,c)){isArray(p)&&(p=p[0]),o.splice(0,l,p);break}if(a){s=e===a.name?a.location+"/"+a.main:a.location,o.splice(0,l,s);break}}u=o.join("/"),u+=t||(/\?/.test(u)||n?"":".js"),u=("/"===u.charAt(0)||u.match(/^[\w\+\.\-]+:/)?"":S.baseUrl)+u}return S.urlArgs?u+((-1===u.indexOf("?")?"?":"&")+S.urlArgs):u},load:function(e,t){req.load(x,e,t)},execCb:function(e,t,n,r){return t.apply(r,n)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=g(e);x.completeLoad(t.id)}},onScriptError:function(e){var t=g(e);return i(t.id)?void 0:c(makeError("scripterror","Script error for: "+t.id,e,[t.id]))}},x.require=x.makeRequire(),x}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){return"interactive"===e.readyState?interactiveScript=e:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.6",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=!("undefined"==typeof window||!navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"==""+opera,contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if(void 0===define){if(requirejs!==void 0){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}void 0===require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,n,r){var i,a,s=defContextName;return isArray(e)||"string"==typeof e||(a=e,isArray(t)?(e=t,t=n,n=r):e=[]),a&&a.context&&(s=a.context),i=getOwn(contexts,s),i||(i=contexts[s]=req.s.newContext(s)),a&&i.configure(a),i.require(e,t,n)},req.config=function(e){return req(e)},req.nextTick="undefined"!=typeof setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(e){req[e]=function(){var t=contexts[defContextName];return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.load=function(e,t,n){var r,i=e&&e.config||{};if(isBrowser)return r=i.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),r.type=i.scriptType||"text/javascript",r.charset="utf-8",r.async=!0,r.setAttribute("data-requirecontext",e.contextName),r.setAttribute("data-requiremodule",t),!r.attachEvent||r.attachEvent.toString&&0>(""+r.attachEvent).indexOf("[native code")||isOpera?(r.addEventListener("load",e.onScriptLoad,!1),r.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,r.attachEvent("onreadystatechange",e.onScriptLoad)),r.src=n,currentlyAddingScript=r,baseElement?head.insertBefore(r,baseElement):head.appendChild(r),currentlyAddingScript=null,r;if(isWebWorker)try{importScripts(n),e.completeLoad(t)}catch(a){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+n,a,[t]))}},isBrowser&&eachReverse(scripts(),function(e){return head||(head=e.parentNode),dataMain=e.getAttribute("data-main"),dataMain?(mainScript=dataMain,cfg.baseUrl||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0):void 0}),define=function(e,t,n){var r,i;"string"!=typeof e&&(n=t,t=e,e=null),isArray(t)||(n=t,t=null),!t&&isFunction(n)&&(t=[],n.length&&((""+n).replace(commentRegExp,"").replace(cjsRequireRegExp,function(e,n){t.push(n)}),t=(1===n.length?["require"]:["require","exports","module"]).concat(t))),useInteractive&&(r=currentlyAddingScript||getInteractiveScript(),r&&(e||(e=r.getAttribute("data-requiremodule")),i=contexts[r.getAttribute("data-requirecontext")])),(i?i.defQueue:globalDefQueue).push([e,t,n])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}})(this);