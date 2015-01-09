System.register("origin", [], function (_export) {
  "use strict";

  var __moduleName = "origin";

  function ensureType(value) {
    if (value instanceof Origin) {
      return value;
    }

    return new Origin(value);
  }

  var Origin = (function () {
    var Origin = function Origin(moduleId, moduleMember) {
      this.moduleId = moduleId;
      this.moduleMember = moduleMember;
    };

    Origin.get = function (fn) {
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
    };

    Origin.set = function (fn, origin) {
      if (Origin.get(fn) === null) {
        fn.__origin__ = origin;
      }
    };

    return Origin;
  })();

  return {
    setters: [],
    execute: function () {
      _export("Origin", Origin);
    }
  };
});