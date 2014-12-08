define(["exports"], function (exports) {
  "use strict";

  exports.normalize = normalize;
  exports.getAnnotation = getAnnotation;
  exports.getAllAnnotations = getAllAnnotations;
  exports.addAnnotation = addAnnotation;
  function normalize(fn) {
    if (typeof fn.annotations === "function") {
      fn.annotations = fn.annotations();
    }
  }

  function getAnnotation(fn, annotationType) {
    var annotations = fn.annotations, i, ii, annotation;

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

  function getAllAnnotations(fn, annotationType) {
    var annotations = fn.annotations, found = [], i, ii, annotation;

    if (annotations === undefined) {
      return found;
    }

    for (i = 0, ii = annotations.length; i < ii; ++i) {
      annotation = annotations[i];

      if (annotation instanceof annotationType) {
        found.push(annotation);
      }
    }

    return found;
  }

  function addAnnotation(fn, annotation) {
    var annotations = fn.annotations || (fn.annotations = []);
    annotations.push(annotation);
  }
});