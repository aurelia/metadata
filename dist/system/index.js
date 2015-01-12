System.register(["./origin", "./resource-type", "./annotations"], function (_export) {
  "use strict";

  return {
    setters: [function (_origin) {
      _export("Origin", _origin.Origin);
    }, function (_resourceType) {
      _export("ResourceType", _resourceType.ResourceType);
    }, function (_annotations) {
      _export("getAnnotation", _annotations.getAnnotation);

      _export("getAllAnnotations", _annotations.getAllAnnotations);

      _export("addAnnotation", _annotations.addAnnotation);
    }],
    execute: function () {}
  };
});