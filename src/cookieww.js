/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					var result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				value = converter.write ?
					converter.write(value, key) :
					encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

				key = encodeURIComponent(String(key))
					.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
					.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';
				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}

					// Considers RFC 6265 section 5.2:
					// ...
					// 3.  If the remaining unparsed-attributes contains a %x3B (";")
					//     character:
					// Consume the characters of the unparsed-attributes up to,
					// not including, the first %x3B (";") character.
					// ...
					stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
				}

				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			var jar = {};
			var decode = function (s) {
				return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
			};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, arguments);
		};
		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

/*!
 * jQuery Cookie Information Popup
 * Copyright 2016-2018 Grzegorz Miskiewicz
 * Released under the MIT license
 */
!(function() {
	// HTML element contains data-* attributes with expire,text,text_btn and/or privacy_link
	var config;
	
	// Cookie expire in days
	var expire = 7;
	
	// Information text
	var text = 'Na naszych stronach internetowych stosujemy pliki cookies. Korzystając z naszych serwisów internetowych bez zmiany ustawień przeglądarki wyrażasz zgodę na stosowanie plików cookies.';
	
	// Button text
	var text_btn = 'OK';
	
	// Privacy policy link
	var privacy_link;
	
	this.CookieWW = function( o ) {
		if( typeof Cookies != 'function' ) {
			console.error('momentjs library is required');
			return false;
		}
		
		expire = ( o ? o.expire : expire);
		text = ( o ? o.text : text);
		text_btn = ( o ? o.text_btn : text_btn);
		privacy_link = ( o ? o.privacy_link : privacy_link);
		
		var config = document.getElementById('cookieww');
		
		var isCookieExists = Cookies.get('_cookieww');
		if( !isCookieExists ) {
			
			var d = document.createElement("div");
				d.id = 'cookieww_layer';
				d.setAttribute("class", "show");
			
			document.body.appendChild( d );
			
			var d2 = document.createElement("div");
				d2.setAttribute("class" , "text");
				d2.innerHTML = text;
				
			document.getElementById("cookieww_layer").appendChild( d2 );
			
			var b1 = document.createElement("button");
				b1.id = "cwwb-btn-ok";
				b1.innerHTML = text_btn;
				
			document.querySelector("#cookieww_layer div.text").appendChild( b1 );
			
			console.info( 'creating element' , d );
			
			var btn_click = document.querySelector('button#cwwb-btn-ok');
			btn_click.addEventListener('click' , ConfirmCookies, false);
		}
	}
	
	this.ConfirmCookies = function()
	{
		console.log( 'Confirm' );
		var dcl = document.getElementById('cookieww_layer').className = "hide";
		Cookies.set('_cookieww' , 1, { expires: expire });
	}
	
	console.log('Staring CookieWW');
	CookieWW();
	
}());