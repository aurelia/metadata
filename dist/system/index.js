System.register("index", [], function (_export) {
  "use strict";

  var __moduleName = "index";

  return {
    setters: [],
    execute: function () {
      _export("Origin", ./origin.Origin);

      _export("ResourceType", ./resource-type.ResourceType);

      _export("getAnnotation", ./annotations.getAnnotation);

      _export("getAllAnnotations", ./annotations.getAllAnnotations);

      _export("addAnnotation", ./annotations.addAnnotation);
    }
  };
});