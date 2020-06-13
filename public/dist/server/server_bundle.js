(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "browser";
var __process_env__ = {"NODE_ENV":"development","FB_CONFIG":{"apiKey":"AIzaSyCBqto9Am0yJYXC3PCen6s0G3krVoW1Pbk","authDomain":"g-net-cf48e.firebaseapp.com","databaseURL":"https://g-net-cf48e.firebaseio.com","projectId":"g-net-cf48e","storageBucket":"g-net-cf48e.appspot.com","messagingSenderId":"964354863726","appId":"1:964354863726:web:a0bcb9fd0cd35fdb9a2c7f","measurementId":"G-BQY9QM4ZZF"}};
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("server/index.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.listen(4000);
//# sourceMappingURL=index.js.map
});
return ___scope___.entry = "server/index.jsx";
});
var $fsmp$ = (function() {
	function loadRemoteScript(url) {
		return Promise.resolve().then(function() {
			if (FuseBox.isBrowser) {
				var d = document;
				var head = d.getElementsByTagName("head")[0];
				var target;
				if (/\.css$/.test(url)) {
					target = d.createElement("link");
					target.rel = "stylesheet";
					target.type = "text/css";
					target.href = url;
				} else {
					target = d.createElement("script");
					target.type = "text/javascript";
					target.src = url;
					target.async = true;
				}
				head.insertBefore(target, head.firstChild);
			}
		});
	}

	function request(url, cb) {
		if (FuseBox.isServer) {
			try {
				if (/^http(s)?\:/.test(url)) {
					return require("request")(url, function(error, response, body) {
						if (error) {
							return cb(error);
						}
						return cb(null, body, response.headers["content-type"]);
					});
				}
				if (/\.(js|json)$/.test(url)) {
					cb(null, require(url));
				} else {
					cb(
						null,
						require("fs")
							.readFileSync(require("path").join(__dirname, url))
							.toString()
					);
				}
			} catch (e) {
				cb(e);
			}
		} else {
			var request = new XMLHttpRequest();
			request.onreadystatechange = function() {
				var err;
				if (this.readyState == 4) {
					if (this.status !== 200) {
						err = { code: this.status, msg: this.statusText };
					}
					cb(err, this.responseText, request.getResponseHeader("Content-Type"));
				}
			};
			request.open("GET", url, true);
			request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			request.send();
		}
	}

	function evaluateModule(id, code) {
		var fn = new Function("module", "exports", code);
		var moduleExports = {};
		var moduleObject = { exports: moduleExports };
		fn(moduleObject, moduleExports);
		return moduleObject.exports;
	}

	return function(id) {
		return new Promise(function(resolve, reject) {
			if (FuseBox.exists(id)) {
				return resolve(FuseBox.import(id));
			}

			var isCSS = /\.css$/.test(id);
			if (FuseBox.isServer) {
				if (isCSS) {
					return reject("Can't load CSS on server!");
				}
			}
			// id.charCodeAt(4) = : which means http
			if (FuseBox.isBrowser) {
				if (name.charCodeAt(4) === 58 || name.charCodeAt(5) === 58 || isCSS) {
					return loadRemoteScript(id);
				}
			}
			var splitConfig = FuseBox.global("__fsbx__bundles__");

			if (splitConfig && splitConfig.bundles) {
				if (splitConfig.bundles[id]) {
					return resolve(FuseBox.import("~/" + splitConfig.bundles[id].main));
				}
			}

			request(id, function(error, contents, type) {
				if (error) {
					return reject(error);
				}
				var data;

				if (type) {
					if (/javascript/.test(type)) {
						data = evaluateModule(id, contents);
					} else if (/json/.test(type)) {
						data = JSON.parse(contents);
					} else if (!/javascript/.test(type)) {
						data = contents;
					} else {
						data = contents;
					}
				} else {
					data = contents;
				}

				return resolve(data);
			});
		});
	};
})();
if (FuseBox.isBrowser) {
	window.$fsmp$ = $fsmp$;
}


FuseBox.import("default/server/index.jsx");
FuseBox.main("default/server/index.jsx");
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((m||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),f=e.substring(o+1);return[a,f]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(m){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function f(e){return{server:require(e)}}function u(e,n){var o=n.path||"./",a=n.pkg||"default",u=r(e);if(u&&(o="./",a=u[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=u[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!m&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return f(e);var s=x[a];if(!s){if(m&&"electron"!==_.target)throw"Package not found "+a;return f(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,d=t(o,e),c=i(d),p=s.f[c];return!p&&c.indexOf("*")>-1&&(l=c),p||l||(c=t(d,"/","index.js"),p=s.f[c],p||"."!==d||(c=s.s&&s.s.entry||"index.js",p=s.f[c]),p||(c=d+".js",p=s.f[c]),p||(p=s.f[d+".jsx"]),p||(c=d+"/index.jsx",p=s.f[c])),{file:p,wildcard:l,pkgName:a,versions:s.v,filePath:d,validPath:c}}function s(e,r,n){if(void 0===n&&(n={}),!m)return r(/\.(js|json)$/.test(e)?h.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);_.dynamic(a,o),r(_.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=y[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function d(e){if(null!==e&&["function","object","array"].indexOf(typeof e)!==-1&&!e.hasOwnProperty("default"))return Object.isFrozen(e)?void(e.default=e):void Object.defineProperty(e,"default",{value:e,writable:!0,enumerable:!1})}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=u(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),f=x[t.pkgName];if(f){var p={};for(var v in f.f)a.test(v)&&(p[v]=c(t.pkgName+"/"+v));return p}}if(!i){var g="function"==typeof r,y=l("async",[e,r]);if(y===!1)return;return s(e,function(e){return g?r(e):null},r)}var w=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var b=i.locals={},j=n(t.validPath);b.exports={},b.module={exports:b.exports},b.require=function(e,r){var n=c(e,{pkg:w,path:j,v:t.versions});return _.sdep&&d(n),n},m||!h.require.main?b.require.main={filename:"./",paths:[]}:b.require.main=h.require.main;var k=[b.module.exports,b.require,b.module,t.validPath,j,w];return l("before-import",k),i.fn.apply(k[0],k),l("after-import",k),b.module.exports}if(e.FuseBox)return e.FuseBox;var p="undefined"!=typeof ServiceWorkerGlobalScope,v="undefined"!=typeof WorkerGlobalScope,m="undefined"!=typeof window&&"undefined"!=typeof window.navigator||v||p,h=m?v||p?{}:window:global;m&&(h.global=v||p?{}:window),e=m&&"undefined"==typeof __fbx__dnm__?e:module.exports;var g=m?v||p?{}:window.__fsbx__=window.__fsbx__||{}:h.$fsbx=h.$fsbx||{};m||(h.require=require);var x=g.p=g.p||{},y=g.e=g.e||{},_=function(){function r(){}return r.global=function(e,r){return void 0===r?h[e]:void(h[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){y[e]=y[e]||[],y[e].push(r)},r.exists=function(e){try{var r=u(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=u(e,{}),n=x[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var f=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);f(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=x.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(x[e])return n(x[e].s);var t=x[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=x,r.isBrowser=m,r.isServer=!m,r.plugins=[],r}();return m||(h.FuseBox=_),e.FuseBox=_}(this))
//# sourceMappingURL=server_bundle.js.map?tm=1592057962073