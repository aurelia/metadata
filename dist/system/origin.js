System.register([], function (_export) {
  "use strict";

  var _prototypeProperties, Origin;


  function ensureType(value) {
    if (value instanceof Origin) {
      return value;
    }

    return new Origin(value);
  }

  return {
    setters: [],
    execute: function () {
      _prototypeProperties = function (child, staticProps, instanceProps) {
        if (staticProps) Object.defineProperties(child, staticProps);
        if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
      };

      Origin = (function () {
        var Origin = function Origin(moduleId, moduleMember) {
          this.moduleId = moduleId;
          this.moduleMember = moduleMember;
        };

        _prototypeProperties(Origin, {
          get: {
            value: function (fn) {
              var origin = fn.__origin__;

              if (origin !== undefined) {
                return origin;
              }

              if (typeof fn.origin === "function") {
                return fn.__origin__ = ensureType(fn.origin());
              }

              if (fn.origin !== undefined) {
                return fn.__origin__ = ensureType(fn.origin);
              }

              return null;
            },
            writable: true,
            enumerable: true,
            configurable: true
          },
          set: {
            value: function (fn, origin) {
              if (Origin.get(fn) === null) {
                fn.__origin__ = origin;
              }
            },
            writable: true,
            enumerable: true,
            configurable: true
          }
        });

        return Origin;
      })();
      _export("Origin", Origin);
    }
  };
});