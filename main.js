/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ (function(module) {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }
  if (!url) {
    return url;
  }

  // eslint-disable-next-line no-underscore-dangle, no-param-reassign
  url = String(url.__esModule ? url.default : url);
  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }
  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COMPLETE_NOTIFICATION: function() { return /* binding */ COMPLETE_NOTIFICATION; },
/* harmony export */   createNotification: function() { return /* binding */ createNotification; },
/* harmony export */   errorNotification: function() { return /* binding */ errorNotification; },
/* harmony export */   nextNotification: function() { return /* binding */ nextNotification; }
/* harmony export */ });
var COMPLETE_NOTIFICATION = function () {
  return createNotification('C', undefined, undefined);
}();
function errorNotification(error) {
  return createNotification('E', undefined, error);
}
function nextNotification(value) {
  return createNotification('N', value, undefined);
}
function createNotification(kind, value, error) {
  return {
    kind: kind,
    value: value,
    error: error
  };
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Observable.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Observable.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Observable: function() { return /* binding */ Observable; }
/* harmony export */ });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./symbol/observable */ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/pipe */ "./node_modules/rxjs/dist/esm5/internal/util/pipe.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/errorContext */ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js");







var Observable = function () {
  function Observable(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable.prototype.lift = function (operator) {
    var observable = new Observable();
    observable.source = this;
    observable.operator = operator;
    return observable;
  };
  Observable.prototype.subscribe = function (observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber(observerOrNext, error, complete);
    (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_1__.errorContext)(function () {
      var _a = _this,
        operator = _a.operator,
        source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable.prototype._trySubscribe = function (sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable.prototype.forEach = function (next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function (resolve, reject) {
      var subscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
        next: function (value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable.prototype._subscribe = function (subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable.prototype[_symbol_observable__WEBPACK_IMPORTED_MODULE_2__.observable] = function () {
    return this;
  };
  Observable.prototype.pipe = function () {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return (0,_util_pipe__WEBPACK_IMPORTED_MODULE_3__.pipeFromArray)(operations)(this);
  };
  Observable.prototype.toPromise = function (promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function (resolve, reject) {
      var value;
      _this.subscribe(function (x) {
        return value = x;
      }, function (err) {
        return reject(err);
      }, function () {
        return resolve(value);
      });
    });
  };
  Observable.create = function (subscribe) {
    return new Observable(subscribe);
  };
  return Observable;
}();

function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : _config__WEBPACK_IMPORTED_MODULE_4__.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.next) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.error) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber || isObserver(value) && (0,_Subscription__WEBPACK_IMPORTED_MODULE_6__.isSubscription)(value);
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Scheduler.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Scheduler.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Scheduler: function() { return /* binding */ Scheduler; }
/* harmony export */ });
/* harmony import */ var _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler/dateTimestampProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js");

var Scheduler = function () {
  function Scheduler(schedulerActionCtor, now) {
    if (now === void 0) {
      now = Scheduler.now;
    }
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now;
  }
  Scheduler.prototype.schedule = function (work, delay, state) {
    if (delay === void 0) {
      delay = 0;
    }
    return new this.schedulerActionCtor(this, work).schedule(state, delay);
  };
  Scheduler.now = _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_0__.dateTimestampProvider.now;
  return Scheduler;
}();


/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Subscriber.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY_OBSERVER: function() { return /* binding */ EMPTY_OBSERVER; },
/* harmony export */   SafeSubscriber: function() { return /* binding */ SafeSubscriber; },
/* harmony export */   Subscriber: function() { return /* binding */ Subscriber; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/reportUnhandledError */ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/noop */ "./node_modules/rxjs/dist/esm5/internal/util/noop.js");
/* harmony import */ var _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationFactories */ "./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduler/timeoutProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/errorContext */ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js");









var Subscriber = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subscriber, _super);
  function Subscriber(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if ((0,_Subscription__WEBPACK_IMPORTED_MODULE_1__.isSubscription)(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber.create = function (next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber.prototype.next = function (value) {
    if (this.isStopped) {
      handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.nextNotification)(value), this);
    } else {
      this._next(value);
    }
  };
  Subscriber.prototype.error = function (err) {
    if (this.isStopped) {
      handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.errorNotification)(err), this);
    } else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber.prototype.complete = function () {
    if (this.isStopped) {
      handleStoppedNotification(_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.COMPLETE_NOTIFICATION, this);
    } else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber.prototype.unsubscribe = function () {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber.prototype._next = function (value) {
    this.destination.next(value);
  };
  Subscriber.prototype._error = function (err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber.prototype._complete = function () {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription);

var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
var ConsumerObserver = function () {
  function ConsumerObserver(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver.prototype.next = function (value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver.prototype.error = function (err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver.prototype.complete = function () {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver;
}();
var SafeSubscriber = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(SafeSubscriber, _super);
  function SafeSubscriber(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined,
        error: error !== null && error !== void 0 ? error : undefined,
        complete: complete !== null && complete !== void 0 ? complete : undefined
      };
    } else {
      var context_1;
      if (_this && _config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);
        context_1.unsubscribe = function () {
          return _this.unsubscribe();
        };
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context_1),
          error: observerOrNext.error && bind(observerOrNext.error, context_1),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber;
}(Subscriber);

function handleUnhandledError(error) {
  if (_config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedSynchronousErrorHandling) {
    (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_5__.captureError)(error);
  } else {
    (0,_util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__.reportUnhandledError)(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
function handleStoppedNotification(notification, subscriber) {
  var onStoppedNotification = _config__WEBPACK_IMPORTED_MODULE_4__.config.onStoppedNotification;
  onStoppedNotification && _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__.timeoutProvider.setTimeout(function () {
    return onStoppedNotification(notification, subscriber);
  });
}
var EMPTY_OBSERVER = {
  closed: true,
  next: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
  error: defaultErrorHandler,
  complete: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop
};

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Subscription.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Subscription.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY_SUBSCRIPTION: function() { return /* binding */ EMPTY_SUBSCRIPTION; },
/* harmony export */   Subscription: function() { return /* binding */ Subscription; },
/* harmony export */   isSubscription: function() { return /* binding */ isSubscription; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/UnsubscriptionError */ "./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/arrRemove */ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");




var Subscription = function () {
  function Subscription(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription.prototype.unsubscribe = function () {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError) {
                errors = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(errors)), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError(errors);
      }
    }
  };
  Subscription.prototype.add = function (teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription.prototype._hasParent = function (parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription.prototype._addParent = function (parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription.prototype._removeParent = function (parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_parentage, parent);
    }
  };
  Subscription.prototype.remove = function (teardown) {
    var _finalizers = this._finalizers;
    _finalizers && (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_finalizers, teardown);
    if (teardown instanceof Subscription) {
      teardown._removeParent(this);
    }
  };
  Subscription.EMPTY = function () {
    var empty = new Subscription();
    empty.closed = true;
    return empty;
  }();
  return Subscription;
}();

var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && 'closed' in value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.remove) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.add) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/config.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/config.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: function() { return /* binding */ config; }
/* harmony export */ });
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: undefined,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromEvent: function() { return /* binding */ fromEvent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../operators/mergeMap */ "./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isArrayLike */ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/mapOneOrManyArgs */ "./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js");







var nodeEventEmitterMethods = ['addListener', 'removeListener'];
var eventTargetMethods = ['addEventListener', 'removeEventListener'];
var jqueryMethods = ['on', 'off'];
function fromEvent(target, eventName, options, resultSelector) {
  if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(options)) {
    resultSelector = options;
    options = undefined;
  }
  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe((0,_util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__.mapOneOrManyArgs)(resultSelector));
  }
  var _a = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__read)(isEventTarget(target) ? eventTargetMethods.map(function (methodName) {
      return function (handler) {
        return target[methodName](eventName, handler, options);
      };
    }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2),
    add = _a[0],
    remove = _a[1];
  if (!add) {
    if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__.isArrayLike)(target)) {
      return (0,_operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__.mergeMap)(function (subTarget) {
        return fromEvent(subTarget, eventName, options);
      })((0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__.innerFrom)(target));
    }
  }
  if (!add) {
    throw new TypeError('Invalid event target');
  }
  return new _Observable__WEBPACK_IMPORTED_MODULE_6__.Observable(function (subscriber) {
    var handler = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return subscriber.next(1 < args.length ? args : args[0]);
    };
    add(handler);
    return function () {
      return remove(handler);
    };
  });
}
function toCommonHandlerRegistry(target, eventName) {
  return function (methodName) {
    return function (handler) {
      return target[methodName](eventName, handler);
    };
  };
}
function isNodeStyleEventEmitter(target) {
  return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.addListener) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
  return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.on) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.off);
}
function isEventTarget(target) {
  return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.addEventListener) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.removeEventListener);
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromArrayLike: function() { return /* binding */ fromArrayLike; },
/* harmony export */   fromAsyncIterable: function() { return /* binding */ fromAsyncIterable; },
/* harmony export */   fromInteropObservable: function() { return /* binding */ fromInteropObservable; },
/* harmony export */   fromIterable: function() { return /* binding */ fromIterable; },
/* harmony export */   fromPromise: function() { return /* binding */ fromPromise; },
/* harmony export */   fromReadableStreamLike: function() { return /* binding */ fromReadableStreamLike; },
/* harmony export */   innerFrom: function() { return /* binding */ innerFrom; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArrayLike */ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isPromise */ "./node_modules/rxjs/dist/esm5/internal/util/isPromise.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isInteropObservable */ "./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js");
/* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isAsyncIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js");
/* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/throwUnobservableError */ "./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js");
/* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/isIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isIterable.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/reportUnhandledError */ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../symbol/observable */ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js");












function innerFrom(input) {
  if (input instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable) {
    return input;
  }
  if (input != null) {
    if ((0,_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__.isInteropObservable)(input)) {
      return fromInteropObservable(input);
    }
    if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__.isArrayLike)(input)) {
      return fromArrayLike(input);
    }
    if ((0,_util_isPromise__WEBPACK_IMPORTED_MODULE_3__.isPromise)(input)) {
      return fromPromise(input);
    }
    if ((0,_util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__.isAsyncIterable)(input)) {
      return fromAsyncIterable(input);
    }
    if ((0,_util_isIterable__WEBPACK_IMPORTED_MODULE_5__.isIterable)(input)) {
      return fromIterable(input);
    }
    if ((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.isReadableStreamLike)(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw (0,_util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__.createInvalidObservableTypeError)(input);
}
function fromInteropObservable(obj) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
    var obs = obj[_symbol_observable__WEBPACK_IMPORTED_MODULE_8__.observable]();
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_9__.isFunction)(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError('Provided object does not correctly implement Symbol.observable');
  });
}
function fromArrayLike(array) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
    promise.then(function (value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function (err) {
      return subscriber.error(err);
    }).then(null, _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__.reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__values)(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
    process(asyncIterable, subscriber).catch(function (err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.readableStreamLikeToAsyncGenerator)(readableStream));
}
function process(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function () {
    var value, e_2_1;
    return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__generator)(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__asyncValues)(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = {
            error: e_2_1
          };
          return [3, 11];
        case 6:
          _b.trys.push([6,, 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2) throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js":
/*!******************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OperatorSubscriber: function() { return /* binding */ OperatorSubscriber; },
/* harmony export */   createOperatorSubscriber: function() { return /* binding */ createOperatorSubscriber; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js");


function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(OperatorSubscriber, _super);
  function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function (value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function (err) {
      try {
        onError(err);
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function () {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber.prototype.unsubscribe = function () {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__.Subscriber);


/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js":
/*!************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounceTime: function() { return /* binding */ debounceTime; }
/* harmony export */ });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/dist/esm5/internal/scheduler/async.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function debounceTime(dueTime, scheduler) {
  if (scheduler === void 0) {
    scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.asyncScheduler;
  }
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (source, subscriber) {
    var activeTask = null;
    var lastValue = null;
    var lastTime = null;
    var emit = function () {
      if (activeTask) {
        activeTask.unsubscribe();
        activeTask = null;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };
    function emitWhenIdle() {
      var targetTime = lastTime + dueTime;
      var now = scheduler.now();
      if (now < targetTime) {
        activeTask = this.schedule(undefined, targetTime - now);
        subscriber.add(activeTask);
        return;
      }
      emit();
    }
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, function (value) {
      lastValue = value;
      lastTime = scheduler.now();
      if (!activeTask) {
        activeTask = scheduler.schedule(emitWhenIdle, dueTime);
        subscriber.add(activeTask);
      }
    }, function () {
      emit();
      subscriber.complete();
    }, undefined, function () {
      lastValue = activeTask = null;
    }));
  });
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js":
/*!********************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   distinctUntilChanged: function() { return /* binding */ distinctUntilChanged; }
/* harmony export */ });
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/identity */ "./node_modules/rxjs/dist/esm5/internal/util/identity.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function distinctUntilChanged(comparator, keySelector) {
  if (keySelector === void 0) {
    keySelector = _util_identity__WEBPACK_IMPORTED_MODULE_0__.identity;
  }
  comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (source, subscriber) {
    var previousKey;
    var first = true;
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, function (value) {
      var currentKey = keySelector(value);
      if (first || !comparator(previousKey, currentKey)) {
        first = false;
        previousKey = currentKey;
        subscriber.next(value);
      }
    }));
  });
}
function defaultCompare(a, b) {
  return a === b;
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/filter.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/filter.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filter: function() { return /* binding */ filter; }
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function filter(predicate, thisArg) {
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
    var index = 0;
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) {
      return predicate.call(thisArg, value, index++) && subscriber.next(value);
    }));
  });
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/map.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/map.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   map: function() { return /* binding */ map; }
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function map(project, thisArg) {
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
    var index = 0;
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeInternals: function() { return /* binding */ mergeInternals; }
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/executeSchedule */ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
  var buffer = [];
  var active = 0;
  var index = 0;
  var isComplete = false;
  var checkComplete = function () {
    if (isComplete && !buffer.length && !active) {
      subscriber.complete();
    }
  };
  var outerNext = function (value) {
    return active < concurrent ? doInnerSub(value) : buffer.push(value);
  };
  var doInnerSub = function (value) {
    expand && subscriber.next(value);
    active++;
    var innerComplete = false;
    (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(project(value, index++)).subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (innerValue) {
      onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
      if (expand) {
        outerNext(innerValue);
      } else {
        subscriber.next(innerValue);
      }
    }, function () {
      innerComplete = true;
    }, undefined, function () {
      if (innerComplete) {
        try {
          active--;
          var _loop_1 = function () {
            var bufferedValue = buffer.shift();
            if (innerSubScheduler) {
              (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, innerSubScheduler, function () {
                return doInnerSub(bufferedValue);
              });
            } else {
              doInnerSub(bufferedValue);
            }
          };
          while (buffer.length && active < concurrent) {
            _loop_1();
          }
          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  };
  source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, outerNext, function () {
    isComplete = true;
    checkComplete();
  }));
  return function () {
    additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
  };
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js":
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeMap: function() { return /* binding */ mergeMap; }
/* harmony export */ });
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _mergeInternals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mergeInternals */ "./node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");





function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(resultSelector)) {
    return mergeMap(function (a, i) {
      return (0,_map__WEBPACK_IMPORTED_MODULE_1__.map)(function (b, ii) {
        return resultSelector(a, b, i, ii);
      })((0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(project(a, i)));
    }, concurrent);
  } else if (typeof resultSelector === 'number') {
    concurrent = resultSelector;
  }
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_3__.operate)(function (source, subscriber) {
    return (0,_mergeInternals__WEBPACK_IMPORTED_MODULE_4__.mergeInternals)(source, subscriber, project, concurrent);
  });
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   switchMap: function() { return /* binding */ switchMap; }
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function switchMap(project, resultSelector) {
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
    var innerSubscriber = null;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
      return isComplete && !innerSubscriber && subscriber.complete();
    };
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) {
      innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
      var innerIndex = 0;
      var outerIndex = index++;
      (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(project(value, outerIndex)).subscribe(innerSubscriber = (0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (innerValue) {
        return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
      }, function () {
        innerSubscriber = null;
        checkComplete();
      }));
    }, function () {
      isComplete = true;
      checkComplete();
    }));
  });
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/Action.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/Action.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Action: function() { return /* binding */ Action; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");


var Action = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Action, _super);
  function Action(scheduler, work) {
    return _super.call(this) || this;
  }
  Action.prototype.schedule = function (state, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return this;
  };
  return Action;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription);


/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncAction: function() { return /* binding */ AsyncAction; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Action */ "./node_modules/rxjs/dist/esm5/internal/scheduler/Action.js");
/* harmony import */ var _intervalProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./intervalProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/arrRemove */ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");




var AsyncAction = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AsyncAction, _super);
  function AsyncAction(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }
  AsyncAction.prototype.schedule = function (state, delay) {
    var _a;
    if (delay === void 0) {
      delay = 0;
    }
    if (this.closed) {
      return this;
    }
    this.state = state;
    var id = this.id;
    var scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }
    this.pending = true;
    this.delay = delay;
    this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
    return this;
  };
  AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return _intervalProvider__WEBPACK_IMPORTED_MODULE_1__.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
  };
  AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    if (delay != null && this.delay === delay && this.pending === false) {
      return id;
    }
    if (id != null) {
      _intervalProvider__WEBPACK_IMPORTED_MODULE_1__.intervalProvider.clearInterval(id);
    }
    return undefined;
  };
  AsyncAction.prototype.execute = function (state, delay) {
    if (this.closed) {
      return new Error('executing a cancelled action');
    }
    this.pending = false;
    var error = this._execute(state, delay);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };
  AsyncAction.prototype._execute = function (state, _delay) {
    var errored = false;
    var errorValue;
    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = e ? e : new Error('Scheduled action threw falsy error');
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };
  AsyncAction.prototype.unsubscribe = function () {
    if (!this.closed) {
      var _a = this,
        id = _a.id,
        scheduler = _a.scheduler;
      var actions = scheduler.actions;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_2__.arrRemove)(actions, this);
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
      _super.prototype.unsubscribe.call(this);
    }
  };
  return AsyncAction;
}(_Action__WEBPACK_IMPORTED_MODULE_3__.Action);


/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncScheduler: function() { return /* binding */ AsyncScheduler; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Scheduler */ "./node_modules/rxjs/dist/esm5/internal/Scheduler.js");


var AsyncScheduler = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AsyncScheduler, _super);
  function AsyncScheduler(SchedulerAction, now) {
    if (now === void 0) {
      now = _Scheduler__WEBPACK_IMPORTED_MODULE_1__.Scheduler.now;
    }
    var _this = _super.call(this, SchedulerAction, now) || this;
    _this.actions = [];
    _this._active = false;
    return _this;
  }
  AsyncScheduler.prototype.flush = function (action) {
    var actions = this.actions;
    if (this._active) {
      actions.push(action);
      return;
    }
    var error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsyncScheduler;
}(_Scheduler__WEBPACK_IMPORTED_MODULE_1__.Scheduler);


/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/async.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/async.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   async: function() { return /* binding */ async; },
/* harmony export */   asyncScheduler: function() { return /* binding */ asyncScheduler; }
/* harmony export */ });
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncAction */ "./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js");
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncScheduler */ "./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js");


var asyncScheduler = new _AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__.AsyncScheduler(_AsyncAction__WEBPACK_IMPORTED_MODULE_1__.AsyncAction);
var async = asyncScheduler;

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dateTimestampProvider: function() { return /* binding */ dateTimestampProvider; }
/* harmony export */ });
var dateTimestampProvider = {
  now: function () {
    return (dateTimestampProvider.delegate || Date).now();
  },
  delegate: undefined
};

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js":
/*!****************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   intervalProvider: function() { return /* binding */ intervalProvider; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");

var intervalProvider = {
  setInterval: function (handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = intervalProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
      return delegate.setInterval.apply(delegate, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
    }
    return setInterval.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
  },
  clearInterval: function (handle) {
    var delegate = intervalProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
  },
  delegate: undefined
};

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   timeoutProvider: function() { return /* binding */ timeoutProvider; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");

var timeoutProvider = {
  setTimeout: function (handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = timeoutProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
      return delegate.setTimeout.apply(delegate, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
    }
    return setTimeout.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
  },
  clearTimeout: function (handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: undefined
};

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSymbolIterator: function() { return /* binding */ getSymbolIterator; },
/* harmony export */   iterator: function() { return /* binding */ iterator; }
/* harmony export */ });
function getSymbolIterator() {
  if (typeof Symbol !== 'function' || !Symbol.iterator) {
    return '@@iterator';
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/symbol/observable.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observable: function() { return /* binding */ observable; }
/* harmony export */ });
var observable = function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}();

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnsubscriptionError: function() { return /* binding */ UnsubscriptionError; }
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var UnsubscriptionError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) {
      return i + 1 + ") " + err.toString();
    }).join('\n  ') : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
  };
});

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrRemove: function() { return /* binding */ arrRemove; }
/* harmony export */ });
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createErrorClass: function() { return /* binding */ createErrorClass; }
/* harmony export */ });
function createErrorClass(createImpl) {
  var _super = function (instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/errorContext.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   captureError: function() { return /* binding */ captureError; },
/* harmony export */   errorContext: function() { return /* binding */ errorContext; }
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./node_modules/rxjs/dist/esm5/internal/config.js");

var context = null;
function errorContext(cb) {
  if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling) {
    var isRoot = !context;
    if (isRoot) {
      context = {
        errorThrown: false,
        error: null
      };
    }
    cb();
    if (isRoot) {
      var _a = context,
        errorThrown = _a.errorThrown,
        error = _a.error;
      context = null;
      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}
function captureError(err) {
  if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling && context) {
    context.errorThrown = true;
    context.error = err;
  }
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeSchedule: function() { return /* binding */ executeSchedule; }
/* harmony export */ });
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
  if (delay === void 0) {
    delay = 0;
  }
  if (repeat === void 0) {
    repeat = false;
  }
  var scheduleSubscription = scheduler.schedule(function () {
    work();
    if (repeat) {
      parentSubscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);
  parentSubscription.add(scheduleSubscription);
  if (!repeat) {
    return scheduleSubscription;
  }
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/identity.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/identity.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   identity: function() { return /* binding */ identity; }
/* harmony export */ });
function identity(x) {
  return x;
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isArrayLike: function() { return /* binding */ isArrayLike; }
/* harmony export */ });
var isArrayLike = function (x) {
  return x && typeof x.length === 'number' && typeof x !== 'function';
};

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAsyncIterable: function() { return /* binding */ isAsyncIterable; }
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isAsyncIterable(obj) {
  return Symbol.asyncIterator && (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isFunction.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isFunction: function() { return /* binding */ isFunction; }
/* harmony export */ });
function isFunction(value) {
  return typeof value === 'function';
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isInteropObservable: function() { return /* binding */ isInteropObservable; }
/* harmony export */ });
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/observable */ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isInteropObservable(input) {
  return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input[_symbol_observable__WEBPACK_IMPORTED_MODULE_1__.observable]);
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isIterable.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isIterable.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isIterable: function() { return /* binding */ isIterable; }
/* harmony export */ });
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/iterator */ "./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isIterable(input) {
  return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input === null || input === void 0 ? void 0 : input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_1__.iterator]);
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isPromise.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isPromise.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isPromise: function() { return /* binding */ isPromise; }
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isPromise(value) {
  return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value === null || value === void 0 ? void 0 : value.then);
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isReadableStreamLike: function() { return /* binding */ isReadableStreamLike; },
/* harmony export */   readableStreamLikeToAsyncGenerator: function() { return /* binding */ readableStreamLikeToAsyncGenerator; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function readableStreamLikeToAsyncGenerator(readableStream) {
  return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__asyncGenerator)(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1,, 9, 10]);
          _b.label = 2;
        case 2:
          if (false) {}
          return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done) return [3, 5];
          return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return (0,_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/lift.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/lift.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasLift: function() { return /* binding */ hasLift; },
/* harmony export */   operate: function() { return /* binding */ operate; }
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function hasLift(source) {
  return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
  return function (source) {
    if (hasLift(source)) {
      return source.lift(function (liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError('Unable to lift unknown Observable type');
  };
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapOneOrManyArgs: function() { return /* binding */ mapOneOrManyArgs; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/map */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");


var isArray = Array.isArray;
function callOrApply(fn, args) {
  return isArray(args) ? fn.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
  return (0,_operators_map__WEBPACK_IMPORTED_MODULE_1__.map)(function (args) {
    return callOrApply(fn, args);
  });
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/noop.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/noop.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   noop: function() { return /* binding */ noop; }
/* harmony export */ });
function noop() {}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/pipe.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/pipe.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pipe: function() { return /* binding */ pipe; },
/* harmony export */   pipeFromArray: function() { return /* binding */ pipeFromArray; }
/* harmony export */ });
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity */ "./node_modules/rxjs/dist/esm5/internal/util/identity.js");

function pipe() {
  var fns = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    fns[_i] = arguments[_i];
  }
  return pipeFromArray(fns);
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return _identity__WEBPACK_IMPORTED_MODULE_0__.identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function (prev, fn) {
      return fn(prev);
    }, input);
  };
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reportUnhandledError: function() { return /* binding */ reportUnhandledError; }
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/timeoutProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");


function reportUnhandledError(err) {
  _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__.timeoutProvider.setTimeout(function () {
    var onUnhandledError = _config__WEBPACK_IMPORTED_MODULE_1__.config.onUnhandledError;
    if (onUnhandledError) {
      onUnhandledError(err);
    } else {
      throw err;
    }
  });
}

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createInvalidObservableTypeError: function() { return /* binding */ createInvalidObservableTypeError; }
/* harmony export */ });
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}

/***/ }),

/***/ "./src/js/AsidePanelController.js":
/*!****************************************!*\
  !*** ./src/js/AsidePanelController.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ AsidePanelController; }
/* harmony export */ });
class AsidePanelController {
  constructor(asidePanel, asideBtn, filtrator) {
    this.panel = asidePanel;
    this.btn = asideBtn;
    this.filtrator = filtrator;
    this.panelItems = this.panel.querySelectorAll('.menu_item');
    this.counters = this.createCountersObj();
    this.markActive = false;
    this.activeFilter = document.getElementById('all');
    this.activatorFilter = this.activatorFilter.bind(this);
    this.updateCountAll = this.updateCountAll.bind(this);
  }
  createCountersObj() {
    const arrCounters = [...this.panel.querySelectorAll('.item_counter')];
    const result = {};
    for (let i = 0; i < arrCounters.length; i += 1) {
      result[arrCounters[i].dataset.id] = arrCounters[i];
    }
    return result;
  }
  activation() {
    this.btn.addEventListener('click', e => {
      e.preventDefault();
      this.markActive = !this.markActive;
      if (this.markActive) this.addListeners();else this.removeListeners();
      this.btn.classList.toggle('aside-active');
      this.panel.classList.toggle('hidden');
    });
  }
  addListeners() {
    this.panelItems.forEach(item => item.addEventListener('click', this.activatorFilter));
  }
  removeListeners() {
    this.panelItems.forEach(item => item.removeEventListener('click', this.activatorFilter));
  }
  activatorFilter(e) {
    if (this.activeFilter) this.activeFilter.classList.remove('active-filter');
    this.activeFilter = e.currentTarget;
    this.activeFilter.classList.add('active-filter');
    this.filtrator(this.activeFilter.id);
  }
  updateCount(filter, value) {
    this.counters[filter].textContent = value;
  }
  updateCountAll(countList) {
    countList.forEach(c => this.updateCount(c.filter, c.count));
  }
}

/***/ }),

/***/ "./src/js/Auxiliary Tools/CounterTime.js":
/*!***********************************************!*\
  !*** ./src/js/Auxiliary Tools/CounterTime.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CounterTime; }
/* harmony export */ });
class CounterTime {
  constructor(element) {
    this.element = element;
    this.intervalId = null;
  }
  startCounter() {
    let minutesTen = 0;
    let minutesUnit = 0;
    let secondsTen = 0;
    let secondsUnit = 0;
    this.element.textContent = `${minutesTen}${minutesUnit}:${secondsTen}${secondsUnit}`;
    this.intervalId = setInterval(() => {
      secondsUnit += 1;
      if (secondsUnit === 10) {
        secondsUnit = 0;
        secondsTen += 1;
      }
      if (secondsTen === 6) {
        secondsTen = 0;
        minutesUnit += 1;
      }
      if (minutesUnit === 10) {
        minutesUnit = 0;
        minutesTen += 1;
      }
      if (minutesTen === 6) this.element.textContent = 'end';
      this.element.textContent = `${minutesTen}${minutesUnit}:${secondsTen}${secondsUnit}`;
    }, 1000);
  }
  stopCounter() {
    this.element.textContent = '';
    clearInterval(this.intervalId);
  }
}

/***/ }),

/***/ "./src/js/Auxiliary Tools/Curtain.js":
/*!*******************************************!*\
  !*** ./src/js/Auxiliary Tools/Curtain.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Curtain; }
/* harmony export */ });
class Curtain {
  constructor(element) {
    this.element = element;
  }
  showCurtain(zIndex, color) {
    if (zIndex) this.element.style.zIndex = zIndex;
    if (color) this.element.style.backgroundColor = color;
    this.element.classList.remove('hidden');
  }
  hideCurtain() {
    if (this.element.style) this.element.removeAttribute('style');
    this.element.classList.add('hidden');
  }
}

/***/ }),

/***/ "./src/js/Auxiliary Tools/ShowErrorMessage.js":
/*!****************************************************!*\
  !*** ./src/js/Auxiliary Tools/ShowErrorMessage.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ShowErrorMessage; }
/* harmony export */ });
class ShowErrorMessage {
  constructor(container, classNameBox, classNameMessage, classNameBtn, classNameHide, curtain) {
    this.container = container;
    this.classNameBox = classNameBox;
    this.classNameMessage = classNameMessage;
    this.classNameHide = classNameHide;
    this.classNameBtn = classNameBtn;
    this.curtain = curtain;
    this.errorMessageBox = this.container.querySelector(`.${this.classNameBox}`);
    this.errorMessage = this.errorMessageBox.querySelector(`.${this.classNameMessage}`);
    this.errorBtnOK = this.errorMessageBox.querySelector(`.${classNameBtn}`);
    this.hideMessage = this.hideMessage.bind(this);
  }
  showMessage(message) {
    if (message) this.errorMessage.textContent = message;
    this.curtain.showCurtain('9995', 'red');
    this.errorMessageBox.classList.remove(this.classNameHide);
    this.errorMessageBox.style.left = `${this.container.offsetWidth / 2 - this.errorMessageBox.offsetWidth / 2}px`;
    this.errorMessageBox.style.top = `${this.container.offsetHeight / 2 - this.errorMessageBox.offsetHeight / 2}px`;
    this.errorBtnOK.addEventListener('click', this.hideMessage);
  }
  hideMessage() {
    this.errorMessage.textContent = '';
    this.curtain.hideCurtain();
    this.errorMessageBox.classList.add(this.classNameHide);
    this.errorBtnOK.removeEventListener('click', this.hideMessage);
  }
}

/***/ }),

/***/ "./src/js/Auxiliary Tools/ShowInform.js":
/*!**********************************************!*\
  !*** ./src/js/Auxiliary Tools/ShowInform.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ShowInform; }
/* harmony export */ });
class ShowInform {
  constructor(container, curtain) {
    this.container = container;
    this.curtain = curtain;
    this.informBox = this.container.querySelector('.inform_box');
    this.messageEl = this.informBox.querySelector('.inform_message');
    this.btnOk = this.informBox.querySelector('.inform_ok');
    this.hideMessage = this.hideMessage.bind(this);
  }
  showMessage(message) {
    this.informBox.classList.remove('hidden');
    this.curtain.showCurtain('995');
    this.messageEl.textContent = message;
    this.informBox.style.left = `${this.container.offsetWidth / 2 - this.informBox.offsetWidth / 2}px`;
    this.informBox.style.top = `${this.container.offsetHeight / 2 - this.informBox.offsetHeight / 2}px`;
    this.btnOk.addEventListener('click', this.hideMessage);
  }
  hideMessage() {
    this.messageEl.textContent = '';
    this.informBox.classList.add('hidden');
    this.curtain.hideCurtain();
    this.btnOk.removeEventListener('click', this.hideMessage);
  }
}

/***/ }),

/***/ "./src/js/Auxiliary Tools/ToolTip.js":
/*!*******************************************!*\
  !*** ./src/js/Auxiliary Tools/ToolTip.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ToolTip; }
/* harmony export */ });
class ToolTip {
  constructor() {
    this.toolTipsBox = [];
    this.clessesList = {
      up: 'tooltip-up',
      down: 'tooltip-down'
    };
  }
  showToolTip(element, message, position) {
    const toolTip = document.createElement('div');
    toolTip.classList.add('tooltip', this.clessesList[position]);
    toolTip.textContent = message;
    toolTip.dataset.name = element.name;
    this.toolTipsBox.push(toolTip);
    document.body.append(toolTip);
    const {
      top,
      bottom,
      left
    } = element.getBoundingClientRect();
    const offsetHorizont = (toolTip.offsetWidth - element.offsetWidth) / 2;
    toolTip.style.left = `${left - offsetHorizont}px`;
    if (position === 'down') toolTip.style.top = `${bottom + 5}px`;
    if (position === 'up') toolTip.style.top = `${top - toolTip.offsetHeight - 10}px`;
  }
  hideAllToolTips() {
    for (let i = 0; i < this.toolTipsBox.length; i += 1) {
      this.toolTipsBox[i].remove();
    }
    this.toolTipsBox = [];
  }
  hideToolTip(name) {
    const hideToolTip = this.toolTipsBox.find(t => t.dataset.name === name);
    hideToolTip.remove();
    this.toolTipsBox = this.toolTipsBox.filter(t => t !== hideToolTip);
  }
  isToolTip() {
    if (this.toolTipsBox.length !== 0) return true;
    return false;
  }
}

/***/ }),

/***/ "./src/js/Bot/BotCommunicator.js":
/*!***************************************!*\
  !*** ./src/js/Bot/BotCommunicator.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BotCommunicator; }
/* harmony export */ });
class BotCommunicator {
  constructor(port) {
    this.port = port;
  }
  getInfo(code) {
    const url = `${this.port}/bot/${code}`;
    const response = fetch(url);
    return response;
  }
}

/***/ }),

/***/ "./src/js/Bot/BotController.js":
/*!*************************************!*\
  !*** ./src/js/Bot/BotController.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BotController; }
/* harmony export */ });
class BotController {
  constructor(widget, communicator, errMessage, toolTip, informWidget) {
    this.widget = widget;
    this.communicator = communicator;
    this.errMessage = errMessage;
    this.toolTip = toolTip;
    this.informWidget = informWidget;
    this.statusBot = false;
    this.selectorsIgnoreClick = ['.options-bot_box', '.bot-info_container'];
    this.commandList = [{
      command: 'погода',
      commandCode: 'wheather'
    }, {
      command: 'валюта',
      commandCode: 'currency'
    }, {
      command: 'новости',
      commandCode: 'news'
    }, {
      command: 'афиша',
      commandCode: 'poster'
    }, {
      command: 'картинка',
      commandCode: 'image'
    }];
    this.showInputBot = this.showInputBot.bind(this);
    this.validationCommand = this.validationCommand.bind(this);
  }
  activation() {
    this.widget.btnBotCntl.addEventListener('click', this.showInputBot);
    this.widget.input.addEventListener('keydown', e => {
      if (e.keyCode === 13) this.validationCommand(e.target.value);
    });
    this.widget.input.addEventListener('input', () => {
      if (this.toolTip.isToolTip()) this.toolTip.hideAllToolTips();
    });
  }
  showInputBot() {
    this.widget.searchInputBox.classList.toggle('options-active');
    this.widget.botInputBox.classList.toggle('options-active');
    this.validationBotStatus();
    this.statusBot = !this.statusBot;
  }
  validationBotStatus() {
    if (this.statusBot) this.widget.hideBotInform();
  }
  isFairTarget(target) {
    if (this.selectorsIgnoreClick.filter(s => target.closest(s)).length !== 0) return false;
    return true;
  }
  validationCommand(value) {
    const result = this.commandList.find(cmd => cmd.command === value);
    if (result) {
      this.communicator.getInfo(result.commandCode).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Не удалось отфильтровать сообщения');
      }).then(data => {
        if (data) {
          this.widget.showBotInform(data);
          return;
        }
        throw new Error('Не удалось обработать ответ сервера');
      }).catch(err => {
        this.errMessage.showMessage(err.message);
      });
      this.widget.input.value = '';
    } else {
      const message = 'Недопустимая команда\nВведите одну из команд:\n*погода\n*валюта\n*новости\n*афиша\n*картинка';
      this.toolTip.showToolTip(this.widget.input, message, 'down');
    }
  }
}

/***/ }),

/***/ "./src/js/Bot/BotWidget.js":
/*!*********************************!*\
  !*** ./src/js/Bot/BotWidget.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BotWidget; }
/* harmony export */ });
/* harmony import */ var _CreationElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CreationElements */ "./src/js/CreationElements.js");
/* harmony import */ var _GetDate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GetDate */ "./src/js/GetDate.js");


class BotWidget {
  constructor(container) {
    this.container = container;
    this.header = this.container.querySelector('.organizer_header');
    this.btnBotCntl = this.header.querySelector('.bot-control_btn');
    this.botInputBox = this.header.querySelector('.options-bot_box');
    this.searchInputBox = this.header.querySelector('.options-input_box');
    this.input = this.botInputBox.querySelector('.bot-input');
    this.botInformBox = this.header.querySelector('.bot-info_container');
    this.contentBox = this.header.querySelector('.bot-info_content');
    this.botInfoIcon = this.botInformBox.querySelector('.bot-info_icon');
    this.contentStatus = false;
    this.lastIconClass = null;
    this.getFormatDate = _GetDate__WEBPACK_IMPORTED_MODULE_1__["default"].getFormatDate;
    this.createWheatherContent = this.createWheatherContent.bind(this);
    this.createCurrencyContent = this.createCurrencyContent.bind(this);
    this.createNewsContent = this.createNewsContent.bind(this);
    this.createPosterContent = this.createPosterContent.bind(this);
    this.createImageContent = this.createImageContent.bind(this);
    this.listCreators = {
      wheather: this.createWheatherContent,
      currency: this.createCurrencyContent,
      news: this.createNewsContent,
      poster: this.createPosterContent,
      image: this.createImageContent
    };
    this.wheatherIconsList = {
      0: 'snowing-img',
      1: 'cloud-img',
      2: 'rain-img',
      3: 'sun-img'
    };
    this.iconsClassList = {
      wheather: 'wheather',
      currency: 'currency',
      news: 'news',
      poster: 'poster',
      image: 'image_bot'
    };
    this.currencySymbolDefault = '&#9884;';
  }
  showBotInform(data) {
    this.listCreators[data.code](data);
    this.addIcon(this.iconsClassList[data.code]);
    this.botInformBox.classList.remove('hidden');
  }
  hideBotInform() {
    this.contentBox.innerHTML = '';
    this.contentStatus = false;
    if (this.lastIconClass) {
      this.botInfoIcon.classList.remove(this.lastIconClass);
      this.lastIconClass = null;
    }
    this.botInformBox.classList.add('hidden');
    this.input.value = '';
  }
  addIcon(className) {
    if (this.lastIconClass) this.botInfoIcon.classList.remove(this.lastIconClass);
    this.botInfoIcon.classList.add(className);
    this.lastIconClass = className;
  }
  createWheatherContent(data) {
    if (this.contentStatus) this.contentBox.innerHTML = '';
    const obj = data.inform[0];
    const header = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['wheather_header']);
    this.contentBox.append(header);
    const tempValue = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('span', ['temp_value']);
    tempValue.textContent = obj.degree;
    header.append(tempValue);
    const wrapperTempUnits = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['wrapper_temp-unit']);
    const degree = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('span', ['degree']);
    const unit = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('span', ['unit']);
    unit.textContent = 'C';
    wrapperTempUnits.append(degree);
    wrapperTempUnits.append(unit);
    header.append(wrapperTempUnits);
    const wheatherIcon = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['wheather_img']);
    const numberICon = BotWidget.analysisTemp(obj.degree);
    wheatherIcon.classList.add(this.wheatherIconsList[numberICon]);
    header.append(wheatherIcon);
    const infoList = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('ul', ['wheather-info_list']);
    const windItem = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('li', ['wheather-info_item']);
    windItem.innerHTML = `<span class="wind">Ветер: <span class="wind_value">${obj.windSpeed}</span> м/с</span>`;
    const humidityItem = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('li', ['wheather-info_item']);
    humidityItem.innerHTML = `<span class="humidity">Влажность: <span class="humidity_value">${obj.humidityPercents}</span>%</span>`;
    const rainItem = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('li', ['wheather-info_item']);
    rainItem.innerHTML = `<span class="rain">Осадки: <span class="rain_value">${obj.rainPercents}</span>%</span>`;
    infoList.append(windItem);
    infoList.append(humidityItem);
    infoList.append(rainItem);
    this.contentBox.append(infoList);
    this.contentStatus = true;
  }
  static analysisTemp(degree) {
    if (degree <= 0) return 0;
    if (degree > 0 && degree < 10) return 1;
    if (degree > 10 && degree < 20) return 2;
    return 3;
  }
  createCurrencyContent(data) {
    if (this.contentStatus) this.contentBox.innerHTML = '';
    const currencyObjBox = data.inform;
    const date = _GetDate__WEBPACK_IMPORTED_MODULE_1__["default"].getFormatDate(data.timestamp);
    this.contentBox.innerHTML = `<h4 class="title_currency">Курсы валют на: <br><span class="currency_date">${date}</span></h4>`;
    const currencyList = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('ul', ['currency_list']);
    currencyList.append(this.createCurrencyItem({
      symbol: ' ',
      code: ' ',
      currencyBuy: 'купить',
      currencySelling: 'сдать'
    }));
    currencyObjBox.forEach(el => currencyList.append(this.createCurrencyItem(el)));
    this.contentBox.append(currencyList);
    this.contentStatus = true;
  }
  createCurrencyItem(obj) {
    const item = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('li', ['currency_item']);
    const symbol = obj.symbol && obj.symbol.length < 2 ? obj.symbol : this.currencySymbolDefault;
    item.innerHTML = `<span class="currency_symbol item-point">${symbol}</span>`;
    item.innerHTML += `<span class="currency_code item-point">${obj.code}</span>`;
    item.innerHTML += `<span class="rate item-point">
                        <span class="currency_buy currency_count">${obj.currencyBuy}</span> 
                        / <span class="currency_selling currency_count">${obj.currencySelling}</span>
                      </span>`;
    return item;
  }
  createNewsContent(data) {
    if (this.contentStatus) this.contentBox.innerHTML = '';
    const newsObjBox = data.inform;
    this.contentBox.innerHTML = '<h4 class="title_news">Последние новости</h4>';
    const newsList = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('ul', ['news_list']);
    newsObjBox.forEach(el => newsList.append(this.createNewsItem(el)));
    this.contentBox.append(newsList);
    this.contentStatus = true;
  }
  createNewsItem(obj) {
    const item = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('li', ['news_item']);
    item.textContent = obj.text;
    item.innerHTML += `<br><span class="news_date">${this.getFormatDate(obj.timestamp)}</span>`;
    return item;
  }
  createPosterContent(data) {
    if (this.contentStatus) this.contentBox.innerHTML = '';
    const posterObjBox = data.inform;
    const posterList = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('ul', ['posters_list']);
    posterObjBox.forEach(el => posterList.append(this.createPosterItem(el)));
    this.contentBox.append(posterList);
    this.contentStatus = true;
  }
  createPosterItem(obj) {
    const item = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('li', ['posters_item']);
    const posterHeader = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['poster_header']);
    item.append(posterHeader);
    const img = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('img', ['poster_img'], [{
      name: 'src',
      value: `${obj.src}`
    }, {
      name: 'alt',
      value: 'Иллюстрация афишы'
    }]);
    posterHeader.append(img);
    const title = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('h4', ['poster_title']);
    title.textContent = obj.name;
    posterHeader.append(title);
    const posterDescription = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['poster_description']);
    const cinema = obj.cinema.slice(0, 1).toUpperCase() + obj.cinema.slice(1);
    posterDescription.innerHTML = `<p class="poster-description_item">Где: 
                                    <span class="cinema_name poster-description_value">${cinema}</span>
                                  </p>`;
    const date = this.getFormatDate(obj.timestamp);
    posterDescription.innerHTML += `<p class="poster-description_item">Дата:
                                      <span class="poster_date poster-description_value">${date.slice(0, -6)}</span>
                                    </p>`;
    posterDescription.innerHTML += `<p class="poster-description_item">Время:
                                      <span class="poster_time poster-description_value">${date.slice(-5)}</span>
                                    </p>`;
    item.append(posterDescription);
    return item;
  }
  createImageContent(data) {
    if (this.contentStatus) this.contentBox.innerHTML = '';
    const obj = data.inform[0];
    const title = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('h4', ['bots-image_title']);
    title.textContent = obj.name;
    this.contentBox.append(title);
    const imgPreview = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('img', ['bots_image'], [{
      name: 'src',
      value: obj.src
    }, {
      name: 'alt',
      value: 'Изображение предоставленное ботом'
    }]);
    this.contentBox.append(imgPreview);
    this.contentStatus = true;
  }
}

/***/ }),

/***/ "./src/js/CommunicationWithServer.js":
/*!*******************************************!*\
  !*** ./src/js/CommunicationWithServer.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CommunicationWithServer; }
/* harmony export */ });
class CommunicationWithServer {
  constructor(port, portWs) {
    this.port = port;
    this.portWs = portWs;
    this.ws = null;
    this.deletePinnedStatus = this.deletePinnedStatus.bind(this);
  }
  messaging(callbackOpen, callbackClose, callbackError, callbackMessage) {
    this.ws = new WebSocket(`${this.portWs}/ws`);
    this.ws.addEventListener('open', callbackOpen);
    this.ws.addEventListener('close', callbackClose);
    this.ws.addEventListener('error', callbackError);
    this.ws.addEventListener('message', callbackMessage);
  }
  async getMessagesByFilter(filter, count, id) {
    const url = `${this.port}/filters/${filter}/${count}/${id}`;
    const response = fetch(url);
    return response;
  }
  async changeFavoritesStatus(id) {
    const url = `${this.port}/favorites`;
    const response = fetch(url, {
      method: 'PUT',
      body: id
    });
    return response;
  }
  async requestDeleteMessage(id) {
    const url = `${this.port}/message/delete/${id}`;
    const response = fetch(url, {
      method: 'DELETE'
    });
    return response;
  }
  async changePinnedStatus(id) {
    const url = `${this.port}/pinned`;
    const response = fetch(url, {
      method: 'PUT',
      body: id
    });
    return response;
  }
  async getPinnedMessage() {
    const url = `${this.port}/pinned`;
    const response = fetch(url);
    return response;
  }
  async deletePinnedStatus() {
    const url = `${this.port}/pinned`;
    const response = fetch(url, {
      method: 'DELETE'
    });
    return response;
  }
  async sendFile(data) {
    const url = `${this.port}/files`;
    const response = fetch(url, {
      method: 'POST',
      body: data
    });
    return response;
  }
  async downloadFileFromServer(url) {
    const response = fetch(`${this.port}${url}`);
    return response;
  }
}

/***/ }),

/***/ "./src/js/CreationElements.js":
/*!************************************!*\
  !*** ./src/js/CreationElements.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CreationElements; }
/* harmony export */ });
class CreationElements {
  static createElement(tag, classes, attributes) {
    const element = document.createElement(tag);
    if (classes) element.classList.add(...classes);
    if (attributes) {
      for (let i = 0; i < attributes.length; i += 1) {
        element.setAttribute(attributes[i].name, attributes[i].value);
      }
    }
    return element;
  }
}

/***/ }),

/***/ "./src/js/Geolocation/FormUserEnterCoordsCntrl.js":
/*!********************************************************!*\
  !*** ./src/js/Geolocation/FormUserEnterCoordsCntrl.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FormUserEnterCoordsCntrl; }
/* harmony export */ });
/* harmony import */ var _conversionUserCoords__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversionUserCoords */ "./src/js/Geolocation/conversionUserCoords.js");

class FormUserEnterCoordsCntrl {
  constructor(form, toolTip, curtain) {
    this.form = form;
    this.toolTip = toolTip;
    this.curtain = curtain;
    this.input = this.form.coords;
    this.messageObj = null;
    this.postman = null;
    this.validatorEnterCoords = this.validatorEnterCoords.bind(this);
  }
  openForm(messageObj, postman) {
    this.messageObj = messageObj;
    this.postman = postman;
    this.curtain.showCurtain('95', 'gray');
    this.form.classList.remove('hidden');
    this.form.addEventListener('submit', this.validatorEnterCoords);
    this.input.addEventListener('input', () => {
      if (this.toolTip.isToolTip()) this.toolTip.hideAllToolTips();
    });
  }
  validatorEnterCoords(e) {
    e.preventDefault();
    const result = (0,_conversionUserCoords__WEBPACK_IMPORTED_MODULE_0__["default"])(this.input.value);
    if (result) {
      this.messageObj.location = result;
      this.postman.send(JSON.stringify(this.messageObj));
      this.form.reset();
      this.form.classList.add('hidden');
      this.curtain.hideCurtain();
    } else {
      const message = 'Введите координаты в виде: 51.50851, -0.12572';
      this.toolTip.showToolTip(this.input, message, 'down');
    }
  }
}

/***/ }),

/***/ "./src/js/Geolocation/Geolocation.js":
/*!*******************************************!*\
  !*** ./src/js/Geolocation/Geolocation.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Geolocation; }
/* harmony export */ });
class Geolocation {
  constructor(formController, informWidget) {
    this.formController = formController;
    this.informWidget = informWidget;
    this.messageObj = null;
    this.postman = null;
    this.getCoordinates = this.getCoordinates.bind(this);
    this.sendNavigatorCoords = this.sendNavigatorCoords.bind(this);
    this.sendUserCoords = this.sendUserCoords.bind(this);
  }
  getCoordinates(messageObj, postman) {
    this.messageObj = messageObj;
    this.postman = postman;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.sendNavigatorCoords, this.sendUserCoords, {
        enableHighAccuracy: true
      });
    } else {
      this.informWidget.showMessage('Используйте другой браузер, определение геолокации недоступно');
    }
  }
  sendNavigatorCoords(data) {
    const {
      latitude,
      longitude
    } = data.coords;
    this.messageObj.location = `[${latitude}, ${longitude}]`;
    this.postman.send(JSON.stringify(this.messageObj));
  }
  sendUserCoords() {
    this.formController.openForm(this.messageObj, this.postman);
  }
}

/***/ }),

/***/ "./src/js/Geolocation/conversionUserCoords.js":
/*!****************************************************!*\
  !*** ./src/js/Geolocation/conversionUserCoords.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ conversionUserCoords; }
/* harmony export */ });
function conversionUserCoords(value) {
  if (/^\[?[-]?\d*\.{1}\d*[,]{1}[ ]?[-]?\d*\.{1}\d*\]?$/.test(value)) {
    const array = [];
    value.split(',').forEach(el => array.push(el.split('').filter(e => e !== '[' && e !== ']' && e !== ' ').join('')));
    return `[${array[0]}, ${array[1]}]`;
  }
  return false;
}

/***/ }),

/***/ "./src/js/GetDate.js":
/*!***************************!*\
  !*** ./src/js/GetDate.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GetDate; }
/* harmony export */ });
class GetDate {
  static getDay(date) {
    let dd = date.getDate();
    if (dd.length === 1) dd = `0${dd}`;
    return dd;
  }
  static getMonth(date) {
    let mm = date.getMonth() + 1;
    if (mm.length === 1) mm = `0${mm}`;
    return mm;
  }
  static getYear(date) {
    const result = `${date.getUTCFullYear()}`;
    return result;
  }
  static getFullDate(date) {
    const dateNow = date || new Date();
    const dd = GetDate.getDay(dateNow);
    const mm = GetDate.getMonth(dateNow);
    const yy = GetDate.getYear(dateNow);
    return `${dd}.${mm}.${yy}`;
  }
  static getTime(date) {
    const dateNow = date || new Date();
    return dateNow.toTimeString().slice(0, 5);
  }
  static getFormatDate(timestamp) {
    const date = timestamp ? new Date(timestamp) : new Date();
    const result = `${GetDate.getFullDate(date)} ${GetDate.getTime(date)}`;
    return result;
  }
}

/***/ }),

/***/ "./src/js/Message Processing/FileInputProcessing.js":
/*!**********************************************************!*\
  !*** ./src/js/Message Processing/FileInputProcessing.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FileInputProcessing; }
/* harmony export */ });
/* harmony import */ var _GetDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GetDate */ "./src/js/GetDate.js");
/* harmony import */ var _fileTypeDetection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fileTypeDetection */ "./src/js/Message Processing/fileTypeDetection.js");


class FileInputProcessing {
  constructor(container, communicator, geolocator, errMessage) {
    this.container = container;
    this.communicator = communicator;
    this.geolocator = geolocator;
    this.errMessage = errMessage;
    this.organaizerBox = this.container.querySelector('.organizer-box');
    this.loader = document.forms.loader;
    this.inputFile = this.organaizerBox.querySelector('.file-loader');
    this.trap = this.organaizerBox.querySelector('.message-list_wrapper');
    this.btnUpload = this.organaizerBox.querySelector('.load-file_btn');
    this.toggleActiveTrap = this.toggleActiveTrap.bind(this);
    this.clickLoad = this.clickLoad.bind(this);
  }
  activation() {
    this.organaizerBox.addEventListener('click', e => {
      if (e.target === this.btnUpload) this.inputFile.dispatchEvent(new MouseEvent('click'));
    });
    this.inputFile.addEventListener('input', this.clickLoad);
    this.trap.addEventListener('dragenter', this.toggleActiveTrap);
    this.trap.addEventListener('dragleave', this.toggleActiveTrap);
    this.trap.addEventListener('dragover', e => {
      e.preventDefault();
    });
    this.trap.addEventListener('drop', e => {
      e.preventDefault();
      this.toggleActiveTrap();
      const file = e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) this.sendFile(file);
    });
  }
  toggleActiveTrap() {
    this.trap.classList.toggle('active_drag-n-drop');
  }
  clickLoad() {
    const file = this.inputFile.files && this.inputFile.files[0];
    if (file) this.sendFile(file);
  }
  sendFile(file) {
    const fileType = file.type;
    const formData = new FormData();
    formData.append('file', file);
    this.communicator.sendFile(formData).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось отправить файл');
    }).then(data => {
      const type = (0,_fileTypeDetection__WEBPACK_IMPORTED_MODULE_1__["default"])(fileType);
      const {
        link,
        fileName
      } = data;
      const objMessage = {
        link,
        fileName
      };
      this.createFileObj(objMessage, type, fileName);
    }).catch(err => {
      this.errMessage.showMessage(err.message);
    });
    this.inputFile.value = '';
  }
  createFileObj(objMessage, type, fileName) {
    const obj = {
      type,
      message: objMessage,
      favorites: false,
      pinned: false,
      fileStatus: true,
      fileName,
      date: _GetDate__WEBPACK_IMPORTED_MODULE_0__["default"].getFormatDate()
    };
    this.geolocator.getCoordinates(obj, this.communicator.ws);
  }
}

/***/ }),

/***/ "./src/js/Message Processing/Multimedia/MultimediaInputProcessing.js":
/*!***************************************************************************!*\
  !*** ./src/js/Message Processing/Multimedia/MultimediaInputProcessing.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MultimediaInputProcessing; }
/* harmony export */ });
/* harmony import */ var _Auxiliary_Tools_CounterTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Auxiliary Tools/CounterTime */ "./src/js/Auxiliary Tools/CounterTime.js");
/* harmony import */ var _GetDate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../GetDate */ "./src/js/GetDate.js");


class MultimediaInputProcessing {
  constructor(widget, communicator, geolocator, errMessage, showInform) {
    this.widget = widget;
    this.communicator = communicator;
    this.geolocator = geolocator;
    this.errMessage = errMessage;
    this.showInform = showInform;
    this.counter = null;
    this.stream = null;
    this.recorder = null;
    this.chunks = null;
    this.canselStatus = true;
    this.recAudio = this.recAudio.bind(this);
    this.recVideo = this.recVideo.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.canselRecord = this.canselRecord.bind(this);
  }
  activation() {
    this.counter = new _Auxiliary_Tools_CounterTime__WEBPACK_IMPORTED_MODULE_0__["default"](this.widget.counterWidget);
    this.widget.btnRecAudio.addEventListener('click', this.recAudio);
    this.widget.btnRecVideo.addEventListener('click', this.recVideo);
    this.widget.btnStopRec.addEventListener('click', this.stopRecord);
    this.widget.btnCanselRec.addEventListener('click', this.canselRecord);
  }
  recAudio() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: true
      }).then(stream => {
        this.stream = stream;
        this.recorder = new MediaRecorder(stream);
        this.recorder.addEventListener('start', () => {
          this.chunks = [];
          this.widget.toggleVissability();
          this.counter.startCounter();
        });
        this.recorder.addEventListener('dataavailable', event => {
          this.chunks.push(event.data);
        });
        this.recorder.addEventListener('stop', () => {
          if (this.canselStatus) {
            const blob = new Blob(this.chunks);
            const file = new File([blob], `${_GetDate__WEBPACK_IMPORTED_MODULE_1__["default"].getFormatDate()}.webm`, {
              type: 'audio/webm',
              lastModified: Date.now()
            });
            const type = 'audio';
            this.sendFile(file, type);
          }
          this.widget.toggleVissability();
          this.chunks = null;
          this.canselStatus = true;
          this.counter.stopCounter();
        });
        this.recorder.start();
      }).catch(() => {
        this.showInform.showMessage('Предоставьте доступ к микрофону');
      });
    } else {
      this.showInform.showMessage('Используйте другой браузер, невозможно получить доступ к микрофону');
    }
  }
  recVideo() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then(stream => {
        this.stream = stream;
        this.recorder = new MediaRecorder(stream);
        this.recorder.addEventListener('start', () => {
          this.chunks = [];
          this.widget.toggleVissability();
          this.widget.showPreview(stream);
          this.counter.startCounter();
        });
        this.recorder.addEventListener('dataavailable', event => {
          this.chunks.push(event.data);
        });
        this.recorder.addEventListener('stop', () => {
          if (this.canselStatus) {
            const blob = new Blob(this.chunks);
            const file = new File([blob], `${_GetDate__WEBPACK_IMPORTED_MODULE_1__["default"].getFormatDate()}.webm`, {
              type: 'video/webm',
              lastModified: Date.now()
            });
            const type = 'video';
            this.sendFile(file, type);
          }
          this.widget.toggleVissability();
          this.widget.hidePreview();
          this.chunks = null;
          this.canselStatus = true;
          this.counter.stopCounter();
        });
        this.recorder.start();
      }).catch(() => {
        this.showInform.showMessage('Предоставьте доступ к камере и  микрофону');
      });
    } else {
      this.showInform.showMessage('Используйте другой браузер, невозможно получить доступ к камере');
    }
  }
  stopRecord() {
    this.recorder.stop();
    this.stream.getTracks().forEach(track => track.stop());
    this.recorder = null;
    this.stream = null;
  }
  canselRecord() {
    this.canselStatus = false;
    this.stopRecord();
  }
  createAudioObj(src) {
    const result = {
      src
    };
    const type = 'audio';
    this.createMessageObj(result, type);
  }
  sendFile(file, type) {
    const formData = new FormData();
    formData.append('file', file);
    this.communicator.sendFile(formData).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось отправить видео');
    }).then(data => {
      const {
        link,
        fileName
      } = data;
      const objMessage = {
        link
      };
      this.createMessageObj(objMessage, type, fileName);
    }).catch(err => {
      this.errMessage.showMessage(err.message);
    });
  }
  createMessageObj(objMessage, type, fileName) {
    const obj = {
      type,
      message: objMessage,
      favorites: false,
      pinned: false,
      fileStatus: true,
      fileName,
      date: _GetDate__WEBPACK_IMPORTED_MODULE_1__["default"].getFormatDate()
    };
    this.geolocator.getCoordinates(obj, this.communicator.ws);
  }
}

/***/ }),

/***/ "./src/js/Message Processing/Multimedia/MultimediaWidget.js":
/*!******************************************************************!*\
  !*** ./src/js/Message Processing/Multimedia/MultimediaWidget.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MultimediaWidget; }
/* harmony export */ });
class MultimediaWidget {
  constructor(container) {
    this.container = container;
    this.boxForHide = this.container.querySelector('.wrapper_standart-footer');
    this.recBox = this.container.querySelector('.footer_rec-active');
    this.btnRecAudio = this.boxForHide.querySelector('.rec-btn_audio');
    this.btnRecVideo = this.boxForHide.querySelector('.rec-btn_video');
    this.btnStopRec = this.recBox.querySelector('.btn_end');
    this.btnCanselRec = this.recBox.querySelector('.btn_cansel');
    this.counterWidget = this.recBox.querySelector('.timer_rec');
    this.previewBox = this.container.querySelector('.preview_box');
    this.preview = this.previewBox.querySelector('.preview');
    this.previewStatus = false;
  }
  toggleVissability() {
    this.boxForHide.classList.toggle('hidden');
    this.recBox.classList.toggle('hidden');
  }
  showPreview(stream, errmessage) {
    if ('srcObject' in this.preview) {
      try {
        this.previewStatus = true;
        this.previewBox.classList.remove('hidden');
        this.preview.srcObject = stream;
        this.preview.addEventListener('canplay', e => {
          e.preventDefault();
          this.preview.play();
        });
      } catch (err) {
        errmessage.showMessage(err.message);
      }
    }
  }
  hidePreview() {
    if (this.previewStatus) {
      this.previewBox.classList.add('hidden');
      this.preview.srcOject = null;
      this.previewStatus = false;
    }
  }
}

/***/ }),

/***/ "./src/js/Message Processing/StickerProcessing.js":
/*!********************************************************!*\
  !*** ./src/js/Message Processing/StickerProcessing.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ StickeProcessing; }
/* harmony export */ });
/* harmony import */ var _GetDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GetDate */ "./src/js/GetDate.js");

class StickeProcessing {
  constructor(container, postman, geolocator) {
    this.container = container;
    this.postman = postman;
    this.geolocator = geolocator;
    this.btnSticker = this.container.querySelector('.add-sticker_btn');
    this.stickerBox = this.container.querySelector('.sticker_box');
    this.stickerStatus = false;
    this.toggleVisabilitySticker = this.toggleVisabilitySticker.bind(this);
    this.addSticker = this.addSticker.bind(this);
  }
  activation() {
    this.btnSticker.addEventListener('click', this.toggleVisabilitySticker);
    this.stickerBox.addEventListener('click', this.addSticker);
  }
  toggleVisabilitySticker() {
    this.stickerBox.classList.toggle('hidden');
    this.stickerStatus = !this.stickerStatus;
  }
  addSticker(e) {
    this.createMessageObj({
      className: `${e.target.dataset.sticker}`
    });
    this.toggleVisabilitySticker();
  }
  createMessageObj(value) {
    const obj = {
      type: 'sticker',
      message: value,
      favorites: false,
      pinned: false,
      fileStatus: false,
      date: _GetDate__WEBPACK_IMPORTED_MODULE_0__["default"].getFormatDate()
    };
    this.geolocator(obj, this.postman);
  }
}

/***/ }),

/***/ "./src/js/Message Processing/TextInputProcessing.js":
/*!**********************************************************!*\
  !*** ./src/js/Message Processing/TextInputProcessing.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TextInputProcessing; }
/* harmony export */ });
/* harmony import */ var _GetDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GetDate */ "./src/js/GetDate.js");
/* harmony import */ var _isLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isLink */ "./src/js/Message Processing/isLink.js");


class TextInputProcessing {
  constructor(input, emojiBtn, emojiBox, postman, geolocator, toolTip) {
    this.input = input;
    this.btn = emojiBtn;
    this.emojiBox = emojiBox;
    this.postman = postman;
    this.geolocator = geolocator;
    this.toolTip = toolTip;
    this.emojiStatus = false;
    this.toggleVisabilityEmoji = this.toggleVisabilityEmoji.bind(this);
  }
  activation() {
    this.btn.addEventListener('click', this.toggleVisabilityEmoji);
    [...this.emojiBox.children].forEach(emoji => {
      emoji.addEventListener('click', e => {
        this.input.value += e.target.innerText;
        this.input.focus();
      });
    });
    this.input.addEventListener('keydown', e => {
      if (e.keyCode === 13) this.validation(e.target.value);
    });
    this.input.addEventListener('input', () => {
      if (this.toolTip.isToolTip()) this.toolTip.hideAllToolTips();
    });
  }
  toggleVisabilityEmoji() {
    this.emojiBox.classList.toggle('hidden');
    this.emojiStatus = !this.emojiStatus;
  }
  validation(value) {
    if (value) {
      this.input.value = '';
      if ((0,_isLink__WEBPACK_IMPORTED_MODULE_1__["default"])(value)) this.createLinkObj(value);else this.createTextObj(value);
    } else {
      const message = 'Невозможно отправить пустое сообщение';
      this.toolTip.showToolTip(this.input, message, 'up');
    }
  }
  createTextObj(value) {
    const obj = {
      type: 'text',
      message: value,
      favorites: false,
      pinned: false,
      fileStatus: false,
      date: _GetDate__WEBPACK_IMPORTED_MODULE_0__["default"].getFormatDate()
    };
    this.geolocator(obj, this.postman);
  }
  createLinkObj(value) {
    const obj = {
      type: 'links',
      message: value,
      favorites: false,
      pinned: false,
      fileStatus: false,
      date: _GetDate__WEBPACK_IMPORTED_MODULE_0__["default"].getFormatDate()
    };
    this.geolocator(obj, this.postman);
  }
}

/***/ }),

/***/ "./src/js/Message Processing/fileTypeDetection.js":
/*!********************************************************!*\
  !*** ./src/js/Message Processing/fileTypeDetection.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ fileTypeDetection; }
/* harmony export */ });
function fileTypeDetection(string) {
  const checked = string.split('/')[0];
  if (checked === 'image') return 'image';
  if (checked === 'video') return 'video';
  if (checked === 'audio') return 'audio';
  return 'other';
}

/***/ }),

/***/ "./src/js/Message Processing/isLink.js":
/*!*********************************************!*\
  !*** ./src/js/Message Processing/isLink.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isLink; }
/* harmony export */ });
function isLink(value) {
  if (/^[h][t][t][p][s]?[:][/][/]/.test(value)) {
    return true;
  }
  return false;
}

/***/ }),

/***/ "./src/js/MessageFactory.js":
/*!**********************************!*\
  !*** ./src/js/MessageFactory.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MessageFactory; }
/* harmony export */ });
/* harmony import */ var _CreationElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreationElements */ "./src/js/CreationElements.js");
/* harmony import */ var _validationFileName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validationFileName */ "./src/js/validationFileName.js");


class MessageFactory {
  constructor(port) {
    this.port = port;
    this.createTextContent = this.createTextContent.bind(this);
    this.createLinkContent = this.createLinkContent.bind(this);
    this.createSticker = this.createSticker.bind(this);
    this.createAudioContent = this.createAudioContent.bind(this);
    this.createVideoContent = this.createVideoContent.bind(this);
    this.createImageContent = this.createImageContent.bind(this);
    this.createOtherContent = this.createOtherContent.bind(this);
    this.typesList = {
      text: this.createTextContent,
      links: this.createLinkContent,
      sticker: this.createSticker,
      audio: this.createAudioContent,
      video: this.createVideoContent,
      image: this.createImageContent,
      other: this.createOtherContent
    };
    this.messageObj = null;
    this.listeners = null;
  }
  createMessage(messageObj, callbacks) {
    this.messageObj = messageObj;
    this.listeners = callbacks;
    const messageEl = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('li', ['message']);
    messageEl.dataset.id = messageObj.id;
    const favorites = this.createBtnFavorites();
    messageEl.append(favorites);
    const contentBox = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['message_content']);
    if (this.messageObj.fileStatus && this.messageObj.type !== 'other') {
      const fileTitle = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('h4', ['message_content-title']);
      fileTitle.textContent = (0,_validationFileName__WEBPACK_IMPORTED_MODULE_1__["default"])(this.messageObj.fileName, 25);
      contentBox.append(fileTitle);
    }
    const content = this.createContent();
    contentBox.append(content);
    const footer = this.createFooter();
    contentBox.append(footer);
    messageEl.append(contentBox);
    const btnsBox = this.createBtnsBox();
    messageEl.append(btnsBox);
    this.messageObj = null;
    this.listeners = null;
    return messageEl;
  }
  createBtnFavorites() {
    const favoritesClasses = this.messageObj.favorites ? ['mark_favorites', 'active_favorites'] : ['mark_favorites', 'inactive_favorites'];
    const favorites = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('button', favoritesClasses, [{
      name: 'type',
      value: 'button'
    }]);
    favorites.addEventListener('click', this.listeners.favorites);
    return favorites;
  }
  createContent() {
    return this.typesList[this.messageObj.type]();
  }
  createFooter() {
    const footer = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['message_footer']);
    const dateEl = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('span', ['message_date', 'message_footer-item']);
    dateEl.textContent = this.messageObj.date;
    const locationEl = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('span', ['message_location', 'message_footer-item']);
    locationEl.textContent = this.messageObj.location;
    footer.append(dateEl);
    footer.append(locationEl);
    return footer;
  }
  createBtnsBox() {
    const btnsBox = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['message_btns-ctrl']);
    const btnDel = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('button', ['del-messaage', 'message-ctrl_btn'], [{
      name: 'type',
      value: 'button'
    }]);
    btnDel.addEventListener('click', this.listeners.delete);
    const btnPin = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('button', ['pinned-message', 'message-ctrl_btn'], [{
      name: 'type',
      value: 'button'
    }]);
    btnPin.addEventListener('click', this.listeners.pinned);
    btnsBox.append(btnDel);
    btnsBox.append(btnPin);
    if (this.messageObj.fileStatus) {
      const download = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('button', ['download_message', 'message-ctrl_btn'], [{
        name: 'type',
        value: 'button'
      }]);
      download.dataset.url = this.messageObj.message.link;
      download.dataset.name = this.messageObj.fileName;
      download.addEventListener('click', this.listeners.download);
      btnsBox.append(download);
    }
    return btnsBox;
  }
  createTextContent() {
    const result = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('p', ['message_text']);
    result.textContent = this.messageObj.message;
    return result;
  }
  createLinkContent() {
    const result = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('a', ['message_link'], [{
      name: 'href',
      value: this.messageObj.message
    }, {
      name: 'target',
      value: '_blank'
    }]);
    const text = this.messageObj.message;
    result.textContent = text.length > 50 ? `${text.slice(0, 50)}...` : text;
    return result;
  }
  createSticker() {
    const result = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['message_sticker', `${this.messageObj.message.className}`]);
    return result;
  }
  createAudioContent() {
    const result = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('audio', ['content_media'], [{
      name: 'src',
      value: `${this.port}${this.messageObj.message.link}`
    }, {
      name: 'controls',
      value: true
    }]);
    return result;
  }
  createVideoContent() {
    const result = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('video', ['content_media'], [{
      name: 'src',
      value: `${this.port}${this.messageObj.message.link}`
    }, {
      name: 'controls',
      value: true
    }]);
    return result;
  }
  createImageContent() {
    const result = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('img', ['message_image'], [{
      name: 'src',
      value: `${this.port}${this.messageObj.message.link}`
    }]);
    return result;
  }
  createOtherContent() {
    const result = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('p', ['message_other']);
    result.textContent = (0,_validationFileName__WEBPACK_IMPORTED_MODULE_1__["default"])(this.messageObj.fileName, 35);
    result.dataset.url = this.messageObj.message.link;
    result.dataset.name = this.messageObj.fileName;
    return result;
  }
}

/***/ }),

/***/ "./src/js/OganizerController.js":
/*!**************************************!*\
  !*** ./src/js/OganizerController.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ OrganizerController; }
/* harmony export */ });
/* harmony import */ var _AsidePanelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsidePanelController */ "./src/js/AsidePanelController.js");
/* harmony import */ var _Message_Processing_StickerProcessing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Message Processing/StickerProcessing */ "./src/js/Message Processing/StickerProcessing.js");
/* harmony import */ var _Message_Processing_TextInputProcessing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Message Processing/TextInputProcessing */ "./src/js/Message Processing/TextInputProcessing.js");
/* harmony import */ var _createDownloadLink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createDownloadLink */ "./src/js/createDownloadLink.js");




class OrganizerController {
  constructor(widget, communicator, geolocator, errMessage, toolTip, informWidget, bot, media, fileController, searcher) {
    this.widget = widget;
    this.communicator = communicator;
    this.geolocator = geolocator;
    this.errMessage = errMessage;
    this.toolTip = toolTip;
    this.informWidget = informWidget;
    this.bot = bot;
    this.media = media;
    this.fileController = fileController;
    this.searcher = searcher;
    this.aside = null;
    this.enterText = null;
    this.sticker = null;
    this.activeFilter = 'all';
    this.messagingOpen = this.messagingOpen.bind(this);
    this.messagingClose = this.messagingClose.bind(this);
    this.messagingError = this.messagingError.bind(this);
    this.messagingReader = this.messagingReader.bind(this);
    this.filtrationMessagesList = this.filtrationMessagesList.bind(this);
    this.showPinnedMessage = this.showPinnedMessage.bind(this);
    this.showSearchMessage = this.showSearchMessage.bind(this);
    this.scrollToOldMessage = this.scrollToOldMessage.bind(this);
    this.addOldMessages = this.addOldMessages.bind(this);
    this.addToFavoritesMessage = this.addToFavoritesMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.pinMessage = this.pinMessage.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.messageListeners = {
      favorites: this.addToFavoritesMessage,
      delete: this.deleteMessage,
      pinned: this.pinMessage,
      download: this.downloadFile
    };
  }
  activation() {
    this.widget.container.addEventListener('click', e => {
      if (this.toolTip.isToolTip()) this.toolTip.hideAllToolTips();
      if (this.enterText && this.enterText.emojiStatus && e.target !== this.enterText.btn) this.enterText.toggleVisabilityEmoji();
      if (this.sticker && this.sticker.stickerStatus && e.target !== this.sticker.btnSticker && !e.target.closest('.sticker_box')) this.sticker.toggleVisabilitySticker();
      if (this.bot.isFairTarget(e.target)) this.bot.validationBotStatus();
      if (this.media.stream && !e.target.closest('.organizer_footer')) e.stopImmediatePropagation();
      if (this.searcher.searchStatus && !e.target.closest('.options_wrapper')) this.searcher.stopStream();
    }, {
      capture: true
    });
    this.widget.messageListWrapper.addEventListener('scroll', this.scrollToOldMessage);
    this.communicator.messaging(this.messagingOpen, this.messagingClose, this.messagingError, this.messagingReader);
    this.aside = new _AsidePanelController__WEBPACK_IMPORTED_MODULE_0__["default"](this.widget.asidePanel, this.widget.asideBtn, this.filtrationMessagesList);
    this.aside.activation();
    this.bot.activation();
    this.searcher.activation(this.showSearchMessage);
  }
  scrollToOldMessage() {
    const scrolledElTop = this.widget.messageListWrapper.getBoundingClientRect().top;
    const messageListTop = this.widget.messageList.getBoundingClientRect().top;
    if (scrolledElTop === messageListTop) this.addOldMessages(10);
  }
  addOldMessages(count) {
    const message = this.widget.findOldestMessage();
    if (message) {
      const {
        id
      } = message.dataset;
      this.communicator.getMessagesByFilter(this.activeFilter, count, id).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Не удалось загрузить более старые сообщения');
      }).then(data => {
        if (data) {
          if (data) {
            this.widget.readMessagesList(data.reverse(), this.messageListeners, this.showPinnedMessage, this.communicator.deletePinnedStatus, true);
          }
          return;
        }
        throw new Error('Не удалось обработать ответ сервера');
      }).catch(err => {
        this.errMessage.showMessage(err.message);
      });
    }
  }
  messagingOpen() {
    this.enterText = new _Message_Processing_TextInputProcessing__WEBPACK_IMPORTED_MODULE_2__["default"](this.widget.enterText, this.widget.emojiBtn, this.widget.emojiBox, this.communicator.ws, this.geolocator.getCoordinates, this.toolTip);
    this.enterText.activation();
    this.sticker = new _Message_Processing_StickerProcessing__WEBPACK_IMPORTED_MODULE_1__["default"](this.widget.footer, this.communicator.ws, this.geolocator.getCoordinates);
    this.sticker.activation();
    this.media.activation();
    this.fileController.activation();
  }
  messagingClose() {
    this.informWidget.showMessage('Соединение с сервером закрыто. Попробуйте перезапустить приложение.');
  }
  messagingError() {
    this.errMessage.showMessage('Произошла ошибка соединения с сервером. Попробуйте перезапустить приложение.');
  }
  messagingReader(e) {
    const {
      listCounters,
      listMessages
    } = JSON.parse(e.data);
    if (listMessages && listMessages.length !== 0) {
      this.widget.readMessagesList(listMessages, this.messageListeners, this.showPinnedMessage, this.communicator.deletePinnedStatus);
      OrganizerController.scrollToMessage(this.widget.lastMessage);
      this.aside.updateCountAll(listCounters);
    }
  }
  static scrollToMessage(element) {
    if (element) {
      element.scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      });
    }
  }
  filtrationMessagesList(filter) {
    this.activeFilter = filter;
    this.communicator.getMessagesByFilter(filter, 10).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось отфильтровать сообщения');
    }).then(data => {
      if (data) {
        this.widget.clearMessagesList();
        this.widget.readMessagesList(data, this.messageListeners, this.showPinnedMessage, this.communicator.deletePinnedStatus);
        return;
      }
      throw new Error('Не удалось обработать ответ сервера');
    }).catch(err => {
      this.errMessage.showMessage(err.message);
    });
  }
  addToFavoritesMessage(e) {
    const {
      id
    } = e.target.closest('li').dataset;
    this.communicator.changeFavoritesStatus(id).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось изменить статус сообщения');
    }).then(data => {
      const {
        favoritesCount
      } = data;
      this.aside.updateCount('favorites', favoritesCount);
      this.widget.changeFavoritesStatus(e.target);
    }).catch(err => {
      this.errMessage.showMessage(err.message);
    });
  }
  deleteMessage(e) {
    const {
      id
    } = e.target.closest('li').dataset;
    this.communicator.requestDeleteMessage(id).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось удалить сообщение');
    }).then(data => {
      this.widget.delMessage(e.target.closest('li'));
      if (this.widget.messageBox.length < 10) this.addOldMessages(1);
      this.aside.updateCountAll(data.listCounters);
    }).catch(err => {
      this.errMessage.showMessage(err.message);
    });
  }
  pinMessage(e) {
    const {
      id
    } = e.target.closest('li').dataset;
    this.communicator.changePinnedStatus(id).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось закрепить сообщение');
    }).then(data => {
      this.widget.adPinnedMessage(data.pinnedMessage, this.showPinnedMessage, this.communicator.deletePinnedStatus);
    }).catch(err => {
      this.errMessage.showMessage(err.message);
    });
  }
  downloadFile(e) {
    this.communicator.downloadFileFromServer(e.target.dataset.url).then(response => {
      if (response.ok) {
        return response.blob();
      }
      throw new Error('Не удалось скачать файл');
    }).then(blob => {
      const objectURL = URL.createObjectURL(blob);
      const link = (0,_createDownloadLink__WEBPACK_IMPORTED_MODULE_3__["default"])(objectURL, e.target.dataset.name);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectURL);
    });
  }
  showPinnedMessage(e) {
    if (!e.target.classList.contains('btn-delete_pinned')) {
      this.communicator.getPinnedMessage().then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Не удалось загрузить закреплённое сообщение');
      }).then(data => {
        this.widget.renderPinnedMessage(data.pinnedMessage, this.messageListeners);
      }).catch(err => {
        this.errMessage.showMessage(err.message);
      });
    }
  }
  showSearchMessage(obj) {
    this.widget.renderSearchMessage(obj, this.messageListeners);
  }
}

/***/ }),

/***/ "./src/js/OrganizerWidget.js":
/*!***********************************!*\
  !*** ./src/js/OrganizerWidget.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ OrganizerWidget; }
/* harmony export */ });
class OrganizerWidget {
  constructor(container, factory, pinned) {
    this.container = container;
    this.factory = factory;
    this.pinned = pinned;
    this.messageListWrapper = this.container.querySelector('.message-list_wrapper');
    this.messageList = this.messageListWrapper.querySelector('.message-list');
    this.asidePanel = this.container.querySelector('.organizer_aside');
    this.asideBtn = this.container.querySelector('.toggle-aside_btn');
    this.footer = this.container.querySelector('.organizer_footer');
    this.enterText = this.footer.querySelector('.enter-text');
    this.emojiBtn = this.footer.querySelector('.add-emoji_btn');
    this.emojiBox = this.footer.querySelector('.emoji_box');
    this.activeMessageClass = 'active_favorites';
    this.inactiveMessageClass = 'inactive_favorites';
    this.lastMessage = null;
    this.messageBox = [];
  }
  readMessagesList(messagesList, listeners, showPinned, reqDelPinned, scroll) {
    messagesList.forEach(m => this.addMessage(m, listeners, showPinned, reqDelPinned, scroll));
  }
  addMessage(obj, listenersList, showPinned, reqDeletePinned, scroll) {
    this.renderMessage(this.factory.createMessage(obj, listenersList), scroll);
    if (obj.pinned && showPinned) this.adPinnedMessage(obj, showPinned, reqDeletePinned);
  }
  renderMessage(element, scroll) {
    this.lastMessage = element;
    if (scroll) {
      this.messageList.prepend(element);
      this.messageBox.unshift(element);
    } else {
      this.messageList.append(element);
      this.messageBox.push(element);
    }
    if (this.messageBox.length > 10 && !scroll) this.delMessage(this.messageBox[0]);
  }
  changeFavoritesStatus(element) {
    element.classList.toggle(this.activeMessageClass);
    element.classList.toggle(this.inactiveMessageClass);
  }
  adPinnedMessage(messageObj, showPinned, reqDeletePinned) {
    const pinnedMessage = this.pinned.createPinnedElement(messageObj, showPinned, reqDeletePinned);
    this.updatePinnedMessage(pinnedMessage);
  }
  updatePinnedMessage(pinnedMessage) {
    if (pinnedMessage) this.messageListWrapper.append(pinnedMessage);
  }
  renderPinnedMessage(obj, listenersList) {
    this.clearMessagesList();
    this.renderMessage(this.factory.createMessage(obj, listenersList), false);
  }
  renderSearchMessage(obj, listenersList) {
    this.clearMessagesList();
    this.addMessage(obj, listenersList);
  }
  clearMessagesList() {
    this.messageBox = [];
    [...this.messageList.children].forEach(el => el.remove());
  }
  delMessage(element) {
    element.remove();
    this.messageBox = this.messageBox.filter(m => m !== element);
    if (this.pinned.isMessagePinned(element)) this.pinned.deletePreviewPinnedMessage();
  }
  findOldestMessage() {
    return this.messageBox[0];
  }
}

/***/ }),

/***/ "./src/js/PinnedMessageController.js":
/*!*******************************************!*\
  !*** ./src/js/PinnedMessageController.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PinnedMessageController; }
/* harmony export */ });
/* harmony import */ var _CreationElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreationElements */ "./src/js/CreationElements.js");
/* harmony import */ var _validationFileName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validationFileName */ "./src/js/validationFileName.js");
/* harmony import */ var _validationLengthMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validationLengthMessage */ "./src/js/validationLengthMessage.js");



class PinnedMessageController {
  constructor(errMessage) {
    this.errMessage = errMessage;
    this.pinnedMessage = null;
    this.imgList = {
      text: 'pinned-text',
      file: 'pinned-file',
      links: 'pinned-links',
      sticker: 'pinned-sticker'
    };
    this.filesType = ['other', 'audio', 'video', 'image'];
  }
  createPinnedElement(messageObj, showPinned, reqDeletePinned) {
    if (this.pinnedMessage) {
      this.pinnedMessage.remove();
      this.pinnedMessage = null;
    }
    const result = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['pinned_box']);
    result.dataset.id = messageObj.id;
    result.addEventListener('click', showPinned);
    const imageBox = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['pinned_img-box']);
    const image = this.createImage(messageObj);
    imageBox.append(image);
    result.append(imageBox);
    const contentBox = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['pinned_content-box']);
    const btnDelete = this.createBtnDel(reqDeletePinned);
    const content = this.createContent(messageObj);
    contentBox.append(btnDelete);
    contentBox.append(content);
    result.append(contentBox);
    this.pinnedMessage = result;
    return result;
  }
  createImage(messageObj) {
    let classImg = null;
    if (messageObj.fileStatus) classImg = this.imgList.file;else classImg = this.imgList[messageObj.type];
    const img = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', ['pinned_image', classImg]);
    return img;
  }
  createBtnDel(reqDeletePinned) {
    const btn = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('button', ['btn-delete_pinned', 'hidden'], [{
      name: 'type',
      value: 'button'
    }]);
    btn.addEventListener('click', this.deletePinnedMessage.bind(this, reqDeletePinned));
    return btn;
  }
  deletePinnedMessage(reqDeletePinned) {
    reqDeletePinned().then(response => {
      if (response.ok) {
        this.deletePreviewPinnedMessage();
        return;
      }
      throw new Error('Не удалось удалить закреплённое сообщение');
    }).catch(err => {
      this.errMessage.showMessage(err.message);
    });
  }
  deletePreviewPinnedMessage() {
    this.pinnedMessage.remove();
    this.pinnedMessage = null;
  }
  isMessagePinned(element) {
    if (!this.pinnedMessage) return false;
    if (element.dataset.id === this.pinnedMessage.dataset.id) return true;
    return false;
  }
  createContent(messageObj) {
    const content = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('h3', ['pinned_title']);
    if (messageObj.type === 'text' || messageObj.type === 'links') content.textContent = (0,_validationLengthMessage__WEBPACK_IMPORTED_MODULE_2__["default"])(messageObj.message, 40);
    if (this.filesType.find(el => el === messageObj.type)) {
      content.textContent = (0,_validationFileName__WEBPACK_IMPORTED_MODULE_1__["default"])(messageObj.fileName, 35);
    }
    if (messageObj.type === 'sticker') {
      content.classList.add('pinned-content_sticker');
      content.classList.add(messageObj.message.className);
    }
    return content;
  }
}

/***/ }),

/***/ "./src/js/Search System/SearchCommunicationServer.js":
/*!***********************************************************!*\
  !*** ./src/js/Search System/SearchCommunicationServer.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SearchCommunicationServer; }
/* harmony export */ });
class SearchCommunicationServer {
  constructor(port) {
    this.port = port;
  }
  getMessageById(id) {
    const url = `${this.port}/message/search/${id}`;
    const response = fetch(url);
    return response;
  }
}

/***/ }),

/***/ "./src/js/Search System/SearchController.js":
/*!**************************************************!*\
  !*** ./src/js/Search System/SearchController.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SearchController; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/filter.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js");

class SearchController {
  constructor(widget, communicator, errMessage, port) {
    this.widget = widget;
    this.communicator = communicator;
    this.errMessage = errMessage;
    this.port = port;
    this.renderMessage = null;
    this.stream$ = null;
    this.observer = {
      next: data => {
        this.widget.readSearchMessages(data, this.showSearchedMessage);
      },
      error: err => this.errMessage.showMessage(err.message),
      complete: () => {
        this.widget.hidePreviewBox();
        this.searchStatus = false;
        this.widget.input.value = '';
      }
    };
    this.searchStatus = false;
    this.showSearchedMessage = this.showSearchedMessage.bind(this);
  }
  activation(renderMessage) {
    this.renderMessage = renderMessage;
    this.stream$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(this.widget.input, 'input').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.debounceTime)(500), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(event => event.target.value.trim()), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.filter)(Boolean), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(value => {
      this.widget.showPreviewBox();
      this.searchStatus = true;
      return fetch(`${this.port}/search/${value}`).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Не удалось осуществить поиск');
      });
    }));
    this.subscribeStream();
    this.widget.input.addEventListener('input', e => {
      if (!this.searchStatus) this.subscribeStream();
      if (!this.searchStatus) this.searchStatus = true;
      if (e.target.value === '') this.widget.changePreviewInfo('Продолжим поиск?');else this.widget.changePreviewInfo('Идёт поиск...');
    });
  }
  subscribeStream() {
    this.stream$.subscribe(this.observer);
  }
  stopStream() {
    this.observer.complete();
  }
  showSearchedMessage(e) {
    this.stopStream();
    this.communicator.getMessageById(e.target.dataset.id).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось загрузить искомое сообщение');
    }).then(data => {
      if (data) {
        this.renderMessage(data);
        return;
      }
      throw new Error('Не удалось обработать ответ сервера');
    }).catch(err => {
      this.errMessage.showMessage(err.message);
    });
  }
}

/***/ }),

/***/ "./src/js/Search System/SearchWidget.js":
/*!**********************************************!*\
  !*** ./src/js/Search System/SearchWidget.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SearchWidget; }
/* harmony export */ });
/* harmony import */ var _CreationElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CreationElements */ "./src/js/CreationElements.js");
/* harmony import */ var _validationFileName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validationFileName */ "./src/js/validationFileName.js");
/* harmony import */ var _validationLengthMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../validationLengthMessage */ "./src/js/validationLengthMessage.js");



class SearchWidget {
  constructor(container) {
    this.container = container;
    this.searchWrapper = this.container.querySelector('.options_wrapper');
    this.input = this.searchWrapper.querySelector('.options-input');
    this.searchPreview = this.searchWrapper.querySelector('.search-preview_box');
    this.previewInfo = this.searchPreview.querySelector('.search-preview_info');
    this.previewList = this.searchPreview.querySelector('.search-preview_list');
    this.previewItemsBox = [];
  }
  showPreviewBox() {
    this.searchPreview.classList.remove('hidden');
    this.changePreviewInfo('Идет поиск...');
  }
  hidePreviewBox() {
    this.searchPreview.classList.add('hidden');
    this.clearPreviewList();
    this.changePreviewInfo('');
  }
  changePreviewInfo(message) {
    this.previewInfo.textContent = message;
  }
  readSearchMessages(box, listener) {
    this.clearPreviewList();
    let message = '';
    message = box.length > 0 ? 'Результаты поиска:' : 'Ничего не найдено...';
    this.changePreviewInfo(message);
    box.forEach(el => this.createPreviewItem(el, listener));
  }
  createPreviewItem(obj, listener) {
    const result = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('li', ['search-preview_item']);
    if (obj.fileStatus) result.textContent = (0,_validationFileName__WEBPACK_IMPORTED_MODULE_1__["default"])(obj.fileName, 30);else result.textContent = (0,_validationLengthMessage__WEBPACK_IMPORTED_MODULE_2__["default"])(obj.message, 30);
    result.dataset.id = obj.id;
    result.addEventListener('click', listener);
    this.previewItemsBox.push(result);
    this.previewList.append(result);
  }
  clearPreviewList() {
    this.previewItemsBox.forEach(el => el.remove());
    this.previewItemsBox = [];
  }
}

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Auxiliary_Tools_ToolTip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Auxiliary Tools/ToolTip */ "./src/js/Auxiliary Tools/ToolTip.js");
/* harmony import */ var _Auxiliary_Tools_Curtain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Auxiliary Tools/Curtain */ "./src/js/Auxiliary Tools/Curtain.js");
/* harmony import */ var _Auxiliary_Tools_ShowErrorMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Auxiliary Tools/ShowErrorMessage */ "./src/js/Auxiliary Tools/ShowErrorMessage.js");
/* harmony import */ var _MessageFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MessageFactory */ "./src/js/MessageFactory.js");
/* harmony import */ var _OrganizerWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OrganizerWidget */ "./src/js/OrganizerWidget.js");
/* harmony import */ var _CommunicationWithServer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CommunicationWithServer */ "./src/js/CommunicationWithServer.js");
/* harmony import */ var _OganizerController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./OganizerController */ "./src/js/OganizerController.js");
/* harmony import */ var _Geolocation_Geolocation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Geolocation/Geolocation */ "./src/js/Geolocation/Geolocation.js");
/* harmony import */ var _Geolocation_FormUserEnterCoordsCntrl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Geolocation/FormUserEnterCoordsCntrl */ "./src/js/Geolocation/FormUserEnterCoordsCntrl.js");
/* harmony import */ var _Auxiliary_Tools_ShowInform__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Auxiliary Tools/ShowInform */ "./src/js/Auxiliary Tools/ShowInform.js");
/* harmony import */ var _PinnedMessageController__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PinnedMessageController */ "./src/js/PinnedMessageController.js");
/* harmony import */ var _Bot_BotCommunicator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Bot/BotCommunicator */ "./src/js/Bot/BotCommunicator.js");
/* harmony import */ var _Bot_BotWidget__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Bot/BotWidget */ "./src/js/Bot/BotWidget.js");
/* harmony import */ var _Bot_BotController__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Bot/BotController */ "./src/js/Bot/BotController.js");
/* harmony import */ var _Message_Processing_Multimedia_MultimediaWidget__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Message Processing/Multimedia/MultimediaWidget */ "./src/js/Message Processing/Multimedia/MultimediaWidget.js");
/* harmony import */ var _Message_Processing_Multimedia_MultimediaInputProcessing__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Message Processing/Multimedia/MultimediaInputProcessing */ "./src/js/Message Processing/Multimedia/MultimediaInputProcessing.js");
/* harmony import */ var _Message_Processing_FileInputProcessing__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Message Processing/FileInputProcessing */ "./src/js/Message Processing/FileInputProcessing.js");
/* harmony import */ var _Search_System_SearchController__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Search System/SearchController */ "./src/js/Search System/SearchController.js");
/* harmony import */ var _Search_System_SearchWidget__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Search System/SearchWidget */ "./src/js/Search System/SearchWidget.js");
/* harmony import */ var _Search_System_SearchCommunicationServer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Search System/SearchCommunicationServer */ "./src/js/Search System/SearchCommunicationServer.js");




















const container = document.querySelector('.container');
const userEnterCoordsForms = document.forms.entercoords;
const curtainEl = document.querySelector('.curtain');
const port = 'https://ahj-diploma-chaos-organizer-backend.onrender.com';
const portWs = 'wss://ahj-diploma-chaos-organizer-backend.onrender.com';
const toolTip = new _Auxiliary_Tools_ToolTip__WEBPACK_IMPORTED_MODULE_0__["default"]('tooltip');
const curtain = new _Auxiliary_Tools_Curtain__WEBPACK_IMPORTED_MODULE_1__["default"](curtainEl);
const errMessage = new _Auxiliary_Tools_ShowErrorMessage__WEBPACK_IMPORTED_MODULE_2__["default"](container, 'error-message_box', 'error-message_text', 'error-message_ok', 'hidden', curtain);
const informWidget = new _Auxiliary_Tools_ShowInform__WEBPACK_IMPORTED_MODULE_9__["default"](container, curtain);
const botCommunicator = new _Bot_BotCommunicator__WEBPACK_IMPORTED_MODULE_11__["default"](port);
const botWidget = new _Bot_BotWidget__WEBPACK_IMPORTED_MODULE_12__["default"](container);
const botController = new _Bot_BotController__WEBPACK_IMPORTED_MODULE_13__["default"](botWidget, botCommunicator, errMessage, toolTip, informWidget);
const communicator = new _CommunicationWithServer__WEBPACK_IMPORTED_MODULE_5__["default"](port, portWs);
const userFormController = new _Geolocation_FormUserEnterCoordsCntrl__WEBPACK_IMPORTED_MODULE_8__["default"](userEnterCoordsForms, toolTip, curtain);
const geolocator = new _Geolocation_Geolocation__WEBPACK_IMPORTED_MODULE_7__["default"](userFormController, informWidget);
const mediaWidget = new _Message_Processing_Multimedia_MultimediaWidget__WEBPACK_IMPORTED_MODULE_14__["default"](container);
const mediaController = new _Message_Processing_Multimedia_MultimediaInputProcessing__WEBPACK_IMPORTED_MODULE_15__["default"](mediaWidget, communicator, geolocator, errMessage, informWidget);
const fileController = new _Message_Processing_FileInputProcessing__WEBPACK_IMPORTED_MODULE_16__["default"](container, communicator, geolocator, errMessage);
const searcherWidget = new _Search_System_SearchWidget__WEBPACK_IMPORTED_MODULE_18__["default"](container);
const searchCommunicator = new _Search_System_SearchCommunicationServer__WEBPACK_IMPORTED_MODULE_19__["default"](port);
const searcher = new _Search_System_SearchController__WEBPACK_IMPORTED_MODULE_17__["default"](searcherWidget, searchCommunicator, errMessage, port);
const factory = new _MessageFactory__WEBPACK_IMPORTED_MODULE_3__["default"](port);
const pinnedCtrl = new _PinnedMessageController__WEBPACK_IMPORTED_MODULE_10__["default"](errMessage);
const widget = new _OrganizerWidget__WEBPACK_IMPORTED_MODULE_4__["default"](container, factory, pinnedCtrl);
const controller = new _OganizerController__WEBPACK_IMPORTED_MODULE_6__["default"](widget, communicator, geolocator, errMessage, toolTip, informWidget, botController, mediaController, fileController, searcher);
controller.activation();

/***/ }),

/***/ "./src/js/createDownloadLink.js":
/*!**************************************!*\
  !*** ./src/js/createDownloadLink.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createDownloadLink; }
/* harmony export */ });
/* harmony import */ var _CreationElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreationElements */ "./src/js/CreationElements.js");

function createDownloadLink(objectURL, name) {
  const link = _CreationElements__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('a', ['download_message', 'message-ctrl_btn'], [{
    name: 'href',
    value: `${objectURL}`
  }, {
    name: 'download',
    value: name
  }]);
  return link;
}

/***/ }),

/***/ "./src/js/validationFileName.js":
/*!**************************************!*\
  !*** ./src/js/validationFileName.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ validationFileName; }
/* harmony export */ });
function validationFileName(fileName, validLength) {
  if (fileName.length > validLength) {
    const arr = fileName.split('.');
    const lastIndex = arr.length - 1;
    return `${arr.filter(el => el !== arr[lastIndex]).join('.').slice(0, validLength - 3)}... ${arr[lastIndex]}`;
  }
  return fileName;
}

/***/ }),

/***/ "./src/js/validationLengthMessage.js":
/*!*******************************************!*\
  !*** ./src/js/validationLengthMessage.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ validationLengthMessage; }
/* harmony export */ });
function validationLengthMessage(string, length) {
  const lengthMax = length || 15;
  if (string.length < lengthMax) {
    return string;
  }
  const result = `${string.slice(0, lengthMax - 3)}...`;
  return result;
}

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./img/avatar.svg */ "./src/img/avatar.svg"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n    <title>Chaos Organizer</title>\n    <link rel=\"shortcut icon\" href=\"#\" />\n</head>\n<body>\n    <div class=\"container\">\n        <div class=\"organizer-box\">\n            <input name=\"file\" type=\"file\" class=\"file-loader\">\n            <h1 class=\"organizer_title\">Chaos Organizer</h1>\n            <div class=\"organizer_header\">\n                <div class=\"profile_box\">\n                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" alt=\"Изображение профиля\" class=\"profile_img\">\n                    <span class=\"profile_name\">Гость</span>\n                </div>\n                <div class=\"options_box\">\n                    <div class=\"bot-btn_wrapper\">\n                        <button type=\"button\" class=\"bot-control_btn header_btn\" aria-label=\"Открыть команды боту\"></button>\n                    </div>\n                    <div class=\"options_wrapper\">\n                        <div class=\"options-input_box options-active\">\n                            <input type=\"text\" name=\"search\" placeholder=\"Что будем искать?\" class=\"options-input\">\n                            <div class=\"options_icon serch-icon\"></div>\n                        </div>\n                        <div class=\"options-bot_box\">\n                            <span class=\"bot_name\">chaos:</span>\n                            <input type=\"text\" name=\"bot\" placeholder=\"Что вас интересует?\" class=\"bot-input\">\n                            <div class=\"options_icon bot-icon\"></div>\n                        </div>\n                        <div class=\"search-preview_box hidden\">\n                            <p class=\"search-preview_info\"></p>\n                            <ul class=\"search-preview_list\"></ul>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"header-btn_box\">\n                    <button type=\"button\" class=\"load-file_btn header_btn\" aria-label=\"Загрузить файл\"></button>\n                    <button type=\"button\" class=\"toggle-aside_btn header_btn\" aria-label=\"Открыть боковую панель\"></button>\n                </div>\n                <div class=\"bot-info_container hidden\">\n                    <div class=\"bot-info_icon\"></div>\n                    <div class=\"bot-info_content\"></div>\n                </div>\n            </div>\n            <div class=\"organizer_body\">\n                <div class=\"message-list_wrapper\">\n                    <ul class=\"message-list\"></ul>\n                </div>\n                <div class=\"organizer_aside hidden\">\n                    <ul class=\"aside-menu_list\">\n                        <li id=\"favorites\" class=\"menu_item\">\n                            <div class=\"item_img item-filter aside_favorites\"></div>\n                            <span data-id=\"favorites\" class=\"item_counter item-filter\">0</span>\n                            <span class=\"item_name\">Избранное</span>\n                        </li>\n                        <li id=\"image\" class=\"menu_item\">\n                            <div class=\"item_img item-filter aside_image\"></div>\n                            <span data-id=\"image\" class=\"item_counter item-filter\">0</span>\n                            <span class=\"item_name\">Изображения</span>\n                        </li>\n                        <li id=\"video\" class=\"menu_item\">\n                            <div class=\"item_img item-filter aside_video\"></div>\n                            <span data-id=\"video\" class=\"item_counter item-filter\">0</span>\n                            <span class=\"item_name\">Видео</span>\n                        </li>\n                        <li id=\"audio\" class=\"menu_item\">\n                            <div class=\"item_img item-filter aside_audio\"></div>\n                            <span data-id=\"audio\" class=\"item_counter item-filter\">0</span>\n                            <span class=\"item_name\">Аудио</span>\n                        </li>\n                        <li id=\"other\" class=\"menu_item\">\n                            <div class=\"item_img item-filter aside_files\"></div>\n                            <span data-id=\"other\" class=\"item_counter item-filter\">0</span>\n                            <span class=\"item_name\">Файлы</span>\n                        </li>\n                        <li id=\"links\" class=\"menu_item\">\n                            <div class=\"item_img item-filter aside_links\"></div>\n                            <span data-id=\"links\" class=\"item_counter item-filter\">0</span>\n                            <span class=\"item_name\">Ссылки</span>\n                        </li>\n                        <li id=\"text\" class=\"menu_item\">\n                            <div class=\"item_img item-filter aside_text\"></div>\n                            <span data-id=\"text\" class=\"item_counter item-filter\">0</span>\n                            <span class=\"item_name\">Текст</span>\n                        </li>\n                        <li id=\"sticker\" class=\"menu_item\">\n                            <div class=\"item_img item-filter aside_sticker\"></div>\n                            <span data-id=\"sticker\" class=\"item_counter item-filter\">0</span>\n                            <span class=\"item_name\">Стикеры</span>\n                        </li>\n                        <li id=\"all\" class=\"menu_item active-filter\">\n                            <div class=\"item_img item-filter aside_all\"></div>\n                            <span data-id=\"all\" class=\"item_counter item-filter\">0</span>\n                            <span class=\"item_name\">Все</span>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"organizer_footer\">\n                <div class=\"wrapper_standart-footer\">\n                    <div class=\"emoji-btns_box\">\n                        <button type=\"button\" class=\"add-sticker_btn footer_btn\" aria-label=\"Добавить стикер\"></button>\n                        <button type=\"button\" data-emoji=\"&#x1f601;\" class=\"add-emoji_btn footer_btn\" aria-label=\"Добавить смайл\"></button>\n                    </div>\n                    <div class=\"enter-text_box\">\n                        <input type=\"text\" placeholder=\"Напишите...\" class=\"enter-text\">\n                    </div>\n                    <div class=\"rec-media_box\">\n                        <button type=\"button\" class=\"rec-btn_audio footer_btn\" aria-label=\"Начать запись аудио сообщения\"></button>\n                        <button type=\"button\" class=\"rec-btn_video footer_btn\" aria-label=\"Начать запись видео сообщения\"></button>\n                    </div>\n                                        \n                                        <!-- --- Emoji --- -->\n\n                    <div class=\"emoji_box hidden\">\n                        <button type=\"button\" class=\"emoji_item\">&#128512;</button>\n                        <button type=\"button\" class=\"emoji_item\">&#129315;</button>\n                        <button type=\"button\" class=\"emoji_item\">&#128579;</button>\n                        <button type=\"button\" class=\"emoji_item\">&#128521;</button>\n                        <button type=\"button\" class=\"emoji_item\">&#129321;</button>\n                        <button type=\"button\" class=\"emoji_item\">&#129322;</button>\n                        <button type=\"button\" class=\"emoji_item\">&#129312;</button>\n                        <button type=\"button\" class=\"emoji_item\">&#128075;</button>\n                        <button type=\"button\" class=\"emoji_item\">&#9996;</button>\n                        <button type=\"button\" class=\"emoji_item\">&#127757;</button>\n                    </div>\n\n                                        <!-- --- Stickers --- -->\n\n                    <div class=\"sticker_box hidden\">\n                        <button type=\"button\" data-sticker=\"sticker_animal\" class=\"sticker sticker_animal\" aria-label=\"Стикер летучая мышь\"></button>\n                        <button type=\"button\" data-sticker=\"sticker_monarch\" class=\"sticker sticker_monarch\" aria-label=\"Стикер бабочка\"></button>\n                        <button type=\"button\" data-sticker=\"sticker_lion\" class=\"sticker sticker_lion\" aria-label=\"Стикер лев\"></button>\n                        <button type=\"button\" data-sticker=\"sticker_geppetto\" class=\"sticker sticker_geppetto\" aria-label=\"Стикер дедушка\"></button>\n                        <button type=\"button\" data-sticker=\"sticker_heart\" class=\"sticker sticker_heart\" aria-label=\"Стикер сердце\"></button>\n                        <button type=\"button\" data-sticker=\"sticker_scooter\" class=\"sticker sticker_scooter\" aria-label=\"Стикер скутер\"></button>\n                        <button type=\"button\" data-sticker=\"sticker_laptop\" class=\"sticker sticker_laptop\" aria-label=\"Стикер ноутбук\"></button>\n                        <button type=\"button\" data-sticker=\"sticker_italy\" class=\"sticker sticker_italy\" aria-label=\"Стикер Италия\"></button>\n                        <button type=\"button\" data-sticker=\"sticker_angry\" class=\"sticker sticker_angry\" aria-label=\"Стикер злой\"></button>\n                        <button type=\"button\" data-sticker=\"sticker_travel\" class=\"sticker sticker_travel\" aria-label=\"Стикер путешествие\"></button>\n                    </div>\n                </div>\n\n                                        <!-- --- Rec Box --- -->\n\n                <div class=\"footer_rec-active hidden\">\n                    <div class=\"btn_box box_rec\">\n                        <button type=\"button\" class=\"btn_end footer_btn\" aria-label=\"Остановить запись\"></button>\n                        <p class=\"timer_rec\">00 : 00</p>\n                        <button type=\"button\" class=\"btn_cansel footer_btn\" aria-label=\"Отменить запись\"></button>\n                    </div>\n                    <div class=\"preview_box hidden\">\n                        <video class=\"preview\" autoplay muted></video>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n                                    <!-- --- Form Coordinates --- -->\n\n        <form name=\"entercoords\" class=\"coords_user hidden\">\n            <h5 class=\"inform_title\">Что-то пошло не так</h5>\n            <p class=\"inform_text\">\n                К сожалению, нам не удалось определить ваше местоположение,\n                пожалуйста, дайте разрешение на использование геолокации,\n                либо введите координаты вручную.\n            </p>\n            <p class=\"coords_comment\">Широта и долгота через запятую</p>\n            <input name=\"coords\" type=\"text\" class=\"enter_coords\">\n        </form>\n\n                                    <!-- --- ERROR --- -->\n\n        <div class=\"error-message_box hidden\">\n            <h3 class=\"error-message_title\">Произошла ошибка</h3>\n            <span class=\"error-message_text\"></span>\n            <button type=\"button\" class=\"error-message_ok\">Ok</button>\n        </div>\n\n                                    <!-- --- INFORM --- -->\n\n        <div class=\"inform_box hidden\">\n            <span class=\"inform_message\"></span>\n            <button type=\"button\" class=\"inform_ok\">Ok</button>\n        </div>\n        <div class=\"curtain hidden\"></div>\n    </div>\n</body>\n</html>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/img/avatar.svg":
/*!****************************!*\
  !*** ./src/img/avatar.svg ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cb5150209d01901d2bf0.svg";

/***/ }),

/***/ "./src/licenses.txt":
/*!**************************!*\
  !*** ./src/licenses.txt ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "licenses.txt";

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.mjs":
/*!******************************************!*\
  !*** ./node_modules/tslib/tslib.es6.mjs ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: function() { return /* binding */ __addDisposableResource; },
/* harmony export */   __assign: function() { return /* binding */ __assign; },
/* harmony export */   __asyncDelegator: function() { return /* binding */ __asyncDelegator; },
/* harmony export */   __asyncGenerator: function() { return /* binding */ __asyncGenerator; },
/* harmony export */   __asyncValues: function() { return /* binding */ __asyncValues; },
/* harmony export */   __await: function() { return /* binding */ __await; },
/* harmony export */   __awaiter: function() { return /* binding */ __awaiter; },
/* harmony export */   __classPrivateFieldGet: function() { return /* binding */ __classPrivateFieldGet; },
/* harmony export */   __classPrivateFieldIn: function() { return /* binding */ __classPrivateFieldIn; },
/* harmony export */   __classPrivateFieldSet: function() { return /* binding */ __classPrivateFieldSet; },
/* harmony export */   __createBinding: function() { return /* binding */ __createBinding; },
/* harmony export */   __decorate: function() { return /* binding */ __decorate; },
/* harmony export */   __disposeResources: function() { return /* binding */ __disposeResources; },
/* harmony export */   __esDecorate: function() { return /* binding */ __esDecorate; },
/* harmony export */   __exportStar: function() { return /* binding */ __exportStar; },
/* harmony export */   __extends: function() { return /* binding */ __extends; },
/* harmony export */   __generator: function() { return /* binding */ __generator; },
/* harmony export */   __importDefault: function() { return /* binding */ __importDefault; },
/* harmony export */   __importStar: function() { return /* binding */ __importStar; },
/* harmony export */   __makeTemplateObject: function() { return /* binding */ __makeTemplateObject; },
/* harmony export */   __metadata: function() { return /* binding */ __metadata; },
/* harmony export */   __param: function() { return /* binding */ __param; },
/* harmony export */   __propKey: function() { return /* binding */ __propKey; },
/* harmony export */   __read: function() { return /* binding */ __read; },
/* harmony export */   __rest: function() { return /* binding */ __rest; },
/* harmony export */   __runInitializers: function() { return /* binding */ __runInitializers; },
/* harmony export */   __setFunctionName: function() { return /* binding */ __setFunctionName; },
/* harmony export */   __spread: function() { return /* binding */ __spread; },
/* harmony export */   __spreadArray: function() { return /* binding */ __spreadArray; },
/* harmony export */   __spreadArrays: function() { return /* binding */ __spreadArrays; },
/* harmony export */   __values: function() { return /* binding */ __values; }
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ __webpack_exports__["default"] = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/app */ "./src/js/app.js");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");
/* harmony import */ var _licenses_txt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./licenses.txt */ "./src/licenses.txt");




}();
/******/ })()
;
//# sourceMappingURL=main.js.map