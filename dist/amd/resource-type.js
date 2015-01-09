define(["exports"], function (exports) {
  "use strict";

  var ResourceType = (function () {
    var ResourceType = function ResourceType() {};

    ResourceType.prototype.load = function (container, target) {
      return this;
    };

    ResourceType.prototype.register = function (registry, name) {
      throw new Error("All descendents of \"ResourceType\" must implement the \"register\" method.");
    };

    return ResourceType;
  })();

  exports.ResourceType = ResourceType;
});