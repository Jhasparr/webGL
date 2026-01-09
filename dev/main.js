/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML;

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;
var _defColors = {
  reset: ['fff', '000'],
  // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
};
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
};
var _openTags = {
  '1': 'font-weight:bold',
  // bold
  '2': 'opacity:0.5',
  // dim
  '3': '<i>',
  // italic
  '4': '<u>',
  // underscore
  '8': 'display:none',
  // hidden
  '9': '<del>' // delete
};
var _closeTags = {
  '23': '</i>',
  // reset italic
  '24': '</u>',
  // reset underscore
  '29': '</del>' // reset delete
};
[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>';
});

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML(text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text;
  }

  // Cache opened sequence.
  var ansiCodes = [];
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq];
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) {
        // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop();
        return '</span>';
      }
      // Open tag.
      ansiCodes.push(seq);
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">';
    }
    var ct = _closeTags[seq];
    if (ct) {
      // Pop sequence
      ansiCodes.pop();
      return ct;
    }
    return '';
  });

  // Make sure tags are closed.
  var l = ansiCodes.length;
  l > 0 && (ret += Array(l + 1).join('</span>'));
  return ret;
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.');
  }
  var _finalColors = {};
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null;
    if (!hex) {
      _finalColors[key] = _defColors[key];
      continue;
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex];
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string';
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000');
      }
      var defHexColor = _defColors[key];
      if (!hex[0]) {
        hex[0] = defHexColor[0];
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]];
        hex.push(defHexColor[1]);
      }
      hex = hex.slice(0, 2);
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000');
    }
    _finalColors[key] = hex;
  }
  _setTags(_finalColors);
};

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors);
};

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {};
if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () {
      return _openTags;
    }
  });
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () {
      return _closeTags;
    }
  });
} else {
  ansiHTML.tags.open = _openTags;
  ansiHTML.tags.close = _closeTags;
}
function _setTags(colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1];
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0];
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey;
  for (var code in _styles) {
    var color = _styles[code];
    var oriColor = colors[color] || '000';
    _openTags[code] = 'color:#' + oriColor;
    code = parseInt(code);
    _openTags[(code + 10).toString()] = 'background:#' + oriColor;
  }
}
ansiHTML.reset();

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}
function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};
function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});
EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};
function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0) er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }
  var handler = events[type];
  if (handler === undefined) return false;
  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }
  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }
  return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}
function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;
  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;
    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }
    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }
  return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this;

  // not listening for removeListener, no need to emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  listeners = events[type];
  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }
  return this;
};
function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};
EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;
  if (events !== undefined) {
    var evlistener = events[type];
    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i) copy[i] = arr[i];
  return copy;
}
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];
  list.pop();
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}
function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }
    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    }
    ;
    eventTargetAgnosticAddListener(emitter, name, resolver, {
      once: true
    });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, {
        once: true
      });
    }
  });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* global document */
/*
  eslint-disable
  no-console,
  func-names
*/
var normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");
var srcByModuleId = Object.create(null);
var noDocument = typeof document === "undefined";
var forEach = Array.prototype.forEach;

// eslint-disable-next-line jsdoc/no-restricted-syntax
/**
 * @param {Function} fn any function
 * @param {number} time time
 * @returns {() => void} wrapped function
 */
function debounce(fn, time) {
  var timeout = 0;
  return function () {
    // @ts-expect-error
    var self = this;
    // eslint-disable-next-line prefer-rest-params
    var args = arguments;
    // eslint-disable-next-line func-style
    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };
    clearTimeout(timeout);

    // @ts-expect-error
    timeout = setTimeout(functionCall, time);
  };
}

/**
 * @returns {void}
 */
function noop() {}

/** @typedef {(filename?: string) => string[]} GetScriptSrc */

/**
 * @param {string | number} moduleId a module id
 * @returns {GetScriptSrc} current script url
 */
function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];
  if (!src) {
    if (document.currentScript) {
      src = (/** @type {HTMLScriptElement} */document.currentScript).src;
    } else {
      var scripts = document.getElementsByTagName("script");
      var lastScriptTag = scripts[scripts.length - 1];
      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }
    srcByModuleId[moduleId] = src;
  }

  /** @type {GetScriptSrc} */
  return function (fileMap) {
    if (!src) {
      return [];
    }
    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];
    if (!filename) {
      return [src.replace(".js", ".css")];
    }
    if (!fileMap) {
      return [src.replace(".js", ".css")];
    }
    return fileMap.split(",").map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), "g");
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}

/**
 * @param {string} url URL
 * @returns {boolean} true when URL can be request, otherwise false
 */
function isUrlRequest(url) {
  // An URL is not an request if

  // It is not http or https
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
    return false;
  }
  return true;
}

/** @typedef {HTMLLinkElement & { isLoaded: boolean, visited: boolean }} HotHTMLLinkElement */

/**
 * @param {HotHTMLLinkElement} el html link element
 * @param {string=} url a URL
 */
function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    }

    // eslint-disable-next-line
    url = el.href.split("?")[0];
  }
  if (!isUrlRequest(/** @type {string} */url)) {
    return;
  }
  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }

  // eslint-disable-next-line unicorn/prefer-includes
  if (!url || !(url.indexOf(".css") > -1)) {
    return;
  }
  el.visited = true;
  var newEl = /** @type {HotHTMLLinkElement} */
  el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener("load", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
  newEl.addEventListener("error", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
  newEl.href = "".concat(url, "?").concat(Date.now());
  if (el.parentNode) {
    if (el.nextSibling) {
      el.parentNode.insertBefore(newEl, el.nextSibling);
    } else {
      el.parentNode.appendChild(newEl);
    }
  }
}

/**
 * @param {string} href href
 * @param {string[]} src src
 * @returns {undefined | string} a reload url
 */
function getReloadUrl(href, src) {
  var ret;
  href = normalizeUrl(href);
  src.some(
  /**
   * @param {string} url url
   */
  // eslint-disable-next-line array-callback-return
  function (url) {
    // @ts-expect-error fix me in the next major release
    // eslint-disable-next-line unicorn/prefer-includes
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

/**
 * @param {string[]} src source
 * @returns {boolean} true when loaded, otherwise false
 */
function reloadStyle(src) {
  var elements = document.querySelectorAll("link");
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }
    var url = getReloadUrl(el.href, src);
    if (url && !isUrlRequest(url)) {
      return;
    }
    if (el.visited === true) {
      return;
    }
    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}

/**
 * @returns {void}
 */
function reloadAll() {
  var elements = document.querySelectorAll("link");
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }
    updateCss(el);
  });
}

/**
 * @param {number | string} moduleId a module id
 * @param {{ filename?: string, locals?: boolean }} options options
 * @returns {() => void} wrapper function
 */
module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log("no window.document found, will not HMR CSS");
    return noop;
  }
  var getScriptSrc = getCurrentScriptUrl(moduleId);

  /**
   * @returns {void}
   */
  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);
    if (options.locals) {
      console.log("[HMR] Detected local css modules. Reload all css");
      reloadAll();
      return;
    }
    if (reloaded) {
      console.log("[HMR] css reload %s", src.join(" "));
    } else {
      console.log("[HMR] Reload all css");
      reloadAll();
    }
  }
  return debounce(update, 50);
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * @param {string[]} pathComponents path components
 * @returns {string} normalized url
 */
function normalizeUrlInner(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case "..":
        accumulator.pop();
        break;
      case ".":
        break;
      default:
        accumulator.push(item);
    }
    return accumulator;
  }, /** @type {string[]} */[]).join("/");
}

/**
 * @param {string} urlString url string
 * @returns {string} normalized url string
 */
module.exports = function normalizeUrl(urlString) {
  urlString = urlString.trim();
  if (/^data:/i.test(urlString)) {
    return urlString;
  }
  var protocol =
  // eslint-disable-next-line unicorn/prefer-includes
  urlString.indexOf("//") !== -1 ? "".concat(urlString.split("//")[0], "//") : "";
  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");
  var host = components[0].toLowerCase().replace(/\.$/, "");
  components[0] = "";
  var path = normalizeUrlInner(components);
  return protocol + host + path;
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);
    this.client = new WebSocket(url);
    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }

  /**
   * @param {(...args: any[]) => void} f
   */
  return _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }

    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    }

    // call f with the message string as the first argument
    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);
}();


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSocketURL: () => (/* binding */ createSocketURL),
/* harmony export */   getCurrentScriptSource: () => (/* binding */ getCurrentScriptSource),
/* harmony export */   parseURL: () => (/* binding */ parseURL)
/* harmony export */ });
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _progress_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./progress.js */ "./node_modules/webpack-dev-server/client/progress.js");
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />








/**
 * @typedef {Object} OverlayOptions
 * @property {boolean | (error: Error) => boolean} [warnings]
 * @property {boolean | (error: Error) => boolean} [errors]
 * @property {boolean | (error: Error) => boolean} [runtimeErrors]
 * @property {string} [trustedTypesPolicyName]
 */

/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | OverlayOptions} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @param {boolean | { warnings?: boolean | string; errors?: boolean | string; runtimeErrors?: boolean | string; }} overlayOptions
 */
var decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {
  if (_typeof(overlayOptions) === "object") {
    ["warnings", "errors", "runtimeErrors"].forEach(function (property) {
      if (typeof overlayOptions[property] === "string") {
        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);

        // eslint-disable-next-line no-new-func
        overlayOptions[property] = new Function("message", "var callback = ".concat(overlayFilterFunctionString, "\n        return callback(message)"));
      }
    });
  }
};

/**
 * @type {Status}
 */
var status = {
  isUnloading: false,
  // eslint-disable-next-line camelcase
  currentHash: __webpack_require__.h()
};

/**
 * @returns {string}
 */
var getCurrentScriptSource = function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  }

  // Fallback to getting all scripts running in the document.
  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });
  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  }

  // Fail as there was no script to use.
  throw new Error("[webpack-dev-server] Failed to get current script source.");
};

/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */
var parseURL = function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var result = {};
  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.slice(1).split("&");
    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      result[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = getCurrentScriptSource();
    var scriptSourceURL;
    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {
      // URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }
    if (scriptSourceURL) {
      result = scriptSourceURL;
      result.fromCurrentScript = true;
    }
  }
  return result;
};
var parsedResourceQuery = parseURL(__resourceQuery);
var enabledFeatures = {
  "Hot Module Replacement": false,
  "Live Reloading": false,
  Progress: false,
  Overlay: false
};

/** @type {Options} */
var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  enabledFeatures["Hot Module Replacement"] = true;
}
if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  enabledFeatures["Live Reloading"] = true;
}
if (parsedResourceQuery.progress === "true") {
  options.progress = true;
  enabledFeatures.Progress = true;
}
if (parsedResourceQuery.overlay) {
  try {
    options.overlay = JSON.parse(parsedResourceQuery.overlay);
  } catch (e) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error("Error parsing overlay options from resource query:", e);
  }

  // Fill in default "true" params for partially-specified objects.
  if (_typeof(options.overlay) === "object") {
    options.overlay = _objectSpread({
      errors: true,
      warnings: true,
      runtimeErrors: true
    }, options.overlay);
    decodeOverlayOptions(options.overlay);
  }
  enabledFeatures.Overlay = options.overlay !== false;
}
if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}
if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}

/**
 * @param {string} level
 */
var setAllLogLevel = function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_4__.setLogLevel)(level);
};
if (options.logging) {
  setAllLogLevel(options.logging);
}
var logEnabledFeatures = function logEnabledFeatures(features) {
  var listEnabledFeatures = Object.keys(features);
  if (!features || listEnabledFeatures.length === 0) {
    return;
  }
  var logString = "Server started:";

  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.
  for (var i = 0; i < listEnabledFeatures.length; i++) {
    var key = listEnabledFeatures[i];
    logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
  }
  // replace last comma with a period
  logString = logString.slice(0, -1).concat(".");
  _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info(logString);
};
logEnabledFeatures(enabledFeatures);
self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var overlay = typeof window !== "undefined" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_3__.createOverlay)(_typeof(options.overlay) === "object" ? {
  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,
  catchRuntimeError: options.overlay.runtimeErrors
} : {
  trustedTypesPolicyName: false,
  catchRuntimeError: options.overlay
}) : {
  send: function send() {}
};

/**
 * @param {Options} options
 * @param {Status} currentStatus
 */
var reloadApp = function reloadApp(_ref, currentStatus) {
  var hot = _ref.hot,
    liveReload = _ref.liveReload;
  if (currentStatus.isUnloading) {
    return;
  }
  var currentHash = currentStatus.currentHash,
    previousHash = currentStatus.previousHash;
  var isInitial = currentHash.indexOf(/** @type {string} */previousHash) >= 0;
  if (isInitial) {
    return;
  }

  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */
  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }
  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;
  if (hot && allowToHot) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_1___default().emit("webpackHotUpdate", currentStatus.currentHash);
    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(currentStatus.currentHash), "*");
    }
  }
  // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self;

    // use parent window for reload (in case we're in an iframe with no valid src)
    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;
        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
};
var ansiRegex = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"), "g");

/**
 *
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 * Adapted from code originally released by Sindre Sorhus
 * Licensed the MIT License
 *
 * @param {string} string
 * @return {string}
 */
var stripAnsi = function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a `string`, got `".concat(_typeof(string), "`"));
  }
  return string.replace(ansiRegex, "");
};
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }
    options.hot = true;
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }
    options.liveReload = true;
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("App updated. Recompiling...");

    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Invalid");
  },
  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }
    options.overlay = value;
    decodeOverlayOptions(options.overlay);
  },
  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }
    options.reconnect = value;
  },
  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },
  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }
    if ((0,_progress_js__WEBPACK_IMPORTED_MODULE_6__.isProgressSupported)()) {
      if (typeof options.progress === "string") {
        var progress = document.querySelector("wds-progress");
        if (!progress) {
          (0,_progress_js__WEBPACK_IMPORTED_MODULE_6__.defineProgressElement)();
          progress = document.createElement("wds-progress");
          document.body.appendChild(progress);
        }
        progress.setAttribute("progress", data.percent);
        progress.setAttribute("type", options.progress);
      }
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("Nothing changed.");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Ok");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    reloadApp(options, status);
  },
  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.warn("Warnings while compiling.");
    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_3__.formatProblem)("warning", error),
        header = _formatProblem.header,
        body = _formatProblem.body;
      return "".concat(header, "\n").concat(stripAnsi(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Warnings", printableWarnings);
    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.warn(printableWarnings[i]);
    }
    var overlayWarningsSetting = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;
    if (overlayWarningsSetting) {
      var warningsToDisplay = typeof overlayWarningsSetting === "function" ? _warnings.filter(overlayWarningsSetting) : _warnings;
      if (warningsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "warning",
          messages: _warnings
        });
      }
    }
    if (params && params.preventReloading) {
      return;
    }
    reloadApp(options, status);
  },
  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error("Errors while compiling. Reload prevented.");
    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_3__.formatProblem)("error", error),
        header = _formatProblem2.header,
        body = _formatProblem2.body;
      return "".concat(header, "\n").concat(stripAnsi(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Errors", printableErrors);
    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error(printableErrors[i]);
    }
    var overlayErrorsSettings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;
    if (overlayErrorsSettings) {
      var errorsToDisplay = typeof overlayErrorsSettings === "function" ? _errors.filter(overlayErrorsSettings) : _errors;
      if (errorsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "error",
          messages: _errors
        });
      }
    }
  },
  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("Disconnected!");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Close");
  }
};

/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
var formatURL = function formatURL(objURL) {
  var protocol = objURL.protocol || "";
  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }
  var auth = objURL.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var host = "";
  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));
    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }
  var pathname = objURL.pathname || "";
  if (objURL.slashes) {
    host = "//".concat(host || "");
    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }
  var search = objURL.search || "";
  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }
  var hash = objURL.hash || "";
  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }
  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
};

/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */
var createSocketURL = function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname;

  // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'
  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]";

  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }
  var socketURLProtocol = parsedURL.protocol || self.location.protocol;

  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.
  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }
  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = "";

  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them
  if (parsedURL.username) {
    socketURLAuth = parsedURL.username;

    // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.
    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  }

  // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided
  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;
  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  }

  // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.
  var socketURLPathname = "/ws";
  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }
  return formatURL({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
};
var socketURL = createSocketURL(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_2__["default"])(socketURL, onSocketMessage, options.reconnect);


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/(function () {
  // webpackBootstrap
  /******/
  "use strict";

  /******/
  var __webpack_modules__ = {
    /***/"./client-src/modules/logger/tapable.js": (
    /*!**********************************************!*\
      !*** ./client-src/modules/logger/tapable.js ***!
      \**********************************************/
    /***/
    function (__unused_webpack_module, __nested_webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__nested_webpack_exports__);
      /* harmony export */
      __webpack_require__.d(__nested_webpack_exports__, {
        /* harmony export */SyncBailHook: function () {
          return /* binding */SyncBailHook;
        }
        /* harmony export */
      });
      function SyncBailHook() {
        return {
          call: function call() {}
        };
      }

      /**
       * Client stub for tapable SyncBailHook
       */
      // eslint-disable-next-line import/prefer-default-export

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/Logger.js": (
    /*!****************************************************!*\
      !*** ./node_modules/webpack/lib/logging/Logger.js ***!
      \****************************************************/
    /***/
    function (module) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _typeof(o) {
        "@babel/helpers - typeof";

        return _typeof = "function" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) && "symbol" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator ? function (o) {
          return typeof o;
        } : function (o) {
          return o && "function" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
            return i;
          }) && o.constructor === (typeof Symbol !== "undefined" ? Symbol : function (i) {
            return i;
          }) && o !== (typeof Symbol !== "undefined" ? Symbol : function (i) {
            return i;
          }).prototype ? "symbol" : typeof o;
        }, _typeof(o);
      }
      function _toConsumableArray(r) {
        return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(r, a) {
        if (r) {
          if ("string" == typeof r) return _arrayLikeToArray(r, a);
          var t = {}.toString.call(r).slice(8, -1);
          return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
      }
      function _iterableToArray(r) {
        if ("undefined" != typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) && null != r[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator] || null != r["@@iterator"]) return Array.from(r);
      }
      function _arrayWithoutHoles(r) {
        if (Array.isArray(r)) return _arrayLikeToArray(r);
      }
      function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
      }
      function _classCallCheck(a, n) {
        if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
      }
      function _defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
          var o = r[t];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
        }
      }
      function _createClass(e, r, t) {
        return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
          writable: !1
        }), e;
      }
      function _toPropertyKey(t) {
        var i = _toPrimitive(t, "string");
        return "symbol" == _typeof(i) ? i : i + "";
      }
      function _toPrimitive(t, r) {
        if ("object" != _typeof(t) || !t) return t;
        var e = t[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).toPrimitive];
        if (void 0 !== e) {
          var i = e.call(t, r || "default");
          if ("object" != _typeof(i)) return i;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === r ? String : Number)(t);
      }
      var LogType = Object.freeze({
        error: (/** @type {"error"} */"error"),
        // message, c style arguments
        warn: (/** @type {"warn"} */"warn"),
        // message, c style arguments
        info: (/** @type {"info"} */"info"),
        // message, c style arguments
        log: (/** @type {"log"} */"log"),
        // message, c style arguments
        debug: (/** @type {"debug"} */"debug"),
        // message, c style arguments

        trace: (/** @type {"trace"} */"trace"),
        // no arguments

        group: (/** @type {"group"} */"group"),
        // [label]
        groupCollapsed: (/** @type {"groupCollapsed"} */"groupCollapsed"),
        // [label]
        groupEnd: (/** @type {"groupEnd"} */"groupEnd"),
        // [label]

        profile: (/** @type {"profile"} */"profile"),
        // [profileName]
        profileEnd: (/** @type {"profileEnd"} */"profileEnd"),
        // [profileName]

        time: (/** @type {"time"} */"time"),
        // name, time as [seconds, nanoseconds]

        clear: (/** @type {"clear"} */"clear"),
        // no arguments
        status: (/** @type {"status"} */"status") // message, arguments
      });
      module.exports.LogType = LogType;

      /** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

      var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger raw log method");
      var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger times");
      var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger aggregated times");
      var WebpackLogger = /*#__PURE__*/function () {
        /**
         * @param {(type: LogTypeEnum, args?: EXPECTED_ANY[]) => void} log log function
         * @param {(name: string | (() => string)) => WebpackLogger} getChildLogger function to create child logger
         */
        function WebpackLogger(log, getChildLogger) {
          _classCallCheck(this, WebpackLogger);
          this[LOG_SYMBOL] = log;
          this.getChildLogger = getChildLogger;
        }

        /**
         * @param {...EXPECTED_ANY} args args
         */
        return _createClass(WebpackLogger, [{
          key: "error",
          value: function error() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            this[LOG_SYMBOL](LogType.error, args);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "warn",
          value: function warn() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            this[LOG_SYMBOL](LogType.warn, args);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "info",
          value: function info() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }
            this[LOG_SYMBOL](LogType.info, args);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "log",
          value: function log() {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }
            this[LOG_SYMBOL](LogType.log, args);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "debug",
          value: function debug() {
            for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
              args[_key5] = arguments[_key5];
            }
            this[LOG_SYMBOL](LogType.debug, args);
          }

          /**
           * @param {EXPECTED_ANY} assertion assertion
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "assert",
          value: function assert(assertion) {
            if (!assertion) {
              for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                args[_key6 - 1] = arguments[_key6];
              }
              this[LOG_SYMBOL](LogType.error, args);
            }
          }
        }, {
          key: "trace",
          value: function trace() {
            this[LOG_SYMBOL](LogType.trace, ["Trace"]);
          }
        }, {
          key: "clear",
          value: function clear() {
            this[LOG_SYMBOL](LogType.clear);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "status",
          value: function status() {
            for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
              args[_key7] = arguments[_key7];
            }
            this[LOG_SYMBOL](LogType.status, args);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "group",
          value: function group() {
            for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
              args[_key8] = arguments[_key8];
            }
            this[LOG_SYMBOL](LogType.group, args);
          }

          /**
           * @param {...EXPECTED_ANY} args args
           */
        }, {
          key: "groupCollapsed",
          value: function groupCollapsed() {
            for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
              args[_key9] = arguments[_key9];
            }
            this[LOG_SYMBOL](LogType.groupCollapsed, args);
          }
        }, {
          key: "groupEnd",
          value: function groupEnd() {
            this[LOG_SYMBOL](LogType.groupEnd);
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "profile",
          value: function profile(label) {
            this[LOG_SYMBOL](LogType.profile, [label]);
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "profileEnd",
          value: function profileEnd(label) {
            this[LOG_SYMBOL](LogType.profileEnd, [label]);
          }

          /**
           * @param {string} label label
           */
        }, {
          key: "time",
          value: function time(label) {
            /** @type {Map<string | undefined, [number, number]>} */
            this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
            this[TIMERS_SYMBOL].set(label, process.hrtime());
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "timeLog",
          value: function timeLog(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
            }
            var time = process.hrtime(prev);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "timeEnd",
          value: function timeEnd(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
            }
            var time = process.hrtime(prev);
            /** @type {Map<string | undefined, [number, number]>} */
            this[TIMERS_SYMBOL].delete(label);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "timeAggregate",
          value: function timeAggregate(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
            }
            var time = process.hrtime(prev);
            /** @type {Map<string | undefined, [number, number]>} */
            this[TIMERS_SYMBOL].delete(label);
            /** @type {Map<string | undefined, [number, number]>} */
            this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
            var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);
            if (current !== undefined) {
              if (time[1] + current[1] > 1e9) {
                time[0] += current[0] + 1;
                time[1] = time[1] - 1e9 + current[1];
              } else {
                time[0] += current[0];
                time[1] += current[1];
              }
            }
            this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "timeAggregateEnd",
          value: function timeAggregateEnd(label) {
            if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
            var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
            if (time === undefined) return;
            this[TIMERS_AGGREGATES_SYMBOL].delete(label);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }
        }]);
      }();
      module.exports.Logger = WebpackLogger;

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/createConsoleLogger.js": (
    /*!*****************************************************************!*\
      !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
      \*****************************************************************/
    /***/
    function (module, __unused_webpack_exports, __webpack_require__) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) && r[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator] || r["@@iterator"];
        if (null != t) {
          var e,
            n,
            i,
            u,
            a = [],
            f = !0,
            o = !1;
          try {
            if (i = (t = t.call(r)).next, 0 === l) {
              if (Object(t) !== t) return;
              f = !1;
            } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
          } catch (r) {
            o = !0, n = r;
          } finally {
            try {
              if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally {
              if (o) throw n;
            }
          }
          return a;
        }
      }
      function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
      }
      function _toConsumableArray(r) {
        return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(r, a) {
        if (r) {
          if ("string" == typeof r) return _arrayLikeToArray(r, a);
          var t = {}.toString.call(r).slice(8, -1);
          return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
      }
      function _iterableToArray(r) {
        if ("undefined" != typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) && null != r[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator] || null != r["@@iterator"]) return Array.from(r);
      }
      function _arrayWithoutHoles(r) {
        if (Array.isArray(r)) return _arrayLikeToArray(r);
      }
      function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
      }
      function _typeof(o) {
        "@babel/helpers - typeof";

        return _typeof = "function" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) && "symbol" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator ? function (o) {
          return typeof o;
        } : function (o) {
          return o && "function" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
            return i;
          }) && o.constructor === (typeof Symbol !== "undefined" ? Symbol : function (i) {
            return i;
          }) && o !== (typeof Symbol !== "undefined" ? Symbol : function (i) {
            return i;
          }).prototype ? "symbol" : typeof o;
        }, _typeof(o);
      }
      var _require = __webpack_require__(/*! ./Logger */"./node_modules/webpack/lib/logging/Logger.js"),
        LogType = _require.LogType;

      /** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */
      /** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */
      /** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

      /** @typedef {(item: string) => boolean} FilterFunction */
      /** @typedef {(value: string, type: LogTypeEnum, args?: EXPECTED_ANY[]) => void} LoggingFunction */

      /**
       * @typedef {object} LoggerConsole
       * @property {() => void} clear
       * @property {() => void} trace
       * @property {(...args: EXPECTED_ANY[]) => void} info
       * @property {(...args: EXPECTED_ANY[]) => void} log
       * @property {(...args: EXPECTED_ANY[]) => void} warn
       * @property {(...args: EXPECTED_ANY[]) => void} error
       * @property {(...args: EXPECTED_ANY[]) => void=} debug
       * @property {(...args: EXPECTED_ANY[]) => void=} group
       * @property {(...args: EXPECTED_ANY[]) => void=} groupCollapsed
       * @property {(...args: EXPECTED_ANY[]) => void=} groupEnd
       * @property {(...args: EXPECTED_ANY[]) => void=} status
       * @property {(...args: EXPECTED_ANY[]) => void=} profile
       * @property {(...args: EXPECTED_ANY[]) => void=} profileEnd
       * @property {(...args: EXPECTED_ANY[]) => void=} logTime
       */

      /**
       * @typedef {object} LoggerOptions
       * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
       * @property {FilterTypes|boolean} debug filter for debug logging
       * @property {LoggerConsole} console the console to log to
       */

      /**
       * @param {FilterItemTypes} item an input item
       * @returns {FilterFunction | undefined} filter function
       */
      var filterToFunction = function filterToFunction(item) {
        if (typeof item === "string") {
          var regExp = new RegExp("[\\\\/]".concat(item.replace(/[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
          return function (ident) {
            return regExp.test(ident);
          };
        }
        if (item && _typeof(item) === "object" && typeof item.test === "function") {
          return function (ident) {
            return item.test(ident);
          };
        }
        if (typeof item === "function") {
          return item;
        }
        if (typeof item === "boolean") {
          return function () {
            return item;
          };
        }
      };

      /**
       * @enum {number}
       */
      var LogLevel = {
        none: 6,
        false: 6,
        error: 5,
        warn: 4,
        info: 3,
        log: 2,
        true: 2,
        verbose: 1
      };

      /**
       * @param {LoggerOptions} options options object
       * @returns {LoggingFunction} logging function
       */
      module.exports = function (_ref) {
        var _ref$level = _ref.level,
          level = _ref$level === void 0 ? "info" : _ref$level,
          _ref$debug = _ref.debug,
          debug = _ref$debug === void 0 ? false : _ref$debug,
          console = _ref.console;
        var debugFilters = /** @type {FilterFunction[]} */

        typeof debug === "boolean" ? [function () {
          return debug;
        }] : /** @type {FilterItemTypes[]} */[].concat(debug).map(filterToFunction);
        var loglevel = LogLevel["".concat(level)] || 0;

        /**
         * @param {string} name name of the logger
         * @param {LogTypeEnum} type type of the log entry
         * @param {EXPECTED_ANY[]=} args arguments of the log entry
         * @returns {void}
         */
        var logger = function logger(name, type, args) {
          var labeledArgs = function labeledArgs() {
            if (Array.isArray(args)) {
              if (args.length > 0 && typeof args[0] === "string") {
                return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
              }
              return ["[".concat(name, "]")].concat(_toConsumableArray(args));
            }
            return [];
          };
          var debug = debugFilters.some(function (f) {
            return f(name);
          });
          switch (type) {
            case LogType.debug:
              if (!debug) return;
              if (typeof console.debug === "function") {
                console.debug.apply(console, _toConsumableArray(labeledArgs()));
              } else {
                console.log.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.log:
              if (!debug && loglevel > LogLevel.log) return;
              console.log.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.info:
              if (!debug && loglevel > LogLevel.info) return;
              console.info.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.warn:
              if (!debug && loglevel > LogLevel.warn) return;
              console.warn.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.error:
              if (!debug && loglevel > LogLevel.error) return;
              console.error.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.trace:
              if (!debug) return;
              console.trace();
              break;
            case LogType.groupCollapsed:
              if (!debug && loglevel > LogLevel.log) return;
              if (!debug && loglevel > LogLevel.verbose) {
                if (typeof console.groupCollapsed === "function") {
                  console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
                } else {
                  console.log.apply(console, _toConsumableArray(labeledArgs()));
                }
                break;
              }
            // falls through
            case LogType.group:
              if (!debug && loglevel > LogLevel.log) return;
              if (typeof console.group === "function") {
                console.group.apply(console, _toConsumableArray(labeledArgs()));
              } else {
                console.log.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.groupEnd:
              if (!debug && loglevel > LogLevel.log) return;
              if (typeof console.groupEnd === "function") {
                console.groupEnd();
              }
              break;
            case LogType.time:
              {
                if (!debug && loglevel > LogLevel.log) return;
                var _args = _slicedToArray(/** @type {[string, number, number]} */
                  args, 3),
                  label = _args[0],
                  start = _args[1],
                  end = _args[2];
                var ms = start * 1000 + end / 1000000;
                var msg = "[".concat(name, "] ").concat(label, ": ").concat(ms, " ms");
                if (typeof console.logTime === "function") {
                  console.logTime(msg);
                } else {
                  console.log(msg);
                }
                break;
              }
            case LogType.profile:
              if (typeof console.profile === "function") {
                console.profile.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.profileEnd:
              if (typeof console.profileEnd === "function") {
                console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.clear:
              if (!debug && loglevel > LogLevel.log) return;
              if (typeof console.clear === "function") {
                console.clear();
              }
              break;
            case LogType.status:
              if (!debug && loglevel > LogLevel.info) return;
              if (typeof console.status === "function") {
                if (!args || args.length === 0) {
                  console.status();
                } else {
                  console.status.apply(console, _toConsumableArray(labeledArgs()));
                }
              } else if (args && args.length !== 0) {
                console.info.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            default:
              throw new Error("Unexpected LogType ".concat(type));
          }
        };
        return logger;
      };

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/runtime.js": (
    /*!*****************************************************!*\
      !*** ./node_modules/webpack/lib/logging/runtime.js ***!
      \*****************************************************/
    /***/
    function (module, __unused_webpack_exports, __webpack_require__) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _extends() {
        return _extends = Object.assign ? Object.assign.bind() : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }, _extends.apply(null, arguments);
      }
      var _require = __webpack_require__(/*! tapable */"./client-src/modules/logger/tapable.js"),
        SyncBailHook = _require.SyncBailHook;
      var _require2 = __webpack_require__(/*! ./Logger */"./node_modules/webpack/lib/logging/Logger.js"),
        Logger = _require2.Logger;
      var createConsoleLogger = __webpack_require__(/*! ./createConsoleLogger */"./node_modules/webpack/lib/logging/createConsoleLogger.js");

      /** @type {createConsoleLogger.LoggerOptions} */
      var currentDefaultLoggerOptions = {
        level: "info",
        debug: false,
        console: console
      };
      var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);

      /**
       * @param {string} name name of the logger
       * @returns {Logger} a logger
       */
      module.exports.getLogger = function (name) {
        return new Logger(function (type, args) {
          if (module.exports.hooks.log.call(name, type, args) === undefined) {
            currentDefaultLogger(name, type, args);
          }
        }, function (childName) {
          return module.exports.getLogger("".concat(name, "/").concat(childName));
        });
      };

      /**
       * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
       * @returns {void}
       */
      module.exports.configureDefaultLogger = function (options) {
        _extends(currentDefaultLoggerOptions, options);
        currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
      };
      module.exports.hooks = {
        log: new SyncBailHook(["origin", "type", "args"])
      };

      /***/
    })

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/
  var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/
  function __nested_webpack_require_30373__(moduleId) {
    /******/ // Check if module is in cache
    /******/var cachedModule = __webpack_module_cache__[moduleId];
    /******/
    if (cachedModule !== undefined) {
      /******/return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = __webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    __webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_30373__);
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/
  !function () {
    /******/ // define getter functions for harmony exports
    /******/__nested_webpack_require_30373__.d = function (exports, definition) {
      /******/for (var key in definition) {
        /******/if (__nested_webpack_require_30373__.o(definition, key) && !__nested_webpack_require_30373__.o(exports, key)) {
          /******/Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  }();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  !function () {
    /******/__nested_webpack_require_30373__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    /******/
  }();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/
  !function () {
    /******/ // define __esModule on exports
    /******/__nested_webpack_require_30373__.r = function (exports) {
      /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/
  }();
  /******/
  /************************************************************************/
  var __nested_webpack_exports__ = {};
  // This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
  !function () {
    /*!********************************************!*\
      !*** ./client-src/modules/logger/index.js ***!
      \********************************************/
    __nested_webpack_require_30373__.r(__nested_webpack_exports__);
    /* harmony export */
    __nested_webpack_require_30373__.d(__nested_webpack_exports__, {
      /* harmony export */"default": function () {
        return /* reexport default export from named module */webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__;
      }
      /* harmony export */
    });
    /* harmony import */
    var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_30373__(/*! webpack/lib/logging/runtime.js */"./node_modules/webpack/lib/logging/runtime.js");
  }();
  var __webpack_export_target__ = exports;
  for (var __webpack_i__ in __nested_webpack_exports__) __webpack_export_target__[__webpack_i__] = __nested_webpack_exports__[__webpack_i__];
  if (__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: true
  });
  /******/
})();

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOverlay: () => (/* binding */ createOverlay),
/* harmony export */   formatProblem: () => (/* binding */ formatProblem)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).



/**
 * @type {(input: string, position: number) => string}
 */
var getCodePoint = String.prototype.codePointAt ? function (input, position) {
  return input.codePointAt(position);
} : function (input, position) {
  return (input.charCodeAt(position) - 0xd800) * 0x400 + input.charCodeAt(position + 1) - 0xdc00 + 0x10000;
};

/**
 * @param {string} macroText
 * @param {RegExp} macroRegExp
 * @param {(input: string) => string} macroReplacer
 * @returns {string}
 */
var replaceUsingRegExp = function replaceUsingRegExp(macroText, macroRegExp, macroReplacer) {
  macroRegExp.lastIndex = 0;
  var replaceMatch = macroRegExp.exec(macroText);
  var replaceResult;
  if (replaceMatch) {
    replaceResult = "";
    var replaceLastIndex = 0;
    do {
      if (replaceLastIndex !== replaceMatch.index) {
        replaceResult += macroText.substring(replaceLastIndex, replaceMatch.index);
      }
      var replaceInput = replaceMatch[0];
      replaceResult += macroReplacer(replaceInput);
      replaceLastIndex = replaceMatch.index + replaceInput.length;
      // eslint-disable-next-line no-cond-assign
    } while (replaceMatch = macroRegExp.exec(macroText));
    if (replaceLastIndex !== macroText.length) {
      replaceResult += macroText.substring(replaceLastIndex);
    }
  } else {
    replaceResult = macroText;
  }
  return replaceResult;
};
var references = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
  "&": "&amp;"
};

/**
 * @param {string} text text
 * @returns {string}
 */
function encode(text) {
  if (!text) {
    return "";
  }
  return replaceUsingRegExp(text, /[<>'"&]/g, function (input) {
    var result = references[input];
    if (!result) {
      var code = input.length > 1 ? getCodePoint(input, 0) : input.charCodeAt(0);
      result = "&#".concat(code, ";");
    }
    return result;
  });
}

/**
 * @typedef {Object} StateDefinitions
 * @property {{[event: string]: { target: string; actions?: Array<string> }}} [on]
 */

/**
 * @typedef {Object} Options
 * @property {{[state: string]: StateDefinitions}} states
 * @property {object} context;
 * @property {string} initial
 */

/**
 * @typedef {Object} Implementation
 * @property {{[actionName: string]: (ctx: object, event: any) => object}} actions
 */

/**
 * A simplified `createMachine` from `@xstate/fsm` with the following differences:
 *
 *  - the returned machine is technically a "service". No `interpret(machine).start()` is needed.
 *  - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.
 *  - event passed to `send` must be an object with `type` property.
 *  - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.
 *  Do not return anything if you just want to invoke side effect.
 *
 * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using
 * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.
 *
 * @param {Options} options
 * @param {Implementation} implementation
 */
function createMachine(_ref, _ref2) {
  var states = _ref.states,
    context = _ref.context,
    initial = _ref.initial;
  var actions = _ref2.actions;
  var currentState = initial;
  var currentContext = context;
  return {
    send: function send(event) {
      var currentStateOn = states[currentState].on;
      var transitionConfig = currentStateOn && currentStateOn[event.type];
      if (transitionConfig) {
        currentState = transitionConfig.target;
        if (transitionConfig.actions) {
          transitionConfig.actions.forEach(function (actName) {
            var actionImpl = actions[actName];
            var nextContextValue = actionImpl && actionImpl(currentContext, event);
            if (nextContextValue) {
              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);
            }
          });
        }
      }
    }
  };
}

/**
 * @typedef {Object} ShowOverlayData
 * @property {'warning' | 'error'} level
 * @property {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
 * @property {'build' | 'runtime'} messageSource
 */

/**
 * @typedef {Object} CreateOverlayMachineOptions
 * @property {(data: ShowOverlayData) => void} showOverlay
 * @property {() => void} hideOverlay
 */

/**
 * @param {CreateOverlayMachineOptions} options
 */
var createOverlayMachine = function createOverlayMachine(options) {
  var hideOverlay = options.hideOverlay,
    showOverlay = options.showOverlay;
  return createMachine({
    initial: "hidden",
    context: {
      level: "error",
      messages: [],
      messageSource: "build"
    },
    states: {
      hidden: {
        on: {
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      },
      displayBuildError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["appendMessages", "showOverlay"]
          }
        }
      },
      displayRuntimeError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["appendMessages", "showOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      }
    }
  }, {
    actions: {
      dismissMessages: function dismissMessages() {
        return {
          messages: [],
          level: "error",
          messageSource: "build"
        };
      },
      appendMessages: function appendMessages(context, event) {
        return {
          messages: context.messages.concat(event.messages),
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      setMessages: function setMessages(context, event) {
        return {
          messages: event.messages,
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      hideOverlay: hideOverlay,
      showOverlay: showOverlay
    }
  });
};

/**
 *
 * @param {Error} error
 */
var parseErrorToStacks = function parseErrorToStacks(error) {
  if (!error || !(error instanceof Error)) {
    throw new Error("parseErrorToStacks expects Error object");
  }
  if (typeof error.stack === "string") {
    return error.stack.split("\n").filter(function (stack) {
      return stack !== "Error: ".concat(error.message);
    });
  }
};

/**
 * @callback ErrorCallback
 * @param {ErrorEvent} error
 * @returns {void}
 */

/**
 * @param {ErrorCallback} callback
 */
var listenToRuntimeError = function listenToRuntimeError(callback) {
  window.addEventListener("error", callback);
  return function cleanup() {
    window.removeEventListener("error", callback);
  };
};

/**
 * @callback UnhandledRejectionCallback
 * @param {PromiseRejectionEvent} rejectionEvent
 * @returns {void}
 */

/**
 * @param {UnhandledRejectionCallback} callback
 */
var listenToUnhandledRejection = function listenToUnhandledRejection(callback) {
  window.addEventListener("unhandledrejection", callback);
  return function cleanup() {
    window.removeEventListener("unhandledrejection", callback);
  };
};

// Styles are inspired by `react-error-overlay`

var msgStyles = {
  error: {
    backgroundColor: "rgba(206, 17, 38, 0.1)",
    color: "#fccfcf"
  },
  warning: {
    backgroundColor: "rgba(251, 245, 180, 0.1)",
    color: "#fbf5b4"
  }
};
var iframeStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  border: "none",
  "z-index": 9999999999
};
var containerStyle = {
  position: "fixed",
  boxSizing: "border-box",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  fontSize: "large",
  padding: "2rem 2rem 4rem 2rem",
  lineHeight: "1.2",
  whiteSpace: "pre-wrap",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  color: "white"
};
var headerStyle = {
  color: "#e83b46",
  fontSize: "2em",
  whiteSpace: "pre-wrap",
  fontFamily: "sans-serif",
  margin: "0 2rem 2rem 0",
  flex: "0 0 auto",
  maxHeight: "50%",
  overflow: "auto"
};
var dismissButtonStyle = {
  color: "#ffffff",
  lineHeight: "1rem",
  fontSize: "1.5rem",
  padding: "1rem",
  cursor: "pointer",
  position: "absolute",
  right: 0,
  top: 0,
  backgroundColor: "transparent",
  border: "none"
};
var msgTypeStyle = {
  color: "#e83b46",
  fontSize: "1.2em",
  marginBottom: "1rem",
  fontFamily: "sans-serif"
};
var msgTextStyle = {
  lineHeight: "1.5",
  fontSize: "1rem",
  fontFamily: "Menlo, Consolas, monospace"
};

// ANSI HTML

var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string; stack?: string[] }} item
 * @returns {{ header: string, body: string }}
 */
var formatProblem = function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";
  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || "";
    // eslint-disable-next-line no-nested-ternary
    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }
  if (Array.isArray(item.stack)) {
    item.stack.forEach(function (stack) {
      if (typeof stack === "string") {
        body += "\r\n".concat(stack);
      }
    });
  }
  return {
    header: header,
    body: body
  };
};

/**
 * @typedef {Object} CreateOverlayOptions
 * @property {string | null} trustedTypesPolicyName
 * @property {boolean | (error: Error) => void} [catchRuntimeError]
 */

/**
 *
 * @param {CreateOverlayOptions} options
 */
var createOverlay = function createOverlay(options) {
  /** @type {HTMLIFrameElement | null | undefined} */
  var iframeContainerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var containerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var headerElement;
  /** @type {Array<(element: HTMLDivElement) => void>} */
  var onLoadQueue = [];
  /** @type {TrustedTypePolicy | undefined} */
  var overlayTrustedTypesPolicy;

  /**
   *
   * @param {HTMLElement} element
   * @param {CSSStyleDeclaration} style
   */
  function applyStyle(element, style) {
    Object.keys(style).forEach(function (prop) {
      element.style[prop] = style[prop];
    });
  }

  /**
   * @param {string | null} trustedTypesPolicyName
   */
  function createContainer(trustedTypesPolicyName) {
    // Enable Trusted Types if they are available in the current browser.
    if (window.trustedTypes) {
      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || "webpack-dev-server#overlay", {
        createHTML: function createHTML(value) {
          return value;
        }
      });
    }
    iframeContainerElement = document.createElement("iframe");
    iframeContainerElement.id = "webpack-dev-server-client-overlay";
    iframeContainerElement.src = "about:blank";
    applyStyle(iframeContainerElement, iframeStyle);
    iframeContainerElement.onload = function () {
      var contentElement = /** @type {Document} */
      (/** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).createElement("div");
      containerElement = /** @type {Document} */
      (/** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).createElement("div");
      contentElement.id = "webpack-dev-server-client-overlay-div";
      applyStyle(contentElement, containerStyle);
      headerElement = document.createElement("div");
      headerElement.innerText = "Compiled with problems:";
      applyStyle(headerElement, headerStyle);
      var closeButtonElement = document.createElement("button");
      applyStyle(closeButtonElement, dismissButtonStyle);
      closeButtonElement.innerText = "×";
      closeButtonElement.ariaLabel = "Dismiss";
      closeButtonElement.addEventListener("click", function () {
        // eslint-disable-next-line no-use-before-define
        overlayService.send({
          type: "DISMISS"
        });
      });
      contentElement.appendChild(headerElement);
      contentElement.appendChild(closeButtonElement);
      contentElement.appendChild(containerElement);

      /** @type {Document} */
      (/** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).body.appendChild(contentElement);
      onLoadQueue.forEach(function (onLoad) {
        onLoad(/** @type {HTMLDivElement} */contentElement);
      });
      onLoadQueue = [];

      /** @type {HTMLIFrameElement} */
      iframeContainerElement.onload = null;
    };
    document.body.appendChild(iframeContainerElement);
  }

  /**
   * @param {(element: HTMLDivElement) => void} callback
   * @param {string | null} trustedTypesPolicyName
   */
  function ensureOverlayExists(callback, trustedTypesPolicyName) {
    if (containerElement) {
      containerElement.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML("") : "";
      // Everything is ready, call the callback right away.
      callback(containerElement);
      return;
    }
    onLoadQueue.push(callback);
    if (iframeContainerElement) {
      return;
    }
    createContainer(trustedTypesPolicyName);
  }

  // Successful compilation.
  function hide() {
    if (!iframeContainerElement) {
      return;
    }

    // Clean up and reset internal state.
    document.body.removeChild(iframeContainerElement);
    iframeContainerElement = null;
    containerElement = null;
  }

  // Compilation with errors (e.g. syntax error or missing modules).
  /**
   * @param {string} type
   * @param {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
   * @param {string | null} trustedTypesPolicyName
   * @param {'build' | 'runtime'} messageSource
   */
  function show(type, messages, trustedTypesPolicyName, messageSource) {
    ensureOverlayExists(function () {
      headerElement.innerText = messageSource === "runtime" ? "Uncaught runtime errors:" : "Compiled with problems:";
      messages.forEach(function (message) {
        var entryElement = document.createElement("div");
        var msgStyle = type === "warning" ? msgStyles.warning : msgStyles.error;
        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {
          padding: "1rem 1rem 1.5rem 1rem"
        }));
        var typeElement = document.createElement("div");
        var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;
        typeElement.innerText = header;
        applyStyle(typeElement, msgTypeStyle);
        if (message.moduleIdentifier) {
          applyStyle(typeElement, {
            cursor: "pointer"
          });
          // element.dataset not supported in IE
          typeElement.setAttribute("data-can-open", true);
          typeElement.addEventListener("click", function () {
            fetch("/webpack-dev-server/open-editor?fileName=".concat(message.moduleIdentifier));
          });
        }

        // Make it look similar to our terminal.
        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()(encode(body));
        var messageTextNode = document.createElement("div");
        applyStyle(messageTextNode, msgTextStyle);
        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;
        entryElement.appendChild(typeElement);
        entryElement.appendChild(messageTextNode);

        /** @type {HTMLDivElement} */
        containerElement.appendChild(entryElement);
      });
    }, trustedTypesPolicyName);
  }
  var overlayService = createOverlayMachine({
    showOverlay: function showOverlay(_ref3) {
      var _ref3$level = _ref3.level,
        level = _ref3$level === void 0 ? "error" : _ref3$level,
        messages = _ref3.messages,
        messageSource = _ref3.messageSource;
      return show(level, messages, options.trustedTypesPolicyName, messageSource);
    },
    hideOverlay: hide
  });
  if (options.catchRuntimeError) {
    /**
     * @param {Error | undefined} error
     * @param {string} fallbackMessage
     */
    var handleError = function handleError(error, fallbackMessage) {
      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage);
      var shouldDisplay = typeof options.catchRuntimeError === "function" ? options.catchRuntimeError(errorObject) : true;
      if (shouldDisplay) {
        overlayService.send({
          type: "RUNTIME_ERROR",
          messages: [{
            message: errorObject.message,
            stack: parseErrorToStacks(errorObject)
          }]
        });
      }
    };
    listenToRuntimeError(function (errorEvent) {
      // error property may be empty in older browser like IE
      var error = errorEvent.error,
        message = errorEvent.message;
      if (!error && !message) {
        return;
      }

      // if error stack indicates a React error boundary caught the error, do not show overlay.
      if (error && error.stack && error.stack.includes("invokeGuardedCallbackDev")) {
        return;
      }
      handleError(error, message);
    });
    listenToUnhandledRejection(function (promiseRejectionEvent) {
      var reason = promiseRejectionEvent.reason;
      handleError(reason, "Unknown promise rejection reason");
    });
  }
  return overlayService;
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/progress.js":
/*!************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/progress.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defineProgressElement: () => (/* binding */ defineProgressElement),
/* harmony export */   isProgressSupported: () => (/* binding */ isProgressSupported)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? new Map() : void 0;
  return _wrapNativeSuper = function _wrapNativeSuper(t) {
    if (null === t || !_isNativeFunction(t)) return t;
    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t)) return r.get(t);
      r.set(t, Wrapper);
    }
    function Wrapper() {
      return _construct(t, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), _setPrototypeOf(Wrapper, t);
  }, _wrapNativeSuper(t);
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _classPrivateMethodInitSpec(e, a) {
  _checkPrivateRedeclaration(e, a), a.add(e);
}
function _checkPrivateRedeclaration(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _assertClassBrand(e, t, n) {
  if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function isProgressSupported() {
  return "customElements" in self && !!HTMLElement.prototype.attachShadow;
}
function defineProgressElement() {
  var _WebpackDevServerProgress;
  if (customElements.get("wds-progress")) {
    return;
  }
  var _WebpackDevServerProgress_brand = /*#__PURE__*/new WeakSet();
  var WebpackDevServerProgress = /*#__PURE__*/function (_HTMLElement) {
    function WebpackDevServerProgress() {
      var _this;
      _classCallCheck(this, WebpackDevServerProgress);
      _this = _callSuper(this, WebpackDevServerProgress);
      _classPrivateMethodInitSpec(_this, _WebpackDevServerProgress_brand);
      _this.attachShadow({
        mode: "open"
      });
      _this.maxDashOffset = -219.99078369140625;
      _this.animationTimer = null;
      return _this;
    }
    _inherits(WebpackDevServerProgress, _HTMLElement);
    return _createClass(WebpackDevServerProgress, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        _assertClassBrand(_WebpackDevServerProgress_brand, this, _reset).call(this);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (name === "progress") {
          _assertClassBrand(_WebpackDevServerProgress_brand, this, _update).call(this, Number(newValue));
        } else if (name === "type") {
          _assertClassBrand(_WebpackDevServerProgress_brand, this, _reset).call(this);
        }
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["progress", "type"];
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
  _WebpackDevServerProgress = WebpackDevServerProgress;
  function _reset() {
    var _this$getAttribute, _Number;
    clearTimeout(this.animationTimer);
    this.animationTimer = null;
    var typeAttr = (_this$getAttribute = this.getAttribute("type")) === null || _this$getAttribute === void 0 ? void 0 : _this$getAttribute.toLowerCase();
    this.type = typeAttr === "circular" ? "circular" : "linear";
    var innerHTML = this.type === "circular" ? _circularTemplate.call(_WebpackDevServerProgress) : _linearTemplate.call(_WebpackDevServerProgress);
    this.shadowRoot.innerHTML = innerHTML;
    this.initialProgress = (_Number = Number(this.getAttribute("progress"))) !== null && _Number !== void 0 ? _Number : 0;
    _assertClassBrand(_WebpackDevServerProgress_brand, this, _update).call(this, this.initialProgress);
  }
  function _circularTemplate() {
    return "\n        <style>\n        :host {\n            width: 200px;\n            height: 200px;\n            position: fixed;\n            right: 5%;\n            top: 5%;\n            transition: opacity .25s ease-in-out;\n            z-index: 2147483645;\n        }\n\n        circle {\n            fill: #282d35;\n        }\n\n        path {\n            fill: rgba(0, 0, 0, 0);\n            stroke: rgb(186, 223, 172);\n            stroke-dasharray: 219.99078369140625;\n            stroke-dashoffset: -219.99078369140625;\n            stroke-width: 10;\n            transform: rotate(90deg) translate(0px, -80px);\n        }\n\n        text {\n            font-family: 'Open Sans', sans-serif;\n            font-size: 18px;\n            fill: #ffffff;\n            dominant-baseline: middle;\n            text-anchor: middle;\n        }\n\n        tspan#percent-super {\n            fill: #bdc3c7;\n            font-size: 0.45em;\n            baseline-shift: 10%;\n        }\n\n        @keyframes fade {\n            0% { opacity: 1; transform: scale(1); }\n            100% { opacity: 0; transform: scale(0); }\n        }\n\n        .disappear {\n            animation: fade 0.3s;\n            animation-fill-mode: forwards;\n            animation-delay: 0.5s;\n        }\n\n        .hidden {\n            display: none;\n        }\n        </style>\n        <svg id=\"progress\" class=\"hidden noselect\" viewBox=\"0 0 80 80\">\n        <circle cx=\"50%\" cy=\"50%\" r=\"35\"></circle>\n        <path d=\"M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0\"></path>\n        <text x=\"50%\" y=\"51%\">\n            <tspan id=\"percent-value\">0</tspan>\n            <tspan id=\"percent-super\">%</tspan>\n        </text>\n        </svg>\n      ";
  }
  function _linearTemplate() {
    return "\n        <style>\n        :host {\n            position: fixed;\n            top: 0;\n            left: 0;\n            height: 4px;\n            width: 100vw;\n            z-index: 2147483645;\n        }\n\n        #bar {\n            width: 0%;\n            height: 4px;\n            background-color: rgb(186, 223, 172);\n        }\n\n        @keyframes fade {\n            0% { opacity: 1; }\n            100% { opacity: 0; }\n        }\n\n        .disappear {\n            animation: fade 0.3s;\n            animation-fill-mode: forwards;\n            animation-delay: 0.5s;\n        }\n\n        .hidden {\n            display: none;\n        }\n        </style>\n        <div id=\"progress\"></div>\n        ";
  }
  function _update(percent) {
    var element = this.shadowRoot.querySelector("#progress");
    if (this.type === "circular") {
      var path = this.shadowRoot.querySelector("path");
      var value = this.shadowRoot.querySelector("#percent-value");
      var offset = (100 - percent) / 100 * this.maxDashOffset;
      path.style.strokeDashoffset = offset;
      value.textContent = percent;
    } else {
      element.style.width = "".concat(percent, "%");
    }
    if (percent >= 100) {
      _assertClassBrand(_WebpackDevServerProgress_brand, this, _hide).call(this);
    } else if (percent > 0) {
      _assertClassBrand(_WebpackDevServerProgress_brand, this, _show).call(this);
    }
  }
  function _show() {
    var element = this.shadowRoot.querySelector("#progress");
    element.classList.remove("hidden");
  }
  function _hide() {
    var _this2 = this;
    var element = this.shadowRoot.querySelector("#progress");
    if (this.type === "circular") {
      element.classList.add("disappear");
      element.addEventListener("animationend", function () {
        element.classList.add("hidden");
        _assertClassBrand(_WebpackDevServerProgress_brand, _this2, _update).call(_this2, 0);
      }, {
        once: true
      });
    } else if (this.type === "linear") {
      element.classList.add("disappear");
      this.animationTimer = setTimeout(function () {
        element.classList.remove("disappear");
        element.classList.add("hidden");
        element.style.width = "0%";
        _this2.animationTimer = null;
      }, 800);
    }
  }
  customElements.define("wds-progress", WebpackDevServerProgress);
}

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   client: () => (/* binding */ client),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */




// this WebsocketClient is here as a default fallback, in case the client is not injected
/* eslint-disable camelcase */
var Client =
// eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;

// Initialized client is exported so external consumers can utilize the same instance
// It is mutable to enforce singleton
// eslint-disable-next-line import/no-mutable-exports
var client = null;
var timeout;

/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */
var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    }

    // Try to reconnect.
    client = null;

    // After 10 retries stop trying, to prevent logspam.
    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      timeout = setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);
    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server";
// default level is set on the client side, so it does not need
// to be set by the CLI or API
var defaultLevel = "info";

// options new options, merge with old options
/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */
function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}
setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */

// Send messages to the outside, so plugins can consume it.
/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
  /** @type {undefined|string} */
  var lastHash;
  var upToDate = function upToDate() {
    return /** @type {string} */lastHash.indexOf(__webpack_require__.h()) >= 0;
  };
  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  var check = function check() {
    module.hot.check(true).then(function (updatedModules) {
      if (!updatedModules) {
        log("warning", "[HMR] Cannot find update. " + (typeof window !== "undefined" ? "Need to do a full reload!" : "Please reload manually!"));
        log("warning", "[HMR] (Probably because of restarting the webpack-dev-server)");
        if (typeof window !== "undefined") {
          window.location.reload();
        }
        return;
      }
      if (!upToDate()) {
        check();
      }
      __webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
      if (upToDate()) {
        log("info", "[HMR] App is up to date.");
      }
    }).catch(function (err) {
      var status = module.hot.status();
      if (["abort", "fail"].indexOf(status) >= 0) {
        log("warning", "[HMR] Cannot apply update. " + (typeof window !== "undefined" ? "Need to do a full reload!" : "Please reload manually!"));
        log("warning", "[HMR] " + log.formatError(err));
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      } else {
        log("warning", "[HMR] Update failed: " + log.formatError(err));
      }
    });
  };
  var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
  hotEmitter.on("webpackHotUpdate", function (currentHash) {
    lastHash = currentHash;
    if (!upToDate() && module.hot.status() === "idle") {
      log("info", "[HMR] Checking for updates on the server...");
      check();
    }
  });
  log("info", "[HMR] Waiting for update signal from WDS...");
} else // removed by dead control flow
{}

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
  var unacceptedModules = updatedModules.filter(function (moduleId) {
    return renewedModules && renewedModules.indexOf(moduleId) < 0;
  });
  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  if (unacceptedModules.length > 0) {
    log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
    unacceptedModules.forEach(function (moduleId) {
      log("warning", "[HMR]  - " + moduleId);
    });
  }
  if (!renewedModules || renewedModules.length === 0) {
    log("info", "[HMR] Nothing hot updated.");
  } else {
    log("info", "[HMR] Updated modules:");
    renewedModules.forEach(function (moduleId) {
      if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
        var parts = moduleId.split("!");
        log.groupCollapsed("info", "[HMR]  - " + parts.pop());
        log("info", "[HMR]  - " + moduleId);
        log.groupEnd("info");
      } else {
        log("info", "[HMR]  - " + moduleId);
      }
    });
    var numberIds = renewedModules.every(function (moduleId) {
      return typeof moduleId === "number";
    });
    if (numberIds) log("info", '[HMR] Consider using the optimization.moduleIds: "named" for module names.');
  }
};

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";
function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
  var shouldLog = logLevel === "info" && level === "info" || ["info", "warning"].indexOf(logLevel) >= 0 && level === "warning" || ["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error";
  return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
  return function (level, msg) {
    if (shouldLog(level)) {
      logFn(msg);
    }
  };
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
  if (shouldLog(level)) {
    if (level === "info") {
      console.log(msg);
    } else if (level === "warning") {
      console.warn(msg);
    } else if (level === "error") {
      console.error(msg);
    }
  }
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
  var message = err.message;
  var stack = err.stack;
  if (!stack) {
    return message;
  } else if (stack.indexOf(message) < 0) {
    return message + "\n" + stack;
  }
  return stack;
};
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
module.exports.group = logGroup(group);
module.exports.groupCollapsed = logGroup(groupCollapsed);
module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
  logLevel = level;
};

/***/ }),

/***/ "./styles/index.scss":
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      (function() {
        var localsJsonString = undefined;
        // 1764948138397
        var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"publicPath":""});
        // only invalidate when locals change
        if (
          module.hot.data &&
          module.hot.data.value &&
          module.hot.data.value !== localsJsonString
        ) {
          module.hot.invalidate();
        } else {
          module.hot.accept();
        }
        module.hot.dispose(function(data) {
          data.value = localsJsonString;
          cssReload();
        });
      })();
    }
  

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".css";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("413b5da782ec53330173")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "webgl:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				// inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								}
/******/ 								return setStatus("ready").then(function () {
/******/ 									return updatedModules;
/******/ 								});
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 		
/******/ 			var onAccepted = function () {
/******/ 				return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 					// handle errors in accept handlers and self accepted module load
/******/ 					if (error) {
/******/ 						return setStatus("fail").then(function () {
/******/ 							throw error;
/******/ 						});
/******/ 					}
/******/ 		
/******/ 					if (queuedInvalidatedModules) {
/******/ 						return internalApply(options).then(function (list) {
/******/ 							outdatedModules.forEach(function (moduleId) {
/******/ 								if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 							});
/******/ 							return list;
/******/ 						});
/******/ 					}
/******/ 		
/******/ 					return setStatus("idle").then(function () {
/******/ 						return outdatedModules;
/******/ 					});
/******/ 				});
/******/ 			};
/******/ 		
/******/ 			return Promise.all(
/******/ 				results
/******/ 					.filter(function (result) {
/******/ 						return result.apply;
/******/ 					})
/******/ 					.map(function (result) {
/******/ 						return result.apply(reportError);
/******/ 					})
/******/ 			)
/******/ 				.then(function (applyResults) {
/******/ 					applyResults.forEach(function (modules) {
/******/ 						if (modules) {
/******/ 							for (var i = 0; i < modules.length; i++) {
/******/ 								outdatedModules.push(modules[i]);
/******/ 							}
/******/ 						}
/******/ 					});
/******/ 				})
/******/ 				.then(onAccepted);
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			if (__webpack_require__.nc) {
/******/ 				linkTag.nonce = __webpack_require__.nc;
/******/ 			}
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && event.type;
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + errorType + ": " + realHref + ")");
/******/ 					err.name = "ChunkLoadError";
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, oldTag, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatewebgl"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					var result = newModuleFactory
/******/ 						? getAffectedModuleEffects(moduleId)
/******/ 						: {
/******/ 								type: "disposed",
/******/ 								moduleId: moduleId
/******/ 							};
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					var acceptPromises = [];
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									var result;
/******/ 									try {
/******/ 										result = callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 									if (result && typeof result.then === "function") {
/******/ 										acceptPromises.push(result);
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					var onAccepted = function () {
/******/ 						// Load self accepted modules
/******/ 						for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 							var item = outdatedSelfAcceptedModules[o];
/******/ 							var moduleId = item.module;
/******/ 							try {
/******/ 								item.require(moduleId);
/******/ 							} catch (err) {
/******/ 								if (typeof item.errorHandler === "function") {
/******/ 									try {
/******/ 										item.errorHandler(err, {
/******/ 											moduleId: moduleId,
/******/ 											module: __webpack_require__.c[moduleId]
/******/ 										});
/******/ 									} catch (err1) {
/******/ 										if (options.onErrored) {
/******/ 											options.onErrored({
/******/ 												type: "self-accept-error-handler-errored",
/******/ 												moduleId: moduleId,
/******/ 												error: err1,
/******/ 												originalError: err
/******/ 											});
/******/ 										}
/******/ 										if (!options.ignoreErrored) {
/******/ 											reportError(err1);
/******/ 											reportError(err);
/******/ 										}
/******/ 									}
/******/ 								} else {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					};
/******/ 		
/******/ 					return Promise.all(acceptPromises)
/******/ 						.then(onAccepted)
/******/ 						.then(function () {
/******/ 							return outdatedModules;
/******/ 						});
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	__webpack_require__("./app/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./styles/index.scss");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxtQkFBbUIsMkJBQTJCO1dBQzlDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBLGtCQUFrQixjQUFjO1dBQ2hDO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxjQUFjLGFBQWE7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSxpQkFBaUIsNEJBQTRCO1dBQzdDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLElBQUk7V0FDSjs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7V0FDQTtXQUNBLGdCQUFnQiw0QkFBNEI7V0FDNUM7V0FDQTtXQUNBOztXQUVBO1dBQ0E7O1dBRUE7V0FDQTs7V0FFQTtXQUNBOztXQUVBO1dBQ0EsZ0JBQWdCLDRCQUE0QjtXQUM1QztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxrQkFBa0IsdUNBQXVDO1dBQ3pEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQSxtQkFBbUIsaUNBQWlDO1dBQ3BEO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxzQkFBc0IsdUNBQXVDO1dBQzdEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHNCQUFzQixzQkFBc0I7V0FDNUM7V0FDQTtXQUNBO1dBQ0EsU0FBUztXQUNUO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxXQUFXO1dBQ1gsV0FBVztXQUNYO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsWUFBWTtXQUNaO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFVBQVU7V0FDVjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxXQUFXO1dBQ1g7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLG9CQUFvQix3Q0FBd0M7V0FDNUQ7V0FDQTtXQUNBO1dBQ0E7V0FDQSxPQUFPO1dBQ1A7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFNBQVM7V0FDVCxTQUFTO1dBQ1Q7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsVUFBVTtXQUNWO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFFBQVE7V0FDUjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsU0FBUztXQUNUO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFLElBQUk7V0FDTjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0Esc0NBQXNDO1dBQ3RDO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7O1dBRUE7O1dBRUEsb0I7Ozs7O1VFcmdCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYmdsLy4vbm9kZV9tb2R1bGVzL2Fuc2ktaHRtbC1jb21tdW5pdHkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2ViZ2wvLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly93ZWJnbC8uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWJnbC8uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ub3JtYWxpemUtdXJsLmpzIiwid2VicGFjazovL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvY2xpZW50cy9XZWJTb2NrZXRDbGllbnQuanMiLCJ3ZWJwYWNrOi8vd2ViZ2wvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJnbC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L21vZHVsZXMvbG9nZ2VyL2luZGV4LmpzIiwid2VicGFjazovL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvb3ZlcmxheS5qcyIsIndlYnBhY2s6Ly93ZWJnbC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3Byb2dyZXNzLmpzIiwid2VicGFjazovL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvc29ja2V0LmpzIiwid2VicGFjazovL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvbG9nLmpzIiwid2VicGFjazovL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvc2VuZE1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vd2ViZ2wvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvZGV2LXNlcnZlci5qcyIsIndlYnBhY2s6Ly93ZWJnbC8uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9lbWl0dGVyLmpzIiwid2VicGFjazovL3dlYmdsLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy1hcHBseS1yZXN1bHQuanMiLCJ3ZWJwYWNrOi8vd2ViZ2wvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLmpzIiwid2VicGFjazovL3dlYmdsLy4vc3R5bGVzL2luZGV4LnNjc3M/ZjBmZiIsIndlYnBhY2s6Ly93ZWJnbC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJnbC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWJnbC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViZ2wvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IHVwZGF0ZSBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly93ZWJnbC93ZWJwYWNrL3J1bnRpbWUvZ2V0IG1pbmktY3NzIGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3dlYmdsL3dlYnBhY2svcnVudGltZS9nZXQgdXBkYXRlIG1hbmlmZXN0IGZpbGVuYW1lIiwid2VicGFjazovL3dlYmdsL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCIsIndlYnBhY2s6Ly93ZWJnbC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3dlYmdsL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViZ2wvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL3dlYmdsL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViZ2wvd2VicGFjay9ydW50aW1lL2hvdCBtb2R1bGUgcmVwbGFjZW1lbnQiLCJ3ZWJwYWNrOi8vd2ViZ2wvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2ViZ2wvd2VicGFjay9ydW50aW1lL2NzcyBsb2FkaW5nIiwid2VicGFjazovL3dlYmdsL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3dlYmdsL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2ViZ2wvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3dlYmdsL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBhbnNpSFRNTFxuXG4vLyBSZWZlcmVuY2UgdG8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9hbnNpLXJlZ2V4XG52YXIgX3JlZ0FOU0kgPSAvKD86KD86XFx1MDAxYlxcWyl8XFx1MDA5YikoPzooPzpbMC05XXsxLDN9KT8oPzooPzo7WzAtOV17MCwzfSkqKT9bQS1NfGYtbV0pfFxcdTAwMWJbQS1NXS9cblxudmFyIF9kZWZDb2xvcnMgPSB7XG4gIHJlc2V0OiBbJ2ZmZicsICcwMDAnXSwgLy8gW0ZPUkVHUk9VRF9DT0xPUiwgQkFDS0dST1VORF9DT0xPUl1cbiAgYmxhY2s6ICcwMDAnLFxuICByZWQ6ICdmZjAwMDAnLFxuICBncmVlbjogJzIwOTgwNScsXG4gIHllbGxvdzogJ2U4YmYwMycsXG4gIGJsdWU6ICcwMDAwZmYnLFxuICBtYWdlbnRhOiAnZmYwMGZmJyxcbiAgY3lhbjogJzAwZmZlZScsXG4gIGxpZ2h0Z3JleTogJ2YwZjBmMCcsXG4gIGRhcmtncmV5OiAnODg4J1xufVxudmFyIF9zdHlsZXMgPSB7XG4gIDMwOiAnYmxhY2snLFxuICAzMTogJ3JlZCcsXG4gIDMyOiAnZ3JlZW4nLFxuICAzMzogJ3llbGxvdycsXG4gIDM0OiAnYmx1ZScsXG4gIDM1OiAnbWFnZW50YScsXG4gIDM2OiAnY3lhbicsXG4gIDM3OiAnbGlnaHRncmV5J1xufVxudmFyIF9vcGVuVGFncyA9IHtcbiAgJzEnOiAnZm9udC13ZWlnaHQ6Ym9sZCcsIC8vIGJvbGRcbiAgJzInOiAnb3BhY2l0eTowLjUnLCAvLyBkaW1cbiAgJzMnOiAnPGk+JywgLy8gaXRhbGljXG4gICc0JzogJzx1PicsIC8vIHVuZGVyc2NvcmVcbiAgJzgnOiAnZGlzcGxheTpub25lJywgLy8gaGlkZGVuXG4gICc5JzogJzxkZWw+JyAvLyBkZWxldGVcbn1cbnZhciBfY2xvc2VUYWdzID0ge1xuICAnMjMnOiAnPC9pPicsIC8vIHJlc2V0IGl0YWxpY1xuICAnMjQnOiAnPC91PicsIC8vIHJlc2V0IHVuZGVyc2NvcmVcbiAgJzI5JzogJzwvZGVsPicgLy8gcmVzZXQgZGVsZXRlXG59XG5cbjtbMCwgMjEsIDIyLCAyNywgMjgsIDM5LCA0OV0uZm9yRWFjaChmdW5jdGlvbiAobikge1xuICBfY2xvc2VUYWdzW25dID0gJzwvc3Bhbj4nXG59KVxuXG4vKipcbiAqIENvbnZlcnRzIHRleHQgd2l0aCBBTlNJIGNvbG9yIGNvZGVzIHRvIEhUTUwgbWFya3VwLlxuICogQHBhcmFtIHtTdHJpbmd9IHRleHRcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBhbnNpSFRNTCAodGV4dCkge1xuICAvLyBSZXR1cm5zIHRoZSB0ZXh0IGlmIHRoZSBzdHJpbmcgaGFzIG5vIEFOU0kgZXNjYXBlIGNvZGUuXG4gIGlmICghX3JlZ0FOU0kudGVzdCh0ZXh0KSkge1xuICAgIHJldHVybiB0ZXh0XG4gIH1cblxuICAvLyBDYWNoZSBvcGVuZWQgc2VxdWVuY2UuXG4gIHZhciBhbnNpQ29kZXMgPSBbXVxuICAvLyBSZXBsYWNlIHdpdGggbWFya3VwLlxuICB2YXIgcmV0ID0gdGV4dC5yZXBsYWNlKC9cXDAzM1xcWyhcXGQrKW0vZywgZnVuY3Rpb24gKG1hdGNoLCBzZXEpIHtcbiAgICB2YXIgb3QgPSBfb3BlblRhZ3Nbc2VxXVxuICAgIGlmIChvdCkge1xuICAgICAgLy8gSWYgY3VycmVudCBzZXF1ZW5jZSBoYXMgYmVlbiBvcGVuZWQsIGNsb3NlIGl0LlxuICAgICAgaWYgKCEhfmFuc2lDb2Rlcy5pbmRleE9mKHNlcSkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1leHRyYS1ib29sZWFuLWNhc3RcbiAgICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICAgIHJldHVybiAnPC9zcGFuPidcbiAgICAgIH1cbiAgICAgIC8vIE9wZW4gdGFnLlxuICAgICAgYW5zaUNvZGVzLnB1c2goc2VxKVxuICAgICAgcmV0dXJuIG90WzBdID09PSAnPCcgPyBvdCA6ICc8c3BhbiBzdHlsZT1cIicgKyBvdCArICc7XCI+J1xuICAgIH1cblxuICAgIHZhciBjdCA9IF9jbG9zZVRhZ3Nbc2VxXVxuICAgIGlmIChjdCkge1xuICAgICAgLy8gUG9wIHNlcXVlbmNlXG4gICAgICBhbnNpQ29kZXMucG9wKClcbiAgICAgIHJldHVybiBjdFxuICAgIH1cbiAgICByZXR1cm4gJydcbiAgfSlcblxuICAvLyBNYWtlIHN1cmUgdGFncyBhcmUgY2xvc2VkLlxuICB2YXIgbCA9IGFuc2lDb2Rlcy5sZW5ndGhcbiAgOyhsID4gMCkgJiYgKHJldCArPSBBcnJheShsICsgMSkuam9pbignPC9zcGFuPicpKVxuXG4gIHJldHVybiByZXRcbn1cblxuLyoqXG4gKiBDdXN0b21pemUgY29sb3JzLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbG9ycyByZWZlcmVuY2UgdG8gX2RlZkNvbG9yc1xuICovXG5hbnNpSFRNTC5zZXRDb2xvcnMgPSBmdW5jdGlvbiAoY29sb3JzKSB7XG4gIGlmICh0eXBlb2YgY29sb3JzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignYGNvbG9yc2AgcGFyYW1ldGVyIG11c3QgYmUgYW4gT2JqZWN0LicpXG4gIH1cblxuICB2YXIgX2ZpbmFsQ29sb3JzID0ge31cbiAgZm9yICh2YXIga2V5IGluIF9kZWZDb2xvcnMpIHtcbiAgICB2YXIgaGV4ID0gY29sb3JzLmhhc093blByb3BlcnR5KGtleSkgPyBjb2xvcnNba2V5XSA6IG51bGxcbiAgICBpZiAoIWhleCkge1xuICAgICAgX2ZpbmFsQ29sb3JzW2tleV0gPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGlmICgncmVzZXQnID09PSBrZXkpIHtcbiAgICAgIGlmICh0eXBlb2YgaGV4ID09PSAnc3RyaW5nJykge1xuICAgICAgICBoZXggPSBbaGV4XVxuICAgICAgfVxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGhleCkgfHwgaGV4Lmxlbmd0aCA9PT0gMCB8fCBoZXguc29tZShmdW5jdGlvbiAoaCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGggIT09ICdzdHJpbmcnXG4gICAgICB9KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYW4gQXJyYXkgYW5kIGVhY2ggaXRlbSBjb3VsZCBvbmx5IGJlIGEgaGV4IHN0cmluZywgZS5nLjogRkYwMDAwJylcbiAgICAgIH1cbiAgICAgIHZhciBkZWZIZXhDb2xvciA9IF9kZWZDb2xvcnNba2V5XVxuICAgICAgaWYgKCFoZXhbMF0pIHtcbiAgICAgICAgaGV4WzBdID0gZGVmSGV4Q29sb3JbMF1cbiAgICAgIH1cbiAgICAgIGlmIChoZXgubGVuZ3RoID09PSAxIHx8ICFoZXhbMV0pIHtcbiAgICAgICAgaGV4ID0gW2hleFswXV1cbiAgICAgICAgaGV4LnB1c2goZGVmSGV4Q29sb3JbMV0pXG4gICAgICB9XG5cbiAgICAgIGhleCA9IGhleC5zbGljZSgwLCAyKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGhleCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHZhbHVlIG9mIGAnICsga2V5ICsgJ2AgcHJvcGVydHkgbXVzdCBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgfVxuICAgIF9maW5hbENvbG9yc1trZXldID0gaGV4XG4gIH1cbiAgX3NldFRhZ3MoX2ZpbmFsQ29sb3JzKVxufVxuXG4vKipcbiAqIFJlc2V0IGNvbG9ycy5cbiAqL1xuYW5zaUhUTUwucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIF9zZXRUYWdzKF9kZWZDb2xvcnMpXG59XG5cbi8qKlxuICogRXhwb3NlIHRhZ3MsIGluY2x1ZGluZyBvcGVuIGFuZCBjbG9zZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmFuc2lIVE1MLnRhZ3MgPSB7fVxuXG5pZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhbnNpSFRNTC50YWdzLCAnb3BlbicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9vcGVuVGFncyB9XG4gIH0pXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhbnNpSFRNTC50YWdzLCAnY2xvc2UnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfY2xvc2VUYWdzIH1cbiAgfSlcbn0gZWxzZSB7XG4gIGFuc2lIVE1MLnRhZ3Mub3BlbiA9IF9vcGVuVGFnc1xuICBhbnNpSFRNTC50YWdzLmNsb3NlID0gX2Nsb3NlVGFnc1xufVxuXG5mdW5jdGlvbiBfc2V0VGFncyAoY29sb3JzKSB7XG4gIC8vIHJlc2V0IGFsbFxuICBfb3BlblRhZ3NbJzAnXSA9ICdmb250LXdlaWdodDpub3JtYWw7b3BhY2l0eToxO2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzBdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzFdXG4gIC8vIGludmVyc2VcbiAgX29wZW5UYWdzWyc3J10gPSAnY29sb3I6IycgKyBjb2xvcnMucmVzZXRbMV0gKyAnO2JhY2tncm91bmQ6IycgKyBjb2xvcnMucmVzZXRbMF1cbiAgLy8gZGFyayBncmV5XG4gIF9vcGVuVGFnc1snOTAnXSA9ICdjb2xvcjojJyArIGNvbG9ycy5kYXJrZ3JleVxuXG4gIGZvciAodmFyIGNvZGUgaW4gX3N0eWxlcykge1xuICAgIHZhciBjb2xvciA9IF9zdHlsZXNbY29kZV1cbiAgICB2YXIgb3JpQ29sb3IgPSBjb2xvcnNbY29sb3JdIHx8ICcwMDAnXG4gICAgX29wZW5UYWdzW2NvZGVdID0gJ2NvbG9yOiMnICsgb3JpQ29sb3JcbiAgICBjb2RlID0gcGFyc2VJbnQoY29kZSlcbiAgICBfb3BlblRhZ3NbKGNvZGUgKyAxMCkudG9TdHJpbmcoKV0gPSAnYmFja2dyb3VuZDojJyArIG9yaUNvbG9yXG4gIH1cbn1cblxuYW5zaUhUTUwucmVzZXQoKVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgcmVzb2x2ZXIpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIHJlc29sdmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGVycm9yTGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBoYW5kbGVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgJ2Vycm9yJywgaGFuZGxlciwgZmxhZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCBsaXN0ZW5lciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgIGVtaXR0ZXIub25jZShuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtaXR0ZXIub24obmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gRXZlbnRUYXJnZXQgZG9lcyBub3QgaGF2ZSBgZXJyb3JgIGV2ZW50IHNlbWFudGljcyBsaWtlIE5vZGVcbiAgICAvLyBFdmVudEVtaXR0ZXJzLCB3ZSBkbyBub3QgbGlzdGVuIGZvciBgZXJyb3JgIGV2ZW50cyBoZXJlLlxuICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiB3cmFwTGlzdGVuZXIoYXJnKSB7XG4gICAgICAvLyBJRSBkb2VzIG5vdCBoYXZlIGJ1aWx0aW4gYHsgb25jZTogdHJ1ZSB9YCBzdXBwb3J0IHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHdyYXBMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBsaXN0ZW5lcihhcmcpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgZW1pdHRlcik7XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBnbG9iYWwgZG9jdW1lbnQgKi9cbi8qXG4gIGVzbGludC1kaXNhYmxlXG4gIG5vLWNvbnNvbGUsXG4gIGZ1bmMtbmFtZXNcbiovXG5cbnZhciBub3JtYWxpemVVcmwgPSByZXF1aXJlKFwiLi9ub3JtYWxpemUtdXJsXCIpO1xudmFyIHNyY0J5TW9kdWxlSWQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xudmFyIG5vRG9jdW1lbnQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCI7XG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganNkb2Mvbm8tcmVzdHJpY3RlZC1zeW50YXhcbi8qKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gYW55IGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZSB0aW1lXG4gKiBAcmV0dXJucyB7KCkgPT4gdm9pZH0gd3JhcHBlZCBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmbiwgdGltZSkge1xuICB2YXIgdGltZW91dCA9IDA7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtc3R5bGVcbiAgICB2YXIgZnVuY3Rpb25DYWxsID0gZnVuY3Rpb24gZnVuY3Rpb25DYWxsKCkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH07XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uQ2FsbCwgdGltZSk7XG4gIH07XG59XG5cbi8qKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vKiogQHR5cGVkZWYgeyhmaWxlbmFtZT86IHN0cmluZykgPT4gc3RyaW5nW119IEdldFNjcmlwdFNyYyAqL1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVtYmVyfSBtb2R1bGVJZCBhIG1vZHVsZSBpZFxuICogQHJldHVybnMge0dldFNjcmlwdFNyY30gY3VycmVudCBzY3JpcHQgdXJsXG4gKi9cbmZ1bmN0aW9uIGdldEN1cnJlbnRTY3JpcHRVcmwobW9kdWxlSWQpIHtcbiAgdmFyIHNyYyA9IHNyY0J5TW9kdWxlSWRbbW9kdWxlSWRdO1xuICBpZiAoIXNyYykge1xuICAgIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgICBzcmMgPSAoLyoqIEB0eXBlIHtIVE1MU2NyaXB0RWxlbWVudH0gKi9kb2N1bWVudC5jdXJyZW50U2NyaXB0KS5zcmM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG4gICAgICB2YXIgbGFzdFNjcmlwdFRhZyA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChsYXN0U2NyaXB0VGFnKSB7XG4gICAgICAgIHNyYyA9IGxhc3RTY3JpcHRUYWcuc3JjO1xuICAgICAgfVxuICAgIH1cbiAgICBzcmNCeU1vZHVsZUlkW21vZHVsZUlkXSA9IHNyYztcbiAgfVxuXG4gIC8qKiBAdHlwZSB7R2V0U2NyaXB0U3JjfSAqL1xuICByZXR1cm4gZnVuY3Rpb24gKGZpbGVNYXApIHtcbiAgICBpZiAoIXNyYykge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICB2YXIgc3BsaXRSZXN1bHQgPSBzcmMuc3BsaXQoLyhbXlxcXFwvXSspXFwuanMkLyk7XG4gICAgdmFyIGZpbGVuYW1lID0gc3BsaXRSZXN1bHQgJiYgc3BsaXRSZXN1bHRbMV07XG4gICAgaWYgKCFmaWxlbmFtZSkge1xuICAgICAgcmV0dXJuIFtzcmMucmVwbGFjZShcIi5qc1wiLCBcIi5jc3NcIildO1xuICAgIH1cbiAgICBpZiAoIWZpbGVNYXApIHtcbiAgICAgIHJldHVybiBbc3JjLnJlcGxhY2UoXCIuanNcIiwgXCIuY3NzXCIpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGVNYXAuc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvbiAobWFwUnVsZSkge1xuICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCJcIi5jb25jYXQoZmlsZW5hbWUsIFwiXFxcXC5qcyRcIiksIFwiZ1wiKTtcbiAgICAgIHJldHVybiBub3JtYWxpemVVcmwoc3JjLnJlcGxhY2UocmVnLCBcIlwiLmNvbmNhdChtYXBSdWxlLnJlcGxhY2UoL3tmaWxlTmFtZX0vZywgZmlsZW5hbWUpLCBcIi5jc3NcIikpKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVSTFxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgd2hlbiBVUkwgY2FuIGJlIHJlcXVlc3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VybFJlcXVlc3QodXJsKSB7XG4gIC8vIEFuIFVSTCBpcyBub3QgYW4gcmVxdWVzdCBpZlxuXG4gIC8vIEl0IGlzIG5vdCBodHRwIG9yIGh0dHBzXG4gIGlmICghL15bYS16QS1aXVthLXpBLVpcXGQrXFwtLl0qOi8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKiogQHR5cGVkZWYge0hUTUxMaW5rRWxlbWVudCAmIHsgaXNMb2FkZWQ6IGJvb2xlYW4sIHZpc2l0ZWQ6IGJvb2xlYW4gfX0gSG90SFRNTExpbmtFbGVtZW50ICovXG5cbi8qKlxuICogQHBhcmFtIHtIb3RIVE1MTGlua0VsZW1lbnR9IGVsIGh0bWwgbGluayBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZz19IHVybCBhIFVSTFxuICovXG5mdW5jdGlvbiB1cGRhdGVDc3MoZWwsIHVybCkge1xuICBpZiAoIXVybCkge1xuICAgIGlmICghZWwuaHJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHVybCA9IGVsLmhyZWYuc3BsaXQoXCI/XCIpWzBdO1xuICB9XG4gIGlmICghaXNVcmxSZXF1ZXN0KC8qKiBAdHlwZSB7c3RyaW5nfSAqL3VybCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGVsLmlzTG9hZGVkID09PSBmYWxzZSkge1xuICAgIC8vIFdlIHNlZW0gdG8gYmUgYWJvdXQgdG8gcmVwbGFjZSBhIGNzcyBsaW5rIHRoYXQgaGFzbid0IGxvYWRlZCB5ZXQuXG4gICAgLy8gV2UncmUgcHJvYmFibHkgY2hhbmdpbmcgdGhlIHNhbWUgZmlsZSBtb3JlIHRoYW4gb25jZS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgaWYgKCF1cmwgfHwgISh1cmwuaW5kZXhPZihcIi5jc3NcIikgPiAtMSkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZWwudmlzaXRlZCA9IHRydWU7XG4gIHZhciBuZXdFbCA9IC8qKiBAdHlwZSB7SG90SFRNTExpbmtFbGVtZW50fSAqL1xuICBlbC5jbG9uZU5vZGUoKTtcbiAgbmV3RWwuaXNMb2FkZWQgPSBmYWxzZTtcbiAgbmV3RWwuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChuZXdFbC5pc0xvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBuZXdFbC5pc0xvYWRlZCA9IHRydWU7XG4gICAgaWYgKGVsLnBhcmVudE5vZGUpIHtcbiAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIH1cbiAgfSk7XG4gIG5ld0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKG5ld0VsLmlzTG9hZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG5ld0VsLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICBpZiAoZWwucGFyZW50Tm9kZSkge1xuICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgfVxuICB9KTtcbiAgbmV3RWwuaHJlZiA9IFwiXCIuY29uY2F0KHVybCwgXCI/XCIpLmNvbmNhdChEYXRlLm5vdygpKTtcbiAgaWYgKGVsLnBhcmVudE5vZGUpIHtcbiAgICBpZiAoZWwubmV4dFNpYmxpbmcpIHtcbiAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld0VsLCBlbC5uZXh0U2libGluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmIGhyZWZcbiAqIEBwYXJhbSB7c3RyaW5nW119IHNyYyBzcmNcbiAqIEByZXR1cm5zIHt1bmRlZmluZWQgfCBzdHJpbmd9IGEgcmVsb2FkIHVybFxuICovXG5mdW5jdGlvbiBnZXRSZWxvYWRVcmwoaHJlZiwgc3JjKSB7XG4gIHZhciByZXQ7XG4gIGhyZWYgPSBub3JtYWxpemVVcmwoaHJlZik7XG4gIHNyYy5zb21lKFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCB1cmxcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJheS1jYWxsYmFjay1yZXR1cm5cbiAgZnVuY3Rpb24gKHVybCkge1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgZml4IG1lIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2VcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgICBpZiAoaHJlZi5pbmRleE9mKHNyYykgPiAtMSkge1xuICAgICAgcmV0ID0gdXJsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXQ7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gc3JjIHNvdXJjZVxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgd2hlbiBsb2FkZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiByZWxvYWRTdHlsZShzcmMpIHtcbiAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbmtcIik7XG4gIHZhciBsb2FkZWQgPSBmYWxzZTtcbiAgZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICBpZiAoIWVsLmhyZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHVybCA9IGdldFJlbG9hZFVybChlbC5ocmVmLCBzcmMpO1xuICAgIGlmICh1cmwgJiYgIWlzVXJsUmVxdWVzdCh1cmwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChlbC52aXNpdGVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh1cmwpIHtcbiAgICAgIHVwZGF0ZUNzcyhlbCwgdXJsKTtcbiAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGxvYWRlZDtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gcmVsb2FkQWxsKCkge1xuICB2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGlua1wiKTtcbiAgZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICBpZiAoZWwudmlzaXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB1cGRhdGVDc3MoZWwpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlciB8IHN0cmluZ30gbW9kdWxlSWQgYSBtb2R1bGUgaWRcbiAqIEBwYXJhbSB7eyBmaWxlbmFtZT86IHN0cmluZywgbG9jYWxzPzogYm9vbGVhbiB9fSBvcHRpb25zIG9wdGlvbnNcbiAqIEByZXR1cm5zIHsoKSA9PiB2b2lkfSB3cmFwcGVyIGZ1bmN0aW9uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBvcHRpb25zKSB7XG4gIGlmIChub0RvY3VtZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJubyB3aW5kb3cuZG9jdW1lbnQgZm91bmQsIHdpbGwgbm90IEhNUiBDU1NcIik7XG4gICAgcmV0dXJuIG5vb3A7XG4gIH1cbiAgdmFyIGdldFNjcmlwdFNyYyA9IGdldEN1cnJlbnRTY3JpcHRVcmwobW9kdWxlSWQpO1xuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgc3JjID0gZ2V0U2NyaXB0U3JjKG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgIHZhciByZWxvYWRlZCA9IHJlbG9hZFN0eWxlKHNyYyk7XG4gICAgaWYgKG9wdGlvbnMubG9jYWxzKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIltITVJdIERldGVjdGVkIGxvY2FsIGNzcyBtb2R1bGVzLiBSZWxvYWQgYWxsIGNzc1wiKTtcbiAgICAgIHJlbG9hZEFsbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVsb2FkZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gY3NzIHJlbG9hZCAlc1wiLCBzcmMuam9pbihcIiBcIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIltITVJdIFJlbG9hZCBhbGwgY3NzXCIpO1xuICAgICAgcmVsb2FkQWxsKCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJvdW5jZSh1cGRhdGUsIDUwKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcGF0aENvbXBvbmVudHMgcGF0aCBjb21wb25lbnRzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBub3JtYWxpemVkIHVybFxuICovXG5mdW5jdGlvbiBub3JtYWxpemVVcmxJbm5lcihwYXRoQ29tcG9uZW50cykge1xuICByZXR1cm4gcGF0aENvbXBvbmVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwgaXRlbSkge1xuICAgIHN3aXRjaCAoaXRlbSkge1xuICAgICAgY2FzZSBcIi4uXCI6XG4gICAgICAgIGFjY3VtdWxhdG9yLnBvcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIuXCI6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWNjdW11bGF0b3IucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICB9LCAvKiogQHR5cGUge3N0cmluZ1tdfSAqL1tdKS5qb2luKFwiL1wiKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsU3RyaW5nIHVybCBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IG5vcm1hbGl6ZWQgdXJsIHN0cmluZ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVVybCh1cmxTdHJpbmcpIHtcbiAgdXJsU3RyaW5nID0gdXJsU3RyaW5nLnRyaW0oKTtcbiAgaWYgKC9eZGF0YTovaS50ZXN0KHVybFN0cmluZykpIHtcbiAgICByZXR1cm4gdXJsU3RyaW5nO1xuICB9XG4gIHZhciBwcm90b2NvbCA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1pbmNsdWRlc1xuICB1cmxTdHJpbmcuaW5kZXhPZihcIi8vXCIpICE9PSAtMSA/IFwiXCIuY29uY2F0KHVybFN0cmluZy5zcGxpdChcIi8vXCIpWzBdLCBcIi8vXCIpIDogXCJcIjtcbiAgdmFyIGNvbXBvbmVudHMgPSB1cmxTdHJpbmcucmVwbGFjZShuZXcgUmVnRXhwKHByb3RvY29sLCBcImlcIiksIFwiXCIpLnNwbGl0KFwiL1wiKTtcbiAgdmFyIGhvc3QgPSBjb21wb25lbnRzWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFwuJC8sIFwiXCIpO1xuICBjb21wb25lbnRzWzBdID0gXCJcIjtcbiAgdmFyIHBhdGggPSBub3JtYWxpemVVcmxJbm5lcihjb21wb25lbnRzKTtcbiAgcmV0dXJuIHByb3RvY29sICsgaG9zdCArIHBhdGg7XG59OyIsImZ1bmN0aW9uIF90eXBlb2YobykgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHsgcmV0dXJuIHR5cGVvZiBvOyB9IDogZnVuY3Rpb24gKG8pIHsgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87IH0sIF90eXBlb2Yobyk7IH1cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLCBuKSB7IGlmICghKGEgaW5zdGFuY2VvZiBuKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXMoZSwgcikgeyBmb3IgKHZhciB0ID0gMDsgdCA8IHIubGVuZ3RoOyB0KyspIHsgdmFyIG8gPSByW3RdOyBvLmVudW1lcmFibGUgPSBvLmVudW1lcmFibGUgfHwgITEsIG8uY29uZmlndXJhYmxlID0gITAsIFwidmFsdWVcIiBpbiBvICYmIChvLndyaXRhYmxlID0gITApLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgX3RvUHJvcGVydHlLZXkoby5rZXkpLCBvKTsgfSB9XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoZSwgciwgdCkgeyByZXR1cm4gciAmJiBfZGVmaW5lUHJvcGVydGllcyhlLnByb3RvdHlwZSwgciksIHQgJiYgX2RlZmluZVByb3BlcnRpZXMoZSwgdCksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiAhMSB9KSwgZTsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gX3R5cGVvZihpKSA/IGkgOiBpICsgXCJcIjsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHsgaWYgKFwib2JqZWN0XCIgIT0gX3R5cGVvZih0KSB8fCAhdCkgcmV0dXJuIHQ7IHZhciBlID0gdFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAodm9pZCAwICE9PSBlKSB7IHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpOyBpZiAoXCJvYmplY3RcIiAhPSBfdHlwZW9mKGkpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi91dGlscy9sb2cuanNcIjtcbnZhciBXZWJTb2NrZXRDbGllbnQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgZnVuY3Rpb24gV2ViU29ja2V0Q2xpZW50KHVybCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXZWJTb2NrZXRDbGllbnQpO1xuICAgIHRoaXMuY2xpZW50ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xuICAgIHRoaXMuY2xpZW50Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihlcnJvcik7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgKi9cbiAgcmV0dXJuIF9jcmVhdGVDbGFzcyhXZWJTb2NrZXRDbGllbnQsIFt7XG4gICAga2V5OiBcIm9uT3BlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk9wZW4oZikge1xuICAgICAgdGhpcy5jbGllbnQub25vcGVuID0gZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcIm9uQ2xvc2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DbG9zZShmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbmNsb3NlID0gZjtcbiAgICB9XG5cbiAgICAvLyBjYWxsIGYgd2l0aCB0aGUgbWVzc2FnZSBzdHJpbmcgYXMgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGZcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJvbk1lc3NhZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25NZXNzYWdlKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGYoZS5kYXRhKTtcbiAgICAgIH07XG4gICAgfVxuICB9XSk7XG59KCk7XG5leHBvcnQgeyBXZWJTb2NrZXRDbGllbnQgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIG93bktleXMoZSwgcikgeyB2YXIgdCA9IE9iamVjdC5rZXlzKGUpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgbyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7IHIgJiYgKG8gPSBvLmZpbHRlcihmdW5jdGlvbiAocikgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCByKS5lbnVtZXJhYmxlOyB9KSksIHQucHVzaC5hcHBseSh0LCBvKTsgfSByZXR1cm4gdDsgfVxuZnVuY3Rpb24gX29iamVjdFNwcmVhZChlKSB7IGZvciAodmFyIHIgPSAxOyByIDwgYXJndW1lbnRzLmxlbmd0aDsgcisrKSB7IHZhciB0ID0gbnVsbCAhPSBhcmd1bWVudHNbcl0gPyBhcmd1bWVudHNbcl0gOiB7fTsgciAlIDIgPyBvd25LZXlzKE9iamVjdCh0KSwgITApLmZvckVhY2goZnVuY3Rpb24gKHIpIHsgX2RlZmluZVByb3BlcnR5KGUsIHIsIHRbcl0pOyB9KSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnModCkpIDogb3duS2V5cyhPYmplY3QodCkpLmZvckVhY2goZnVuY3Rpb24gKHIpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCwgcikpOyB9KTsgfSByZXR1cm4gZTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KGUsIHIsIHQpIHsgcmV0dXJuIChyID0gX3RvUHJvcGVydHlLZXkocikpIGluIGUgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgeyB2YWx1ZTogdCwgZW51bWVyYWJsZTogITAsIGNvbmZpZ3VyYWJsZTogITAsIHdyaXRhYmxlOiAhMCB9KSA6IGVbcl0gPSB0LCBlOyB9XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleSh0KSB7IHZhciBpID0gX3RvUHJpbWl0aXZlKHQsIFwic3RyaW5nXCIpOyByZXR1cm4gXCJzeW1ib2xcIiA9PSBfdHlwZW9mKGkpID8gaSA6IGkgKyBcIlwiOyB9XG5mdW5jdGlvbiBfdG9QcmltaXRpdmUodCwgcikgeyBpZiAoXCJvYmplY3RcIiAhPSBfdHlwZW9mKHQpIHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YoaSkpIHJldHVybiBpOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7IH0gcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTsgfVxuZnVuY3Rpb24gX3R5cGVvZihvKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykgeyByZXR1cm4gdHlwZW9mIG87IH0gOiBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbzsgfSwgX3R5cGVvZihvKTsgfVxuLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSwgX193ZWJwYWNrX2hhc2hfXyAqL1xuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ3ZWJwYWNrL21vZHVsZVwiIC8+XG5pbXBvcnQgd2VicGFja0hvdExvZyBmcm9tIFwid2VicGFjay9ob3QvbG9nLmpzXCI7XG5pbXBvcnQgaG90RW1pdHRlciBmcm9tIFwid2VicGFjay9ob3QvZW1pdHRlci5qc1wiO1xuaW1wb3J0IHNvY2tldCBmcm9tIFwiLi9zb2NrZXQuanNcIjtcbmltcG9ydCB7IGZvcm1hdFByb2JsZW0sIGNyZWF0ZU92ZXJsYXkgfSBmcm9tIFwiLi9vdmVybGF5LmpzXCI7XG5pbXBvcnQgeyBsb2csIHNldExvZ0xldmVsIH0gZnJvbSBcIi4vdXRpbHMvbG9nLmpzXCI7XG5pbXBvcnQgc2VuZE1lc3NhZ2UgZnJvbSBcIi4vdXRpbHMvc2VuZE1lc3NhZ2UuanNcIjtcbmltcG9ydCB7IGlzUHJvZ3Jlc3NTdXBwb3J0ZWQsIGRlZmluZVByb2dyZXNzRWxlbWVudCB9IGZyb20gXCIuL3Byb2dyZXNzLmpzXCI7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gT3ZlcmxheU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IChlcnJvcjogRXJyb3IpID0+IGJvb2xlYW59IFt3YXJuaW5nc11cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IChlcnJvcjogRXJyb3IpID0+IGJvb2xlYW59IFtlcnJvcnNdXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCAoZXJyb3I6IEVycm9yKSA9PiBib29sZWFufSBbcnVudGltZUVycm9yc11cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbdHJ1c3RlZFR5cGVzUG9saWN5TmFtZV1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaG90XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGxpdmVSZWxvYWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJvZ3Jlc3NcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IE92ZXJsYXlPcHRpb25zfSBvdmVybGF5XG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2xvZ2dpbmddXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3JlY29ubmVjdF1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXR1c1xuICogQHByb3BlcnR5IHtib29sZWFufSBpc1VubG9hZGluZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGN1cnJlbnRIYXNoXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3ByZXZpb3VzSGFzaF1cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IHsgd2FybmluZ3M/OiBib29sZWFuIHwgc3RyaW5nOyBlcnJvcnM/OiBib29sZWFuIHwgc3RyaW5nOyBydW50aW1lRXJyb3JzPzogYm9vbGVhbiB8IHN0cmluZzsgfX0gb3ZlcmxheU9wdGlvbnNcbiAqL1xudmFyIGRlY29kZU92ZXJsYXlPcHRpb25zID0gZnVuY3Rpb24gZGVjb2RlT3ZlcmxheU9wdGlvbnMob3ZlcmxheU9wdGlvbnMpIHtcbiAgaWYgKF90eXBlb2Yob3ZlcmxheU9wdGlvbnMpID09PSBcIm9iamVjdFwiKSB7XG4gICAgW1wid2FybmluZ3NcIiwgXCJlcnJvcnNcIiwgXCJydW50aW1lRXJyb3JzXCJdLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICBpZiAodHlwZW9mIG92ZXJsYXlPcHRpb25zW3Byb3BlcnR5XSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB2YXIgb3ZlcmxheUZpbHRlckZ1bmN0aW9uU3RyaW5nID0gZGVjb2RlVVJJQ29tcG9uZW50KG92ZXJsYXlPcHRpb25zW3Byb3BlcnR5XSk7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICAgIG92ZXJsYXlPcHRpb25zW3Byb3BlcnR5XSA9IG5ldyBGdW5jdGlvbihcIm1lc3NhZ2VcIiwgXCJ2YXIgY2FsbGJhY2sgPSBcIi5jb25jYXQob3ZlcmxheUZpbHRlckZ1bmN0aW9uU3RyaW5nLCBcIlxcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG1lc3NhZ2UpXCIpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBAdHlwZSB7U3RhdHVzfVxuICovXG52YXIgc3RhdHVzID0ge1xuICBpc1VubG9hZGluZzogZmFsc2UsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgY3VycmVudEhhc2g6IF9fd2VicGFja19oYXNoX19cbn07XG5cbi8qKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xudmFyIGdldEN1cnJlbnRTY3JpcHRTb3VyY2UgPSBmdW5jdGlvbiBnZXRDdXJyZW50U2NyaXB0U291cmNlKCkge1xuICAvLyBgZG9jdW1lbnQuY3VycmVudFNjcmlwdGAgaXMgdGhlIG1vc3QgYWNjdXJhdGUgd2F5IHRvIGZpbmQgdGhlIGN1cnJlbnQgc2NyaXB0LFxuICAvLyBidXQgaXMgbm90IHN1cHBvcnRlZCBpbiBhbGwgYnJvd3NlcnMuXG4gIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9XG5cbiAgLy8gRmFsbGJhY2sgdG8gZ2V0dGluZyBhbGwgc2NyaXB0cyBydW5uaW5nIGluIHRoZSBkb2N1bWVudC5cbiAgdmFyIHNjcmlwdEVsZW1lbnRzID0gZG9jdW1lbnQuc2NyaXB0cyB8fCBbXTtcbiAgdmFyIHNjcmlwdEVsZW1lbnRzV2l0aFNyYyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChzY3JpcHRFbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH0pO1xuICBpZiAoc2NyaXB0RWxlbWVudHNXaXRoU3JjLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgY3VycmVudFNjcmlwdCA9IHNjcmlwdEVsZW1lbnRzV2l0aFNyY1tzY3JpcHRFbGVtZW50c1dpdGhTcmMubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIGN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9XG5cbiAgLy8gRmFpbCBhcyB0aGVyZSB3YXMgbm8gc2NyaXB0IHRvIHVzZS5cbiAgdGhyb3cgbmV3IEVycm9yKFwiW3dlYnBhY2stZGV2LXNlcnZlcl0gRmFpbGVkIHRvIGdldCBjdXJyZW50IHNjcmlwdCBzb3VyY2UuXCIpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VRdWVyeVxuICogQHJldHVybnMge3sgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgYm9vbGVhbiB9fVxuICovXG52YXIgcGFyc2VVUkwgPSBmdW5jdGlvbiBwYXJzZVVSTChyZXNvdXJjZVF1ZXJ5KSB7XG4gIC8qKiBAdHlwZSB7eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfX0gKi9cbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAodHlwZW9mIHJlc291cmNlUXVlcnkgPT09IFwic3RyaW5nXCIgJiYgcmVzb3VyY2VRdWVyeSAhPT0gXCJcIikge1xuICAgIHZhciBzZWFyY2hQYXJhbXMgPSByZXNvdXJjZVF1ZXJ5LnNsaWNlKDEpLnNwbGl0KFwiJlwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlYXJjaFBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBhaXIgPSBzZWFyY2hQYXJhbXNbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgcmVzdWx0W3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBFbHNlLCBnZXQgdGhlIHVybCBmcm9tIHRoZSA8c2NyaXB0PiB0aGlzIGZpbGUgd2FzIGNhbGxlZCB3aXRoLlxuICAgIHZhciBzY3JpcHRTb3VyY2UgPSBnZXRDdXJyZW50U2NyaXB0U291cmNlKCk7XG4gICAgdmFyIHNjcmlwdFNvdXJjZVVSTDtcbiAgICB0cnkge1xuICAgICAgLy8gVGhlIHBsYWNlaG9sZGVyIGBiYXNlVVJMYCB3aXRoIGB3aW5kb3cubG9jYXRpb24uaHJlZmAsXG4gICAgICAvLyBpcyB0byBhbGxvdyBwYXJzaW5nIG9mIHBhdGgtcmVsYXRpdmUgb3IgcHJvdG9jb2wtcmVsYXRpdmUgVVJMcyxcbiAgICAgIC8vIGFuZCB3aWxsIGhhdmUgbm8gZWZmZWN0IGlmIGBzY3JpcHRTb3VyY2VgIGlzIGEgZnVsbHkgdmFsaWQgVVJMLlxuICAgICAgc2NyaXB0U291cmNlVVJMID0gbmV3IFVSTChzY3JpcHRTb3VyY2UsIHNlbGYubG9jYXRpb24uaHJlZik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFVSTCBwYXJzaW5nIGZhaWxlZCwgZG8gbm90aGluZy5cbiAgICAgIC8vIFdlIHdpbGwgc3RpbGwgcHJvY2VlZCB0byBzZWUgaWYgd2UgY2FuIHJlY292ZXIgdXNpbmcgYHJlc291cmNlUXVlcnlgXG4gICAgfVxuICAgIGlmIChzY3JpcHRTb3VyY2VVUkwpIHtcbiAgICAgIHJlc3VsdCA9IHNjcmlwdFNvdXJjZVVSTDtcbiAgICAgIHJlc3VsdC5mcm9tQ3VycmVudFNjcmlwdCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xudmFyIHBhcnNlZFJlc291cmNlUXVlcnkgPSBwYXJzZVVSTChfX3Jlc291cmNlUXVlcnkpO1xudmFyIGVuYWJsZWRGZWF0dXJlcyA9IHtcbiAgXCJIb3QgTW9kdWxlIFJlcGxhY2VtZW50XCI6IGZhbHNlLFxuICBcIkxpdmUgUmVsb2FkaW5nXCI6IGZhbHNlLFxuICBQcm9ncmVzczogZmFsc2UsXG4gIE92ZXJsYXk6IGZhbHNlXG59O1xuXG4vKiogQHR5cGUge09wdGlvbnN9ICovXG52YXIgb3B0aW9ucyA9IHtcbiAgaG90OiBmYWxzZSxcbiAgbGl2ZVJlbG9hZDogZmFsc2UsXG4gIHByb2dyZXNzOiBmYWxzZSxcbiAgb3ZlcmxheTogZmFsc2Vcbn07XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5ob3QgPT09IFwidHJ1ZVwiKSB7XG4gIG9wdGlvbnMuaG90ID0gdHJ1ZTtcbiAgZW5hYmxlZEZlYXR1cmVzW1wiSG90IE1vZHVsZSBSZXBsYWNlbWVudFwiXSA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeVtcImxpdmUtcmVsb2FkXCJdID09PSBcInRydWVcIikge1xuICBvcHRpb25zLmxpdmVSZWxvYWQgPSB0cnVlO1xuICBlbmFibGVkRmVhdHVyZXNbXCJMaXZlIFJlbG9hZGluZ1wiXSA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5wcm9ncmVzcyA9PT0gXCJ0cnVlXCIpIHtcbiAgb3B0aW9ucy5wcm9ncmVzcyA9IHRydWU7XG4gIGVuYWJsZWRGZWF0dXJlcy5Qcm9ncmVzcyA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5vdmVybGF5KSB7XG4gIHRyeSB7XG4gICAgb3B0aW9ucy5vdmVybGF5ID0gSlNPTi5wYXJzZShwYXJzZWRSZXNvdXJjZVF1ZXJ5Lm92ZXJsYXkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yKFwiRXJyb3IgcGFyc2luZyBvdmVybGF5IG9wdGlvbnMgZnJvbSByZXNvdXJjZSBxdWVyeTpcIiwgZSk7XG4gIH1cblxuICAvLyBGaWxsIGluIGRlZmF1bHQgXCJ0cnVlXCIgcGFyYW1zIGZvciBwYXJ0aWFsbHktc3BlY2lmaWVkIG9iamVjdHMuXG4gIGlmIChfdHlwZW9mKG9wdGlvbnMub3ZlcmxheSkgPT09IFwib2JqZWN0XCIpIHtcbiAgICBvcHRpb25zLm92ZXJsYXkgPSBfb2JqZWN0U3ByZWFkKHtcbiAgICAgIGVycm9yczogdHJ1ZSxcbiAgICAgIHdhcm5pbmdzOiB0cnVlLFxuICAgICAgcnVudGltZUVycm9yczogdHJ1ZVxuICAgIH0sIG9wdGlvbnMub3ZlcmxheSk7XG4gICAgZGVjb2RlT3ZlcmxheU9wdGlvbnMob3B0aW9ucy5vdmVybGF5KTtcbiAgfVxuICBlbmFibGVkRmVhdHVyZXMuT3ZlcmxheSA9IG9wdGlvbnMub3ZlcmxheSAhPT0gZmFsc2U7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5sb2dnaW5nKSB7XG4gIG9wdGlvbnMubG9nZ2luZyA9IHBhcnNlZFJlc291cmNlUXVlcnkubG9nZ2luZztcbn1cbmlmICh0eXBlb2YgcGFyc2VkUmVzb3VyY2VRdWVyeS5yZWNvbm5lY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgb3B0aW9ucy5yZWNvbm5lY3QgPSBOdW1iZXIocGFyc2VkUmVzb3VyY2VRdWVyeS5yZWNvbm5lY3QpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXZlbFxuICovXG52YXIgc2V0QWxsTG9nTGV2ZWwgPSBmdW5jdGlvbiBzZXRBbGxMb2dMZXZlbChsZXZlbCkge1xuICAvLyBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBITVIgbG9nZ2VyIG9wZXJhdGUgc2VwYXJhdGVseSBmcm9tIGRldiBzZXJ2ZXIgbG9nZ2VyXG4gIHdlYnBhY2tIb3RMb2cuc2V0TG9nTGV2ZWwobGV2ZWwgPT09IFwidmVyYm9zZVwiIHx8IGxldmVsID09PSBcImxvZ1wiID8gXCJpbmZvXCIgOiBsZXZlbCk7XG4gIHNldExvZ0xldmVsKGxldmVsKTtcbn07XG5pZiAob3B0aW9ucy5sb2dnaW5nKSB7XG4gIHNldEFsbExvZ0xldmVsKG9wdGlvbnMubG9nZ2luZyk7XG59XG52YXIgbG9nRW5hYmxlZEZlYXR1cmVzID0gZnVuY3Rpb24gbG9nRW5hYmxlZEZlYXR1cmVzKGZlYXR1cmVzKSB7XG4gIHZhciBsaXN0RW5hYmxlZEZlYXR1cmVzID0gT2JqZWN0LmtleXMoZmVhdHVyZXMpO1xuICBpZiAoIWZlYXR1cmVzIHx8IGxpc3RFbmFibGVkRmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsb2dTdHJpbmcgPSBcIlNlcnZlciBzdGFydGVkOlwiO1xuXG4gIC8vIFNlcnZlciBzdGFydGVkOiBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGVuYWJsZWQsIExpdmUgUmVsb2FkaW5nIGVuYWJsZWQsIE92ZXJsYXkgZGlzYWJsZWQuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdEVuYWJsZWRGZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBsaXN0RW5hYmxlZEZlYXR1cmVzW2ldO1xuICAgIGxvZ1N0cmluZyArPSBcIiBcIi5jb25jYXQoa2V5LCBcIiBcIikuY29uY2F0KGZlYXR1cmVzW2tleV0gPyBcImVuYWJsZWRcIiA6IFwiZGlzYWJsZWRcIiwgXCIsXCIpO1xuICB9XG4gIC8vIHJlcGxhY2UgbGFzdCBjb21tYSB3aXRoIGEgcGVyaW9kXG4gIGxvZ1N0cmluZyA9IGxvZ1N0cmluZy5zbGljZSgwLCAtMSkuY29uY2F0KFwiLlwiKTtcbiAgbG9nLmluZm8obG9nU3RyaW5nKTtcbn07XG5sb2dFbmFibGVkRmVhdHVyZXMoZW5hYmxlZEZlYXR1cmVzKTtcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gIHN0YXR1cy5pc1VubG9hZGluZyA9IHRydWU7XG59KTtcbnZhciBvdmVybGF5ID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IGNyZWF0ZU92ZXJsYXkoX3R5cGVvZihvcHRpb25zLm92ZXJsYXkpID09PSBcIm9iamVjdFwiID8ge1xuICB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lOiBvcHRpb25zLm92ZXJsYXkudHJ1c3RlZFR5cGVzUG9saWN5TmFtZSxcbiAgY2F0Y2hSdW50aW1lRXJyb3I6IG9wdGlvbnMub3ZlcmxheS5ydW50aW1lRXJyb3JzXG59IDoge1xuICB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lOiBmYWxzZSxcbiAgY2F0Y2hSdW50aW1lRXJyb3I6IG9wdGlvbnMub3ZlcmxheVxufSkgOiB7XG4gIHNlbmQ6IGZ1bmN0aW9uIHNlbmQoKSB7fVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RhdHVzfSBjdXJyZW50U3RhdHVzXG4gKi9cbnZhciByZWxvYWRBcHAgPSBmdW5jdGlvbiByZWxvYWRBcHAoX3JlZiwgY3VycmVudFN0YXR1cykge1xuICB2YXIgaG90ID0gX3JlZi5ob3QsXG4gICAgbGl2ZVJlbG9hZCA9IF9yZWYubGl2ZVJlbG9hZDtcbiAgaWYgKGN1cnJlbnRTdGF0dXMuaXNVbmxvYWRpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGN1cnJlbnRIYXNoID0gY3VycmVudFN0YXR1cy5jdXJyZW50SGFzaCxcbiAgICBwcmV2aW91c0hhc2ggPSBjdXJyZW50U3RhdHVzLnByZXZpb3VzSGFzaDtcbiAgdmFyIGlzSW5pdGlhbCA9IGN1cnJlbnRIYXNoLmluZGV4T2YoLyoqIEB0eXBlIHtzdHJpbmd9ICovcHJldmlvdXNIYXNoKSA+PSAwO1xuICBpZiAoaXNJbml0aWFsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7V2luZG93fSByb290V2luZG93XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbnRlcnZhbElkXG4gICAqL1xuICBmdW5jdGlvbiBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICBsb2cuaW5mbyhcIkFwcCB1cGRhdGVkLiBSZWxvYWRpbmcuLi5cIik7XG4gICAgcm9vdFdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuICB2YXIgc2VhcmNoID0gc2VsZi5sb2NhdGlvbi5zZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGFsbG93VG9Ib3QgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1ob3Q9ZmFsc2VcIikgPT09IC0xO1xuICB2YXIgYWxsb3dUb0xpdmVSZWxvYWQgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1saXZlLXJlbG9hZD1mYWxzZVwiKSA9PT0gLTE7XG4gIGlmIChob3QgJiYgYWxsb3dUb0hvdCkge1xuICAgIGxvZy5pbmZvKFwiQXBwIGhvdCB1cGRhdGUuLi5cIik7XG4gICAgaG90RW1pdHRlci5lbWl0KFwid2VicGFja0hvdFVwZGF0ZVwiLCBjdXJyZW50U3RhdHVzLmN1cnJlbnRIYXNoKTtcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi53aW5kb3cpIHtcbiAgICAgIC8vIGJyb2FkY2FzdCB1cGRhdGUgdG8gd2luZG93XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKFwid2VicGFja0hvdFVwZGF0ZVwiLmNvbmNhdChjdXJyZW50U3RhdHVzLmN1cnJlbnRIYXNoKSwgXCIqXCIpO1xuICAgIH1cbiAgfVxuICAvLyBhbGxvdyByZWZyZXNoaW5nIHRoZSBwYWdlIG9ubHkgaWYgbGl2ZVJlbG9hZCBpc24ndCBkaXNhYmxlZFxuICBlbHNlIGlmIChsaXZlUmVsb2FkICYmIGFsbG93VG9MaXZlUmVsb2FkKSB7XG4gICAgdmFyIHJvb3RXaW5kb3cgPSBzZWxmO1xuXG4gICAgLy8gdXNlIHBhcmVudCB3aW5kb3cgZm9yIHJlbG9hZCAoaW4gY2FzZSB3ZSdyZSBpbiBhbiBpZnJhbWUgd2l0aCBubyB2YWxpZCBzcmMpXG4gICAgdmFyIGludGVydmFsSWQgPSBzZWxmLnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChyb290V2luZG93LmxvY2F0aW9uLnByb3RvY29sICE9PSBcImFib3V0OlwiKSB7XG4gICAgICAgIC8vIHJlbG9hZCBpbW1lZGlhdGVseSBpZiBwcm90b2NvbCBpcyB2YWxpZFxuICAgICAgICBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3RXaW5kb3cgPSByb290V2luZG93LnBhcmVudDtcbiAgICAgICAgaWYgKHJvb3RXaW5kb3cucGFyZW50ID09PSByb290V2luZG93KSB7XG4gICAgICAgICAgLy8gaWYgcGFyZW50IGVxdWFscyBjdXJyZW50IHdpbmRvdyB3ZSd2ZSByZWFjaGVkIHRoZSByb290IHdoaWNoIHdvdWxkIGNvbnRpbnVlIGZvcmV2ZXIsIHNvIHRyaWdnZXIgYSByZWxvYWQgYW55d2F5c1xuICAgICAgICAgIGFwcGx5UmVsb2FkKHJvb3RXaW5kb3csIGludGVydmFsSWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG52YXIgYW5zaVJlZ2V4ID0gbmV3IFJlZ0V4cChbXCJbXFxcXHUwMDFCXFxcXHUwMDlCXVtbXFxcXF0oKSM7P10qKD86KD86KD86KD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKykqfFthLXpBLVpcXFxcZF0rKD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKikqKT9cXFxcdTAwMDcpXCIsIFwiKD86KD86XFxcXGR7MSw0fSg/OjtcXFxcZHswLDR9KSopP1tcXFxcZEEtUFItVFpjZi1ucS11eT0+PH5dKSlcIl0uam9pbihcInxcIiksIFwiZ1wiKTtcblxuLyoqXG4gKlxuICogU3RyaXAgW0FOU0kgZXNjYXBlIGNvZGVzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlKSBmcm9tIGEgc3RyaW5nLlxuICogQWRhcHRlZCBmcm9tIGNvZGUgb3JpZ2luYWxseSByZWxlYXNlZCBieSBTaW5kcmUgU29yaHVzXG4gKiBMaWNlbnNlZCB0aGUgTUlUIExpY2Vuc2VcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbnZhciBzdHJpcEFuc2kgPSBmdW5jdGlvbiBzdHJpcEFuc2koc3RyaW5nKSB7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIGEgYHN0cmluZ2AsIGdvdCBgXCIuY29uY2F0KF90eXBlb2Yoc3RyaW5nKSwgXCJgXCIpKTtcbiAgfVxuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYW5zaVJlZ2V4LCBcIlwiKTtcbn07XG52YXIgb25Tb2NrZXRNZXNzYWdlID0ge1xuICBob3Q6IGZ1bmN0aW9uIGhvdCgpIHtcbiAgICBpZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5ob3QgPT09IFwiZmFsc2VcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvcHRpb25zLmhvdCA9IHRydWU7XG4gIH0sXG4gIGxpdmVSZWxvYWQ6IGZ1bmN0aW9uIGxpdmVSZWxvYWQoKSB7XG4gICAgaWYgKHBhcnNlZFJlc291cmNlUXVlcnlbXCJsaXZlLXJlbG9hZFwiXSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMubGl2ZVJlbG9hZCA9IHRydWU7XG4gIH0sXG4gIGludmFsaWQ6IGZ1bmN0aW9uIGludmFsaWQoKSB7XG4gICAgbG9nLmluZm8oXCJBcHAgdXBkYXRlZC4gUmVjb21waWxpbmcuLi5cIik7XG5cbiAgICAvLyBGaXhlcyAjMTA0Mi4gb3ZlcmxheSBkb2Vzbid0IGNsZWFyIGlmIGVycm9ycyBhcmUgZml4ZWQgYnV0IHdhcm5pbmdzIHJlbWFpbi5cbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHNlbmRNZXNzYWdlKFwiSW52YWxpZFwiKTtcbiAgfSxcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoXG4gICAqL1xuICBoYXNoOiBmdW5jdGlvbiBoYXNoKF9oYXNoKSB7XG4gICAgc3RhdHVzLnByZXZpb3VzSGFzaCA9IHN0YXR1cy5jdXJyZW50SGFzaDtcbiAgICBzdGF0dXMuY3VycmVudEhhc2ggPSBfaGFzaDtcbiAgfSxcbiAgbG9nZ2luZzogc2V0QWxsTG9nTGV2ZWwsXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBvdmVybGF5OiBmdW5jdGlvbiBvdmVybGF5KHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvcHRpb25zLm92ZXJsYXkgPSB2YWx1ZTtcbiAgICBkZWNvZGVPdmVybGF5T3B0aW9ucyhvcHRpb25zLm92ZXJsYXkpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqL1xuICByZWNvbm5lY3Q6IGZ1bmN0aW9uIHJlY29ubmVjdCh2YWx1ZSkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMucmVjb25uZWN0ID0gdmFsdWU7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBwcm9ncmVzczogZnVuY3Rpb24gcHJvZ3Jlc3ModmFsdWUpIHtcbiAgICBvcHRpb25zLnByb2dyZXNzID0gdmFsdWU7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge3sgcGx1Z2luTmFtZT86IHN0cmluZywgcGVyY2VudDogbnVtYmVyLCBtc2c6IHN0cmluZyB9fSBkYXRhXG4gICAqL1xuICBcInByb2dyZXNzLXVwZGF0ZVwiOiBmdW5jdGlvbiBwcm9ncmVzc1VwZGF0ZShkYXRhKSB7XG4gICAgaWYgKG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgIGxvZy5pbmZvKFwiXCIuY29uY2F0KGRhdGEucGx1Z2luTmFtZSA/IFwiW1wiLmNvbmNhdChkYXRhLnBsdWdpbk5hbWUsIFwiXSBcIikgOiBcIlwiKS5jb25jYXQoZGF0YS5wZXJjZW50LCBcIiUgLSBcIikuY29uY2F0KGRhdGEubXNnLCBcIi5cIikpO1xuICAgIH1cbiAgICBpZiAoaXNQcm9ncmVzc1N1cHBvcnRlZCgpKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMucHJvZ3Jlc3MgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFyIHByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIndkcy1wcm9ncmVzc1wiKTtcbiAgICAgICAgaWYgKCFwcm9ncmVzcykge1xuICAgICAgICAgIGRlZmluZVByb2dyZXNzRWxlbWVudCgpO1xuICAgICAgICAgIHByb2dyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIndkcy1wcm9ncmVzc1wiKTtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHByb2dyZXNzKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9ncmVzcy5zZXRBdHRyaWJ1dGUoXCJwcm9ncmVzc1wiLCBkYXRhLnBlcmNlbnQpO1xuICAgICAgICBwcm9ncmVzcy5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIG9wdGlvbnMucHJvZ3Jlc3MpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZW5kTWVzc2FnZShcIlByb2dyZXNzXCIsIGRhdGEpO1xuICB9LFxuICBcInN0aWxsLW9rXCI6IGZ1bmN0aW9uIHN0aWxsT2soKSB7XG4gICAgbG9nLmluZm8oXCJOb3RoaW5nIGNoYW5nZWQuXCIpO1xuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgIHR5cGU6IFwiRElTTUlTU1wiXG4gICAgICB9KTtcbiAgICB9XG4gICAgc2VuZE1lc3NhZ2UoXCJTdGlsbE9rXCIpO1xuICB9LFxuICBvazogZnVuY3Rpb24gb2soKSB7XG4gICAgc2VuZE1lc3NhZ2UoXCJPa1wiKTtcbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVcbiAgICovXG4gIFwic3RhdGljLWNoYW5nZWRcIjogZnVuY3Rpb24gc3RhdGljQ2hhbmdlZChmaWxlKSB7XG4gICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZmlsZSA/IFwiXFxcIlwiLmNvbmNhdChmaWxlLCBcIlxcXCJcIikgOiBcIkNvbnRlbnRcIiwgXCIgZnJvbSBzdGF0aWMgZGlyZWN0b3J5IHdhcyBjaGFuZ2VkLiBSZWxvYWRpbmcuLi5cIikpO1xuICAgIHNlbGYubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yW119IHdhcm5pbmdzXG4gICAqIEBwYXJhbSB7YW55fSBwYXJhbXNcbiAgICovXG4gIHdhcm5pbmdzOiBmdW5jdGlvbiB3YXJuaW5ncyhfd2FybmluZ3MsIHBhcmFtcykge1xuICAgIGxvZy53YXJuKFwiV2FybmluZ3Mgd2hpbGUgY29tcGlsaW5nLlwiKTtcbiAgICB2YXIgcHJpbnRhYmxlV2FybmluZ3MgPSBfd2FybmluZ3MubWFwKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbShcIndhcm5pbmdcIiwgZXJyb3IpLFxuICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgIGJvZHkgPSBfZm9ybWF0UHJvYmxlbS5ib2R5O1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG4gICAgc2VuZE1lc3NhZ2UoXCJXYXJuaW5nc1wiLCBwcmludGFibGVXYXJuaW5ncyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmludGFibGVXYXJuaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLndhcm4ocHJpbnRhYmxlV2FybmluZ3NbaV0pO1xuICAgIH1cbiAgICB2YXIgb3ZlcmxheVdhcm5pbmdzU2V0dGluZyA9IHR5cGVvZiBvcHRpb25zLm92ZXJsYXkgPT09IFwiYm9vbGVhblwiID8gb3B0aW9ucy5vdmVybGF5IDogb3B0aW9ucy5vdmVybGF5ICYmIG9wdGlvbnMub3ZlcmxheS53YXJuaW5ncztcbiAgICBpZiAob3ZlcmxheVdhcm5pbmdzU2V0dGluZykge1xuICAgICAgdmFyIHdhcm5pbmdzVG9EaXNwbGF5ID0gdHlwZW9mIG92ZXJsYXlXYXJuaW5nc1NldHRpbmcgPT09IFwiZnVuY3Rpb25cIiA/IF93YXJuaW5ncy5maWx0ZXIob3ZlcmxheVdhcm5pbmdzU2V0dGluZykgOiBfd2FybmluZ3M7XG4gICAgICBpZiAod2FybmluZ3NUb0Rpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJCVUlMRF9FUlJPUlwiLFxuICAgICAgICAgIGxldmVsOiBcIndhcm5pbmdcIixcbiAgICAgICAgICBtZXNzYWdlczogX3dhcm5pbmdzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5wcmV2ZW50UmVsb2FkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcltdfSBlcnJvcnNcbiAgICovXG4gIGVycm9yczogZnVuY3Rpb24gZXJyb3JzKF9lcnJvcnMpIHtcbiAgICBsb2cuZXJyb3IoXCJFcnJvcnMgd2hpbGUgY29tcGlsaW5nLiBSZWxvYWQgcHJldmVudGVkLlwiKTtcbiAgICB2YXIgcHJpbnRhYmxlRXJyb3JzID0gX2Vycm9ycy5tYXAoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICB2YXIgX2Zvcm1hdFByb2JsZW0yID0gZm9ybWF0UHJvYmxlbShcImVycm9yXCIsIGVycm9yKSxcbiAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0yLmhlYWRlcixcbiAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtMi5ib2R5O1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG4gICAgc2VuZE1lc3NhZ2UoXCJFcnJvcnNcIiwgcHJpbnRhYmxlRXJyb3JzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW50YWJsZUVycm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLmVycm9yKHByaW50YWJsZUVycm9yc1tpXSk7XG4gICAgfVxuICAgIHZhciBvdmVybGF5RXJyb3JzU2V0dGluZ3MgPSB0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcImJvb2xlYW5cIiA/IG9wdGlvbnMub3ZlcmxheSA6IG9wdGlvbnMub3ZlcmxheSAmJiBvcHRpb25zLm92ZXJsYXkuZXJyb3JzO1xuICAgIGlmIChvdmVybGF5RXJyb3JzU2V0dGluZ3MpIHtcbiAgICAgIHZhciBlcnJvcnNUb0Rpc3BsYXkgPSB0eXBlb2Ygb3ZlcmxheUVycm9yc1NldHRpbmdzID09PSBcImZ1bmN0aW9uXCIgPyBfZXJyb3JzLmZpbHRlcihvdmVybGF5RXJyb3JzU2V0dGluZ3MpIDogX2Vycm9ycztcbiAgICAgIGlmIChlcnJvcnNUb0Rpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJCVUlMRF9FUlJPUlwiLFxuICAgICAgICAgIGxldmVsOiBcImVycm9yXCIsXG4gICAgICAgICAgbWVzc2FnZXM6IF9lcnJvcnNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3JcbiAgICovXG4gIGVycm9yOiBmdW5jdGlvbiBlcnJvcihfZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoX2Vycm9yKTtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGxvZy5pbmZvKFwiRGlzY29ubmVjdGVkIVwiKTtcbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHNlbmRNZXNzYWdlKFwiQ2xvc2VcIik7XG4gIH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHt7IHByb3RvY29sPzogc3RyaW5nLCBhdXRoPzogc3RyaW5nLCBob3N0bmFtZT86IHN0cmluZywgcG9ydD86IHN0cmluZywgcGF0aG5hbWU/OiBzdHJpbmcsIHNlYXJjaD86IHN0cmluZywgaGFzaD86IHN0cmluZywgc2xhc2hlcz86IGJvb2xlYW4gfX0gb2JqVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG52YXIgZm9ybWF0VVJMID0gZnVuY3Rpb24gZm9ybWF0VVJMKG9ialVSTCkge1xuICB2YXIgcHJvdG9jb2wgPSBvYmpVUkwucHJvdG9jb2wgfHwgXCJcIjtcbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09IFwiOlwiKSB7XG4gICAgcHJvdG9jb2wgKz0gXCI6XCI7XG4gIH1cbiAgdmFyIGF1dGggPSBvYmpVUkwuYXV0aCB8fCBcIlwiO1xuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksIFwiOlwiKTtcbiAgICBhdXRoICs9IFwiQFwiO1xuICB9XG4gIHZhciBob3N0ID0gXCJcIjtcbiAgaWYgKG9ialVSTC5ob3N0bmFtZSkge1xuICAgIGhvc3QgPSBhdXRoICsgKG9ialVSTC5ob3N0bmFtZS5pbmRleE9mKFwiOlwiKSA9PT0gLTEgPyBvYmpVUkwuaG9zdG5hbWUgOiBcIltcIi5jb25jYXQob2JqVVJMLmhvc3RuYW1lLCBcIl1cIikpO1xuICAgIGlmIChvYmpVUkwucG9ydCkge1xuICAgICAgaG9zdCArPSBcIjpcIi5jb25jYXQob2JqVVJMLnBvcnQpO1xuICAgIH1cbiAgfVxuICB2YXIgcGF0aG5hbWUgPSBvYmpVUkwucGF0aG5hbWUgfHwgXCJcIjtcbiAgaWYgKG9ialVSTC5zbGFzaGVzKSB7XG4gICAgaG9zdCA9IFwiLy9cIi5jb25jYXQoaG9zdCB8fCBcIlwiKTtcbiAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWUuY2hhckF0KDApICE9PSBcIi9cIikge1xuICAgICAgcGF0aG5hbWUgPSBcIi9cIi5jb25jYXQocGF0aG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSBcIlwiO1xuICB9XG4gIHZhciBzZWFyY2ggPSBvYmpVUkwuc2VhcmNoIHx8IFwiXCI7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoLmNoYXJBdCgwKSAhPT0gXCI/XCIpIHtcbiAgICBzZWFyY2ggPSBcIj9cIi5jb25jYXQoc2VhcmNoKTtcbiAgfVxuICB2YXIgaGFzaCA9IG9ialVSTC5oYXNoIHx8IFwiXCI7XG4gIGlmIChoYXNoICYmIGhhc2guY2hhckF0KDApICE9PSBcIiNcIikge1xuICAgIGhhc2ggPSBcIiNcIi5jb25jYXQoaGFzaCk7XG4gIH1cbiAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKC9bPyNdL2csXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWF0Y2hcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQobWF0Y2gpO1xuICB9KTtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoXCIjXCIsIFwiJTIzXCIpO1xuICByZXR1cm4gXCJcIi5jb25jYXQocHJvdG9jb2wpLmNvbmNhdChob3N0KS5jb25jYXQocGF0aG5hbWUpLmNvbmNhdChzZWFyY2gpLmNvbmNhdChoYXNoKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtVUkwgJiB7IGZyb21DdXJyZW50U2NyaXB0PzogYm9vbGVhbiB9fSBwYXJzZWRVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbnZhciBjcmVhdGVTb2NrZXRVUkwgPSBmdW5jdGlvbiBjcmVhdGVTb2NrZXRVUkwocGFyc2VkVVJMKSB7XG4gIHZhciBob3N0bmFtZSA9IHBhcnNlZFVSTC5ob3N0bmFtZTtcblxuICAvLyBOb2RlLmpzIG1vZHVsZSBwYXJzZXMgaXQgYXMgYDo6YFxuICAvLyBgbmV3IFVSTCh1cmxTdHJpbmcsIFtiYXNlVVJMU3RyaW5nXSlgIHBhcnNlcyBpdCBhcyAnWzo6XSdcbiAgdmFyIGlzSW5BZGRyQW55ID0gaG9zdG5hbWUgPT09IFwiMC4wLjAuMFwiIHx8IGhvc3RuYW1lID09PSBcIjo6XCIgfHwgaG9zdG5hbWUgPT09IFwiWzo6XVwiO1xuXG4gIC8vIHdoeSBkbyB3ZSBuZWVkIHRoaXMgY2hlY2s/XG4gIC8vIGhvc3RuYW1lIG4vYSBmb3IgZmlsZSBwcm90b2NvbCAoZXhhbXBsZSwgd2hlbiB1c2luZyBlbGVjdHJvbiwgaW9uaWMpXG4gIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay1kZXYtc2VydmVyL3B1bGwvMzg0XG4gIGlmIChpc0luQWRkckFueSAmJiBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lICYmIHNlbGYubG9jYXRpb24ucHJvdG9jb2wuaW5kZXhPZihcImh0dHBcIikgPT09IDApIHtcbiAgICBob3N0bmFtZSA9IHNlbGYubG9jYXRpb24uaG9zdG5hbWU7XG4gIH1cbiAgdmFyIHNvY2tldFVSTFByb3RvY29sID0gcGFyc2VkVVJMLnByb3RvY29sIHx8IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7XG5cbiAgLy8gV2hlbiBodHRwcyBpcyB1c2VkIGluIHRoZSBhcHAsIHNlY3VyZSB3ZWIgc29ja2V0cyBhcmUgYWx3YXlzIG5lY2Vzc2FyeSBiZWNhdXNlIHRoZSBicm93c2VyIGRvZXNuJ3QgYWNjZXB0IG5vbi1zZWN1cmUgd2ViIHNvY2tldHMuXG4gIGlmIChzb2NrZXRVUkxQcm90b2NvbCA9PT0gXCJhdXRvOlwiIHx8IGhvc3RuYW1lICYmIGlzSW5BZGRyQW55ICYmIHNlbGYubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIpIHtcbiAgICBzb2NrZXRVUkxQcm90b2NvbCA9IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7XG4gIH1cbiAgc29ja2V0VVJMUHJvdG9jb2wgPSBzb2NrZXRVUkxQcm90b2NvbC5yZXBsYWNlKC9eKD86aHR0cHwuKy1leHRlbnNpb258ZmlsZSkvaSwgXCJ3c1wiKTtcbiAgdmFyIHNvY2tldFVSTEF1dGggPSBcIlwiO1xuXG4gIC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxzdHJpbmddKWAgZG9lc24ndCBoYXZlIGBhdXRoYCBwcm9wZXJ0eVxuICAvLyBQYXJzZSBhdXRoZW50aWNhdGlvbiBjcmVkZW50aWFscyBpbiBjYXNlIHdlIG5lZWQgdGhlbVxuICBpZiAocGFyc2VkVVJMLnVzZXJuYW1lKSB7XG4gICAgc29ja2V0VVJMQXV0aCA9IHBhcnNlZFVSTC51c2VybmFtZTtcblxuICAgIC8vIFNpbmNlIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb24gZG9lcyBub3QgYWxsb3cgZW1wdHkgdXNlcm5hbWUsXG4gICAgLy8gd2Ugb25seSBpbmNsdWRlIHBhc3N3b3JkIGlmIHRoZSB1c2VybmFtZSBpcyBub3QgZW1wdHkuXG4gICAgaWYgKHBhcnNlZFVSTC5wYXNzd29yZCkge1xuICAgICAgLy8gUmVzdWx0OiA8dXNlcm5hbWU+OjxwYXNzd29yZD5cbiAgICAgIHNvY2tldFVSTEF1dGggPSBzb2NrZXRVUkxBdXRoLmNvbmNhdChcIjpcIiwgcGFyc2VkVVJMLnBhc3N3b3JkKTtcbiAgICB9XG4gIH1cblxuICAvLyBJbiBjYXNlIHRoZSBob3N0IGlzIGEgcmF3IElQdjYgYWRkcmVzcywgaXQgY2FuIGJlIGVuY2xvc2VkIGluXG4gIC8vIHRoZSBicmFja2V0cyBhcyB0aGUgYnJhY2tldHMgYXJlIG5lZWRlZCBpbiB0aGUgZmluYWwgVVJMIHN0cmluZy5cbiAgLy8gTmVlZCB0byByZW1vdmUgdGhvc2UgYXMgdXJsLmZvcm1hdCBibGluZGx5IGFkZHMgaXRzIG93biBzZXQgb2YgYnJhY2tldHNcbiAgLy8gaWYgdGhlIGhvc3Qgc3RyaW5nIGNvbnRhaW5zIGNvbG9ucy4gVGhhdCB3b3VsZCBsZWFkIHRvIG5vbi13b3JraW5nXG4gIC8vIGRvdWJsZSBicmFja2V0cyAoZS5nLiBbWzo6XV0pIGhvc3RcbiAgLy9cbiAgLy8gQWxsIG9mIHRoZXNlIHdlYiBzb2NrZXQgdXJsIHBhcmFtcyBhcmUgb3B0aW9uYWxseSBwYXNzZWQgaW4gdGhyb3VnaCByZXNvdXJjZVF1ZXJ5LFxuICAvLyBzbyB3ZSBuZWVkIHRvIGZhbGwgYmFjayB0byB0aGUgZGVmYXVsdCBpZiB0aGV5IGFyZSBub3QgcHJvdmlkZWRcbiAgdmFyIHNvY2tldFVSTEhvc3RuYW1lID0gKGhvc3RuYW1lIHx8IHNlbGYubG9jYXRpb24uaG9zdG5hbWUgfHwgXCJsb2NhbGhvc3RcIikucmVwbGFjZSgvXlxcWyguKilcXF0kLywgXCIkMVwiKTtcbiAgdmFyIHNvY2tldFVSTFBvcnQgPSBwYXJzZWRVUkwucG9ydDtcbiAgaWYgKCFzb2NrZXRVUkxQb3J0IHx8IHNvY2tldFVSTFBvcnQgPT09IFwiMFwiKSB7XG4gICAgc29ja2V0VVJMUG9ydCA9IHNlbGYubG9jYXRpb24ucG9ydDtcbiAgfVxuXG4gIC8vIElmIHBhdGggaXMgcHJvdmlkZWQgaXQnbGwgYmUgcGFzc2VkIGluIHZpYSB0aGUgcmVzb3VyY2VRdWVyeSBhcyBhXG4gIC8vIHF1ZXJ5IHBhcmFtIHNvIGl0IGhhcyB0byBiZSBwYXJzZWQgb3V0IG9mIHRoZSBxdWVyeXN0cmluZyBpbiBvcmRlciBmb3IgdGhlXG4gIC8vIGNsaWVudCB0byBvcGVuIHRoZSBzb2NrZXQgdG8gdGhlIGNvcnJlY3QgbG9jYXRpb24uXG4gIHZhciBzb2NrZXRVUkxQYXRobmFtZSA9IFwiL3dzXCI7XG4gIGlmIChwYXJzZWRVUkwucGF0aG5hbWUgJiYgIXBhcnNlZFVSTC5mcm9tQ3VycmVudFNjcmlwdCkge1xuICAgIHNvY2tldFVSTFBhdGhuYW1lID0gcGFyc2VkVVJMLnBhdGhuYW1lO1xuICB9XG4gIHJldHVybiBmb3JtYXRVUkwoe1xuICAgIHByb3RvY29sOiBzb2NrZXRVUkxQcm90b2NvbCxcbiAgICBhdXRoOiBzb2NrZXRVUkxBdXRoLFxuICAgIGhvc3RuYW1lOiBzb2NrZXRVUkxIb3N0bmFtZSxcbiAgICBwb3J0OiBzb2NrZXRVUkxQb3J0LFxuICAgIHBhdGhuYW1lOiBzb2NrZXRVUkxQYXRobmFtZSxcbiAgICBzbGFzaGVzOiB0cnVlXG4gIH0pO1xufTtcbnZhciBzb2NrZXRVUkwgPSBjcmVhdGVTb2NrZXRVUkwocGFyc2VkUmVzb3VyY2VRdWVyeSk7XG5zb2NrZXQoc29ja2V0VVJMLCBvblNvY2tldE1lc3NhZ2UsIG9wdGlvbnMucmVjb25uZWN0KTtcbmV4cG9ydCB7IGdldEN1cnJlbnRTY3JpcHRTb3VyY2UsIHBhcnNlVVJMLCBjcmVhdGVTb2NrZXRVUkwgfTsiLCIvKioqKioqLyAoZnVuY3Rpb24oKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0XCJ1c2Ugc3RyaWN0XCI7XG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gXCIuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvdGFwYWJsZS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvdGFwYWJsZS5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBTeW5jQmFpbEhvb2s6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBTeW5jQmFpbEhvb2s7IH1cbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuZnVuY3Rpb24gU3luY0JhaWxIb29rKCkge1xuICByZXR1cm4ge1xuICAgIGNhbGw6IGZ1bmN0aW9uIGNhbGwoKSB7fVxuICB9O1xufVxuXG4vKipcbiAqIENsaWVudCBzdHViIGZvciB0YXBhYmxlIFN5bmNCYWlsSG9va1xuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydFxuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSkge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cblxuZnVuY3Rpb24gX3R5cGVvZihvKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiB0eXBlb2YgbztcbiAgfSA6IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAmJiBvLmNvbnN0cnVjdG9yID09PSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAmJiBvICE9PSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87XG4gIH0sIF90eXBlb2Yobyk7XG59XG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkocikge1xuICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKHIpIHx8IF9pdGVyYWJsZVRvQXJyYXkocikgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KHIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyLCBhKSB7XG4gIGlmIChyKSB7XG4gICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIHIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShyLCBhKTtcbiAgICB2YXIgdCA9IHt9LnRvU3RyaW5nLmNhbGwocikuc2xpY2UoOCwgLTEpO1xuICAgIHJldHVybiBcIk9iamVjdFwiID09PSB0ICYmIHIuY29uc3RydWN0b3IgJiYgKHQgPSByLmNvbnN0cnVjdG9yLm5hbWUpLCBcIk1hcFwiID09PSB0IHx8IFwiU2V0XCIgPT09IHQgPyBBcnJheS5mcm9tKHIpIDogXCJBcmd1bWVudHNcIiA9PT0gdCB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdCh0KSA/IF9hcnJheUxpa2VUb0FycmF5KHIsIGEpIDogdm9pZCAwO1xuICB9XG59XG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KHIpIHtcbiAgaWYgKFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICYmIG51bGwgIT0gclsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvcl0gfHwgbnVsbCAhPSByW1wiQEBpdGVyYXRvclwiXSkgcmV0dXJuIEFycmF5LmZyb20ocik7XG59XG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMocikge1xuICBpZiAoQXJyYXkuaXNBcnJheShyKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KHIpO1xufVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkociwgYSkge1xuICAobnVsbCA9PSBhIHx8IGEgPiByLmxlbmd0aCkgJiYgKGEgPSByLmxlbmd0aCk7XG4gIGZvciAodmFyIGUgPSAwLCBuID0gQXJyYXkoYSk7IGUgPCBhOyBlKyspIG5bZV0gPSByW2VdO1xuICByZXR1cm4gbjtcbn1cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLCBuKSB7XG4gIGlmICghKGEgaW5zdGFuY2VvZiBuKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbn1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKGUsIHIpIHtcbiAgZm9yICh2YXIgdCA9IDA7IHQgPCByLmxlbmd0aDsgdCsrKSB7XG4gICAgdmFyIG8gPSByW3RdO1xuICAgIG8uZW51bWVyYWJsZSA9IG8uZW51bWVyYWJsZSB8fCAhMSwgby5jb25maWd1cmFibGUgPSAhMCwgXCJ2YWx1ZVwiIGluIG8gJiYgKG8ud3JpdGFibGUgPSAhMCksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBfdG9Qcm9wZXJ0eUtleShvLmtleSksIG8pO1xuICB9XG59XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoZSwgciwgdCkge1xuICByZXR1cm4gciAmJiBfZGVmaW5lUHJvcGVydGllcyhlLnByb3RvdHlwZSwgciksIHQgJiYgX2RlZmluZVByb3BlcnRpZXMoZSwgdCksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6ICExXG4gIH0pLCBlO1xufVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkge1xuICB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIFwic3ltYm9sXCIgPT0gX3R5cGVvZihpKSA/IGkgOiBpICsgXCJcIjtcbn1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7XG4gIGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YodCkgfHwgIXQpIHJldHVybiB0O1xuICB2YXIgZSA9IHRbKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkudG9QcmltaXRpdmVdO1xuICBpZiAodm9pZCAwICE9PSBlKSB7XG4gICAgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKFwib2JqZWN0XCIgIT0gX3R5cGVvZihpKSkgcmV0dXJuIGk7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7XG59XG52YXIgTG9nVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBlcnJvcjogKC8qKiBAdHlwZSB7XCJlcnJvclwifSAqL1wiZXJyb3JcIiksXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIHdhcm46ICgvKiogQHR5cGUge1wid2FyblwifSAqL1wid2FyblwiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgaW5mbzogKC8qKiBAdHlwZSB7XCJpbmZvXCJ9ICovXCJpbmZvXCIpLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICBsb2c6ICgvKiogQHR5cGUge1wibG9nXCJ9ICovXCJsb2dcIiksXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGRlYnVnOiAoLyoqIEB0eXBlIHtcImRlYnVnXCJ9ICovXCJkZWJ1Z1wiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcblxuICB0cmFjZTogKC8qKiBAdHlwZSB7XCJ0cmFjZVwifSAqL1widHJhY2VcIiksXG4gIC8vIG5vIGFyZ3VtZW50c1xuXG4gIGdyb3VwOiAoLyoqIEB0eXBlIHtcImdyb3VwXCJ9ICovXCJncm91cFwiKSxcbiAgLy8gW2xhYmVsXVxuICBncm91cENvbGxhcHNlZDogKC8qKiBAdHlwZSB7XCJncm91cENvbGxhcHNlZFwifSAqL1wiZ3JvdXBDb2xsYXBzZWRcIiksXG4gIC8vIFtsYWJlbF1cbiAgZ3JvdXBFbmQ6ICgvKiogQHR5cGUge1wiZ3JvdXBFbmRcIn0gKi9cImdyb3VwRW5kXCIpLFxuICAvLyBbbGFiZWxdXG5cbiAgcHJvZmlsZTogKC8qKiBAdHlwZSB7XCJwcm9maWxlXCJ9ICovXCJwcm9maWxlXCIpLFxuICAvLyBbcHJvZmlsZU5hbWVdXG4gIHByb2ZpbGVFbmQ6ICgvKiogQHR5cGUge1wicHJvZmlsZUVuZFwifSAqL1wicHJvZmlsZUVuZFwiKSxcbiAgLy8gW3Byb2ZpbGVOYW1lXVxuXG4gIHRpbWU6ICgvKiogQHR5cGUge1widGltZVwifSAqL1widGltZVwiKSxcbiAgLy8gbmFtZSwgdGltZSBhcyBbc2Vjb25kcywgbmFub3NlY29uZHNdXG5cbiAgY2xlYXI6ICgvKiogQHR5cGUge1wiY2xlYXJcIn0gKi9cImNsZWFyXCIpLFxuICAvLyBubyBhcmd1bWVudHNcbiAgc3RhdHVzOiAoLyoqIEB0eXBlIHtcInN0YXR1c1wifSAqL1wic3RhdHVzXCIpIC8vIG1lc3NhZ2UsIGFyZ3VtZW50c1xufSk7XG5tb2R1bGUuZXhwb3J0cy5Mb2dUeXBlID0gTG9nVHlwZTtcblxuLyoqIEB0eXBlZGVmIHt0eXBlb2YgTG9nVHlwZVtrZXlvZiB0eXBlb2YgTG9nVHlwZV19IExvZ1R5cGVFbnVtICovXG5cbnZhciBMT0dfU1lNQk9MID0gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkoXCJ3ZWJwYWNrIGxvZ2dlciByYXcgbG9nIG1ldGhvZFwiKTtcbnZhciBUSU1FUlNfU1lNQk9MID0gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkoXCJ3ZWJwYWNrIGxvZ2dlciB0aW1lc1wiKTtcbnZhciBUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIGFnZ3JlZ2F0ZWQgdGltZXNcIik7XG52YXIgV2VicGFja0xvZ2dlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyh0eXBlOiBMb2dUeXBlRW51bSwgYXJncz86IEVYUEVDVEVEX0FOWVtdKSA9PiB2b2lkfSBsb2cgbG9nIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7KG5hbWU6IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpKSA9PiBXZWJwYWNrTG9nZ2VyfSBnZXRDaGlsZExvZ2dlciBmdW5jdGlvbiB0byBjcmVhdGUgY2hpbGQgbG9nZ2VyXG4gICAqL1xuICBmdW5jdGlvbiBXZWJwYWNrTG9nZ2VyKGxvZywgZ2V0Q2hpbGRMb2dnZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2VicGFja0xvZ2dlcik7XG4gICAgdGhpc1tMT0dfU1lNQk9MXSA9IGxvZztcbiAgICB0aGlzLmdldENoaWxkTG9nZ2VyID0gZ2V0Q2hpbGRMb2dnZXI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsuLi5FWFBFQ1RFRF9BTll9IGFyZ3MgYXJnc1xuICAgKi9cbiAgcmV0dXJuIF9jcmVhdGVDbGFzcyhXZWJwYWNrTG9nZ2VyLCBbe1xuICAgIGtleTogXCJlcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlcnJvcigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmVycm9yLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwid2FyblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB3YXJuKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS53YXJuLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwiaW5mb1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmZvKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5pbmZvLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwibG9nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvZygpIHtcbiAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNCksIF9rZXk0ID0gMDsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICBhcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUubG9nLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwiZGVidWdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjUpLCBfa2V5NSA9IDA7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgICAgYXJnc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmRlYnVnLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VYUEVDVEVEX0FOWX0gYXNzZXJ0aW9uIGFzc2VydGlvblxuICAgICAqIEBwYXJhbSB7Li4uRVhQRUNURURfQU5ZfSBhcmdzIGFyZ3NcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJhc3NlcnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXNzZXJ0KGFzc2VydGlvbikge1xuICAgICAgaWYgKCFhc3NlcnRpb24pIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjYgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW42ID4gMSA/IF9sZW42IC0gMSA6IDApLCBfa2V5NiA9IDE7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICAgICAgICBhcmdzW19rZXk2IC0gMV0gPSBhcmd1bWVudHNbX2tleTZdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5lcnJvciwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRyYWNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyYWNlKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRyYWNlLCBbXCJUcmFjZVwiXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsZWFyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmNsZWFyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwic3RhdHVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXR1cygpIHtcbiAgICAgIGZvciAodmFyIF9sZW43ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNyksIF9rZXk3ID0gMDsgX2tleTcgPCBfbGVuNzsgX2tleTcrKykge1xuICAgICAgICBhcmdzW19rZXk3XSA9IGFyZ3VtZW50c1tfa2V5N107XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuc3RhdHVzLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjgpLCBfa2V5OCA9IDA7IF9rZXk4IDwgX2xlbjg7IF9rZXk4KyspIHtcbiAgICAgICAgYXJnc1tfa2V5OF0gPSBhcmd1bWVudHNbX2tleThdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLkVYUEVDVEVEX0FOWX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBDb2xsYXBzZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXBDb2xsYXBzZWQoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjkpLCBfa2V5OSA9IDA7IF9rZXk5IDwgX2xlbjk7IF9rZXk5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5OV0gPSBhcmd1bWVudHNbX2tleTldO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwQ29sbGFwc2VkLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXBFbmQoKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZ3JvdXBFbmQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gbGFiZWwgbGFiZWxcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJwcm9maWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByb2ZpbGUobGFiZWwpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5wcm9maWxlLCBbbGFiZWxdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGxhYmVsIGxhYmVsXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwicHJvZmlsZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcm9maWxlRW5kKGxhYmVsKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUucHJvZmlsZUVuZCwgW2xhYmVsXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIGxhYmVsXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwidGltZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lKGxhYmVsKSB7XG4gICAgICAvKiogQHR5cGUge01hcDxzdHJpbmcgfCB1bmRlZmluZWQsIFtudW1iZXIsIG51bWJlcl0+fSAqL1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXSA9IHRoaXNbVElNRVJTX1NZTUJPTF0gfHwgbmV3IE1hcCgpO1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXS5zZXQobGFiZWwsIHByb2Nlc3MuaHJ0aW1lKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gbGFiZWwgbGFiZWxcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lTG9nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVMb2cobGFiZWwpIHtcbiAgICAgIHZhciBwcmV2ID0gdGhpc1tUSU1FUlNfU1lNQk9MXSAmJiB0aGlzW1RJTUVSU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbCAnXCIuY29uY2F0KGxhYmVsLCBcIicgZm9yIFdlYnBhY2tMb2dnZXIudGltZUxvZygpXCIpKTtcbiAgICAgIH1cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBsYWJlbCBsYWJlbFxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcInRpbWVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUVuZChsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lRW5kKClcIikpO1xuICAgICAgfVxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIC8qKiBAdHlwZSB7TWFwPHN0cmluZyB8IHVuZGVmaW5lZCwgW251bWJlciwgbnVtYmVyXT59ICovXG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBsYWJlbCBsYWJlbFxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcInRpbWVBZ2dyZWdhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUFnZ3JlZ2F0ZShsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lQWdncmVnYXRlKClcIikpO1xuICAgICAgfVxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIC8qKiBAdHlwZSB7TWFwPHN0cmluZyB8IHVuZGVmaW5lZCwgW251bWJlciwgbnVtYmVyXT59ICovXG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICAvKiogQHR5cGUge01hcDxzdHJpbmcgfCB1bmRlZmluZWQsIFtudW1iZXIsIG51bWJlcl0+fSAqL1xuICAgICAgdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdIHx8IG5ldyBNYXAoKTtcbiAgICAgIHZhciBjdXJyZW50ID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAoY3VycmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0aW1lWzFdICsgY3VycmVudFsxXSA+IDFlOSkge1xuICAgICAgICAgIHRpbWVbMF0gKz0gY3VycmVudFswXSArIDE7XG4gICAgICAgICAgdGltZVsxXSA9IHRpbWVbMV0gLSAxZTkgKyBjdXJyZW50WzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpbWVbMF0gKz0gY3VycmVudFswXTtcbiAgICAgICAgICB0aW1lWzFdICs9IGN1cnJlbnRbMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5zZXQobGFiZWwsIHRpbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gbGFiZWwgbGFiZWxcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lQWdncmVnYXRlRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVBZ2dyZWdhdGVFbmQobGFiZWwpIHtcbiAgICAgIGlmICh0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgdmFyIHRpbWUgPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5kZWxldGUobGFiZWwpO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfV0pO1xufSgpO1xubW9kdWxlLmV4cG9ydHMuTG9nZ2VyID0gV2VicGFja0xvZ2dlcjtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cblxuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShyLCBlKSB7XG4gIHJldHVybiBfYXJyYXlXaXRoSG9sZXMocikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KHIsIGUpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyLCBlKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7XG59XG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KHIsIGwpIHtcbiAgdmFyIHQgPSBudWxsID09IHIgPyBudWxsIDogXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgJiYgclsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvcl0gfHwgcltcIkBAaXRlcmF0b3JcIl07XG4gIGlmIChudWxsICE9IHQpIHtcbiAgICB2YXIgZSxcbiAgICAgIG4sXG4gICAgICBpLFxuICAgICAgdSxcbiAgICAgIGEgPSBbXSxcbiAgICAgIGYgPSAhMCxcbiAgICAgIG8gPSAhMTtcbiAgICB0cnkge1xuICAgICAgaWYgKGkgPSAodCA9IHQuY2FsbChyKSkubmV4dCwgMCA9PT0gbCkge1xuICAgICAgICBpZiAoT2JqZWN0KHQpICE9PSB0KSByZXR1cm47XG4gICAgICAgIGYgPSAhMTtcbiAgICAgIH0gZWxzZSBmb3IgKDsgIShmID0gKGUgPSBpLmNhbGwodCkpLmRvbmUpICYmIChhLnB1c2goZS52YWx1ZSksIGEubGVuZ3RoICE9PSBsKTsgZiA9ICEwKTtcbiAgICB9IGNhdGNoIChyKSB7XG4gICAgICBvID0gITAsIG4gPSByO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIWYgJiYgbnVsbCAhPSB0LnJldHVybiAmJiAodSA9IHQucmV0dXJuKCksIE9iamVjdCh1KSAhPT0gdSkpIHJldHVybjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChvKSB0aHJvdyBuO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYTtcbiAgfVxufVxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKHIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocikpIHJldHVybiByO1xufVxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KHIpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhyKSB8fCBfaXRlcmFibGVUb0FycmF5KHIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkociwgYSkge1xuICBpZiAocikge1xuICAgIGlmIChcInN0cmluZ1wiID09IHR5cGVvZiByKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkociwgYSk7XG4gICAgdmFyIHQgPSB7fS50b1N0cmluZy5jYWxsKHIpLnNsaWNlKDgsIC0xKTtcbiAgICByZXR1cm4gXCJPYmplY3RcIiA9PT0gdCAmJiByLmNvbnN0cnVjdG9yICYmICh0ID0gci5jb25zdHJ1Y3Rvci5uYW1lKSwgXCJNYXBcIiA9PT0gdCB8fCBcIlNldFwiID09PSB0ID8gQXJyYXkuZnJvbShyKSA6IFwiQXJndW1lbnRzXCIgPT09IHQgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QodCkgPyBfYXJyYXlMaWtlVG9BcnJheShyLCBhKSA6IHZvaWQgMDtcbiAgfVxufVxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShyKSB7XG4gIGlmIChcInVuZGVmaW5lZFwiICE9IHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAmJiBudWxsICE9IHJbKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkuaXRlcmF0b3JdIHx8IG51bGwgIT0gcltcIkBAaXRlcmF0b3JcIl0pIHJldHVybiBBcnJheS5mcm9tKHIpO1xufVxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKHIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShyKTtcbn1cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KHIsIGEpIHtcbiAgKG51bGwgPT0gYSB8fCBhID4gci5sZW5ndGgpICYmIChhID0gci5sZW5ndGgpO1xuICBmb3IgKHZhciBlID0gMCwgbiA9IEFycmF5KGEpOyBlIDwgYTsgZSsrKSBuW2VdID0gcltlXTtcbiAgcmV0dXJuIG47XG59XG5mdW5jdGlvbiBfdHlwZW9mKG8pIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAmJiBcInN5bWJvbFwiID09IHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvciA/IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvO1xuICB9IDogZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICYmIG8uY29uc3RydWN0b3IgPT09ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICYmIG8gIT09ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbztcbiAgfSwgX3R5cGVvZihvKTtcbn1cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIiksXG4gIExvZ1R5cGUgPSBfcmVxdWlyZS5Mb2dUeXBlO1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJJdGVtVHlwZXN9IEZpbHRlckl0ZW1UeXBlcyAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi8uLi9kZWNsYXJhdGlvbnMvV2VicGFja09wdGlvbnNcIikuRmlsdGVyVHlwZXN9IEZpbHRlclR5cGVzICovXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4vTG9nZ2VyXCIpLkxvZ1R5cGVFbnVtfSBMb2dUeXBlRW51bSAqL1xuXG4vKiogQHR5cGVkZWYgeyhpdGVtOiBzdHJpbmcpID0+IGJvb2xlYW59IEZpbHRlckZ1bmN0aW9uICovXG4vKiogQHR5cGVkZWYgeyh2YWx1ZTogc3RyaW5nLCB0eXBlOiBMb2dUeXBlRW51bSwgYXJncz86IEVYUEVDVEVEX0FOWVtdKSA9PiB2b2lkfSBMb2dnaW5nRnVuY3Rpb24gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBMb2dnZXJDb25zb2xlXG4gKiBAcHJvcGVydHkgeygpID0+IHZvaWR9IGNsZWFyXG4gKiBAcHJvcGVydHkgeygpID0+IHZvaWR9IHRyYWNlXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBFWFBFQ1RFRF9BTllbXSkgPT4gdm9pZH0gaW5mb1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWR9IGxvZ1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWR9IHdhcm5cbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IEVYUEVDVEVEX0FOWVtdKSA9PiB2b2lkfSBlcnJvclxuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWQ9fSBkZWJ1Z1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWQ9fSBncm91cFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWQ9fSBncm91cENvbGxhcHNlZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWQ9fSBncm91cEVuZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWQ9fSBzdGF0dXNcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IEVYUEVDVEVEX0FOWVtdKSA9PiB2b2lkPX0gcHJvZmlsZVxuICogQHByb3BlcnR5IHsoLi4uYXJnczogRVhQRUNURURfQU5ZW10pID0+IHZvaWQ9fSBwcm9maWxlRW5kXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBFWFBFQ1RFRF9BTllbXSkgPT4gdm9pZD19IGxvZ1RpbWVcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IExvZ2dlck9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7ZmFsc2V8dHJ1ZXxcIm5vbmVcInxcImVycm9yXCJ8XCJ3YXJuXCJ8XCJpbmZvXCJ8XCJsb2dcInxcInZlcmJvc2VcIn0gbGV2ZWwgbG9nbGV2ZWxcbiAqIEBwcm9wZXJ0eSB7RmlsdGVyVHlwZXN8Ym9vbGVhbn0gZGVidWcgZmlsdGVyIGZvciBkZWJ1ZyBsb2dnaW5nXG4gKiBAcHJvcGVydHkge0xvZ2dlckNvbnNvbGV9IGNvbnNvbGUgdGhlIGNvbnNvbGUgdG8gbG9nIHRvXG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0ZpbHRlckl0ZW1UeXBlc30gaXRlbSBhbiBpbnB1dCBpdGVtXG4gKiBAcmV0dXJucyB7RmlsdGVyRnVuY3Rpb24gfCB1bmRlZmluZWR9IGZpbHRlciBmdW5jdGlvblxuICovXG52YXIgZmlsdGVyVG9GdW5jdGlvbiA9IGZ1bmN0aW9uIGZpbHRlclRvRnVuY3Rpb24oaXRlbSkge1xuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChcIltcXFxcXFxcXC9dXCIuY29uY2F0KGl0ZW0ucmVwbGFjZSgvWy1bXFxde30oKSorPy5cXFxcXiR8XS9nLCBcIlxcXFwkJlwiKSwgXCIoW1xcXFxcXFxcL118JHwhfFxcXFw/KVwiKSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpZGVudCkge1xuICAgICAgcmV0dXJuIHJlZ0V4cC50ZXN0KGlkZW50KTtcbiAgICB9O1xuICB9XG4gIGlmIChpdGVtICYmIF90eXBlb2YoaXRlbSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGl0ZW0udGVzdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpZGVudCkge1xuICAgICAgcmV0dXJuIGl0ZW0udGVzdChpZGVudCk7XG4gICAgfTtcbiAgfVxuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfTtcbiAgfVxufTtcblxuLyoqXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG52YXIgTG9nTGV2ZWwgPSB7XG4gIG5vbmU6IDYsXG4gIGZhbHNlOiA2LFxuICBlcnJvcjogNSxcbiAgd2FybjogNCxcbiAgaW5mbzogMyxcbiAgbG9nOiAyLFxuICB0cnVlOiAyLFxuICB2ZXJib3NlOiAxXG59O1xuXG4vKipcbiAqIEBwYXJhbSB7TG9nZ2VyT3B0aW9uc30gb3B0aW9ucyBvcHRpb25zIG9iamVjdFxuICogQHJldHVybnMge0xvZ2dpbmdGdW5jdGlvbn0gbG9nZ2luZyBmdW5jdGlvblxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBfcmVmJGxldmVsID0gX3JlZi5sZXZlbCxcbiAgICBsZXZlbCA9IF9yZWYkbGV2ZWwgPT09IHZvaWQgMCA/IFwiaW5mb1wiIDogX3JlZiRsZXZlbCxcbiAgICBfcmVmJGRlYnVnID0gX3JlZi5kZWJ1ZyxcbiAgICBkZWJ1ZyA9IF9yZWYkZGVidWcgPT09IHZvaWQgMCA/IGZhbHNlIDogX3JlZiRkZWJ1ZyxcbiAgICBjb25zb2xlID0gX3JlZi5jb25zb2xlO1xuICB2YXIgZGVidWdGaWx0ZXJzID0gLyoqIEB0eXBlIHtGaWx0ZXJGdW5jdGlvbltdfSAqL1xuXG4gIHR5cGVvZiBkZWJ1ZyA9PT0gXCJib29sZWFuXCIgPyBbZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZWJ1ZztcbiAgfV0gOiAvKiogQHR5cGUge0ZpbHRlckl0ZW1UeXBlc1tdfSAqL1tdLmNvbmNhdChkZWJ1ZykubWFwKGZpbHRlclRvRnVuY3Rpb24pO1xuICB2YXIgbG9nbGV2ZWwgPSBMb2dMZXZlbFtcIlwiLmNvbmNhdChsZXZlbCldIHx8IDA7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIGxvZ2dlclxuICAgKiBAcGFyYW0ge0xvZ1R5cGVFbnVtfSB0eXBlIHR5cGUgb2YgdGhlIGxvZyBlbnRyeVxuICAgKiBAcGFyYW0ge0VYUEVDVEVEX0FOWVtdPX0gYXJncyBhcmd1bWVudHMgb2YgdGhlIGxvZyBlbnRyeVxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIHZhciBsb2dnZXIgPSBmdW5jdGlvbiBsb2dnZXIobmFtZSwgdHlwZSwgYXJncykge1xuICAgIHZhciBsYWJlbGVkQXJncyA9IGZ1bmN0aW9uIGxhYmVsZWRBcmdzKCkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJncykpIHtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMCAmJiB0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHJldHVybiBbXCJbXCIuY29uY2F0KG5hbWUsIFwiXSBcIikuY29uY2F0KGFyZ3NbMF0pXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3Muc2xpY2UoMSkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW1wiW1wiLmNvbmNhdChuYW1lLCBcIl1cIildLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYXJncykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtdO1xuICAgIH07XG4gICAgdmFyIGRlYnVnID0gZGVidWdGaWx0ZXJzLnNvbWUoZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiBmKG5hbWUpO1xuICAgIH0pO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBMb2dUeXBlLmRlYnVnOlxuICAgICAgICBpZiAoIWRlYnVnKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5kZWJ1ZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5kZWJ1Zy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUubG9nOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLmluZm86XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5pbmZvKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS53YXJuOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwud2FybikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZXJyb3I6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5lcnJvcikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLnRyYWNlOlxuICAgICAgICBpZiAoIWRlYnVnKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBDb2xsYXBzZWQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLnZlcmJvc2UpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS5ncm91cENvbGxhcHNlZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgY2FzZSBMb2dUeXBlLmdyb3VwOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5ncm91cCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5ncm91cC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBFbmQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmdyb3VwRW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUudGltZTpcbiAgICAgICAge1xuICAgICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgICB2YXIgX2FyZ3MgPSBfc2xpY2VkVG9BcnJheSgvKiogQHR5cGUge1tzdHJpbmcsIG51bWJlciwgbnVtYmVyXX0gKi9cbiAgICAgICAgICAgIGFyZ3MsIDMpLFxuICAgICAgICAgICAgbGFiZWwgPSBfYXJnc1swXSxcbiAgICAgICAgICAgIHN0YXJ0ID0gX2FyZ3NbMV0sXG4gICAgICAgICAgICBlbmQgPSBfYXJnc1syXTtcbiAgICAgICAgICB2YXIgbXMgPSBzdGFydCAqIDEwMDAgKyBlbmQgLyAxMDAwMDAwO1xuICAgICAgICAgIHZhciBtc2cgPSBcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQobGFiZWwsIFwiOiBcIikuY29uY2F0KG1zLCBcIiBtc1wiKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUubG9nVGltZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZ1RpbWUobXNnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGNhc2UgTG9nVHlwZS5wcm9maWxlOlxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUucHJvZmlsZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5wcm9maWxlLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUucHJvZmlsZUVuZDpcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnByb2ZpbGVFbmQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNvbnNvbGUucHJvZmlsZUVuZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLmNsZWFyOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5jbGVhciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLnN0YXR1czpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmluZm8pIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnN0YXR1cyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgaWYgKCFhcmdzIHx8IGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhcmdzICYmIGFyZ3MubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIExvZ1R5cGUgXCIuY29uY2F0KHR5cGUpKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsb2dnZXI7XG59O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxuXG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICByZXR1cm4gX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAobikge1xuICAgIGZvciAodmFyIGUgPSAxOyBlIDwgYXJndW1lbnRzLmxlbmd0aDsgZSsrKSB7XG4gICAgICB2YXIgdCA9IGFyZ3VtZW50c1tlXTtcbiAgICAgIGZvciAodmFyIHIgaW4gdCkgKHt9KS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsIHIpICYmIChuW3JdID0gdFtyXSk7XG4gICAgfVxuICAgIHJldHVybiBuO1xuICB9LCBfZXh0ZW5kcy5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufVxudmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgdGFwYWJsZSAqLyBcIi4vY2xpZW50LXNyYy9tb2R1bGVzL2xvZ2dlci90YXBhYmxlLmpzXCIpLFxuICBTeW5jQmFpbEhvb2sgPSBfcmVxdWlyZS5TeW5jQmFpbEhvb2s7XG52YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9Mb2dnZXIgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiKSxcbiAgTG9nZ2VyID0gX3JlcXVpcmUyLkxvZ2dlcjtcbnZhciBjcmVhdGVDb25zb2xlTG9nZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9jcmVhdGVDb25zb2xlTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzXCIpO1xuXG4vKiogQHR5cGUge2NyZWF0ZUNvbnNvbGVMb2dnZXIuTG9nZ2VyT3B0aW9uc30gKi9cbnZhciBjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMgPSB7XG4gIGxldmVsOiBcImluZm9cIixcbiAgZGVidWc6IGZhbHNlLFxuICBjb25zb2xlOiBjb25zb2xlXG59O1xudmFyIGN1cnJlbnREZWZhdWx0TG9nZ2VyID0gY3JlYXRlQ29uc29sZUxvZ2dlcihjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMpO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIGxvZ2dlclxuICogQHJldHVybnMge0xvZ2dlcn0gYSBsb2dnZXJcbiAqL1xubW9kdWxlLmV4cG9ydHMuZ2V0TG9nZ2VyID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBMb2dnZXIoZnVuY3Rpb24gKHR5cGUsIGFyZ3MpIHtcbiAgICBpZiAobW9kdWxlLmV4cG9ydHMuaG9va3MubG9nLmNhbGwobmFtZSwgdHlwZSwgYXJncykgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY3VycmVudERlZmF1bHRMb2dnZXIobmFtZSwgdHlwZSwgYXJncyk7XG4gICAgfVxuICB9LCBmdW5jdGlvbiAoY2hpbGROYW1lKSB7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldExvZ2dlcihcIlwiLmNvbmNhdChuYW1lLCBcIi9cIikuY29uY2F0KGNoaWxkTmFtZSkpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtjcmVhdGVDb25zb2xlTG9nZ2VyLkxvZ2dlck9wdGlvbnN9IG9wdGlvbnMgbmV3IG9wdGlvbnMsIG1lcmdlIHdpdGggb2xkIG9wdGlvbnNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5tb2R1bGUuZXhwb3J0cy5jb25maWd1cmVEZWZhdWx0TG9nZ2VyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgX2V4dGVuZHMoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zLCBvcHRpb25zKTtcbiAgY3VycmVudERlZmF1bHRMb2dnZXIgPSBjcmVhdGVDb25zb2xlTG9nZ2VyKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyk7XG59O1xubW9kdWxlLmV4cG9ydHMuaG9va3MgPSB7XG4gIGxvZzogbmV3IFN5bmNCYWlsSG9vayhbXCJvcmlnaW5cIiwgXCJ0eXBlXCIsIFwiYXJnc1wiXSlcbn07XG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG4vKioqKioqLyBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcbi8qKioqKiovIFx0XHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH1cbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovIFx0XHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuLy8gVGhpcyBlbnRyeSBuZWVkcyB0byBiZSB3cmFwcGVkIGluIGFuIElJRkUgYmVjYXVzZSBpdCBuZWVkcyB0byBiZSBpc29sYXRlZCBhZ2FpbnN0IG90aGVyIG1vZHVsZXMgaW4gdGhlIGNodW5rLlxuIWZ1bmN0aW9uKCkge1xuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiZGVmYXVsdFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIHJlZXhwb3J0IGRlZmF1bHQgZXhwb3J0IGZyb20gbmFtZWQgbW9kdWxlICovIHdlYnBhY2tfbGliX2xvZ2dpbmdfcnVudGltZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciB3ZWJwYWNrX2xpYl9sb2dnaW5nX3J1bnRpbWVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIHdlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qcyAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qc1wiKTtcblxufSgpO1xudmFyIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18gPSBleHBvcnRzO1xuZm9yKHZhciBfX3dlYnBhY2tfaV9fIGluIF9fd2VicGFja19leHBvcnRzX18pIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X19bX193ZWJwYWNrX2lfX10gPSBfX3dlYnBhY2tfZXhwb3J0c19fW19fd2VicGFja19pX19dO1xuaWYoX193ZWJwYWNrX2V4cG9ydHNfXy5fX2VzTW9kdWxlKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyB9KSgpXG47IiwiZnVuY3Rpb24gX3R5cGVvZihvKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykgeyByZXR1cm4gdHlwZW9mIG87IH0gOiBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbzsgfSwgX3R5cGVvZihvKTsgfVxuZnVuY3Rpb24gb3duS2V5cyhlLCByKSB7IHZhciB0ID0gT2JqZWN0LmtleXMoZSk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7IH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pOyB9IHJldHVybiB0OyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkoZSwgciwgdCkgeyByZXR1cm4gKHIgPSBfdG9Qcm9wZXJ0eUtleShyKSkgaW4gZSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCB7IHZhbHVlOiB0LCBlbnVtZXJhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCwgd3JpdGFibGU6ICEwIH0pIDogZVtyXSA9IHQsIGU7IH1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KHQpIHsgdmFyIGkgPSBfdG9QcmltaXRpdmUodCwgXCJzdHJpbmdcIik7IHJldHVybiBcInN5bWJvbFwiID09IF90eXBlb2YoaSkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YodCkgfHwgIXQpIHJldHVybiB0OyB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTsgaWYgKHZvaWQgMCAhPT0gZSkgeyB2YXIgaSA9IGUuY2FsbCh0LCByIHx8IFwiZGVmYXVsdFwiKTsgaWYgKFwib2JqZWN0XCIgIT0gX3R5cGVvZihpKSkgcmV0dXJuIGk7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTsgfSByZXR1cm4gKFwic3RyaW5nXCIgPT09IHIgPyBTdHJpbmcgOiBOdW1iZXIpKHQpOyB9XG4vLyBUaGUgZXJyb3Igb3ZlcmxheSBpcyBpbnNwaXJlZCAoYW5kIG1vc3RseSBjb3BpZWQpIGZyb20gQ3JlYXRlIFJlYWN0IEFwcCAoaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29raW5jdWJhdG9yL2NyZWF0ZS1yZWFjdC1hcHApXG4vLyBUaGV5LCBpbiB0dXJuLCBnb3QgaW5zcGlyZWQgYnkgd2VicGFjay1ob3QtbWlkZGxld2FyZSAoaHR0cHM6Ly9naXRodWIuY29tL2dsZW5qYW1pbi93ZWJwYWNrLWhvdC1taWRkbGV3YXJlKS5cblxuaW1wb3J0IGFuc2lIVE1MIGZyb20gXCJhbnNpLWh0bWwtY29tbXVuaXR5XCI7XG5cbi8qKlxuICogQHR5cGUgeyhpbnB1dDogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKSA9PiBzdHJpbmd9XG4gKi9cbnZhciBnZXRDb2RlUG9pbnQgPSBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0ID8gZnVuY3Rpb24gKGlucHV0LCBwb3NpdGlvbikge1xuICByZXR1cm4gaW5wdXQuY29kZVBvaW50QXQocG9zaXRpb24pO1xufSA6IGZ1bmN0aW9uIChpbnB1dCwgcG9zaXRpb24pIHtcbiAgcmV0dXJuIChpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSAtIDB4ZDgwMCkgKiAweDQwMCArIGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24gKyAxKSAtIDB4ZGMwMCArIDB4MTAwMDA7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBtYWNyb1RleHRcbiAqIEBwYXJhbSB7UmVnRXhwfSBtYWNyb1JlZ0V4cFxuICogQHBhcmFtIHsoaW5wdXQ6IHN0cmluZykgPT4gc3RyaW5nfSBtYWNyb1JlcGxhY2VyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG52YXIgcmVwbGFjZVVzaW5nUmVnRXhwID0gZnVuY3Rpb24gcmVwbGFjZVVzaW5nUmVnRXhwKG1hY3JvVGV4dCwgbWFjcm9SZWdFeHAsIG1hY3JvUmVwbGFjZXIpIHtcbiAgbWFjcm9SZWdFeHAubGFzdEluZGV4ID0gMDtcbiAgdmFyIHJlcGxhY2VNYXRjaCA9IG1hY3JvUmVnRXhwLmV4ZWMobWFjcm9UZXh0KTtcbiAgdmFyIHJlcGxhY2VSZXN1bHQ7XG4gIGlmIChyZXBsYWNlTWF0Y2gpIHtcbiAgICByZXBsYWNlUmVzdWx0ID0gXCJcIjtcbiAgICB2YXIgcmVwbGFjZUxhc3RJbmRleCA9IDA7XG4gICAgZG8ge1xuICAgICAgaWYgKHJlcGxhY2VMYXN0SW5kZXggIT09IHJlcGxhY2VNYXRjaC5pbmRleCkge1xuICAgICAgICByZXBsYWNlUmVzdWx0ICs9IG1hY3JvVGV4dC5zdWJzdHJpbmcocmVwbGFjZUxhc3RJbmRleCwgcmVwbGFjZU1hdGNoLmluZGV4KTtcbiAgICAgIH1cbiAgICAgIHZhciByZXBsYWNlSW5wdXQgPSByZXBsYWNlTWF0Y2hbMF07XG4gICAgICByZXBsYWNlUmVzdWx0ICs9IG1hY3JvUmVwbGFjZXIocmVwbGFjZUlucHV0KTtcbiAgICAgIHJlcGxhY2VMYXN0SW5kZXggPSByZXBsYWNlTWF0Y2guaW5kZXggKyByZXBsYWNlSW5wdXQubGVuZ3RoO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbmQtYXNzaWduXG4gICAgfSB3aGlsZSAocmVwbGFjZU1hdGNoID0gbWFjcm9SZWdFeHAuZXhlYyhtYWNyb1RleHQpKTtcbiAgICBpZiAocmVwbGFjZUxhc3RJbmRleCAhPT0gbWFjcm9UZXh0Lmxlbmd0aCkge1xuICAgICAgcmVwbGFjZVJlc3VsdCArPSBtYWNyb1RleHQuc3Vic3RyaW5nKHJlcGxhY2VMYXN0SW5kZXgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXBsYWNlUmVzdWx0ID0gbWFjcm9UZXh0O1xuICB9XG4gIHJldHVybiByZXBsYWNlUmVzdWx0O1xufTtcbnZhciByZWZlcmVuY2VzID0ge1xuICBcIjxcIjogXCImbHQ7XCIsXG4gIFwiPlwiOiBcIiZndDtcIixcbiAgJ1wiJzogXCImcXVvdDtcIixcbiAgXCInXCI6IFwiJmFwb3M7XCIsXG4gIFwiJlwiOiBcIiZhbXA7XCJcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgdGV4dFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHRleHQpIHtcbiAgaWYgKCF0ZXh0KSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbiAgcmV0dXJuIHJlcGxhY2VVc2luZ1JlZ0V4cCh0ZXh0LCAvWzw+J1wiJl0vZywgZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgdmFyIHJlc3VsdCA9IHJlZmVyZW5jZXNbaW5wdXRdO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICB2YXIgY29kZSA9IGlucHV0Lmxlbmd0aCA+IDEgPyBnZXRDb2RlUG9pbnQoaW5wdXQsIDApIDogaW5wdXQuY2hhckNvZGVBdCgwKTtcbiAgICAgIHJlc3VsdCA9IFwiJiNcIi5jb25jYXQoY29kZSwgXCI7XCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTdGF0ZURlZmluaXRpb25zXG4gKiBAcHJvcGVydHkge3tbZXZlbnQ6IHN0cmluZ106IHsgdGFyZ2V0OiBzdHJpbmc7IGFjdGlvbnM/OiBBcnJheTxzdHJpbmc+IH19fSBbb25dXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBPcHRpb25zXG4gKiBAcHJvcGVydHkge3tbc3RhdGU6IHN0cmluZ106IFN0YXRlRGVmaW5pdGlvbnN9fSBzdGF0ZXNcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBjb250ZXh0O1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGluaXRpYWxcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEltcGxlbWVudGF0aW9uXG4gKiBAcHJvcGVydHkge3tbYWN0aW9uTmFtZTogc3RyaW5nXTogKGN0eDogb2JqZWN0LCBldmVudDogYW55KSA9PiBvYmplY3R9fSBhY3Rpb25zXG4gKi9cblxuLyoqXG4gKiBBIHNpbXBsaWZpZWQgYGNyZWF0ZU1hY2hpbmVgIGZyb20gYEB4c3RhdGUvZnNtYCB3aXRoIHRoZSBmb2xsb3dpbmcgZGlmZmVyZW5jZXM6XG4gKlxuICogIC0gdGhlIHJldHVybmVkIG1hY2hpbmUgaXMgdGVjaG5pY2FsbHkgYSBcInNlcnZpY2VcIi4gTm8gYGludGVycHJldChtYWNoaW5lKS5zdGFydCgpYCBpcyBuZWVkZWQuXG4gKiAgLSB0aGUgc3RhdGUgZGVmaW5pdGlvbiBvbmx5IHN1cHBvcnQgYG9uYCBhbmQgdGFyZ2V0IG11c3QgYmUgZGVjbGFyZWQgd2l0aCB7IHRhcmdldDogJ25leHRTdGF0ZScsIGFjdGlvbnM6IFtdIH0gZXhwbGljaXRseS5cbiAqICAtIGV2ZW50IHBhc3NlZCB0byBgc2VuZGAgbXVzdCBiZSBhbiBvYmplY3Qgd2l0aCBgdHlwZWAgcHJvcGVydHkuXG4gKiAgLSBhY3Rpb25zIGltcGxlbWVudGF0aW9uIHdpbGwgYmUgW2Fzc2lnbiBhY3Rpb25dKGh0dHBzOi8veHN0YXRlLmpzLm9yZy9kb2NzL2d1aWRlcy9jb250ZXh0Lmh0bWwjYXNzaWduLWFjdGlvbikgaWYgeW91IHJldHVybiBhbnkgdmFsdWUuXG4gKiAgRG8gbm90IHJldHVybiBhbnl0aGluZyBpZiB5b3UganVzdCB3YW50IHRvIGludm9rZSBzaWRlIGVmZmVjdC5cbiAqXG4gKiBUaGUgZ29hbCBvZiB0aGlzIGN1c3RvbSBmdW5jdGlvbiBpcyB0byBhdm9pZCBpbnN0YWxsaW5nIHRoZSBlbnRpcmUgYCd4c3RhdGUvZnNtJ2AgcGFja2FnZSwgd2hpbGUgZW5hYmxpbmcgbW9kZWxpbmcgdXNpbmdcbiAqIHN0YXRlIG1hY2hpbmUuIFlvdSBjYW4gY29weSB0aGUgZmlyc3QgcGFyYW1ldGVyIGludG8gdGhlIGVkaXRvciBhdCBodHRwczovL3N0YXRlbHkuYWkvdml6IHRvIHZpc3VhbGl6ZSB0aGUgc3RhdGUgbWFjaGluZS5cbiAqXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnNcbiAqIEBwYXJhbSB7SW1wbGVtZW50YXRpb259IGltcGxlbWVudGF0aW9uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU1hY2hpbmUoX3JlZiwgX3JlZjIpIHtcbiAgdmFyIHN0YXRlcyA9IF9yZWYuc3RhdGVzLFxuICAgIGNvbnRleHQgPSBfcmVmLmNvbnRleHQsXG4gICAgaW5pdGlhbCA9IF9yZWYuaW5pdGlhbDtcbiAgdmFyIGFjdGlvbnMgPSBfcmVmMi5hY3Rpb25zO1xuICB2YXIgY3VycmVudFN0YXRlID0gaW5pdGlhbDtcbiAgdmFyIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dDtcbiAgcmV0dXJuIHtcbiAgICBzZW5kOiBmdW5jdGlvbiBzZW5kKGV2ZW50KSB7XG4gICAgICB2YXIgY3VycmVudFN0YXRlT24gPSBzdGF0ZXNbY3VycmVudFN0YXRlXS5vbjtcbiAgICAgIHZhciB0cmFuc2l0aW9uQ29uZmlnID0gY3VycmVudFN0YXRlT24gJiYgY3VycmVudFN0YXRlT25bZXZlbnQudHlwZV07XG4gICAgICBpZiAodHJhbnNpdGlvbkNvbmZpZykge1xuICAgICAgICBjdXJyZW50U3RhdGUgPSB0cmFuc2l0aW9uQ29uZmlnLnRhcmdldDtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25Db25maWcuYWN0aW9ucykge1xuICAgICAgICAgIHRyYW5zaXRpb25Db25maWcuYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhY3ROYW1lKSB7XG4gICAgICAgICAgICB2YXIgYWN0aW9uSW1wbCA9IGFjdGlvbnNbYWN0TmFtZV07XG4gICAgICAgICAgICB2YXIgbmV4dENvbnRleHRWYWx1ZSA9IGFjdGlvbkltcGwgJiYgYWN0aW9uSW1wbChjdXJyZW50Q29udGV4dCwgZXZlbnQpO1xuICAgICAgICAgICAgaWYgKG5leHRDb250ZXh0VmFsdWUpIHtcbiAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIGN1cnJlbnRDb250ZXh0KSwgbmV4dENvbnRleHRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU2hvd092ZXJsYXlEYXRhXG4gKiBAcHJvcGVydHkgeyd3YXJuaW5nJyB8ICdlcnJvcid9IGxldmVsXG4gKiBAcHJvcGVydHkge0FycmF5PHN0cmluZyAgfCB7IG1vZHVsZUlkZW50aWZpZXI/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZyB9Pn0gbWVzc2FnZXNcbiAqIEBwcm9wZXJ0eSB7J2J1aWxkJyB8ICdydW50aW1lJ30gbWVzc2FnZVNvdXJjZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ3JlYXRlT3ZlcmxheU1hY2hpbmVPcHRpb25zXG4gKiBAcHJvcGVydHkgeyhkYXRhOiBTaG93T3ZlcmxheURhdGEpID0+IHZvaWR9IHNob3dPdmVybGF5XG4gKiBAcHJvcGVydHkgeygpID0+IHZvaWR9IGhpZGVPdmVybGF5XG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0NyZWF0ZU92ZXJsYXlNYWNoaW5lT3B0aW9uc30gb3B0aW9uc1xuICovXG52YXIgY3JlYXRlT3ZlcmxheU1hY2hpbmUgPSBmdW5jdGlvbiBjcmVhdGVPdmVybGF5TWFjaGluZShvcHRpb25zKSB7XG4gIHZhciBoaWRlT3ZlcmxheSA9IG9wdGlvbnMuaGlkZU92ZXJsYXksXG4gICAgc2hvd092ZXJsYXkgPSBvcHRpb25zLnNob3dPdmVybGF5O1xuICByZXR1cm4gY3JlYXRlTWFjaGluZSh7XG4gICAgaW5pdGlhbDogXCJoaWRkZW5cIixcbiAgICBjb250ZXh0OiB7XG4gICAgICBsZXZlbDogXCJlcnJvclwiLFxuICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgbWVzc2FnZVNvdXJjZTogXCJidWlsZFwiXG4gICAgfSxcbiAgICBzdGF0ZXM6IHtcbiAgICAgIGhpZGRlbjoge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIEJVSUxEX0VSUk9SOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiZGlzcGxheUJ1aWxkRXJyb3JcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcInNldE1lc3NhZ2VzXCIsIFwic2hvd092ZXJsYXlcIl1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFJVTlRJTUVfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5UnVudGltZUVycm9yXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJzZXRNZXNzYWdlc1wiLCBcInNob3dPdmVybGF5XCJdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlzcGxheUJ1aWxkRXJyb3I6IHtcbiAgICAgICAgb246IHtcbiAgICAgICAgICBESVNNSVNTOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJkaXNtaXNzTWVzc2FnZXNcIiwgXCJoaWRlT3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgQlVJTERfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5QnVpbGRFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wiYXBwZW5kTWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRpc3BsYXlSdW50aW1lRXJyb3I6IHtcbiAgICAgICAgb246IHtcbiAgICAgICAgICBESVNNSVNTOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJkaXNtaXNzTWVzc2FnZXNcIiwgXCJoaWRlT3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgUlVOVElNRV9FUlJPUjoge1xuICAgICAgICAgICAgdGFyZ2V0OiBcImRpc3BsYXlSdW50aW1lRXJyb3JcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcImFwcGVuZE1lc3NhZ2VzXCIsIFwic2hvd092ZXJsYXlcIl1cbiAgICAgICAgICB9LFxuICAgICAgICAgIEJVSUxEX0VSUk9SOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiZGlzcGxheUJ1aWxkRXJyb3JcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcInNldE1lc3NhZ2VzXCIsIFwic2hvd092ZXJsYXlcIl1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBhY3Rpb25zOiB7XG4gICAgICBkaXNtaXNzTWVzc2FnZXM6IGZ1bmN0aW9uIGRpc21pc3NNZXNzYWdlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgbGV2ZWw6IFwiZXJyb3JcIixcbiAgICAgICAgICBtZXNzYWdlU291cmNlOiBcImJ1aWxkXCJcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBhcHBlbmRNZXNzYWdlczogZnVuY3Rpb24gYXBwZW5kTWVzc2FnZXMoY29udGV4dCwgZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtZXNzYWdlczogY29udGV4dC5tZXNzYWdlcy5jb25jYXQoZXZlbnQubWVzc2FnZXMpLFxuICAgICAgICAgIGxldmVsOiBldmVudC5sZXZlbCB8fCBjb250ZXh0LmxldmVsLFxuICAgICAgICAgIG1lc3NhZ2VTb3VyY2U6IGV2ZW50LnR5cGUgPT09IFwiUlVOVElNRV9FUlJPUlwiID8gXCJydW50aW1lXCIgOiBcImJ1aWxkXCJcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBzZXRNZXNzYWdlczogZnVuY3Rpb24gc2V0TWVzc2FnZXMoY29udGV4dCwgZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtZXNzYWdlczogZXZlbnQubWVzc2FnZXMsXG4gICAgICAgICAgbGV2ZWw6IGV2ZW50LmxldmVsIHx8IGNvbnRleHQubGV2ZWwsXG4gICAgICAgICAgbWVzc2FnZVNvdXJjZTogZXZlbnQudHlwZSA9PT0gXCJSVU5USU1FX0VSUk9SXCIgPyBcInJ1bnRpbWVcIiA6IFwiYnVpbGRcIlxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGhpZGVPdmVybGF5OiBoaWRlT3ZlcmxheSxcbiAgICAgIHNob3dPdmVybGF5OiBzaG93T3ZlcmxheVxuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICovXG52YXIgcGFyc2VFcnJvclRvU3RhY2tzID0gZnVuY3Rpb24gcGFyc2VFcnJvclRvU3RhY2tzKGVycm9yKSB7XG4gIGlmICghZXJyb3IgfHwgIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInBhcnNlRXJyb3JUb1N0YWNrcyBleHBlY3RzIEVycm9yIG9iamVjdFwiKTtcbiAgfVxuICBpZiAodHlwZW9mIGVycm9yLnN0YWNrID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGVycm9yLnN0YWNrLnNwbGl0KFwiXFxuXCIpLmZpbHRlcihmdW5jdGlvbiAoc3RhY2spIHtcbiAgICAgIHJldHVybiBzdGFjayAhPT0gXCJFcnJvcjogXCIuY29uY2F0KGVycm9yLm1lc3NhZ2UpO1xuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIEBjYWxsYmFjayBFcnJvckNhbGxiYWNrXG4gKiBAcGFyYW0ge0Vycm9yRXZlbnR9IGVycm9yXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7RXJyb3JDYWxsYmFja30gY2FsbGJhY2tcbiAqL1xudmFyIGxpc3RlblRvUnVudGltZUVycm9yID0gZnVuY3Rpb24gbGlzdGVuVG9SdW50aW1lRXJyb3IoY2FsbGJhY2spIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBjYWxsYmFjayk7XG4gIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgY2FsbGJhY2spO1xuICB9O1xufTtcblxuLyoqXG4gKiBAY2FsbGJhY2sgVW5oYW5kbGVkUmVqZWN0aW9uQ2FsbGJhY2tcbiAqIEBwYXJhbSB7UHJvbWlzZVJlamVjdGlvbkV2ZW50fSByZWplY3Rpb25FdmVudFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge1VuaGFuZGxlZFJlamVjdGlvbkNhbGxiYWNrfSBjYWxsYmFja1xuICovXG52YXIgbGlzdGVuVG9VbmhhbmRsZWRSZWplY3Rpb24gPSBmdW5jdGlvbiBsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbihjYWxsYmFjaykge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInVuaGFuZGxlZHJlamVjdGlvblwiLCBjYWxsYmFjayk7XG4gIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidW5oYW5kbGVkcmVqZWN0aW9uXCIsIGNhbGxiYWNrKTtcbiAgfTtcbn07XG5cbi8vIFN0eWxlcyBhcmUgaW5zcGlyZWQgYnkgYHJlYWN0LWVycm9yLW92ZXJsYXlgXG5cbnZhciBtc2dTdHlsZXMgPSB7XG4gIGVycm9yOiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjA2LCAxNywgMzgsIDAuMSlcIixcbiAgICBjb2xvcjogXCIjZmNjZmNmXCJcbiAgfSxcbiAgd2FybmluZzoge1xuICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1MSwgMjQ1LCAxODAsIDAuMSlcIixcbiAgICBjb2xvcjogXCIjZmJmNWI0XCJcbiAgfVxufTtcbnZhciBpZnJhbWVTdHlsZSA9IHtcbiAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgdG9wOiAwLFxuICBsZWZ0OiAwLFxuICByaWdodDogMCxcbiAgYm90dG9tOiAwLFxuICB3aWR0aDogXCIxMDB2d1wiLFxuICBoZWlnaHQ6IFwiMTAwdmhcIixcbiAgYm9yZGVyOiBcIm5vbmVcIixcbiAgXCJ6LWluZGV4XCI6IDk5OTk5OTk5OTlcbn07XG52YXIgY29udGFpbmVyU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gIGxlZnQ6IDAsXG4gIHRvcDogMCxcbiAgcmlnaHQ6IDAsXG4gIGJvdHRvbTogMCxcbiAgd2lkdGg6IFwiMTAwdndcIixcbiAgaGVpZ2h0OiBcIjEwMHZoXCIsXG4gIGZvbnRTaXplOiBcImxhcmdlXCIsXG4gIHBhZGRpbmc6IFwiMnJlbSAycmVtIDRyZW0gMnJlbVwiLFxuICBsaW5lSGVpZ2h0OiBcIjEuMlwiLFxuICB3aGl0ZVNwYWNlOiBcInByZS13cmFwXCIsXG4gIG92ZXJmbG93OiBcImF1dG9cIixcbiAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwgMCwgMCwgMC45KVwiLFxuICBjb2xvcjogXCJ3aGl0ZVwiXG59O1xudmFyIGhlYWRlclN0eWxlID0ge1xuICBjb2xvcjogXCIjZTgzYjQ2XCIsXG4gIGZvbnRTaXplOiBcIjJlbVwiLFxuICB3aGl0ZVNwYWNlOiBcInByZS13cmFwXCIsXG4gIGZvbnRGYW1pbHk6IFwic2Fucy1zZXJpZlwiLFxuICBtYXJnaW46IFwiMCAycmVtIDJyZW0gMFwiLFxuICBmbGV4OiBcIjAgMCBhdXRvXCIsXG4gIG1heEhlaWdodDogXCI1MCVcIixcbiAgb3ZlcmZsb3c6IFwiYXV0b1wiXG59O1xudmFyIGRpc21pc3NCdXR0b25TdHlsZSA9IHtcbiAgY29sb3I6IFwiI2ZmZmZmZlwiLFxuICBsaW5lSGVpZ2h0OiBcIjFyZW1cIixcbiAgZm9udFNpemU6IFwiMS41cmVtXCIsXG4gIHBhZGRpbmc6IFwiMXJlbVwiLFxuICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICByaWdodDogMCxcbiAgdG9wOiAwLFxuICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgYm9yZGVyOiBcIm5vbmVcIlxufTtcbnZhciBtc2dUeXBlU3R5bGUgPSB7XG4gIGNvbG9yOiBcIiNlODNiNDZcIixcbiAgZm9udFNpemU6IFwiMS4yZW1cIixcbiAgbWFyZ2luQm90dG9tOiBcIjFyZW1cIixcbiAgZm9udEZhbWlseTogXCJzYW5zLXNlcmlmXCJcbn07XG52YXIgbXNnVGV4dFN0eWxlID0ge1xuICBsaW5lSGVpZ2h0OiBcIjEuNVwiLFxuICBmb250U2l6ZTogXCIxcmVtXCIsXG4gIGZvbnRGYW1pbHk6IFwiTWVubG8sIENvbnNvbGFzLCBtb25vc3BhY2VcIlxufTtcblxuLy8gQU5TSSBIVE1MXG5cbnZhciBjb2xvcnMgPSB7XG4gIHJlc2V0OiBbXCJ0cmFuc3BhcmVudFwiLCBcInRyYW5zcGFyZW50XCJdLFxuICBibGFjazogXCIxODE4MThcIixcbiAgcmVkOiBcIkUzNjA0OVwiLFxuICBncmVlbjogXCJCM0NCNzRcIixcbiAgeWVsbG93OiBcIkZGRDA4MFwiLFxuICBibHVlOiBcIjdDQUZDMlwiLFxuICBtYWdlbnRhOiBcIjdGQUNDQVwiLFxuICBjeWFuOiBcIkMzQzJFRlwiLFxuICBsaWdodGdyZXk6IFwiRUJFN0UzXCIsXG4gIGRhcmtncmV5OiBcIjZENzg5MVwiXG59O1xuYW5zaUhUTUwuc2V0Q29sb3JzKGNvbG9ycyk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7c3RyaW5nICB8IHsgZmlsZT86IHN0cmluZywgbW9kdWxlTmFtZT86IHN0cmluZywgbG9jPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nOyBzdGFjaz86IHN0cmluZ1tdIH19IGl0ZW1cbiAqIEByZXR1cm5zIHt7IGhlYWRlcjogc3RyaW5nLCBib2R5OiBzdHJpbmcgfX1cbiAqL1xudmFyIGZvcm1hdFByb2JsZW0gPSBmdW5jdGlvbiBmb3JtYXRQcm9ibGVtKHR5cGUsIGl0ZW0pIHtcbiAgdmFyIGhlYWRlciA9IHR5cGUgPT09IFwid2FybmluZ1wiID8gXCJXQVJOSU5HXCIgOiBcIkVSUk9SXCI7XG4gIHZhciBib2R5ID0gXCJcIjtcbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgYm9keSArPSBpdGVtO1xuICB9IGVsc2Uge1xuICAgIHZhciBmaWxlID0gaXRlbS5maWxlIHx8IFwiXCI7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgdmFyIG1vZHVsZU5hbWUgPSBpdGVtLm1vZHVsZU5hbWUgPyBpdGVtLm1vZHVsZU5hbWUuaW5kZXhPZihcIiFcIikgIT09IC0xID8gXCJcIi5jb25jYXQoaXRlbS5tb2R1bGVOYW1lLnJlcGxhY2UoL14oXFxzfFxcUykqIS8sIFwiXCIpLCBcIiAoXCIpLmNvbmNhdChpdGVtLm1vZHVsZU5hbWUsIFwiKVwiKSA6IFwiXCIuY29uY2F0KGl0ZW0ubW9kdWxlTmFtZSkgOiBcIlwiO1xuICAgIHZhciBsb2MgPSBpdGVtLmxvYztcbiAgICBoZWFkZXIgKz0gXCJcIi5jb25jYXQobW9kdWxlTmFtZSB8fCBmaWxlID8gXCIgaW4gXCIuY29uY2F0KG1vZHVsZU5hbWUgPyBcIlwiLmNvbmNhdChtb2R1bGVOYW1lKS5jb25jYXQoZmlsZSA/IFwiIChcIi5jb25jYXQoZmlsZSwgXCIpXCIpIDogXCJcIikgOiBmaWxlKS5jb25jYXQobG9jID8gXCIgXCIuY29uY2F0KGxvYykgOiBcIlwiKSA6IFwiXCIpO1xuICAgIGJvZHkgKz0gaXRlbS5tZXNzYWdlIHx8IFwiXCI7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbS5zdGFjaykpIHtcbiAgICBpdGVtLnN0YWNrLmZvckVhY2goZnVuY3Rpb24gKHN0YWNrKSB7XG4gICAgICBpZiAodHlwZW9mIHN0YWNrID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGJvZHkgKz0gXCJcXHJcXG5cIi5jb25jYXQoc3RhY2spO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiB7XG4gICAgaGVhZGVyOiBoZWFkZXIsXG4gICAgYm9keTogYm9keVxuICB9O1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDcmVhdGVPdmVybGF5T3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmcgfCBudWxsfSB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCAoZXJyb3I6IEVycm9yKSA9PiB2b2lkfSBbY2F0Y2hSdW50aW1lRXJyb3JdXG4gKi9cblxuLyoqXG4gKlxuICogQHBhcmFtIHtDcmVhdGVPdmVybGF5T3B0aW9uc30gb3B0aW9uc1xuICovXG52YXIgY3JlYXRlT3ZlcmxheSA9IGZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXkob3B0aW9ucykge1xuICAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gKi9cbiAgdmFyIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQ7XG4gIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuICB2YXIgY29udGFpbmVyRWxlbWVudDtcbiAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudCB8IG51bGwgfCB1bmRlZmluZWR9ICovXG4gIHZhciBoZWFkZXJFbGVtZW50O1xuICAvKiogQHR5cGUge0FycmF5PChlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZD59ICovXG4gIHZhciBvbkxvYWRRdWV1ZSA9IFtdO1xuICAvKiogQHR5cGUge1RydXN0ZWRUeXBlUG9saWN5IHwgdW5kZWZpbmVkfSAqL1xuICB2YXIgb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlXG4gICAqL1xuICBmdW5jdGlvbiBhcHBseVN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBzdHlsZVtwcm9wXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHRydXN0ZWRUeXBlc1BvbGljeU5hbWVcbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcih0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKSB7XG4gICAgLy8gRW5hYmxlIFRydXN0ZWQgVHlwZXMgaWYgdGhleSBhcmUgYXZhaWxhYmxlIGluIHRoZSBjdXJyZW50IGJyb3dzZXIuXG4gICAgaWYgKHdpbmRvdy50cnVzdGVkVHlwZXMpIHtcbiAgICAgIG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kgPSB3aW5kb3cudHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSh0cnVzdGVkVHlwZXNQb2xpY3lOYW1lIHx8IFwid2VicGFjay1kZXYtc2VydmVyI292ZXJsYXlcIiwge1xuICAgICAgICBjcmVhdGVIVE1MOiBmdW5jdGlvbiBjcmVhdGVIVE1MKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5pZCA9IFwid2VicGFjay1kZXYtc2VydmVyLWNsaWVudC1vdmVybGF5XCI7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zcmMgPSBcImFib3V0OmJsYW5rXCI7XG4gICAgYXBwbHlTdHlsZShpZnJhbWVDb250YWluZXJFbGVtZW50LCBpZnJhbWVTdHlsZSk7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29udGVudEVsZW1lbnQgPSAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuICAgICAgKC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudCkuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuICAgICAgKC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudCkuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnRlbnRFbGVtZW50LmlkID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItY2xpZW50LW92ZXJsYXktZGl2XCI7XG4gICAgICBhcHBseVN0eWxlKGNvbnRlbnRFbGVtZW50LCBjb250YWluZXJTdHlsZSk7XG4gICAgICBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGhlYWRlckVsZW1lbnQuaW5uZXJUZXh0ID0gXCJDb21waWxlZCB3aXRoIHByb2JsZW1zOlwiO1xuICAgICAgYXBwbHlTdHlsZShoZWFkZXJFbGVtZW50LCBoZWFkZXJTdHlsZSk7XG4gICAgICB2YXIgY2xvc2VCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGFwcGx5U3R5bGUoY2xvc2VCdXR0b25FbGVtZW50LCBkaXNtaXNzQnV0dG9uU3R5bGUpO1xuICAgICAgY2xvc2VCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9IFwiw5dcIjtcbiAgICAgIGNsb3NlQnV0dG9uRWxlbWVudC5hcmlhTGFiZWwgPSBcIkRpc21pc3NcIjtcbiAgICAgIGNsb3NlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICAgICAgb3ZlcmxheVNlcnZpY2Uuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJESVNNSVNTXCJcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRlckVsZW1lbnQpO1xuICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b25FbGVtZW50KTtcbiAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgICAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuICAgICAgKC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudCkuYm9keS5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgICBvbkxvYWRRdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChvbkxvYWQpIHtcbiAgICAgICAgb25Mb2FkKC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovY29udGVudEVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgICBvbkxvYWRRdWV1ZSA9IFtdO1xuXG4gICAgICAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50fSAqL1xuICAgICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5vbmxvYWQgPSBudWxsO1xuICAgIH07XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWVDb250YWluZXJFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyhlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZH0gY2FsbGJhY2tcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXG4gICAqL1xuICBmdW5jdGlvbiBlbnN1cmVPdmVybGF5RXhpc3RzKGNhbGxiYWNrLCB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKSB7XG4gICAgaWYgKGNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgIGNvbnRhaW5lckVsZW1lbnQuaW5uZXJIVE1MID0gb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeSA/IG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChcIlwiKSA6IFwiXCI7XG4gICAgICAvLyBFdmVyeXRoaW5nIGlzIHJlYWR5LCBjYWxsIHRoZSBjYWxsYmFjayByaWdodCBhd2F5LlxuICAgICAgY2FsbGJhY2soY29udGFpbmVyRWxlbWVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uTG9hZFF1ZXVlLnB1c2goY2FsbGJhY2spO1xuICAgIGlmIChpZnJhbWVDb250YWluZXJFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNyZWF0ZUNvbnRhaW5lcih0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKTtcbiAgfVxuXG4gIC8vIFN1Y2Nlc3NmdWwgY29tcGlsYXRpb24uXG4gIGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgaWYgKCFpZnJhbWVDb250YWluZXJFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2xlYW4gdXAgYW5kIHJlc2V0IGludGVybmFsIHN0YXRlLlxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lQ29udGFpbmVyRWxlbWVudCk7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudCA9IG51bGw7XG4gICAgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG4gIH1cblxuICAvLyBDb21waWxhdGlvbiB3aXRoIGVycm9ycyAoZS5nLiBzeW50YXggZXJyb3Igb3IgbWlzc2luZyBtb2R1bGVzKS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nICB8IHsgbW9kdWxlSWRlbnRpZmllcj86IHN0cmluZywgbW9kdWxlTmFtZT86IHN0cmluZywgbG9jPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nIH0+fSBtZXNzYWdlc1xuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHRydXN0ZWRUeXBlc1BvbGljeU5hbWVcbiAgICogQHBhcmFtIHsnYnVpbGQnIHwgJ3J1bnRpbWUnfSBtZXNzYWdlU291cmNlXG4gICAqL1xuICBmdW5jdGlvbiBzaG93KHR5cGUsIG1lc3NhZ2VzLCB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lLCBtZXNzYWdlU291cmNlKSB7XG4gICAgZW5zdXJlT3ZlcmxheUV4aXN0cyhmdW5jdGlvbiAoKSB7XG4gICAgICBoZWFkZXJFbGVtZW50LmlubmVyVGV4dCA9IG1lc3NhZ2VTb3VyY2UgPT09IFwicnVudGltZVwiID8gXCJVbmNhdWdodCBydW50aW1lIGVycm9yczpcIiA6IFwiQ29tcGlsZWQgd2l0aCBwcm9ibGVtczpcIjtcbiAgICAgIG1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIGVudHJ5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBtc2dTdHlsZSA9IHR5cGUgPT09IFwid2FybmluZ1wiID8gbXNnU3R5bGVzLndhcm5pbmcgOiBtc2dTdHlsZXMuZXJyb3I7XG4gICAgICAgIGFwcGx5U3R5bGUoZW50cnlFbGVtZW50LCBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIG1zZ1N0eWxlKSwge30sIHtcbiAgICAgICAgICBwYWRkaW5nOiBcIjFyZW0gMXJlbSAxLjVyZW0gMXJlbVwiXG4gICAgICAgIH0pKTtcbiAgICAgICAgdmFyIHR5cGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbSh0eXBlLCBtZXNzYWdlKSxcbiAgICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtLmJvZHk7XG4gICAgICAgIHR5cGVFbGVtZW50LmlubmVyVGV4dCA9IGhlYWRlcjtcbiAgICAgICAgYXBwbHlTdHlsZSh0eXBlRWxlbWVudCwgbXNnVHlwZVN0eWxlKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UubW9kdWxlSWRlbnRpZmllcikge1xuICAgICAgICAgIGFwcGx5U3R5bGUodHlwZUVsZW1lbnQsIHtcbiAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBlbGVtZW50LmRhdGFzZXQgbm90IHN1cHBvcnRlZCBpbiBJRVxuICAgICAgICAgIHR5cGVFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY2FuLW9wZW5cIiwgdHJ1ZSk7XG4gICAgICAgICAgdHlwZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZldGNoKFwiL3dlYnBhY2stZGV2LXNlcnZlci9vcGVuLWVkaXRvcj9maWxlTmFtZT1cIi5jb25jYXQobWVzc2FnZS5tb2R1bGVJZGVudGlmaWVyKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNYWtlIGl0IGxvb2sgc2ltaWxhciB0byBvdXIgdGVybWluYWwuXG4gICAgICAgIHZhciB0ZXh0ID0gYW5zaUhUTUwoZW5jb2RlKGJvZHkpKTtcbiAgICAgICAgdmFyIG1lc3NhZ2VUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGFwcGx5U3R5bGUobWVzc2FnZVRleHROb2RlLCBtc2dUZXh0U3R5bGUpO1xuICAgICAgICBtZXNzYWdlVGV4dE5vZGUuaW5uZXJIVE1MID0gb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeSA/IG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCh0ZXh0KSA6IHRleHQ7XG4gICAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZCh0eXBlRWxlbWVudCk7XG4gICAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlVGV4dE5vZGUpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZW50cnlFbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0sIHRydXN0ZWRUeXBlc1BvbGljeU5hbWUpO1xuICB9XG4gIHZhciBvdmVybGF5U2VydmljZSA9IGNyZWF0ZU92ZXJsYXlNYWNoaW5lKHtcbiAgICBzaG93T3ZlcmxheTogZnVuY3Rpb24gc2hvd092ZXJsYXkoX3JlZjMpIHtcbiAgICAgIHZhciBfcmVmMyRsZXZlbCA9IF9yZWYzLmxldmVsLFxuICAgICAgICBsZXZlbCA9IF9yZWYzJGxldmVsID09PSB2b2lkIDAgPyBcImVycm9yXCIgOiBfcmVmMyRsZXZlbCxcbiAgICAgICAgbWVzc2FnZXMgPSBfcmVmMy5tZXNzYWdlcyxcbiAgICAgICAgbWVzc2FnZVNvdXJjZSA9IF9yZWYzLm1lc3NhZ2VTb3VyY2U7XG4gICAgICByZXR1cm4gc2hvdyhsZXZlbCwgbWVzc2FnZXMsIG9wdGlvbnMudHJ1c3RlZFR5cGVzUG9saWN5TmFtZSwgbWVzc2FnZVNvdXJjZSk7XG4gICAgfSxcbiAgICBoaWRlT3ZlcmxheTogaGlkZVxuICB9KTtcbiAgaWYgKG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0Vycm9yIHwgdW5kZWZpbmVkfSBlcnJvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmYWxsYmFja01lc3NhZ2VcbiAgICAgKi9cbiAgICB2YXIgaGFuZGxlRXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvciwgZmFsbGJhY2tNZXNzYWdlKSB7XG4gICAgICB2YXIgZXJyb3JPYmplY3QgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IgOiBuZXcgRXJyb3IoZXJyb3IgfHwgZmFsbGJhY2tNZXNzYWdlKTtcbiAgICAgIHZhciBzaG91bGREaXNwbGF5ID0gdHlwZW9mIG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IoZXJyb3JPYmplY3QpIDogdHJ1ZTtcbiAgICAgIGlmIChzaG91bGREaXNwbGF5KSB7XG4gICAgICAgIG92ZXJsYXlTZXJ2aWNlLnNlbmQoe1xuICAgICAgICAgIHR5cGU6IFwiUlVOVElNRV9FUlJPUlwiLFxuICAgICAgICAgIG1lc3NhZ2VzOiBbe1xuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JPYmplY3QubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YWNrOiBwYXJzZUVycm9yVG9TdGFja3MoZXJyb3JPYmplY3QpXG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBsaXN0ZW5Ub1J1bnRpbWVFcnJvcihmdW5jdGlvbiAoZXJyb3JFdmVudCkge1xuICAgICAgLy8gZXJyb3IgcHJvcGVydHkgbWF5IGJlIGVtcHR5IGluIG9sZGVyIGJyb3dzZXIgbGlrZSBJRVxuICAgICAgdmFyIGVycm9yID0gZXJyb3JFdmVudC5lcnJvcixcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yRXZlbnQubWVzc2FnZTtcbiAgICAgIGlmICghZXJyb3IgJiYgIW1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBlcnJvciBzdGFjayBpbmRpY2F0ZXMgYSBSZWFjdCBlcnJvciBib3VuZGFyeSBjYXVnaHQgdGhlIGVycm9yLCBkbyBub3Qgc2hvdyBvdmVybGF5LlxuICAgICAgaWYgKGVycm9yICYmIGVycm9yLnN0YWNrICYmIGVycm9yLnN0YWNrLmluY2x1ZGVzKFwiaW52b2tlR3VhcmRlZENhbGxiYWNrRGV2XCIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGhhbmRsZUVycm9yKGVycm9yLCBtZXNzYWdlKTtcbiAgICB9KTtcbiAgICBsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbihmdW5jdGlvbiAocHJvbWlzZVJlamVjdGlvbkV2ZW50KSB7XG4gICAgICB2YXIgcmVhc29uID0gcHJvbWlzZVJlamVjdGlvbkV2ZW50LnJlYXNvbjtcbiAgICAgIGhhbmRsZUVycm9yKHJlYXNvbiwgXCJVbmtub3duIHByb21pc2UgcmVqZWN0aW9uIHJlYXNvblwiKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gb3ZlcmxheVNlcnZpY2U7XG59O1xuZXhwb3J0IHsgZm9ybWF0UHJvYmxlbSwgY3JlYXRlT3ZlcmxheSB9OyIsImZ1bmN0aW9uIF90eXBlb2YobykgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHsgcmV0dXJuIHR5cGVvZiBvOyB9IDogZnVuY3Rpb24gKG8pIHsgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87IH0sIF90eXBlb2Yobyk7IH1cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLCBuKSB7IGlmICghKGEgaW5zdGFuY2VvZiBuKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXMoZSwgcikgeyBmb3IgKHZhciB0ID0gMDsgdCA8IHIubGVuZ3RoOyB0KyspIHsgdmFyIG8gPSByW3RdOyBvLmVudW1lcmFibGUgPSBvLmVudW1lcmFibGUgfHwgITEsIG8uY29uZmlndXJhYmxlID0gITAsIFwidmFsdWVcIiBpbiBvICYmIChvLndyaXRhYmxlID0gITApLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgX3RvUHJvcGVydHlLZXkoby5rZXkpLCBvKTsgfSB9XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoZSwgciwgdCkgeyByZXR1cm4gciAmJiBfZGVmaW5lUHJvcGVydGllcyhlLnByb3RvdHlwZSwgciksIHQgJiYgX2RlZmluZVByb3BlcnRpZXMoZSwgdCksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiAhMSB9KSwgZTsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gX3R5cGVvZihpKSA/IGkgOiBpICsgXCJcIjsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHsgaWYgKFwib2JqZWN0XCIgIT0gX3R5cGVvZih0KSB8fCAhdCkgcmV0dXJuIHQ7IHZhciBlID0gdFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAodm9pZCAwICE9PSBlKSB7IHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpOyBpZiAoXCJvYmplY3RcIiAhPSBfdHlwZW9mKGkpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbmZ1bmN0aW9uIF9jYWxsU3VwZXIodCwgbywgZSkgeyByZXR1cm4gbyA9IF9nZXRQcm90b3R5cGVPZihvKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odCwgX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpID8gUmVmbGVjdC5jb25zdHJ1Y3QobywgZSB8fCBbXSwgX2dldFByb3RvdHlwZU9mKHQpLmNvbnN0cnVjdG9yKSA6IG8uYXBwbHkodCwgZSkpOyB9XG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0LCBlKSB7IGlmIChlICYmIChcIm9iamVjdFwiID09IF90eXBlb2YoZSkgfHwgXCJmdW5jdGlvblwiID09IHR5cGVvZiBlKSkgcmV0dXJuIGU7IGlmICh2b2lkIDAgIT09IGUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJEZXJpdmVkIGNvbnN0cnVjdG9ycyBtYXkgb25seSByZXR1cm4gb2JqZWN0IG9yIHVuZGVmaW5lZFwiKTsgcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQodCk7IH1cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoZSkgeyBpZiAodm9pZCAwID09PSBlKSB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfaW5oZXJpdHModCwgZSkgeyBpZiAoXCJmdW5jdGlvblwiICE9IHR5cGVvZiBlICYmIG51bGwgIT09IGUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGUgJiYgZS5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHQsIHdyaXRhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCB9IH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogITEgfSksIGUgJiYgX3NldFByb3RvdHlwZU9mKHQsIGUpOyB9XG5mdW5jdGlvbiBfd3JhcE5hdGl2ZVN1cGVyKHQpIHsgdmFyIHIgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIE1hcCA/IG5ldyBNYXAoKSA6IHZvaWQgMDsgcmV0dXJuIF93cmFwTmF0aXZlU3VwZXIgPSBmdW5jdGlvbiBfd3JhcE5hdGl2ZVN1cGVyKHQpIHsgaWYgKG51bGwgPT09IHQgfHwgIV9pc05hdGl2ZUZ1bmN0aW9uKHQpKSByZXR1cm4gdDsgaWYgKFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgdCkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyBpZiAodm9pZCAwICE9PSByKSB7IGlmIChyLmhhcyh0KSkgcmV0dXJuIHIuZ2V0KHQpOyByLnNldCh0LCBXcmFwcGVyKTsgfSBmdW5jdGlvbiBXcmFwcGVyKCkgeyByZXR1cm4gX2NvbnN0cnVjdCh0LCBhcmd1bWVudHMsIF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3Rvcik7IH0gcmV0dXJuIFdyYXBwZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh0LnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogV3JhcHBlciwgZW51bWVyYWJsZTogITEsIHdyaXRhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCB9IH0pLCBfc2V0UHJvdG90eXBlT2YoV3JhcHBlciwgdCk7IH0sIF93cmFwTmF0aXZlU3VwZXIodCk7IH1cbmZ1bmN0aW9uIF9jb25zdHJ1Y3QodCwgZSwgcikgeyBpZiAoX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpKSByZXR1cm4gUmVmbGVjdC5jb25zdHJ1Y3QuYXBwbHkobnVsbCwgYXJndW1lbnRzKTsgdmFyIG8gPSBbbnVsbF07IG8ucHVzaC5hcHBseShvLCBlKTsgdmFyIHAgPSBuZXcgKHQuYmluZC5hcHBseSh0LCBvKSkoKTsgcmV0dXJuIHIgJiYgX3NldFByb3RvdHlwZU9mKHAsIHIucHJvdG90eXBlKSwgcDsgfVxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgdHJ5IHsgdmFyIHQgPSAhQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyB9IGNhdGNoICh0KSB7fSByZXR1cm4gKF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QgPSBmdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgeyByZXR1cm4gISF0OyB9KSgpOyB9XG5mdW5jdGlvbiBfaXNOYXRpdmVGdW5jdGlvbih0KSB7IHRyeSB7IHJldHVybiAtMSAhPT0gRnVuY3Rpb24udG9TdHJpbmcuY2FsbCh0KS5pbmRleE9mKFwiW25hdGl2ZSBjb2RlXVwiKTsgfSBjYXRjaCAobikgeyByZXR1cm4gXCJmdW5jdGlvblwiID09IHR5cGVvZiB0OyB9IH1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZih0LCBlKSB7IHJldHVybiBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gKHQsIGUpIHsgcmV0dXJuIHQuX19wcm90b19fID0gZSwgdDsgfSwgX3NldFByb3RvdHlwZU9mKHQsIGUpOyB9XG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YodCkgeyByZXR1cm4gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uICh0KSB7IHJldHVybiB0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YodCk7IH0sIF9nZXRQcm90b3R5cGVPZih0KTsgfVxuZnVuY3Rpb24gX2NsYXNzUHJpdmF0ZU1ldGhvZEluaXRTcGVjKGUsIGEpIHsgX2NoZWNrUHJpdmF0ZVJlZGVjbGFyYXRpb24oZSwgYSksIGEuYWRkKGUpOyB9XG5mdW5jdGlvbiBfY2hlY2tQcml2YXRlUmVkZWNsYXJhdGlvbihlLCB0KSB7IGlmICh0LmhhcyhlKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBpbml0aWFsaXplIHRoZSBzYW1lIHByaXZhdGUgZWxlbWVudHMgdHdpY2Ugb24gYW4gb2JqZWN0XCIpOyB9XG5mdW5jdGlvbiBfYXNzZXJ0Q2xhc3NCcmFuZChlLCB0LCBuKSB7IGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGUgPyBlID09PSB0IDogZS5oYXModCkpIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHQgOiBuOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBlbGVtZW50IGlzIG5vdCBwcmVzZW50IG9uIHRoaXMgb2JqZWN0XCIpOyB9XG5leHBvcnQgZnVuY3Rpb24gaXNQcm9ncmVzc1N1cHBvcnRlZCgpIHtcbiAgcmV0dXJuIFwiY3VzdG9tRWxlbWVudHNcIiBpbiBzZWxmICYmICEhSFRNTEVsZW1lbnQucHJvdG90eXBlLmF0dGFjaFNoYWRvdztcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVQcm9ncmVzc0VsZW1lbnQoKSB7XG4gIHZhciBfV2VicGFja0RldlNlcnZlclByb2dyZXNzO1xuICBpZiAoY3VzdG9tRWxlbWVudHMuZ2V0KFwid2RzLXByb2dyZXNzXCIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBfV2VicGFja0RldlNlcnZlclByb2dyZXNzX2JyYW5kID0gLyojX19QVVJFX18qL25ldyBXZWFrU2V0KCk7XG4gIHZhciBXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9IVE1MRWxlbWVudCkge1xuICAgIGZ1bmN0aW9uIFdlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcygpIHtcbiAgICAgIHZhciBfdGhpcztcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MpO1xuICAgICAgX3RoaXMgPSBfY2FsbFN1cGVyKHRoaXMsIFdlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcyk7XG4gICAgICBfY2xhc3NQcml2YXRlTWV0aG9kSW5pdFNwZWMoX3RoaXMsIF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3NfYnJhbmQpO1xuICAgICAgX3RoaXMuYXR0YWNoU2hhZG93KHtcbiAgICAgICAgbW9kZTogXCJvcGVuXCJcbiAgICAgIH0pO1xuICAgICAgX3RoaXMubWF4RGFzaE9mZnNldCA9IC0yMTkuOTkwNzgzNjkxNDA2MjU7XG4gICAgICBfdGhpcy5hbmltYXRpb25UaW1lciA9IG51bGw7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIF9pbmhlcml0cyhXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MsIF9IVE1MRWxlbWVudCk7XG4gICAgcmV0dXJuIF9jcmVhdGVDbGFzcyhXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MsIFt7XG4gICAgICBrZXk6IFwiY29ubmVjdGVkQ2FsbGJhY2tcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgX2Fzc2VydENsYXNzQnJhbmQoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCwgdGhpcywgX3Jlc2V0KS5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogXCJhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChuYW1lID09PSBcInByb2dyZXNzXCIpIHtcbiAgICAgICAgICBfYXNzZXJ0Q2xhc3NCcmFuZChfV2VicGFja0RldlNlcnZlclByb2dyZXNzX2JyYW5kLCB0aGlzLCBfdXBkYXRlKS5jYWxsKHRoaXMsIE51bWJlcihuZXdWYWx1ZSkpO1xuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09IFwidHlwZVwiKSB7XG4gICAgICAgICAgX2Fzc2VydENsYXNzQnJhbmQoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCwgdGhpcywgX3Jlc2V0KS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfV0sIFt7XG4gICAgICBrZXk6IFwib2JzZXJ2ZWRBdHRyaWJ1dGVzXCIsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIFtcInByb2dyZXNzXCIsIFwidHlwZVwiXTtcbiAgICAgIH1cbiAgICB9XSk7XG4gIH0oLyojX19QVVJFX18qL193cmFwTmF0aXZlU3VwZXIoSFRNTEVsZW1lbnQpKTtcbiAgX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcyA9IFdlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcztcbiAgZnVuY3Rpb24gX3Jlc2V0KCkge1xuICAgIHZhciBfdGhpcyRnZXRBdHRyaWJ1dGUsIF9OdW1iZXI7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYW5pbWF0aW9uVGltZXIpO1xuICAgIHRoaXMuYW5pbWF0aW9uVGltZXIgPSBudWxsO1xuICAgIHZhciB0eXBlQXR0ciA9IChfdGhpcyRnZXRBdHRyaWJ1dGUgPSB0aGlzLmdldEF0dHJpYnV0ZShcInR5cGVcIikpID09PSBudWxsIHx8IF90aGlzJGdldEF0dHJpYnV0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXMkZ2V0QXR0cmlidXRlLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy50eXBlID0gdHlwZUF0dHIgPT09IFwiY2lyY3VsYXJcIiA/IFwiY2lyY3VsYXJcIiA6IFwibGluZWFyXCI7XG4gICAgdmFyIGlubmVySFRNTCA9IHRoaXMudHlwZSA9PT0gXCJjaXJjdWxhclwiID8gX2NpcmN1bGFyVGVtcGxhdGUuY2FsbChfV2VicGFja0RldlNlcnZlclByb2dyZXNzKSA6IF9saW5lYXJUZW1wbGF0ZS5jYWxsKF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MpO1xuICAgIHRoaXMuc2hhZG93Um9vdC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG4gICAgdGhpcy5pbml0aWFsUHJvZ3Jlc3MgPSAoX051bWJlciA9IE51bWJlcih0aGlzLmdldEF0dHJpYnV0ZShcInByb2dyZXNzXCIpKSkgIT09IG51bGwgJiYgX051bWJlciAhPT0gdm9pZCAwID8gX051bWJlciA6IDA7XG4gICAgX2Fzc2VydENsYXNzQnJhbmQoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCwgdGhpcywgX3VwZGF0ZSkuY2FsbCh0aGlzLCB0aGlzLmluaXRpYWxQcm9ncmVzcyk7XG4gIH1cbiAgZnVuY3Rpb24gX2NpcmN1bGFyVGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIFwiXFxuICAgICAgICA8c3R5bGU+XFxuICAgICAgICA6aG9zdCB7XFxuICAgICAgICAgICAgd2lkdGg6IDIwMHB4O1xcbiAgICAgICAgICAgIGhlaWdodDogMjAwcHg7XFxuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgICAgICAgIHJpZ2h0OiA1JTtcXG4gICAgICAgICAgICB0b3A6IDUlO1xcbiAgICAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgLjI1cyBlYXNlLWluLW91dDtcXG4gICAgICAgICAgICB6LWluZGV4OiAyMTQ3NDgzNjQ1O1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgY2lyY2xlIHtcXG4gICAgICAgICAgICBmaWxsOiAjMjgyZDM1O1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgcGF0aCB7XFxuICAgICAgICAgICAgZmlsbDogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgICAgICAgICBzdHJva2U6IHJnYigxODYsIDIyMywgMTcyKTtcXG4gICAgICAgICAgICBzdHJva2UtZGFzaGFycmF5OiAyMTkuOTkwNzgzNjkxNDA2MjU7XFxuICAgICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IC0yMTkuOTkwNzgzNjkxNDA2MjU7XFxuICAgICAgICAgICAgc3Ryb2tlLXdpZHRoOiAxMDtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgdHJhbnNsYXRlKDBweCwgLTgwcHgpO1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgdGV4dCB7XFxuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBzYW5zLXNlcmlmO1xcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgICAgICAgICBmaWxsOiAjZmZmZmZmO1xcbiAgICAgICAgICAgIGRvbWluYW50LWJhc2VsaW5lOiBtaWRkbGU7XFxuICAgICAgICAgICAgdGV4dC1hbmNob3I6IG1pZGRsZTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIHRzcGFuI3BlcmNlbnQtc3VwZXIge1xcbiAgICAgICAgICAgIGZpbGw6ICNiZGMzYzc7XFxuICAgICAgICAgICAgZm9udC1zaXplOiAwLjQ1ZW07XFxuICAgICAgICAgICAgYmFzZWxpbmUtc2hpZnQ6IDEwJTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIEBrZXlmcmFtZXMgZmFkZSB7XFxuICAgICAgICAgICAgMCUgeyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9XFxuICAgICAgICAgICAgMTAwJSB7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5kaXNhcHBlYXIge1xcbiAgICAgICAgICAgIGFuaW1hdGlvbjogZmFkZSAwLjNzO1xcbiAgICAgICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC41cztcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5oaWRkZW4ge1xcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgICAgICB9XFxuICAgICAgICA8L3N0eWxlPlxcbiAgICAgICAgPHN2ZyBpZD1cXFwicHJvZ3Jlc3NcXFwiIGNsYXNzPVxcXCJoaWRkZW4gbm9zZWxlY3RcXFwiIHZpZXdCb3g9XFxcIjAgMCA4MCA4MFxcXCI+XFxuICAgICAgICA8Y2lyY2xlIGN4PVxcXCI1MCVcXFwiIGN5PVxcXCI1MCVcXFwiIHI9XFxcIjM1XFxcIj48L2NpcmNsZT5cXG4gICAgICAgIDxwYXRoIGQ9XFxcIk01LDQwYTM1LDM1IDAgMSwwIDcwLDBhMzUsMzUgMCAxLDAgLTcwLDBcXFwiPjwvcGF0aD5cXG4gICAgICAgIDx0ZXh0IHg9XFxcIjUwJVxcXCIgeT1cXFwiNTElXFxcIj5cXG4gICAgICAgICAgICA8dHNwYW4gaWQ9XFxcInBlcmNlbnQtdmFsdWVcXFwiPjA8L3RzcGFuPlxcbiAgICAgICAgICAgIDx0c3BhbiBpZD1cXFwicGVyY2VudC1zdXBlclxcXCI+JTwvdHNwYW4+XFxuICAgICAgICA8L3RleHQ+XFxuICAgICAgICA8L3N2Zz5cXG4gICAgICBcIjtcbiAgfVxuICBmdW5jdGlvbiBfbGluZWFyVGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIFwiXFxuICAgICAgICA8c3R5bGU+XFxuICAgICAgICA6aG9zdCB7XFxuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgICAgICAgIHRvcDogMDtcXG4gICAgICAgICAgICBsZWZ0OiAwO1xcbiAgICAgICAgICAgIGhlaWdodDogNHB4O1xcbiAgICAgICAgICAgIHdpZHRoOiAxMDB2dztcXG4gICAgICAgICAgICB6LWluZGV4OiAyMTQ3NDgzNjQ1O1xcbiAgICAgICAgfVxcblxcbiAgICAgICAgI2JhciB7XFxuICAgICAgICAgICAgd2lkdGg6IDAlO1xcbiAgICAgICAgICAgIGhlaWdodDogNHB4O1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxODYsIDIyMywgMTcyKTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIEBrZXlmcmFtZXMgZmFkZSB7XFxuICAgICAgICAgICAgMCUgeyBvcGFjaXR5OiAxOyB9XFxuICAgICAgICAgICAgMTAwJSB7IG9wYWNpdHk6IDA7IH1cXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5kaXNhcHBlYXIge1xcbiAgICAgICAgICAgIGFuaW1hdGlvbjogZmFkZSAwLjNzO1xcbiAgICAgICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC41cztcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIC5oaWRkZW4ge1xcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgICAgICB9XFxuICAgICAgICA8L3N0eWxlPlxcbiAgICAgICAgPGRpdiBpZD1cXFwicHJvZ3Jlc3NcXFwiPjwvZGl2PlxcbiAgICAgICAgXCI7XG4gIH1cbiAgZnVuY3Rpb24gX3VwZGF0ZShwZXJjZW50KSB7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNwcm9ncmVzc1wiKTtcbiAgICBpZiAodGhpcy50eXBlID09PSBcImNpcmN1bGFyXCIpIHtcbiAgICAgIHZhciBwYXRoID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJwYXRoXCIpO1xuICAgICAgdmFyIHZhbHVlID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjcGVyY2VudC12YWx1ZVwiKTtcbiAgICAgIHZhciBvZmZzZXQgPSAoMTAwIC0gcGVyY2VudCkgLyAxMDAgKiB0aGlzLm1heERhc2hPZmZzZXQ7XG4gICAgICBwYXRoLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBvZmZzZXQ7XG4gICAgICB2YWx1ZS50ZXh0Q29udGVudCA9IHBlcmNlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSBcIlwiLmNvbmNhdChwZXJjZW50LCBcIiVcIik7XG4gICAgfVxuICAgIGlmIChwZXJjZW50ID49IDEwMCkge1xuICAgICAgX2Fzc2VydENsYXNzQnJhbmQoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCwgdGhpcywgX2hpZGUpLmNhbGwodGhpcyk7XG4gICAgfSBlbHNlIGlmIChwZXJjZW50ID4gMCkge1xuICAgICAgX2Fzc2VydENsYXNzQnJhbmQoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCwgdGhpcywgX3Nob3cpLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIF9zaG93KCkge1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZ3Jlc3NcIik7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9XG4gIGZ1bmN0aW9uIF9oaWRlKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZ3Jlc3NcIik7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJjaXJjdWxhclwiKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkaXNhcHBlYXJcIik7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIF9hc3NlcnRDbGFzc0JyYW5kKF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3NfYnJhbmQsIF90aGlzMiwgX3VwZGF0ZSkuY2FsbChfdGhpczIsIDApO1xuICAgICAgfSwge1xuICAgICAgICBvbmNlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJsaW5lYXJcIikge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZGlzYXBwZWFyXCIpO1xuICAgICAgdGhpcy5hbmltYXRpb25UaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhcHBlYXJcIik7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMCVcIjtcbiAgICAgICAgX3RoaXMyLmFuaW1hdGlvblRpbWVyID0gbnVsbDtcbiAgICAgIH0sIDgwMCk7XG4gICAgfVxuICB9XG4gIGN1c3RvbUVsZW1lbnRzLmRlZmluZShcIndkcy1wcm9ncmVzc1wiLCBXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MpO1xufSIsIi8qIGdsb2JhbCBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyAqL1xuXG5pbXBvcnQgV2ViU29ja2V0Q2xpZW50IGZyb20gXCIuL2NsaWVudHMvV2ViU29ja2V0Q2xpZW50LmpzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi91dGlscy9sb2cuanNcIjtcblxuLy8gdGhpcyBXZWJzb2NrZXRDbGllbnQgaXMgaGVyZSBhcyBhIGRlZmF1bHQgZmFsbGJhY2ssIGluIGNhc2UgdGhlIGNsaWVudCBpcyBub3QgaW5qZWN0ZWRcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xudmFyIENsaWVudCA9XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbnR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXy5kZWZhdWx0ICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18uZGVmYXVsdCA6IF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fIDogV2ViU29ja2V0Q2xpZW50O1xuLyogZXNsaW50LWVuYWJsZSBjYW1lbGNhc2UgKi9cblxudmFyIHJldHJpZXMgPSAwO1xudmFyIG1heFJldHJpZXMgPSAxMDtcblxuLy8gSW5pdGlhbGl6ZWQgY2xpZW50IGlzIGV4cG9ydGVkIHNvIGV4dGVybmFsIGNvbnN1bWVycyBjYW4gdXRpbGl6ZSB0aGUgc2FtZSBpbnN0YW5jZVxuLy8gSXQgaXMgbXV0YWJsZSB0byBlbmZvcmNlIHNpbmdsZXRvblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbmV4cG9ydCB2YXIgY2xpZW50ID0gbnVsbDtcbnZhciB0aW1lb3V0O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7eyBbaGFuZGxlcjogc3RyaW5nXTogKGRhdGE/OiBhbnksIHBhcmFtcz86IGFueSkgPT4gYW55IH19IGhhbmRsZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gW3JlY29ubmVjdF1cbiAqL1xudmFyIHNvY2tldCA9IGZ1bmN0aW9uIGluaXRTb2NrZXQodXJsLCBoYW5kbGVycywgcmVjb25uZWN0KSB7XG4gIGNsaWVudCA9IG5ldyBDbGllbnQodXJsKTtcbiAgY2xpZW50Lm9uT3BlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0cmllcyA9IDA7XG4gICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZWNvbm5lY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG1heFJldHJpZXMgPSByZWNvbm5lY3Q7XG4gICAgfVxuICB9KTtcbiAgY2xpZW50Lm9uQ2xvc2UoZnVuY3Rpb24gKCkge1xuICAgIGlmIChyZXRyaWVzID09PSAwKSB7XG4gICAgICBoYW5kbGVycy5jbG9zZSgpO1xuICAgIH1cblxuICAgIC8vIFRyeSB0byByZWNvbm5lY3QuXG4gICAgY2xpZW50ID0gbnVsbDtcblxuICAgIC8vIEFmdGVyIDEwIHJldHJpZXMgc3RvcCB0cnlpbmcsIHRvIHByZXZlbnQgbG9nc3BhbS5cbiAgICBpZiAocmV0cmllcyA8IG1heFJldHJpZXMpIHtcbiAgICAgIC8vIEV4cG9uZW50aWFsbHkgaW5jcmVhc2UgdGltZW91dCB0byByZWNvbm5lY3QuXG4gICAgICAvLyBSZXNwZWN0ZnVsbHkgY29waWVkIGZyb20gdGhlIHBhY2thZ2UgYGdvdGAuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzXG4gICAgICB2YXIgcmV0cnlJbk1zID0gMTAwMCAqIE1hdGgucG93KDIsIHJldHJpZXMpICsgTWF0aC5yYW5kb20oKSAqIDEwMDtcbiAgICAgIHJldHJpZXMgKz0gMTtcbiAgICAgIGxvZy5pbmZvKFwiVHJ5aW5nIHRvIHJlY29ubmVjdC4uLlwiKTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc29ja2V0KHVybCwgaGFuZGxlcnMsIHJlY29ubmVjdCk7XG4gICAgICB9LCByZXRyeUluTXMpO1xuICAgIH1cbiAgfSk7XG4gIGNsaWVudC5vbk1lc3NhZ2UoXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgKi9cbiAgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgaWYgKGhhbmRsZXJzW21lc3NhZ2UudHlwZV0pIHtcbiAgICAgIGhhbmRsZXJzW21lc3NhZ2UudHlwZV0obWVzc2FnZS5kYXRhLCBtZXNzYWdlLnBhcmFtcyk7XG4gICAgfVxuICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCBzb2NrZXQ7IiwiaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vbW9kdWxlcy9sb2dnZXIvaW5kZXguanNcIjtcbnZhciBuYW1lID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXJcIjtcbi8vIGRlZmF1bHQgbGV2ZWwgaXMgc2V0IG9uIHRoZSBjbGllbnQgc2lkZSwgc28gaXQgZG9lcyBub3QgbmVlZFxuLy8gdG8gYmUgc2V0IGJ5IHRoZSBDTEkgb3IgQVBJXG52YXIgZGVmYXVsdExldmVsID0gXCJpbmZvXCI7XG5cbi8vIG9wdGlvbnMgbmV3IG9wdGlvbnMsIG1lcmdlIHdpdGggb2xkIG9wdGlvbnNcbi8qKlxuICogQHBhcmFtIHtmYWxzZSB8IHRydWUgfCBcIm5vbmVcIiB8IFwiZXJyb3JcIiB8IFwid2FyblwiIHwgXCJpbmZvXCIgfCBcImxvZ1wiIHwgXCJ2ZXJib3NlXCJ9IGxldmVsXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gc2V0TG9nTGV2ZWwobGV2ZWwpIHtcbiAgbG9nZ2VyLmNvbmZpZ3VyZURlZmF1bHRMb2dnZXIoe1xuICAgIGxldmVsOiBsZXZlbFxuICB9KTtcbn1cbnNldExvZ0xldmVsKGRlZmF1bHRMZXZlbCk7XG52YXIgbG9nID0gbG9nZ2VyLmdldExvZ2dlcihuYW1lKTtcbmV4cG9ydCB7IGxvZywgc2V0TG9nTGV2ZWwgfTsiLCIvKiBnbG9iYWwgX19yZXNvdXJjZVF1ZXJ5IFdvcmtlckdsb2JhbFNjb3BlICovXG5cbi8vIFNlbmQgbWVzc2FnZXMgdG8gdGhlIG91dHNpZGUsIHNvIHBsdWdpbnMgY2FuIGNvbnN1bWUgaXQuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge2FueX0gW2RhdGFdXG4gKi9cbmZ1bmN0aW9uIHNlbmRNc2codHlwZSwgZGF0YSkge1xuICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgKHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSkpKSB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlOiBcIndlYnBhY2tcIi5jb25jYXQodHlwZSksXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSwgXCIqXCIpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBzZW5kTXNnOyIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vKiBnbG9iYWxzIF9fd2VicGFja19oYXNoX18gKi9cbmlmIChtb2R1bGUuaG90KSB7XG5cdC8qKiBAdHlwZSB7dW5kZWZpbmVkfHN0cmluZ30gKi9cblx0dmFyIGxhc3RIYXNoO1xuXHR2YXIgdXBUb0RhdGUgPSBmdW5jdGlvbiB1cFRvRGF0ZSgpIHtcblx0XHRyZXR1cm4gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChsYXN0SGFzaCkuaW5kZXhPZihfX3dlYnBhY2tfaGFzaF9fKSA+PSAwO1xuXHR9O1xuXHR2YXIgbG9nID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuXHR2YXIgY2hlY2sgPSBmdW5jdGlvbiBjaGVjaygpIHtcblx0XHRtb2R1bGUuaG90XG5cdFx0XHQuY2hlY2sodHJ1ZSlcblx0XHRcdC50aGVuKGZ1bmN0aW9uICh1cGRhdGVkTW9kdWxlcykge1xuXHRcdFx0XHRpZiAoIXVwZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRcdFx0bG9nKFxuXHRcdFx0XHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcdFx0XHRcIltITVJdIENhbm5vdCBmaW5kIHVwZGF0ZS4gXCIgK1xuXHRcdFx0XHRcdFx0XHQodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIlxuXHRcdFx0XHRcdFx0XHRcdD8gXCJOZWVkIHRvIGRvIGEgZnVsbCByZWxvYWQhXCJcblx0XHRcdFx0XHRcdFx0XHQ6IFwiUGxlYXNlIHJlbG9hZCBtYW51YWxseSFcIilcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGxvZyhcblx0XHRcdFx0XHRcdFwid2FybmluZ1wiLFxuXHRcdFx0XHRcdFx0XCJbSE1SXSAoUHJvYmFibHkgYmVjYXVzZSBvZiByZXN0YXJ0aW5nIHRoZSB3ZWJwYWNrLWRldi1zZXJ2ZXIpXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghdXBUb0RhdGUoKSkge1xuXHRcdFx0XHRcdGNoZWNrKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXF1aXJlKFwiLi9sb2ctYXBwbHktcmVzdWx0XCIpKHVwZGF0ZWRNb2R1bGVzLCB1cGRhdGVkTW9kdWxlcyk7XG5cblx0XHRcdFx0aWYgKHVwVG9EYXRlKCkpIHtcblx0XHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gQXBwIGlzIHVwIHRvIGRhdGUuXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IG1vZHVsZS5ob3Quc3RhdHVzKCk7XG5cdFx0XHRcdGlmIChbXCJhYm9ydFwiLCBcImZhaWxcIl0uaW5kZXhPZihzdGF0dXMpID49IDApIHtcblx0XHRcdFx0XHRsb2coXG5cdFx0XHRcdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFx0XHRcdFwiW0hNUl0gQ2Fubm90IGFwcGx5IHVwZGF0ZS4gXCIgK1xuXHRcdFx0XHRcdFx0XHQodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIlxuXHRcdFx0XHRcdFx0XHRcdD8gXCJOZWVkIHRvIGRvIGEgZnVsbCByZWxvYWQhXCJcblx0XHRcdFx0XHRcdFx0XHQ6IFwiUGxlYXNlIHJlbG9hZCBtYW51YWxseSFcIilcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBcIiArIGxvZy5mb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gVXBkYXRlIGZhaWxlZDogXCIgKyBsb2cuZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9O1xuXHR2YXIgaG90RW1pdHRlciA9IHJlcXVpcmUoXCIuL2VtaXR0ZXJcIik7XG5cdGhvdEVtaXR0ZXIub24oXCJ3ZWJwYWNrSG90VXBkYXRlXCIsIGZ1bmN0aW9uIChjdXJyZW50SGFzaCkge1xuXHRcdGxhc3RIYXNoID0gY3VycmVudEhhc2g7XG5cdFx0aWYgKCF1cFRvRGF0ZSgpICYmIG1vZHVsZS5ob3Quc3RhdHVzKCkgPT09IFwiaWRsZVwiKSB7XG5cdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gQ2hlY2tpbmcgZm9yIHVwZGF0ZXMgb24gdGhlIHNlcnZlci4uLlwiKTtcblx0XHRcdGNoZWNrKCk7XG5cdFx0fVxuXHR9KTtcblx0bG9nKFwiaW5mb1wiLCBcIltITVJdIFdhaXRpbmcgZm9yIHVwZGF0ZSBzaWduYWwgZnJvbSBXRFMuLi5cIik7XG59IGVsc2Uge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJbSE1SXSBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGlzIGRpc2FibGVkLlwiKTtcbn1cbiIsInZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKFwiZXZlbnRzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG4vKipcbiAqIEBwYXJhbSB7KHN0cmluZyB8IG51bWJlcilbXX0gdXBkYXRlZE1vZHVsZXMgdXBkYXRlZCBtb2R1bGVzXG4gKiBAcGFyYW0geyhzdHJpbmcgfCBudW1iZXIpW10gfCBudWxsfSByZW5ld2VkTW9kdWxlcyByZW5ld2VkIG1vZHVsZXNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXBkYXRlZE1vZHVsZXMsIHJlbmV3ZWRNb2R1bGVzKSB7XG5cdHZhciB1bmFjY2VwdGVkTW9kdWxlcyA9IHVwZGF0ZWRNb2R1bGVzLmZpbHRlcihmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRyZXR1cm4gcmVuZXdlZE1vZHVsZXMgJiYgcmVuZXdlZE1vZHVsZXMuaW5kZXhPZihtb2R1bGVJZCkgPCAwO1xuXHR9KTtcblx0dmFyIGxvZyA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcblxuXHRpZiAodW5hY2NlcHRlZE1vZHVsZXMubGVuZ3RoID4gMCkge1xuXHRcdGxvZyhcblx0XHRcdFwid2FybmluZ1wiLFxuXHRcdFx0XCJbSE1SXSBUaGUgZm9sbG93aW5nIG1vZHVsZXMgY291bGRuJ3QgYmUgaG90IHVwZGF0ZWQ6IChUaGV5IHdvdWxkIG5lZWQgYSBmdWxsIHJlbG9hZCEpXCJcblx0XHQpO1xuXHRcdHVuYWNjZXB0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XG5cdFx0fSk7XG5cdH1cblxuXHRpZiAoIXJlbmV3ZWRNb2R1bGVzIHx8IHJlbmV3ZWRNb2R1bGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBOb3RoaW5nIGhvdCB1cGRhdGVkLlwiKTtcblx0fSBlbHNlIHtcblx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gVXBkYXRlZCBtb2R1bGVzOlwiKTtcblx0XHRyZW5ld2VkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0aWYgKHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJzdHJpbmdcIiAmJiBtb2R1bGVJZC5pbmRleE9mKFwiIVwiKSAhPT0gLTEpIHtcblx0XHRcdFx0dmFyIHBhcnRzID0gbW9kdWxlSWQuc3BsaXQoXCIhXCIpO1xuXHRcdFx0XHRsb2cuZ3JvdXBDb2xsYXBzZWQoXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBwYXJ0cy5wb3AoKSk7XG5cdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcblx0XHRcdFx0bG9nLmdyb3VwRW5kKFwiaW5mb1wiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR2YXIgbnVtYmVySWRzID0gcmVuZXdlZE1vZHVsZXMuZXZlcnkoZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRyZXR1cm4gdHlwZW9mIG1vZHVsZUlkID09PSBcIm51bWJlclwiO1xuXHRcdH0pO1xuXHRcdGlmIChudW1iZXJJZHMpXG5cdFx0XHRsb2coXG5cdFx0XHRcdFwiaW5mb1wiLFxuXHRcdFx0XHQnW0hNUl0gQ29uc2lkZXIgdXNpbmcgdGhlIG9wdGltaXphdGlvbi5tb2R1bGVJZHM6IFwibmFtZWRcIiBmb3IgbW9kdWxlIG5hbWVzLidcblx0XHRcdCk7XG5cdH1cbn07XG4iLCIvKiogQHR5cGVkZWYge1wiaW5mb1wiIHwgXCJ3YXJuaW5nXCIgfCBcImVycm9yXCJ9IExvZ0xldmVsICovXG5cbi8qKiBAdHlwZSB7TG9nTGV2ZWx9ICovXG52YXIgbG9nTGV2ZWwgPSBcImluZm9cIjtcblxuZnVuY3Rpb24gZHVtbXkoKSB7fVxuXG4vKipcbiAqIEBwYXJhbSB7TG9nTGV2ZWx9IGxldmVsIGxvZyBsZXZlbFxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUsIGlmIHNob3VsZCBsb2dcbiAqL1xuZnVuY3Rpb24gc2hvdWxkTG9nKGxldmVsKSB7XG5cdHZhciBzaG91bGRMb2cgPVxuXHRcdChsb2dMZXZlbCA9PT0gXCJpbmZvXCIgJiYgbGV2ZWwgPT09IFwiaW5mb1wiKSB8fFxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiXS5pbmRleE9mKGxvZ0xldmVsKSA+PSAwICYmIGxldmVsID09PSBcIndhcm5pbmdcIikgfHxcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIiwgXCJlcnJvclwiXS5pbmRleE9mKGxvZ0xldmVsKSA+PSAwICYmIGxldmVsID09PSBcImVycm9yXCIpO1xuXHRyZXR1cm4gc2hvdWxkTG9nO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7KG1zZz86IHN0cmluZykgPT4gdm9pZH0gbG9nRm4gbG9nIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7KGxldmVsOiBMb2dMZXZlbCwgbXNnPzogc3RyaW5nKSA9PiB2b2lkfSBmdW5jdGlvbiB0aGF0IGxvZ3Mgd2hlbiBsb2cgbGV2ZWwgaXMgc3VmZmljaWVudFxuICovXG5mdW5jdGlvbiBsb2dHcm91cChsb2dGbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGxldmVsLCBtc2cpIHtcblx0XHRpZiAoc2hvdWxkTG9nKGxldmVsKSkge1xuXHRcdFx0bG9nRm4obXNnKTtcblx0XHR9XG5cdH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtMb2dMZXZlbH0gbGV2ZWwgbG9nIGxldmVsXG4gKiBAcGFyYW0ge3N0cmluZ3xFcnJvcn0gbXNnIG1lc3NhZ2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGV2ZWwsIG1zZykge1xuXHRpZiAoc2hvdWxkTG9nKGxldmVsKSkge1xuXHRcdGlmIChsZXZlbCA9PT0gXCJpbmZvXCIpIHtcblx0XHRcdGNvbnNvbGUubG9nKG1zZyk7XG5cdFx0fSBlbHNlIGlmIChsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHtcblx0XHRcdGNvbnNvbGUud2Fybihtc2cpO1xuXHRcdH0gZWxzZSBpZiAobGV2ZWwgPT09IFwiZXJyb3JcIikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihtc2cpO1xuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnIgZXJyb3JcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGZvcm1hdHRlZCBlcnJvclxuICovXG5tb2R1bGUuZXhwb3J0cy5mb3JtYXRFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcblx0dmFyIG1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcblx0dmFyIHN0YWNrID0gZXJyLnN0YWNrO1xuXHRpZiAoIXN0YWNrKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoc3RhY2suaW5kZXhPZihtZXNzYWdlKSA8IDApIHtcblx0XHRyZXR1cm4gbWVzc2FnZSArIFwiXFxuXCIgKyBzdGFjaztcblx0fVxuXHRyZXR1cm4gc3RhY2s7XG59O1xuXG52YXIgZ3JvdXAgPSBjb25zb2xlLmdyb3VwIHx8IGR1bW15O1xudmFyIGdyb3VwQ29sbGFwc2VkID0gY29uc29sZS5ncm91cENvbGxhcHNlZCB8fCBkdW1teTtcbnZhciBncm91cEVuZCA9IGNvbnNvbGUuZ3JvdXBFbmQgfHwgZHVtbXk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwID0gbG9nR3JvdXAoZ3JvdXApO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cENvbGxhcHNlZCA9IGxvZ0dyb3VwKGdyb3VwQ29sbGFwc2VkKTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXBFbmQgPSBsb2dHcm91cChncm91cEVuZCk7XG5cbi8qKlxuICogQHBhcmFtIHtMb2dMZXZlbH0gbGV2ZWwgbG9nIGxldmVsXG4gKi9cbm1vZHVsZS5leHBvcnRzLnNldExvZ0xldmVsID0gZnVuY3Rpb24gKGxldmVsKSB7XG5cdGxvZ0xldmVsID0gbGV2ZWw7XG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbG9jYWxzSnNvblN0cmluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gMTc2NDk0ODEzODM5N1xuICAgICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcInB1YmxpY1BhdGhcIjpcIlwifSk7XG4gICAgICAgIC8vIG9ubHkgaW52YWxpZGF0ZSB3aGVuIGxvY2FscyBjaGFuZ2VcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG1vZHVsZS5ob3QuZGF0YSAmJlxuICAgICAgICAgIG1vZHVsZS5ob3QuZGF0YS52YWx1ZSAmJlxuICAgICAgICAgIG1vZHVsZS5ob3QuZGF0YS52YWx1ZSAhPT0gbG9jYWxzSnNvblN0cmluZ1xuICAgICAgICApIHtcbiAgICAgICAgICBtb2R1bGUuaG90LmludmFsaWRhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuICAgICAgICB9XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgZGF0YS52YWx1ZSA9IGxvY2Fsc0pzb25TdHJpbmc7XG4gICAgICAgICAgY3NzUmVsb2FkKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSkoKTtcbiAgICB9XG4gICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0dmFyIGV4ZWNPcHRpb25zID0geyBpZDogbW9kdWxlSWQsIG1vZHVsZTogbW9kdWxlLCBmYWN0b3J5OiBfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSwgcmVxdWlyZTogX193ZWJwYWNrX3JlcXVpcmVfXyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7IGhhbmRsZXIoZXhlY09wdGlvbnMpOyB9KTtcblx0bW9kdWxlID0gZXhlY09wdGlvbnMubW9kdWxlO1xuXHRleGVjT3B0aW9ucy5mYWN0b3J5LmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGV4ZWNPcHRpb25zLnJlcXVpcmUpO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX187XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGV4ZWN1dGlvbiBpbnRlcmNlcHRvclxuX193ZWJwYWNrX3JlcXVpcmVfXy5pID0gW107XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYWxsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5odSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhbGwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcIlwiICsgY2h1bmtJZCArIFwiLmNzc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYgPSAoKSA9PiAoXCJtYWluLlwiICsgX193ZWJwYWNrX3JlcXVpcmVfXy5oKCkgKyBcIi5ob3QtdXBkYXRlLmpzb25cIik7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNDEzYjVkYTc4MmVjNTMzMzAxNzNcIikiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJ3ZWJnbDpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSA9PiB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblxuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBjdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xudmFyIGluc3RhbGxlZE1vZHVsZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmM7XG5cbi8vIG1vZHVsZSBhbmQgcmVxdWlyZSBjcmVhdGlvblxudmFyIGN1cnJlbnRDaGlsZE1vZHVsZTtcbnZhciBjdXJyZW50UGFyZW50cyA9IFtdO1xuXG4vLyBzdGF0dXNcbnZhciByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMgPSBbXTtcbnZhciBjdXJyZW50U3RhdHVzID0gXCJpZGxlXCI7XG5cbi8vIHdoaWxlIGRvd25sb2FkaW5nXG52YXIgYmxvY2tpbmdQcm9taXNlcyA9IDA7XG52YXIgYmxvY2tpbmdQcm9taXNlc1dhaXRpbmcgPSBbXTtcblxuLy8gVGhlIHVwZGF0ZSBpbmZvXG52YXIgY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnM7XG52YXIgcXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckQgPSBjdXJyZW50TW9kdWxlRGF0YTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5pLnB1c2goZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0dmFyIG1vZHVsZSA9IG9wdGlvbnMubW9kdWxlO1xuXHR2YXIgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUob3B0aW9ucy5yZXF1aXJlLCBvcHRpb25zLmlkKTtcblx0bW9kdWxlLmhvdCA9IGNyZWF0ZU1vZHVsZUhvdE9iamVjdChvcHRpb25zLmlkLCBtb2R1bGUpO1xuXHRtb2R1bGUucGFyZW50cyA9IGN1cnJlbnRQYXJlbnRzO1xuXHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0b3B0aW9ucy5yZXF1aXJlID0gcmVxdWlyZTtcbn0pO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMgPSB7fTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1ySSA9IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVSZXF1aXJlKHJlcXVpcmUsIG1vZHVsZUlkKSB7XG5cdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXHRpZiAoIW1lKSByZXR1cm4gcmVxdWlyZTtcblx0dmFyIGZuID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcblx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuXHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcblx0XHRcdFx0dmFyIHBhcmVudHMgPSBpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHM7XG5cdFx0XHRcdGlmIChwYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuXHRcdFx0XHRcdHBhcmVudHMucHVzaChtb2R1bGVJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcblx0XHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcblx0XHRcdH1cblx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuXHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcblx0XHRcdFx0XHRyZXF1ZXN0ICtcblx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuXHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHQpO1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVpcmUocmVxdWVzdCk7XG5cdH07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiByZXF1aXJlW25hbWVdO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHJlcXVpcmVbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXHRmb3IgKHZhciBuYW1lIGluIHJlcXVpcmUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlcXVpcmUsIG5hbWUpICYmIG5hbWUgIT09IFwiZVwiKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcihuYW1lKSk7XG5cdFx0fVxuXHR9XG5cdGZuLmUgPSBmdW5jdGlvbiAoY2h1bmtJZCwgZmV0Y2hQcmlvcml0eSkge1xuXHRcdHJldHVybiB0cmFja0Jsb2NraW5nUHJvbWlzZShyZXF1aXJlLmUoY2h1bmtJZCwgZmV0Y2hQcmlvcml0eSkpO1xuXHR9O1xuXHRyZXR1cm4gZm47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZHVsZUhvdE9iamVjdChtb2R1bGVJZCwgbWUpIHtcblx0dmFyIF9tYWluID0gY3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZDtcblx0dmFyIGhvdCA9IHtcblx0XHQvLyBwcml2YXRlIHN0dWZmXG5cdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcblx0XHRfYWNjZXB0ZWRFcnJvckhhbmRsZXJzOiB7fSxcblx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuXHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuXHRcdF9zZWxmSW52YWxpZGF0ZWQ6IGZhbHNlLFxuXHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuXHRcdF9tYWluOiBfbWFpbixcblx0XHRfcmVxdWlyZVNlbGY6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRQYXJlbnRzID0gbWUucGFyZW50cy5zbGljZSgpO1xuXHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gX21haW4gPyB1bmRlZmluZWQgOiBtb2R1bGVJZDtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuXHRcdH0sXG5cblx0XHQvLyBNb2R1bGUgQVBJXG5cdFx0YWN0aXZlOiB0cnVlLFxuXHRcdGFjY2VwdDogZnVuY3Rpb24gKGRlcCwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBbaV1dID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0aG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwXSA9IGVycm9ySGFuZGxlcjtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGRlY2xpbmU6IGZ1bmN0aW9uIChkZXApIHtcblx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG5cdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG5cdFx0fSxcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG5cdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuXHRcdH0sXG5cdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fc2VsZkludmFsaWRhdGVkID0gdHJ1ZTtcblx0XHRcdHN3aXRjaCAoY3VycmVudFN0YXR1cykge1xuXHRcdFx0XHRjYXNlIFwiaWRsZVwiOlxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2V0U3RhdHVzKFwicmVhZHlcIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcblx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG5cdFx0XHRcdFx0KHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyB8fCBbXSkucHVzaChcblx0XHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBpZ25vcmUgcmVxdWVzdHMgaW4gZXJyb3Igc3RhdGVzXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIE1hbmFnZW1lbnQgQVBJXG5cdFx0Y2hlY2s6IGhvdENoZWNrLFxuXHRcdGFwcGx5OiBob3RBcHBseSxcblx0XHRzdGF0dXM6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRpZiAoIWwpIHJldHVybiBjdXJyZW50U3RhdHVzO1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0dmFyIGlkeCA9IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuXHRcdFx0aWYgKGlkeCA+PSAwKSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblxuXHRcdC8vIGluaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcblx0XHRkYXRhOiBjdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cblx0fTtcblx0Y3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuXHRyZXR1cm4gaG90O1xufVxuXG5mdW5jdGlvbiBzZXRTdGF0dXMobmV3U3RhdHVzKSB7XG5cdGN1cnJlbnRTdGF0dXMgPSBuZXdTdGF0dXM7XG5cdHZhciByZXN1bHRzID0gW107XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG5cdFx0cmVzdWx0c1tpXSA9IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKHJlc3VsdHMpLnRoZW4oZnVuY3Rpb24gKCkge30pO1xufVxuXG5mdW5jdGlvbiB1bmJsb2NrKCkge1xuXHRpZiAoLS1ibG9ja2luZ1Byb21pc2VzID09PSAwKSB7XG5cdFx0c2V0U3RhdHVzKFwicmVhZHlcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoYmxvY2tpbmdQcm9taXNlcyA9PT0gMCkge1xuXHRcdFx0XHR2YXIgbGlzdCA9IGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nO1xuXHRcdFx0XHRibG9ja2luZ1Byb21pc2VzV2FpdGluZyA9IFtdO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRsaXN0W2ldKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5mdW5jdGlvbiB0cmFja0Jsb2NraW5nUHJvbWlzZShwcm9taXNlKSB7XG5cdHN3aXRjaCAoY3VycmVudFN0YXR1cykge1xuXHRcdGNhc2UgXCJyZWFkeVwiOlxuXHRcdFx0c2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcblx0XHQvKiBmYWxsdGhyb3VnaCAqL1xuXHRcdGNhc2UgXCJwcmVwYXJlXCI6XG5cdFx0XHRibG9ja2luZ1Byb21pc2VzKys7XG5cdFx0XHRwcm9taXNlLnRoZW4odW5ibG9jaywgdW5ibG9jayk7XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cbn1cblxuZnVuY3Rpb24gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZm4pIHtcblx0aWYgKGJsb2NraW5nUHJvbWlzZXMgPT09IDApIHJldHVybiBmbigpO1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblx0XHRibG9ja2luZ1Byb21pc2VzV2FpdGluZy5wdXNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlc29sdmUoZm4oKSk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBob3RDaGVjayhhcHBseU9uVXBkYXRlKSB7XG5cdGlmIChjdXJyZW50U3RhdHVzICE9PSBcImlkbGVcIikge1xuXHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuXHR9XG5cdHJldHVybiBzZXRTdGF0dXMoXCJjaGVja1wiKVxuXHRcdC50aGVuKF9fd2VicGFja19yZXF1aXJlX18uaG1yTSlcblx0XHQudGhlbihmdW5jdGlvbiAodXBkYXRlKSB7XG5cdFx0XHRpZiAoIXVwZGF0ZSkge1xuXHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkgPyBcInJlYWR5XCIgOiBcImlkbGVcIikudGhlbihcblx0XHRcdFx0XHRmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJwcmVwYXJlXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgdXBkYXRlZE1vZHVsZXMgPSBbXTtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDKS5yZWR1Y2UoZnVuY3Rpb24gKFxuXHRcdFx0XHRcdFx0cHJvbWlzZXMsXG5cdFx0XHRcdFx0XHRrZXlcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1yQ1trZXldKFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUuYyxcblx0XHRcdFx0XHRcdFx0dXBkYXRlLnIsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5tLFxuXHRcdFx0XHRcdFx0XHRwcm9taXNlcyxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZWRNb2R1bGVzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHByb21pc2VzO1xuXHRcdFx0XHRcdH0sIFtdKVxuXHRcdFx0XHQpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB3YWl0Rm9yQmxvY2tpbmdQcm9taXNlcyhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRpZiAoYXBwbHlPblVwZGF0ZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gaW50ZXJuYWxBcHBseShhcHBseU9uVXBkYXRlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJyZWFkeVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHVwZGF0ZWRNb2R1bGVzO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG59XG5cbmZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcblx0aWYgKGN1cnJlbnRTdGF0dXMgIT09IFwicmVhZHlcIikge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXMgKHN0YXRlOiBcIiArXG5cdFx0XHRcdFx0Y3VycmVudFN0YXR1cyArXG5cdFx0XHRcdFx0XCIpXCJcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIGludGVybmFsQXBwbHkob3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIGludGVybmFsQXBwbHkob3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRhcHBseUludmFsaWRhdGVkTW9kdWxlcygpO1xuXG5cdHZhciByZXN1bHRzID0gY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMubWFwKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG5cdFx0cmV0dXJuIGhhbmRsZXIob3B0aW9ucyk7XG5cdH0pO1xuXHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IHVuZGVmaW5lZDtcblxuXHR2YXIgZXJyb3JzID0gcmVzdWx0c1xuXHRcdC5tYXAoZnVuY3Rpb24gKHIpIHtcblx0XHRcdHJldHVybiByLmVycm9yO1xuXHRcdH0pXG5cdFx0LmZpbHRlcihCb29sZWFuKTtcblxuXHRpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcblx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiYWJvcnRcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2Vcblx0dmFyIGRpc3Bvc2VQcm9taXNlID0gc2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcblxuXHRyZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHQuZGlzcG9zZSkgcmVzdWx0LmRpc3Bvc2UoKTtcblx0fSk7XG5cblx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuXHR2YXIgYXBwbHlQcm9taXNlID0gc2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cblx0dmFyIGVycm9yO1xuXHR2YXIgcmVwb3J0RXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG5cdH07XG5cblx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuXG5cdHZhciBvbkFjY2VwdGVkID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBQcm9taXNlLmFsbChbZGlzcG9zZVByb21pc2UsIGFwcGx5UHJvbWlzZV0pLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcblx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiZmFpbFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcblx0XHRcdFx0cmV0dXJuIGludGVybmFsQXBwbHkob3B0aW9ucykudGhlbihmdW5jdGlvbiAobGlzdCkge1xuXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0XHRcdFx0aWYgKGxpc3QuaW5kZXhPZihtb2R1bGVJZCkgPCAwKSBsaXN0LnB1c2gobW9kdWxlSWQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybiBsaXN0O1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcImlkbGVcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBvdXRkYXRlZE1vZHVsZXM7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0cmVzdWx0c1xuXHRcdFx0LmZpbHRlcihmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHQuYXBwbHk7XG5cdFx0XHR9KVxuXHRcdFx0Lm1hcChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHQuYXBwbHkocmVwb3J0RXJyb3IpO1xuXHRcdFx0fSlcblx0KVxuXHRcdC50aGVuKGZ1bmN0aW9uIChhcHBseVJlc3VsdHMpIHtcblx0XHRcdGFwcGx5UmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVzKSB7XG5cdFx0XHRcdGlmIChtb2R1bGVzKSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChtb2R1bGVzW2ldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pXG5cdFx0LnRoZW4ob25BY2NlcHRlZCk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkge1xuXHRpZiAocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG5cdFx0aWYgKCFjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycykgY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdG1vZHVsZUlkLFxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPSB1bmRlZmluZWQ7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn0iLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnKVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoL15ibG9iOi8sIFwiXCIpLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG52YXIgY3JlYXRlU3R5bGVzaGVldCA9IChjaHVua0lkLCBmdWxsaHJlZiwgb2xkVGFnLCByZXNvbHZlLCByZWplY3QpID0+IHtcblx0dmFyIGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRsaW5rVGFnLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRsaW5rVGFnLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0bGlua1RhZy5ub25jZSA9IF9fd2VicGFja19yZXF1aXJlX18ubmM7XG5cdH1cblx0dmFyIG9uTGlua0NvbXBsZXRlID0gKGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzLlxuXHRcdGxpbmtUYWcub25lcnJvciA9IGxpbmtUYWcub25sb2FkID0gbnVsbDtcblx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnKSB7XG5cdFx0XHRyZXNvbHZlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiBldmVudC50eXBlO1xuXHRcdFx0dmFyIHJlYWxIcmVmID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5ocmVmIHx8IGZ1bGxocmVmO1xuXHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyBlcnJvclR5cGUgKyBcIjogXCIgKyByZWFsSHJlZiArIFwiKVwiKTtcblx0XHRcdGVyci5uYW1lID0gXCJDaHVua0xvYWRFcnJvclwiO1xuXHRcdFx0ZXJyLmNvZGUgPSBcIkNTU19DSFVOS19MT0FEX0ZBSUxFRFwiO1xuXHRcdFx0ZXJyLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRlcnIucmVxdWVzdCA9IHJlYWxIcmVmO1xuXHRcdFx0aWYgKGxpbmtUYWcucGFyZW50Tm9kZSkgbGlua1RhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxpbmtUYWcpXG5cdFx0XHRyZWplY3QoZXJyKTtcblx0XHR9XG5cdH1cblx0bGlua1RhZy5vbmVycm9yID0gbGlua1RhZy5vbmxvYWQgPSBvbkxpbmtDb21wbGV0ZTtcblx0bGlua1RhZy5ocmVmID0gZnVsbGhyZWY7XG5cblxuXHRpZiAob2xkVGFnKSB7XG5cdFx0b2xkVGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxpbmtUYWcsIG9sZFRhZy5uZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rVGFnKTtcblx0fVxuXHRyZXR1cm4gbGlua1RhZztcbn07XG52YXIgZmluZFN0eWxlc2hlZXQgPSAoaHJlZiwgZnVsbGhyZWYpID0+IHtcblx0dmFyIGV4aXN0aW5nTGlua1RhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ0xpbmtUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHRhZyA9IGV4aXN0aW5nTGlua1RhZ3NbaV07XG5cdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKSB8fCB0YWcuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblx0XHRpZih0YWcucmVsID09PSBcInN0eWxlc2hlZXRcIiAmJiAoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSkgcmV0dXJuIHRhZztcblx0fVxuXHR2YXIgZXhpc3RpbmdTdHlsZVRhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdTdHlsZVRhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdGFnID0gZXhpc3RpbmdTdHlsZVRhZ3NbaV07XG5cdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKTtcblx0XHRpZihkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpIHJldHVybiB0YWc7XG5cdH1cbn07XG52YXIgbG9hZFN0eWxlc2hlZXQgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHZhciBocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRihjaHVua0lkKTtcblx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuXHRcdGlmKGZpbmRTdHlsZXNoZWV0KGhyZWYsIGZ1bGxocmVmKSkgcmV0dXJuIHJlc29sdmUoKTtcblx0XHRjcmVhdGVTdHlsZXNoZWV0KGNodW5rSWQsIGZ1bGxocmVmLCBudWxsLCByZXNvbHZlLCByZWplY3QpO1xuXHR9KTtcbn1cbi8vIG5vIGNodW5rIGxvYWRpbmdcblxudmFyIG9sZFRhZ3MgPSBbXTtcbnZhciBuZXdUYWdzID0gW107XG52YXIgYXBwbHlIYW5kbGVyID0gKG9wdGlvbnMpID0+IHtcblx0cmV0dXJuIHsgZGlzcG9zZTogKCkgPT4ge1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvbGRUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgb2xkVGFnID0gb2xkVGFnc1tpXTtcblx0XHRcdGlmKG9sZFRhZy5wYXJlbnROb2RlKSBvbGRUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRUYWcpO1xuXHRcdH1cblx0XHRvbGRUYWdzLmxlbmd0aCA9IDA7XG5cdH0sIGFwcGx5OiAoKSA9PiB7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG5ld1RhZ3MubGVuZ3RoOyBpKyspIG5ld1RhZ3NbaV0ucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cdFx0bmV3VGFncy5sZW5ndGggPSAwO1xuXHR9IH07XG59XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMubWluaUNzcyA9IChjaHVua0lkcywgcmVtb3ZlZENodW5rcywgcmVtb3ZlZE1vZHVsZXMsIHByb21pc2VzLCBhcHBseUhhbmRsZXJzLCB1cGRhdGVkTW9kdWxlc0xpc3QpID0+IHtcblx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdGNodW5rSWRzLmZvckVhY2goKGNodW5rSWQpID0+IHtcblx0XHR2YXIgaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ubWluaUNzc0YoY2h1bmtJZCk7XG5cdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcblx0XHR2YXIgb2xkVGFnID0gZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpO1xuXHRcdGlmKCFvbGRUYWcpIHJldHVybjtcblx0XHRwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB0YWcgPSBjcmVhdGVTdHlsZXNoZWV0KGNodW5rSWQsIGZ1bGxocmVmLCBvbGRUYWcsICgpID0+IHtcblx0XHRcdFx0dGFnLmFzID0gXCJzdHlsZVwiO1xuXHRcdFx0XHR0YWcucmVsID0gXCJwcmVsb2FkXCI7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH0sIHJlamVjdCk7XG5cdFx0XHRvbGRUYWdzLnB1c2gob2xkVGFnKTtcblx0XHRcdG5ld1RhZ3MucHVzaCh0YWcpO1xuXHRcdH0pKTtcblx0fSk7XG59XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZCIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0gX193ZWJwYWNrX3JlcXVpcmVfXy5obXJTX2pzb25wID0gX193ZWJwYWNrX3JlcXVpcmVfXy5obXJTX2pzb25wIHx8IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG52YXIgY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdDtcbnZhciB3YWl0aW5nVXBkYXRlUmVzb2x2ZXMgPSB7fTtcbmZ1bmN0aW9uIGxvYWRVcGRhdGVDaHVuayhjaHVua0lkLCB1cGRhdGVkTW9kdWxlc0xpc3QpIHtcblx0Y3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdCA9IHVwZGF0ZWRNb2R1bGVzTGlzdDtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSByZXNvbHZlO1xuXHRcdC8vIHN0YXJ0IHVwZGF0ZSBjaHVuayBsb2FkaW5nXG5cdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18uaHUoY2h1bmtJZCk7XG5cdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuXHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuXHRcdHZhciBsb2FkaW5nRW5kZWQgPSAoZXZlbnQpID0+IHtcblx0XHRcdGlmKHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSkge1xuXHRcdFx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSB1bmRlZmluZWRcblx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGhvdCB1cGRhdGUgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQpO1xuXHR9KTtcbn1cblxuc2VsZltcIndlYnBhY2tIb3RVcGRhdGV3ZWJnbFwiXSA9IChjaHVua0lkLCBtb3JlTW9kdWxlcywgcnVudGltZSkgPT4ge1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0aWYoY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdCkgY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdC5wdXNoKG1vZHVsZUlkKTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgY3VycmVudFVwZGF0ZVJ1bnRpbWUucHVzaChydW50aW1lKTtcblx0aWYod2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKSB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKCk7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHR9XG59O1xuXG52YXIgY3VycmVudFVwZGF0ZUNodW5rcztcbnZhciBjdXJyZW50VXBkYXRlO1xudmFyIGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzO1xudmFyIGN1cnJlbnRVcGRhdGVSdW50aW1lO1xuZnVuY3Rpb24gYXBwbHlIYW5kbGVyKG9wdGlvbnMpIHtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18uZikgZGVsZXRlIF9fd2VicGFja19yZXF1aXJlX18uZi5qc29ucEhtcjtcblx0Y3VycmVudFVwZGF0ZUNodW5rcyA9IHVuZGVmaW5lZDtcblx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRNb2R1bGVFZmZlY3RzKHVwZGF0ZU1vZHVsZUlkKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG5cdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cblx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y2hhaW46IFtpZF0sXG5cdFx0XHRcdGlkOiBpZFxuXHRcdFx0fTtcblx0XHR9KTtcblx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuXHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuXHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCFtb2R1bGUgfHxcblx0XHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCAmJiAhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkKVxuXHRcdFx0KVxuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG5cdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuXHRcdFx0XHRcdGNoYWluOiBjaGFpbixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG5cdFx0XHRcdHZhciBwYXJlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbcGFyZW50SWRdO1xuXHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG5cdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcblx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuXHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG5cdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG5cdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcblx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG5cdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcblx0XHRcdFx0cXVldWUucHVzaCh7XG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcblx0XHRcdFx0XHRpZDogcGFyZW50SWRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcblx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcblx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuXHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gYltpXTtcblx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcblx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuXHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuXHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG5cdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUobW9kdWxlKSB7XG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyBtb2R1bGUuaWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcblx0XHQpO1xuXHR9O1xuXG5cdGZvciAodmFyIG1vZHVsZUlkIGluIGN1cnJlbnRVcGRhdGUpIHtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdFx0dmFyIG5ld01vZHVsZUZhY3RvcnkgPSBjdXJyZW50VXBkYXRlW21vZHVsZUlkXTtcblx0XHRcdHZhciByZXN1bHQgPSBuZXdNb2R1bGVGYWN0b3J5XG5cdFx0XHRcdD8gZ2V0QWZmZWN0ZWRNb2R1bGVFZmZlY3RzKG1vZHVsZUlkKVxuXHRcdFx0XHQ6IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcblx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHRcdH07XG5cdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuXHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcblx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG5cdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG5cdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcblx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcblx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuXHRcdFx0fVxuXHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuXHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG5cdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcblx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcblx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcblx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG5cdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRlcnJvcjogYWJvcnRFcnJvclxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKGRvQXBwbHkpIHtcblx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBuZXdNb2R1bGVGYWN0b3J5O1xuXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuXHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ocmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcblx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG5cdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Y3VycmVudFVwZGF0ZSA9IHVuZGVmaW5lZDtcblxuXHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG5cdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcblx0Zm9yICh2YXIgaiA9IDA7IGogPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBqKyspIHtcblx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tqXTtcblx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdGlmIChcblx0XHRcdG1vZHVsZSAmJlxuXHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCB8fCBtb2R1bGUuaG90Ll9tYWluKSAmJlxuXHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuXHRcdFx0YXBwbGllZFVwZGF0ZVtvdXRkYXRlZE1vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlICYmXG5cdFx0XHQvLyB3aGVuIGNhbGxlZCBpbnZhbGlkYXRlIHNlbGYtYWNjZXB0aW5nIGlzIG5vdCBwb3NzaWJsZVxuXHRcdFx0IW1vZHVsZS5ob3QuX3NlbGZJbnZhbGlkYXRlZFxuXHRcdCkge1xuXHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuXHRcdFx0XHRtb2R1bGU6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdHJlcXVpcmU6IG1vZHVsZS5ob3QuX3JlcXVpcmVTZWxmLFxuXHRcdFx0XHRlcnJvckhhbmRsZXI6IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuXG5cdHJldHVybiB7XG5cdFx0ZGlzcG9zZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MuZm9yRWFjaChmdW5jdGlvbiAoY2h1bmtJZCkge1xuXHRcdFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0fSk7XG5cdFx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IHVuZGVmaW5lZDtcblxuXHRcdFx0dmFyIGlkeDtcblx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG5cdFx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuXHRcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cblx0XHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuXHRcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcblx0XHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdGRpc3Bvc2VIYW5kbGVyc1tqXS5jYWxsKG51bGwsIGRhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1yRFttb2R1bGVJZF0gPSBkYXRhO1xuXG5cdFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG5cdFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG5cdFx0XHRcdGRlbGV0ZSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuXG5cdFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcblx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuXHRcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0dmFyIGNoaWxkID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZS5jaGlsZHJlbltqXV07XG5cdFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG5cdFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcblx0XHRcdFx0XHRpZiAoaWR4ID49IDApIHtcblx0XHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG5cdFx0XHR2YXIgZGVwZW5kZW5jeTtcblx0XHRcdGZvciAodmFyIG91dGRhdGVkTW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhvdXRkYXRlZERlcGVuZGVuY2llcywgb3V0ZGF0ZWRNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuXHRcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG5cdFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuXHRcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGFwcGx5OiBmdW5jdGlvbiAocmVwb3J0RXJyb3IpIHtcblx0XHRcdHZhciBhY2NlcHRQcm9taXNlcyA9IFtdO1xuXHRcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG5cdFx0XHRmb3IgKHZhciB1cGRhdGVNb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8oYXBwbGllZFVwZGF0ZSwgdXBkYXRlTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW3VwZGF0ZU1vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbdXBkYXRlTW9kdWxlSWRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJ1biBuZXcgcnVudGltZSBtb2R1bGVzXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnRVcGRhdGVSdW50aW1lLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVSdW50aW1lW2ldKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuXHRcdFx0Zm9yICh2YXIgb3V0ZGF0ZWRNb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBvdXRkYXRlZE1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuXHRcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBlcnJvckhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzID0gW107XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG5cdFx0XHRcdFx0XHRcdHZhciBhY2NlcHRDYWxsYmFjayA9XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG5cdFx0XHRcdFx0XHRcdHZhciBlcnJvckhhbmRsZXIgPVxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5ob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBlbmRlbmN5XTtcblx0XHRcdFx0XHRcdFx0aWYgKGFjY2VwdENhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGFjY2VwdENhbGxiYWNrKSAhPT0gLTEpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGFjY2VwdENhbGxiYWNrKTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvckhhbmRsZXJzLnB1c2goZXJyb3JIYW5kbGVyKTtcblx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MucHVzaChkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBjYWxsYmFja3MubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSBjYWxsYmFja3Nba10uY2FsbChudWxsLCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZXJyb3JIYW5kbGVyc1trXSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvckhhbmRsZXJzW2tdKGVyciwge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyMik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRcdGFjY2VwdFByb21pc2VzLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgb25BY2NlcHRlZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcblx0XHRcdFx0Zm9yICh2YXIgbyA9IDA7IG8gPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBvKyspIHtcblx0XHRcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tvXTtcblx0XHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0aXRlbS5yZXF1aXJlKG1vZHVsZUlkKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVyciwge1xuXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlOiBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycjEpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycjEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKGFjY2VwdFByb21pc2VzKVxuXHRcdFx0XHQudGhlbihvbkFjY2VwdGVkKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG91dGRhdGVkTW9kdWxlcztcblx0XHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xufVxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJLmpzb25wID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBhcHBseUhhbmRsZXJzKSB7XG5cdGlmICghY3VycmVudFVwZGF0ZSkge1xuXHRcdGN1cnJlbnRVcGRhdGUgPSB7fTtcblx0XHRjdXJyZW50VXBkYXRlUnVudGltZSA9IFtdO1xuXHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gW107XG5cdFx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdH1cblx0aWYgKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG5cdFx0Y3VycmVudFVwZGF0ZVttb2R1bGVJZF0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdO1xuXHR9XG59O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDLmpzb25wID0gZnVuY3Rpb24gKFxuXHRjaHVua0lkcyxcblx0cmVtb3ZlZENodW5rcyxcblx0cmVtb3ZlZE1vZHVsZXMsXG5cdHByb21pc2VzLFxuXHRhcHBseUhhbmRsZXJzLFxuXHR1cGRhdGVkTW9kdWxlc0xpc3Rcbikge1xuXHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0Y3VycmVudFVwZGF0ZUNodW5rcyA9IHt9O1xuXHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IHJlbW92ZWRDaHVua3M7XG5cdGN1cnJlbnRVcGRhdGUgPSByZW1vdmVkTW9kdWxlcy5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwga2V5KSB7XG5cdFx0b2JqW2tleV0gPSBmYWxzZTtcblx0XHRyZXR1cm4gb2JqO1xuXHR9LCB7fSk7XG5cdGN1cnJlbnRVcGRhdGVSdW50aW1lID0gW107XG5cdGNodW5rSWRzLmZvckVhY2goZnVuY3Rpb24gKGNodW5rSWQpIHtcblx0XHRpZiAoXG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJlxuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSB1bmRlZmluZWRcblx0XHQpIHtcblx0XHRcdHByb21pc2VzLnB1c2gobG9hZFVwZGF0ZUNodW5rKGNodW5rSWQsIHVwZGF0ZWRNb2R1bGVzTGlzdCkpO1xuXHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSBmYWxzZTtcblx0XHR9XG5cdH0pO1xuXHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5mKSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mLmpzb25wSG1yID0gZnVuY3Rpb24gKGNodW5rSWQsIHByb21pc2VzKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3MgJiZcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGVDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRcdCFjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdXG5cdFx0XHQpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkpO1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0gPSAoKSA9PiB7XG5cdGlmICh0eXBlb2YgZmV0Y2ggPT09IFwidW5kZWZpbmVkXCIpIHRocm93IG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydDogbmVlZCBmZXRjaCBBUElcIik7XG5cdHJldHVybiBmZXRjaChfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYoKSkudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRpZihyZXNwb25zZS5zdGF0dXMgPT09IDQwNCkgcmV0dXJuOyAvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG5cdFx0aWYoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggdXBkYXRlIG1hbmlmZXN0IFwiICsgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0fSk7XG59O1xuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiIiwiLy8gbW9kdWxlIGNhY2hlIGFyZSB1c2VkIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L2luZGV4LmpzP3Byb3RvY29sPXdzJTNBJmhvc3RuYW1lPTAuMC4wLjAmcG9ydD04MDgwJnBhdGhuYW1lPSUyRndzJmxvZ2dpbmc9aW5mbyZvdmVybGF5PXRydWUmcmVjb25uZWN0PTEwJmhvdD10cnVlJmxpdmUtcmVsb2FkPXRydWVcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvZGV2LXNlcnZlci5qc1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL2FwcC9pbmRleC5qc1wiKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3R5bGVzL2luZGV4LnNjc3NcIik7XG4iLCIiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImFuc2lIVE1MIiwiX3JlZ0FOU0kiLCJfZGVmQ29sb3JzIiwicmVzZXQiLCJibGFjayIsInJlZCIsImdyZWVuIiwieWVsbG93IiwiYmx1ZSIsIm1hZ2VudGEiLCJjeWFuIiwibGlnaHRncmV5IiwiZGFya2dyZXkiLCJfc3R5bGVzIiwiX29wZW5UYWdzIiwiX2Nsb3NlVGFncyIsImZvckVhY2giLCJuIiwidGV4dCIsInRlc3QiLCJhbnNpQ29kZXMiLCJyZXQiLCJyZXBsYWNlIiwibWF0Y2giLCJzZXEiLCJvdCIsImluZGV4T2YiLCJwb3AiLCJwdXNoIiwiY3QiLCJsIiwibGVuZ3RoIiwiQXJyYXkiLCJqb2luIiwic2V0Q29sb3JzIiwiY29sb3JzIiwiRXJyb3IiLCJfZmluYWxDb2xvcnMiLCJrZXkiLCJoZXgiLCJoYXNPd25Qcm9wZXJ0eSIsImlzQXJyYXkiLCJzb21lIiwiaCIsImRlZkhleENvbG9yIiwic2xpY2UiLCJfc2V0VGFncyIsInRhZ3MiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsIm9wZW4iLCJjbG9zZSIsImNvZGUiLCJjb2xvciIsIm9yaUNvbG9yIiwicGFyc2VJbnQiLCJ0b1N0cmluZyIsIlIiLCJSZWZsZWN0IiwiUmVmbGVjdEFwcGx5IiwiYXBwbHkiLCJ0YXJnZXQiLCJyZWNlaXZlciIsImFyZ3MiLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsImNhbGwiLCJSZWZsZWN0T3duS2V5cyIsIm93bktleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiY29uY2F0IiwiUHJvY2Vzc0VtaXRXYXJuaW5nIiwid2FybmluZyIsImNvbnNvbGUiLCJ3YXJuIiwiTnVtYmVySXNOYU4iLCJOdW1iZXIiLCJpc05hTiIsInZhbHVlIiwiRXZlbnRFbWl0dGVyIiwiaW5pdCIsIm9uY2UiLCJfZXZlbnRzIiwidW5kZWZpbmVkIiwiX2V2ZW50c0NvdW50IiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJjaGVja0xpc3RlbmVyIiwibGlzdGVuZXIiLCJUeXBlRXJyb3IiLCJlbnVtZXJhYmxlIiwic2V0IiwiYXJnIiwiUmFuZ2VFcnJvciIsImdldFByb3RvdHlwZU9mIiwiY3JlYXRlIiwic2V0TWF4TGlzdGVuZXJzIiwiX2dldE1heExpc3RlbmVycyIsInRoYXQiLCJnZXRNYXhMaXN0ZW5lcnMiLCJlbWl0IiwidHlwZSIsImkiLCJhcmd1bWVudHMiLCJkb0Vycm9yIiwiZXZlbnRzIiwiZXJyb3IiLCJlciIsImVyciIsIm1lc3NhZ2UiLCJjb250ZXh0IiwiaGFuZGxlciIsImxlbiIsImxpc3RlbmVycyIsImFycmF5Q2xvbmUiLCJfYWRkTGlzdGVuZXIiLCJwcmVwZW5kIiwibSIsImV4aXN0aW5nIiwibmV3TGlzdGVuZXIiLCJ1bnNoaWZ0Iiwid2FybmVkIiwidyIsIlN0cmluZyIsIm5hbWUiLCJlbWl0dGVyIiwiY291bnQiLCJhZGRMaXN0ZW5lciIsIm9uIiwicHJlcGVuZExpc3RlbmVyIiwib25jZVdyYXBwZXIiLCJmaXJlZCIsInJlbW92ZUxpc3RlbmVyIiwid3JhcEZuIiwiX29uY2VXcmFwIiwic3RhdGUiLCJ3cmFwcGVkIiwiYmluZCIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0IiwicG9zaXRpb24iLCJvcmlnaW5hbExpc3RlbmVyIiwic2hpZnQiLCJzcGxpY2VPbmUiLCJvZmYiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJrZXlzIiwiX2xpc3RlbmVycyIsInVud3JhcCIsImV2bGlzdGVuZXIiLCJ1bndyYXBMaXN0ZW5lcnMiLCJyYXdMaXN0ZW5lcnMiLCJsaXN0ZW5lckNvdW50IiwiZXZlbnROYW1lcyIsImFyciIsImNvcHkiLCJpbmRleCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXJyb3JMaXN0ZW5lciIsInJlc29sdmVyIiwiZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyIiwiYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIiLCJmbGFncyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3cmFwTGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibm9ybWFsaXplVXJsIiwicmVxdWlyZSIsInNyY0J5TW9kdWxlSWQiLCJub0RvY3VtZW50IiwiZG9jdW1lbnQiLCJkZWJvdW5jZSIsImZuIiwidGltZSIsInRpbWVvdXQiLCJzZWxmIiwiZnVuY3Rpb25DYWxsIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIm5vb3AiLCJnZXRDdXJyZW50U2NyaXB0VXJsIiwibW9kdWxlSWQiLCJzcmMiLCJjdXJyZW50U2NyaXB0Iiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibGFzdFNjcmlwdFRhZyIsImZpbGVNYXAiLCJzcGxpdFJlc3VsdCIsInNwbGl0IiwiZmlsZW5hbWUiLCJtYXAiLCJtYXBSdWxlIiwicmVnIiwiUmVnRXhwIiwiaXNVcmxSZXF1ZXN0IiwidXJsIiwidXBkYXRlQ3NzIiwiZWwiLCJocmVmIiwiaXNMb2FkZWQiLCJ2aXNpdGVkIiwibmV3RWwiLCJjbG9uZU5vZGUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJEYXRlIiwibm93IiwibmV4dFNpYmxpbmciLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmRDaGlsZCIsImdldFJlbG9hZFVybCIsInJlbG9hZFN0eWxlIiwiZWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibG9hZGVkIiwicmVsb2FkQWxsIiwib3B0aW9ucyIsImxvZyIsImdldFNjcmlwdFNyYyIsInVwZGF0ZSIsInJlbG9hZGVkIiwibG9jYWxzIiwibm9ybWFsaXplVXJsSW5uZXIiLCJwYXRoQ29tcG9uZW50cyIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiaXRlbSIsInVybFN0cmluZyIsInRyaW0iLCJwcm90b2NvbCIsImNvbXBvbmVudHMiLCJob3N0IiwidG9Mb3dlckNhc2UiLCJwYXRoIiwiX3R5cGVvZiIsIm8iLCJTeW1ib2wiLCJpdGVyYXRvciIsImNvbnN0cnVjdG9yIiwiX2NsYXNzQ2FsbENoZWNrIiwiYSIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwiZSIsInIiLCJ0IiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJfdG9Qcm9wZXJ0eUtleSIsIl9jcmVhdGVDbGFzcyIsIl90b1ByaW1pdGl2ZSIsInRvUHJpbWl0aXZlIiwiV2ViU29ja2V0Q2xpZW50IiwiY2xpZW50IiwiV2ViU29ja2V0Iiwib25lcnJvciIsIm9uT3BlbiIsImYiLCJvbm9wZW4iLCJvbkNsb3NlIiwib25jbG9zZSIsIm9uTWVzc2FnZSIsIm9ubWVzc2FnZSIsImRhdGEiLCJkZWZhdWx0IiwiZmlsdGVyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiX29iamVjdFNwcmVhZCIsIl9kZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwid2VicGFja0hvdExvZyIsImhvdEVtaXR0ZXIiLCJzb2NrZXQiLCJmb3JtYXRQcm9ibGVtIiwiY3JlYXRlT3ZlcmxheSIsInNldExvZ0xldmVsIiwic2VuZE1lc3NhZ2UiLCJpc1Byb2dyZXNzU3VwcG9ydGVkIiwiZGVmaW5lUHJvZ3Jlc3NFbGVtZW50IiwiZGVjb2RlT3ZlcmxheU9wdGlvbnMiLCJvdmVybGF5T3B0aW9ucyIsInByb3BlcnR5Iiwib3ZlcmxheUZpbHRlckZ1bmN0aW9uU3RyaW5nIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic3RhdHVzIiwiaXNVbmxvYWRpbmciLCJjdXJyZW50SGFzaCIsIl9fd2VicGFja19oYXNoX18iLCJnZXRDdXJyZW50U2NyaXB0U291cmNlIiwiZ2V0QXR0cmlidXRlIiwic2NyaXB0RWxlbWVudHMiLCJzY3JpcHRFbGVtZW50c1dpdGhTcmMiLCJlbGVtZW50IiwicGFyc2VVUkwiLCJyZXNvdXJjZVF1ZXJ5IiwicmVzdWx0Iiwic2VhcmNoUGFyYW1zIiwicGFpciIsInNjcmlwdFNvdXJjZSIsInNjcmlwdFNvdXJjZVVSTCIsIlVSTCIsImxvY2F0aW9uIiwiZnJvbUN1cnJlbnRTY3JpcHQiLCJwYXJzZWRSZXNvdXJjZVF1ZXJ5IiwiX19yZXNvdXJjZVF1ZXJ5IiwiZW5hYmxlZEZlYXR1cmVzIiwiUHJvZ3Jlc3MiLCJPdmVybGF5IiwiaG90IiwibGl2ZVJlbG9hZCIsInByb2dyZXNzIiwib3ZlcmxheSIsIkpTT04iLCJwYXJzZSIsImVycm9ycyIsIndhcm5pbmdzIiwicnVudGltZUVycm9ycyIsImxvZ2dpbmciLCJyZWNvbm5lY3QiLCJzZXRBbGxMb2dMZXZlbCIsImxldmVsIiwibG9nRW5hYmxlZEZlYXR1cmVzIiwiZmVhdHVyZXMiLCJsaXN0RW5hYmxlZEZlYXR1cmVzIiwibG9nU3RyaW5nIiwiaW5mbyIsIndpbmRvdyIsInRydXN0ZWRUeXBlc1BvbGljeU5hbWUiLCJjYXRjaFJ1bnRpbWVFcnJvciIsInNlbmQiLCJyZWxvYWRBcHAiLCJfcmVmIiwiY3VycmVudFN0YXR1cyIsInByZXZpb3VzSGFzaCIsImlzSW5pdGlhbCIsImFwcGx5UmVsb2FkIiwicm9vdFdpbmRvdyIsImludGVydmFsSWQiLCJjbGVhckludGVydmFsIiwicmVsb2FkIiwic2VhcmNoIiwiYWxsb3dUb0hvdCIsImFsbG93VG9MaXZlUmVsb2FkIiwicG9zdE1lc3NhZ2UiLCJzZXRJbnRlcnZhbCIsInBhcmVudCIsImFuc2lSZWdleCIsInN0cmlwQW5zaSIsInN0cmluZyIsIm9uU29ja2V0TWVzc2FnZSIsImludmFsaWQiLCJoYXNoIiwiX2hhc2giLCJwcm9ncmVzc1VwZGF0ZSIsInBsdWdpbk5hbWUiLCJwZXJjZW50IiwibXNnIiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZUVsZW1lbnQiLCJib2R5Iiwic2V0QXR0cmlidXRlIiwic3RpbGxPayIsIm9rIiwic3RhdGljQ2hhbmdlZCIsImZpbGUiLCJfd2FybmluZ3MiLCJwYXJhbXMiLCJwcmludGFibGVXYXJuaW5ncyIsIl9mb3JtYXRQcm9ibGVtIiwiaGVhZGVyIiwib3ZlcmxheVdhcm5pbmdzU2V0dGluZyIsIndhcm5pbmdzVG9EaXNwbGF5IiwibWVzc2FnZXMiLCJwcmV2ZW50UmVsb2FkaW5nIiwiX2Vycm9ycyIsInByaW50YWJsZUVycm9ycyIsIl9mb3JtYXRQcm9ibGVtMiIsIm92ZXJsYXlFcnJvcnNTZXR0aW5ncyIsImVycm9yc1RvRGlzcGxheSIsIl9lcnJvciIsImZvcm1hdFVSTCIsIm9ialVSTCIsInN1YnN0ciIsImF1dGgiLCJlbmNvZGVVUklDb21wb25lbnQiLCJob3N0bmFtZSIsInBvcnQiLCJwYXRobmFtZSIsInNsYXNoZXMiLCJjaGFyQXQiLCJjcmVhdGVTb2NrZXRVUkwiLCJwYXJzZWRVUkwiLCJpc0luQWRkckFueSIsInNvY2tldFVSTFByb3RvY29sIiwic29ja2V0VVJMQXV0aCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJzb2NrZXRVUkxIb3N0bmFtZSIsInNvY2tldFVSTFBvcnQiLCJzb2NrZXRVUkxQYXRobmFtZSIsInNvY2tldFVSTCIsIl9fd2VicGFja19tb2R1bGVzX18iLCIuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvdGFwYWJsZS5qcyIsIl9fdW51c2VkX3dlYnBhY2tfbW9kdWxlIiwiX193ZWJwYWNrX2V4cG9ydHNfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJkIiwiU3luY0JhaWxIb29rIiwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanMiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJfYXJyYXlXaXRob3V0SG9sZXMiLCJfaXRlcmFibGVUb0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlU3ByZWFkIiwiX2FycmF5TGlrZVRvQXJyYXkiLCJmcm9tIiwiTG9nVHlwZSIsImZyZWV6ZSIsImRlYnVnIiwidHJhY2UiLCJncm91cCIsImdyb3VwQ29sbGFwc2VkIiwiZ3JvdXBFbmQiLCJwcm9maWxlIiwicHJvZmlsZUVuZCIsImNsZWFyIiwiTE9HX1NZTUJPTCIsIlRJTUVSU19TWU1CT0wiLCJUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0wiLCJXZWJwYWNrTG9nZ2VyIiwiZ2V0Q2hpbGRMb2dnZXIiLCJfbGVuIiwiX2tleSIsIl9sZW4yIiwiX2tleTIiLCJfbGVuMyIsIl9rZXkzIiwiX2xlbjQiLCJfa2V5NCIsIl9sZW41IiwiX2tleTUiLCJhc3NlcnQiLCJhc3NlcnRpb24iLCJfbGVuNiIsIl9rZXk2IiwiX2xlbjciLCJfa2V5NyIsIl9sZW44IiwiX2tleTgiLCJfbGVuOSIsIl9rZXk5IiwibGFiZWwiLCJNYXAiLCJwcm9jZXNzIiwiaHJ0aW1lIiwidGltZUxvZyIsInByZXYiLCJ0aW1lRW5kIiwiZGVsZXRlIiwidGltZUFnZ3JlZ2F0ZSIsImN1cnJlbnQiLCJ0aW1lQWdncmVnYXRlRW5kIiwiTG9nZ2VyIiwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzIiwiX191bnVzZWRfd2VicGFja19leHBvcnRzIiwiX3NsaWNlZFRvQXJyYXkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfbm9uSXRlcmFibGVSZXN0IiwidSIsIm5leHQiLCJkb25lIiwicmV0dXJuIiwiX3JlcXVpcmUiLCJmaWx0ZXJUb0Z1bmN0aW9uIiwicmVnRXhwIiwiaWRlbnQiLCJMb2dMZXZlbCIsIm5vbmUiLCJmYWxzZSIsInRydWUiLCJ2ZXJib3NlIiwiX3JlZiRsZXZlbCIsIl9yZWYkZGVidWciLCJkZWJ1Z0ZpbHRlcnMiLCJsb2dsZXZlbCIsImxvZ2dlciIsImxhYmVsZWRBcmdzIiwiX2FyZ3MiLCJzdGFydCIsImVuZCIsIm1zIiwibG9nVGltZSIsIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qcyIsIl9leHRlbmRzIiwiYXNzaWduIiwiX3JlcXVpcmUyIiwiY3JlYXRlQ29uc29sZUxvZ2dlciIsImN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyIsImN1cnJlbnREZWZhdWx0TG9nZ2VyIiwiZ2V0TG9nZ2VyIiwiaG9va3MiLCJjaGlsZE5hbWUiLCJjb25maWd1cmVEZWZhdWx0TG9nZ2VyIiwiX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fIiwiY2FjaGVkTW9kdWxlIiwiZGVmaW5pdGlvbiIsIm9iaiIsInByb3AiLCJ0b1N0cmluZ1RhZyIsIndlYnBhY2tfbGliX2xvZ2dpbmdfcnVudGltZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXyIsIl9fd2VicGFja19pX18iLCJfX2VzTW9kdWxlIiwiZ2V0Q29kZVBvaW50IiwiY29kZVBvaW50QXQiLCJpbnB1dCIsImNoYXJDb2RlQXQiLCJyZXBsYWNlVXNpbmdSZWdFeHAiLCJtYWNyb1RleHQiLCJtYWNyb1JlZ0V4cCIsIm1hY3JvUmVwbGFjZXIiLCJsYXN0SW5kZXgiLCJyZXBsYWNlTWF0Y2giLCJleGVjIiwicmVwbGFjZVJlc3VsdCIsInJlcGxhY2VMYXN0SW5kZXgiLCJzdWJzdHJpbmciLCJyZXBsYWNlSW5wdXQiLCJyZWZlcmVuY2VzIiwiZW5jb2RlIiwiY3JlYXRlTWFjaGluZSIsIl9yZWYyIiwic3RhdGVzIiwiaW5pdGlhbCIsImFjdGlvbnMiLCJjdXJyZW50U3RhdGUiLCJjdXJyZW50Q29udGV4dCIsImV2ZW50IiwiY3VycmVudFN0YXRlT24iLCJ0cmFuc2l0aW9uQ29uZmlnIiwiYWN0TmFtZSIsImFjdGlvbkltcGwiLCJuZXh0Q29udGV4dFZhbHVlIiwiY3JlYXRlT3ZlcmxheU1hY2hpbmUiLCJoaWRlT3ZlcmxheSIsInNob3dPdmVybGF5IiwibWVzc2FnZVNvdXJjZSIsImhpZGRlbiIsIkJVSUxEX0VSUk9SIiwiUlVOVElNRV9FUlJPUiIsImRpc3BsYXlCdWlsZEVycm9yIiwiRElTTUlTUyIsImRpc3BsYXlSdW50aW1lRXJyb3IiLCJkaXNtaXNzTWVzc2FnZXMiLCJhcHBlbmRNZXNzYWdlcyIsInNldE1lc3NhZ2VzIiwicGFyc2VFcnJvclRvU3RhY2tzIiwic3RhY2siLCJsaXN0ZW5Ub1J1bnRpbWVFcnJvciIsImNhbGxiYWNrIiwiY2xlYW51cCIsImxpc3RlblRvVW5oYW5kbGVkUmVqZWN0aW9uIiwibXNnU3R5bGVzIiwiYmFja2dyb3VuZENvbG9yIiwiaWZyYW1lU3R5bGUiLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJ3aWR0aCIsImhlaWdodCIsImJvcmRlciIsImNvbnRhaW5lclN0eWxlIiwiYm94U2l6aW5nIiwiZm9udFNpemUiLCJwYWRkaW5nIiwibGluZUhlaWdodCIsIndoaXRlU3BhY2UiLCJvdmVyZmxvdyIsImhlYWRlclN0eWxlIiwiZm9udEZhbWlseSIsIm1hcmdpbiIsImZsZXgiLCJtYXhIZWlnaHQiLCJkaXNtaXNzQnV0dG9uU3R5bGUiLCJjdXJzb3IiLCJtc2dUeXBlU3R5bGUiLCJtYXJnaW5Cb3R0b20iLCJtc2dUZXh0U3R5bGUiLCJtb2R1bGVOYW1lIiwibG9jIiwiaWZyYW1lQ29udGFpbmVyRWxlbWVudCIsImNvbnRhaW5lckVsZW1lbnQiLCJoZWFkZXJFbGVtZW50Iiwib25Mb2FkUXVldWUiLCJvdmVybGF5VHJ1c3RlZFR5cGVzUG9saWN5IiwiYXBwbHlTdHlsZSIsInN0eWxlIiwiY3JlYXRlQ29udGFpbmVyIiwidHJ1c3RlZFR5cGVzIiwiY3JlYXRlUG9saWN5IiwiY3JlYXRlSFRNTCIsImlkIiwib25sb2FkIiwiY29udGVudEVsZW1lbnQiLCJjb250ZW50RG9jdW1lbnQiLCJpbm5lclRleHQiLCJjbG9zZUJ1dHRvbkVsZW1lbnQiLCJhcmlhTGFiZWwiLCJvdmVybGF5U2VydmljZSIsIm9uTG9hZCIsImVuc3VyZU92ZXJsYXlFeGlzdHMiLCJpbm5lckhUTUwiLCJoaWRlIiwic2hvdyIsImVudHJ5RWxlbWVudCIsIm1zZ1N0eWxlIiwidHlwZUVsZW1lbnQiLCJtb2R1bGVJZGVudGlmaWVyIiwiZmV0Y2giLCJtZXNzYWdlVGV4dE5vZGUiLCJfcmVmMyIsIl9yZWYzJGxldmVsIiwiaGFuZGxlRXJyb3IiLCJmYWxsYmFja01lc3NhZ2UiLCJlcnJvck9iamVjdCIsInNob3VsZERpc3BsYXkiLCJlcnJvckV2ZW50IiwiaW5jbHVkZXMiLCJwcm9taXNlUmVqZWN0aW9uRXZlbnQiLCJyZWFzb24iLCJfY2FsbFN1cGVyIiwiX2dldFByb3RvdHlwZU9mIiwiX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0IiwiY29uc3RydWN0IiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsIlJlZmVyZW5jZUVycm9yIiwiX2luaGVyaXRzIiwiX3NldFByb3RvdHlwZU9mIiwiX3dyYXBOYXRpdmVTdXBlciIsIl9pc05hdGl2ZUZ1bmN0aW9uIiwiaGFzIiwiV3JhcHBlciIsIl9jb25zdHJ1Y3QiLCJwIiwiQm9vbGVhbiIsInZhbHVlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIl9jbGFzc1ByaXZhdGVNZXRob2RJbml0U3BlYyIsIl9jaGVja1ByaXZhdGVSZWRlY2xhcmF0aW9uIiwiYWRkIiwiX2Fzc2VydENsYXNzQnJhbmQiLCJIVE1MRWxlbWVudCIsImF0dGFjaFNoYWRvdyIsIl9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MiLCJjdXN0b21FbGVtZW50cyIsIl9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3NfYnJhbmQiLCJXZWFrU2V0IiwiV2VicGFja0RldlNlcnZlclByb2dyZXNzIiwiX0hUTUxFbGVtZW50IiwiX3RoaXMiLCJtb2RlIiwibWF4RGFzaE9mZnNldCIsImFuaW1hdGlvblRpbWVyIiwiY29ubmVjdGVkQ2FsbGJhY2siLCJfcmVzZXQiLCJhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2siLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwiX3VwZGF0ZSIsIl90aGlzJGdldEF0dHJpYnV0ZSIsIl9OdW1iZXIiLCJ0eXBlQXR0ciIsIl9jaXJjdWxhclRlbXBsYXRlIiwiX2xpbmVhclRlbXBsYXRlIiwic2hhZG93Um9vdCIsImluaXRpYWxQcm9ncmVzcyIsIm9mZnNldCIsInN0cm9rZURhc2hvZmZzZXQiLCJ0ZXh0Q29udGVudCIsIl9oaWRlIiwiX3Nob3ciLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJfdGhpczIiLCJkZWZpbmUiLCJDbGllbnQiLCJfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyIsInJldHJpZXMiLCJtYXhSZXRyaWVzIiwiaW5pdFNvY2tldCIsImhhbmRsZXJzIiwicmV0cnlJbk1zIiwiTWF0aCIsInBvdyIsInJhbmRvbSIsImRlZmF1bHRMZXZlbCIsInNlbmRNc2ciLCJXb3JrZXJHbG9iYWxTY29wZSIsImxhc3RIYXNoIiwidXBUb0RhdGUiLCJjaGVjayIsInRoZW4iLCJ1cGRhdGVkTW9kdWxlcyIsImNhdGNoIiwiZm9ybWF0RXJyb3IiLCJyZW5ld2VkTW9kdWxlcyIsInVuYWNjZXB0ZWRNb2R1bGVzIiwicGFydHMiLCJudW1iZXJJZHMiLCJldmVyeSIsImxvZ0xldmVsIiwiZHVtbXkiLCJzaG91bGRMb2ciLCJsb2dHcm91cCIsImxvZ0ZuIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=