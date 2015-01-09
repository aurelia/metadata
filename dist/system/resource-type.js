System.register("resource-type", [], function (_export) {
  "use strict";

  var __moduleName = "resource-type";

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

  return {
    setters: [],
    execute: function () {
      _export("ResourceType", ResourceType);
    }
  };
});