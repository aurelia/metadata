System.register(['core-js'], function (_export) {
  'use strict';

  var core, originStorage, unknownOrigin, Origin;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_coreJs) {
      core = _coreJs['default'];
    }],
    execute: function () {
      originStorage = new Map();
      unknownOrigin = Object.freeze({ moduleId: undefined, moduleMember: undefined });

      if (!window.System) {
        window.System = {};
      }

      if (!System.forEachModule) {
        System.forEachModule = function () {};
      }

      Origin = (function () {
        function Origin(moduleId, moduleMember) {
          _classCallCheck(this, Origin);

          this.moduleId = moduleId;
          this.moduleMember = moduleMember;
        }

        Origin.get = function get(fn) {
          var origin = originStorage.get(fn);

          if (origin === undefined) {
            System.forEachModule(function (key, value) {
              for (var name in value) {
                var exp = value[name];
                if (exp === fn) {
                  originStorage.set(fn, origin = new Origin(key, name));
                  return;
                }
              }

              if (value === fn) {
                originStorage.set(fn, origin = new Origin(key, 'default'));
                return;
              }
            });
          }

          return origin || unknownOrigin;
        };

        Origin.set = function set(fn, origin) {
          originStorage.set(fn, origin);
        };

        return Origin;
      })();

      _export('Origin', Origin);
    }
  };
});