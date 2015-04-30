define(['exports', 'core-js'], function (exports, _coreJs) {
  'use strict';

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

  exports.__esModule = true;

  var _core = _interopRequire(_coreJs);

  var originStorage = new Map(),
      unknownOrigin = Object.freeze({ moduleId: undefined, moduleMember: undefined });

  function ensureType(value) {
    if (value instanceof Origin) {
      return value;
    }

    return new Origin(value);
  }

  var Origin = (function () {
    function Origin(moduleId, moduleMember) {
      _classCallCheck(this, Origin);

      this.moduleId = moduleId;
      this.moduleMember = moduleMember;
    }

    Origin.get = function get(fn) {
      var origin = originStorage.get(fn);

      if (origin !== undefined) {
        return origin;
      }

      if (typeof fn.origin === 'function') {
        originStorage.set(fn, origin = ensureType(fn.origin()));
      } else if (fn.origin !== undefined) {
        originStorage.set(fn, origin = ensureType(fn.origin));
      }

      return origin || unknownOrigin;
    };

    Origin.set = function set(fn, origin) {
      if (Origin.get(fn) === unknownOrigin) {
        originStorage.set(fn, origin);
      }
    };

    return Origin;
  })();

  exports.Origin = Origin;
});