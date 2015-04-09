System.register(['core-js'], function (_export) {
  var core, _classCallCheck, _createClass, originStorage, Origin;

  function ensureType(value) {
    if (value instanceof Origin) {
      return value;
    }

    return new Origin(value);
  }

  return {
    setters: [function (_coreJs) {
      core = _coreJs['default'];
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      originStorage = new Map();

      Origin = (function () {
        function Origin(moduleId, moduleMember) {
          _classCallCheck(this, Origin);

          this.moduleId = moduleId;
          this.moduleMember = moduleMember;
        }

        _createClass(Origin, null, [{
          key: 'get',
          value: function get(fn) {
            var origin = originStorage.get(fn);

            if (origin !== undefined) {
              return origin;
            }

            if (typeof fn.origin === 'function') {
              originStorage.set(fn, origin = ensureType(fn.origin()));
            } else if (fn.origin !== undefined) {
              originStorage.set(fn, origin = ensureType(fn.origin));
            }

            return origin;
          }
        }, {
          key: 'set',
          value: function set(fn, origin) {
            if (Origin.get(fn) === undefined) {
              originStorage.set(fn, origin);
            }
          }
        }]);

        return Origin;
      })();

      _export('Origin', Origin);
    }
  };
});