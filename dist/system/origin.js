System.register([], function (_export) {
  var _prototypeProperties, _classCallCheck, originStorage, Origin;

  function ensureType(value) {
    if (value instanceof Origin) {
      return value;
    }

    return new Origin(value);
  }

  return {
    setters: [],
    execute: function () {
      "use strict";

      _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      originStorage = new Map();
      /**
      * A metadata annotation that describes the origin module of the function to which it's attached.
      *
      * @class Origin
      * @constructor
      * @param {string} moduleId The origin module id.
      * @param {string} moduleMember The name of the export in the origin module.
      */
      Origin = _export("Origin", (function () {
        function Origin(moduleId, moduleMember) {
          _classCallCheck(this, Origin);

          this.moduleId = moduleId;
          this.moduleMember = moduleMember;
        }

        _prototypeProperties(Origin, {
          get: {

            /**
            * Get the Origin annotation for the specified function.
            *
            * @method get
            * @static
            * @param {Function} fn The function to inspect for Origin metadata.
            * @return {Origin} Returns the Origin metadata.
            */

            value: function get(fn) {
              var origin = originStorage.get(fn);

              if (origin !== undefined) {
                return origin;
              }

              if (typeof fn.origin === "function") {
                originStorage.set(fn, origin = ensureType(fn.origin()));
              } else if (fn.origin !== undefined) {
                originStorage.set(fn, origin = ensureType(fn.origin));
              }

              return origin;
            },
            writable: true,
            configurable: true
          },
          set: {

            /**
            * Set the Origin annotation for the specified function.
            *
            * @method set
            * @static
            * @param {Function} fn The function to set the Origin metadata on.
            * @param {origin} fn The Origin metadata to store on the function.
            * @return {Origin} Returns the Origin metadata.
            */

            value: function set(fn, origin) {
              if (Origin.get(fn) === undefined) {
                originStorage.set(fn, origin);
              }
            },
            writable: true,
            configurable: true
          }
        });

        return Origin;
      })());
    }
  };
});