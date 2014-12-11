define(["exports"], function (exports) {
  "use strict";

  exports.getAnnotation = getAnnotation;
  exports.getAllAnnotations = getAllAnnotations;
  exports.addAnnotation = addAnnotation;
  function getAnnotation(fn, annotationType) {
    var annotations, i, ii, annotation;

    if (typeof fn.annotations === "function") {
      fn.annotations = fn.annotations();
    }

    annotations = fn.annotations;

    if (annotations === undefined) {
      return null;
    }

    for (i = 0, ii = annotations.length; i < ii; ++i) {
      annotation = annotations[i];

      if (annotation instanceof annotationType) {
        return annotation;
      }
    }

    return null;
  }

  var noAnnotations = [];

  function getAllAnnotations(fn, annotationType) {
    var annotations, i, ii, annotation, found;

    if (typeof fn.annotations === "function") {
      fn.annotations = fn.annotations();
    }

    annotations = fn.annotations;

    if (annotations === undefined) {
      return noAnnotations;
    }

    found = [];

    for (i = 0, ii = annotations.length; i < ii; ++i) {
      annotation = annotations[i];

      if (annotation instanceof annotationType) {
        found.push(annotation);
      }
    }

    return found;
  }

  function addAnnotation(fn, annotation) {
    var annotations;

    if (typeof fn.annotations === "function") {
      fn.annotations = fn.annotations();
    }

    annotations = fn.annotations || (fn.annotations = []);
    annotations.push(annotation);
  }
});