"use strict";

System.register([], function (_export) {
  var ResourceType;
  return {
    setters: [],
    execute: function () {
      ResourceType = function ResourceType() {};

      ResourceType.prototype.load = function (container, target) {
        return this;
      };

      ResourceType.prototype.register = function (registry, name) {
        throw new Error("All descendents of \"ResourceType\" must implement the \"register\" method.");
      };

      _export("ResourceType", ResourceType);
    }
  };
});