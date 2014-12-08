/**
 * Normalizes a function's annotation representation.
 *
 * @method normalize
 * @param {Function} fn The function whose annotations may require normalization.
 * @for export
 */
export function normalize(fn){
  if(typeof fn.annotations === 'function'){
    fn.annotations = fn.annotations();
  }
}

/**
 * Searches a function's metadata for an annotation of a particular type.
 *
 * @method getAnnotation
 * @param {Function} fn The function whose annotations are being inspected.
 * @param {Function} annotationType The annotation type to look for.
 * @return {Object} Returns an instance of the specified annotation type if found; otherwise null.
 * @for export
 */
export function getAnnotation(fn, annotationType){
  var annotations = fn.annotations,
      i, ii, annotation;
  
  if(annotations === undefined){
    return null;
  }

  for(i = 0, ii = annotations.length; i < ii; ++i){
    annotation = annotations[i];

    if(annotation instanceof annotationType){
      return annotation;
    }
  }

  return null;
}

/**
 * Searches a function's metadata for all annotations of a particular type.
 *
 * @method getAllAnnotations
 * @param {Function} fn The function whose annotations are being inspected.
 * @param {Function} annotationType The annotation type to look for.
 * @return {Array} Returns an array of the specified annotation type.
 * @for export
 */
export function getAllAnnotations(fn, annotationType){
  var annotations = fn.annotations,
      found = [], i, ii, annotation;

  if(annotations === undefined){
    return found;
  }

  for(i = 0, ii = annotations.length; i < ii; ++i){
    annotation = annotations[i];

    if(annotation instanceof annotationType){
      found.push(annotation);
    }
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
  var annotations = fn.annotations || (fn.annotations = []);
  annotations.push(annotation);
}