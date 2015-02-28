define(["exports", "./origin", "./resource-type", "./metadata"], function (exports, _origin, _resourceType, _metadata) {
  "use strict";

  /**
   * Utilities for reading and writing the metadata of JavaScript functions.
   *
   * @module metadata
   */

  exports.Origin = _origin.Origin;
  exports.ResourceType = _resourceType.ResourceType;
  exports.Metadata = _metadata.Metadata;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});