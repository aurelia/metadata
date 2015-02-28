System.register(["./origin", "./resource-type", "./metadata"], function (_export) {
  return {
    setters: [function (_origin) {
      /**
       * Utilities for reading and writing the metadata of JavaScript functions.
       *
       * @module metadata
       */

      _export("Origin", _origin.Origin);
    }, function (_resourceType) {
      _export("ResourceType", _resourceType.ResourceType);
    }, function (_metadata) {
      _export("Metadata", _metadata.Metadata);
    }],
    execute: function () {
      "use strict";
    }
  };
});