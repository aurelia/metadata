define(["exports"], function (exports) {
  "use strict";

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

  exports.Origin = Origin;
});