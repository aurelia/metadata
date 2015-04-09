System.register(['./origin', './resource-type', './metadata', './decorators'], function (_export) {
  return {
    setters: [function (_origin) {
      _export('Origin', _origin.Origin);
    }, function (_resourceType) {
      _export('ResourceType', _resourceType.ResourceType);
    }, function (_metadata) {
      _export('Metadata', _metadata.Metadata);
    }, function (_decorators) {
      _export('Decorators', _decorators.Decorators);
    }],
    execute: function () {
      'use strict';
    }
  };
});