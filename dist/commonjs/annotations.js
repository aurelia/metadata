"use strict";

exports.getAnnotation = getAnnotation;
exports.getAllAnnotations = getAllAnnotations;
exports.addAnnotation = addAnnotation;
function getAnnotation(fn, annotationType, deep) {
  var annotations, i, ii, annotation;

  if (!fn) {
    return null;
  }

  if (typeof fn.annotations === "function") {
    fn.annotations = fn.annotations();
  }

  annotations = fn.annotations;

  if (annotations === undefined) {
    if (deep) {
      return getAnnotation(Object.getPrototypeOf(fn), annotationType, deep);
    }

    return null;
  }

  for (i = 0, ii = annotations.length; i < ii; ++i) {
    annotation = annotations[i];

    if (annotation instanceof annotationType) {
      return annotation;
    }
  }

  if (deep) {
    return getAnnotation(Object.getPrototypeOf(fn), annotationType, deep);
  }

  return null;
}


var noAnnotations = [];

function getAllAnnotations(fn, annotationType, deep) {
  var annotations, i, ii, annotation, found;

  if (!fn) {
    return noAnnotations;
  }

  if (typeof fn.annotations === "function") {
    fn.annotations = fn.annotations();
  }

  annotations = fn.annotations;

  if (annotations === undefined) {
    if (deep) {
      return getAllAnnotations(Object.getPrototypeOf(fn), annotationType, deep);
    }

    return noAnnotations;
  }

  found = [];

  for (i = 0, ii = annotations.length; i < ii; ++i) {
    annotation = annotations[i];

    if (annotation instanceof annotationType) {
      found.push(annotation);
    }
  }

  if (deep) {
    found = found.concat(getAllAnnotations(Object.getPrototypeOf(fn), annotationType, deep));
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