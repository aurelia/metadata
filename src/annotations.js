/**
 * Searches a function's metadata for an annotation of a particular type.
 *
 * @method getAnnotation
 * @param {Function} fn The function whose annotations are being inspected.
 * @param {Function} annotationType The annotation type to look for.
 * @param {Boolean} deep Indicates whether or not to search the inheritance hierarchy for annotations.
 * @return {Object} Returns an instance of the specified annotation type if found; otherwise null.
 * @for export
 */
export function getAnnotation(fn, annotationType, deep){
  var annotations, i, ii, annotation;

  if(!fn){
    return null;
  }

  if(typeof fn.annotations === 'function'){
    fn.annotations = fn.annotations();
  }

  annotations = fn.annotations;

  if(annotations === undefined){
    if(deep){
      return getAnnotation(Object.getPrototypeOf(fn), annotationType, deep);
    }

    return null;
  }

  for(i = 0, ii = annotations.length; i < ii; ++i){
    annotation = annotations[i];

    if(annotation instanceof annotationType){
      return annotation;
    }
  }

  if(deep){
    return getAnnotation(Object.getPrototypeOf(fn), annotationType, deep);
  }

  return null;
}

var noAnnotations = [];

/**
 * Searches a function's metadata for all annotations of a particular type.
 *
 * @method getAllAnnotations
 * @param {Function} fn The function whose annotations are being inspected.
 * @param {Function} annotationType The annotation type to look for.
 * @param {Boolean} deep Indicates whether or not to search the inheritance hierarchy for annotations.
 * @return {Array} Returns an array of the specified annotation type.
 * @for export
 */
export function getAllAnnotations(fn, annotationType, deep){
  var annotations, i, ii, annotation, found;

  if(!fn){
    return noAnnotations;
  }

  if(typeof fn.annotations === 'function'){
    fn.annotations = fn.annotations();
  }

  annotations = fn.annotations;

  if(annotations === undefined){
    if(deep){
      return getAllAnnotations(Object.getPrototypeOf(fn), annotationType, deep);
    }

    return noAnnotations;
  }

  found = [];

  for(i = 0, ii = annotations.length; i < ii; ++i){
    annotation = annotations[i];

    if(annotation instanceof annotationType){
      found.push(annotation);
    }
  }

  if(deep){
    found = found.concat(getAllAnnotations(Object.getPrototypeOf(fn), annotationType, deep));
  }

  return found;
}

/**
 * Adds metadata to a function.
 *
 * @method addAnnotation
 * @param {Function} fn The function being tagged with metadata.
 * @param {Object} annotation The annotation instance to add.
 * @for export
 */
export function addAnnotation(fn, annotation){
  var annotations;

  if(typeof fn.annotations === 'function'){
    fn.annotations = fn.annotations();
  }

  annotations = fn.annotations || (fn.annotations = []);
  annotations.push(annotation);
}