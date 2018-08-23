window.sinaRequire=window.sinaRequire||(window.sap&&window.sap.ui&&window.sap.ui.require)||window.require;window.sinaDefine=window.sinaDefine||(window.sap&&window.sap.ui&&window.sap.ui.define)||window.define;window.sinaLog=window.sinaLog||(window.jQuery&&window.jQuery.sap&&window.jQuery.sap.log)||window.console;sinaDefine([],function(){"use strict";var m={};m.map=function(l,c,h){var r=[];for(var i=0;i<l.length;++i){r.push(c.apply(h,[l[i]]));}return r;};m.filter=function(l,c){var r=[];for(var i=0;i<l.length;++i){var h=l[i];if(c(h)){r.push(h);}}return r;};m.object=function(p){var T=function(){};T.prototype=p;return new T();};m.extend=function(o,c){for(var k in c){o[k]=c[k];}return o;};m.firstCharToUpper=function(t,r){if(r){if(t[0]==='_'){t=t.slice(1);}}return t[0].toUpperCase()+t.slice(1);};m.isList=function(o){if(Object.prototype.toString.call(o)==='[object Array]'){return true;}return false;};m.isObject=function(o){if(m.isList(o)){return false;}return typeof o==='object';};m.isFunction=function(o){return typeof o==='function';};m.isString=function(o){return(typeof o)==='string';};m.isSimple=function(o){return(typeof o)!=='object'&&(typeof o)!=='function';};m.Promise=Promise;var g=function(){var c=(function(){return function(){if(arguments[0]==='_suppress_init_'){return;}this._genericInit.apply(this,arguments);};})();return c;};var B=g();B.prototype={_getClassHierarchyPrototypes:function(){var p=[];var c=this.constructor.prototype;while(c){p.push(c);c=c.constructor.superPrototype;}p.reverse();return p;},_genericInit:function(){var c=arguments[0]||{};var p=this._getClassHierarchyPrototypes();for(var i=0;i<p.length;++i){var h=p[i];if(h.hasOwnProperty('_beforeInitProperties')){h._beforeInitProperties.apply(this,arguments);}this._initPropertiesOfPrototype(h,c);if(h.hasOwnProperty('_afterInitProperties')){h._afterInitProperties.apply(this,arguments);}}if(this._init){this._init.apply(this,arguments);}},_initPropertiesOfPrototype:function(p,c){var s=function(j,l,n){if(!j.aggregation){return;}if(!n){return;}if(m.isList(n)){for(var i=0;i<n.length;++i){var o=n[i];o.parent=l;}}else{n.parent=l;}};if(!p.hasOwnProperty('_meta')||!p._meta.properties){return;}for(var h in p._meta.properties){var j=p._meta.properties[h];var k=c[h];if(k!==undefined){this[h]=k;s(j,this,this[h]);continue;}if(j.required){throw new m.Exception('initialization property missing:'+h);}if(j.default!==undefined){if(m.isFunction(j.default)){this[h]=j.default.apply(this,[]);}else{this[h]=j.default;}}s(j,this,this[h]);}},_initClone:function(){},_equals:function(o){if(!o){return false;}if(!m.isObject(o)){return false;}if(o.constructor!==this.constructor){return false;}return true;},equals:function(o,c){var p=this._getClassHierarchyPrototypes();for(var i=0;i<p.length;++i){var h=p[i];if(!h.hasOwnProperty('_equals')){continue;}if(!h._equals.apply(this,[o,c])){return false;}}return true;},clone:function(){var c=new this.constructor('_suppress_init_');var p=this._getClassHierarchyPrototypes();for(var i=0;i<p.length;++i){var h=p[i];if(!h.hasOwnProperty('_initClone')){continue;}h._initClone.apply(c,[this]);}return c;}};B.prototype.constructor=B;var d=function(p,c){var C=g();if(!p){p=B;}C.prototype=m.extend(new p('_suppress_init_'),c);C.superPrototype=p.prototype;C.prototype.constructor=C;e(C.prototype);C.derive=function(h){return d(C,h);};return C;};var a=function(p,c){var h='get'+m.firstCharToUpper(c,true);if(p[h]){return;}p[h]=function(v){return this[c];};};var b=function(p,c){var h='set'+m.firstCharToUpper(c,true);if(p[h]){return;}p[h]=function(v){this[c]=v;};};var e=function(p){if(!p.hasOwnProperty('_meta')){return;}var c=p._meta.properties;if(!c){return;}for(var h in c){var i=c[h];if(i.getter){a(p,h);}if(i.setter){b(p,h);}}};m.defineClass=function(p){return d(null,p);};m.Exception=m.defineClass({_init:function(p){if(m.isString(p)){this.previous=null;this.message=p;this.description='';return;}this.previous=p.previous;this.message=p.message;this.description=p.description||'';},toString:function(){if(this.description){return this.message+'\n'+this.description;}return this.message;}});m.equals=function(o,c,h){if(m.isList(o)){return m._equalsList(o,c,h);}if(m.isObject(o)){return m._equalsObject(o,c,h);}return o===c;};m._equalsList=function(l,c,o){if(o===undefined){o=true;}if(l.length!==c.length){return false;}if(o){for(var i=0;i<l.length;++i){if(!m.equals(l[i],c[i],o)){return false;}}return true;}else{var h={};for(var j=0;j<l.length;++j){var n=l[j];var p=false;for(var k=0;k<c.length;++k){var q=c[k];if(h[k]){continue;}if(m.equals(n,q,o)){p=true;h[k]=true;break;}}if(!p){return false;}}return true;}};m._equalsObject=function(o,c,h){if(o.equals){return o.equals(c);}if(!m.isObject(c)){return false;}for(var p in o){var i=o[p];var j=c[p];if(!m.equals(i,j,h)){return false;}}return true;};m.clone=function(o){if(m.isList(o)){return m._cloneList(o);}if(m.isObject(o)){return m._cloneObject(o);}return o;};m._cloneList=function(l){var c=[];for(var i=0;i<l.length;++i){var h=l[i];c.push(m.clone(h));}return c;};m._cloneObject=function(o){if(o.clone){return o.clone();}var c={};for(var p in o){var v=o[p];c[p]=m.clone(v);}return c;};var f=0;m.generateId=function(){return'#'+(++f);};m.generateGuid=function(){return'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);return v.toString(16).toUpperCase();});};m.executeSequentialAsync=function(t,c){if(!t){return m.Promise.resolve();}var h=function(i){if(i>=t.length){return undefined;}var j=t[i];return Promise.resolve().then(function(){if(c){return c(j);}return j();}).then(function(){return h(i+1);});};return h(0);};return m;});
