"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
* An abstract base class used to designate resources which can be loaded and registered in a framework.
*
* @class ResourceType
* @constructor
*/

var ResourceType = exports.ResourceType = (function () {
  function ResourceType() {
    _classCallCheck(this, ResourceType);
  }

  _prototypeProperties(ResourceType, null, {
    load: {
      /**
      * Implemented by resource metadata to allow it to self-configure and load dependencies.
      *
      * @method load
      * @param {Container} container The dependency injection container to use for service resolution.
      * @param {Object} target The target that is decorated by this ResourceType metadata.
      * @return {Promise} Returns a promise for itself, resolving when all dependent resources are loaded.
      */

      value: function load(container, target) {
        return this;
      },
      writable: true,
      configurable: true
    },
    register: {

      /**
      * Implemented by resources to allow them to register themselved in a resource registry.
      *
      * @method register
      * @param {ResourceRegistry} registry The resource registry that this resource needs to be registered in.
      * @param {String} [name] A possible name override for the resource.
      */

      value: function register(registry, name) {
        throw new Error("All descendents of \"ResourceType\" must implement the \"register\" method.");
      },
      writable: true,
      configurable: true
    }
  });

  return ResourceType;
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});