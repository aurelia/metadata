define(["exports", "./origin", "./resource-type", "./annotations"], function (exports, _origin, _resourceType, _annotations) {
  "use strict";

  exports.Origin = _origin.Origin;
  exports.ResourceType = _resourceType.ResourceType;
  exports.getAnnotation = _annotations.getAnnotation;
  exports.getAllAnnotations = _annotations.getAllAnnotations;
  exports.addAnnotation = _annotations.addAnnotation;
  exports.normalize = _annotations.normalize;
});