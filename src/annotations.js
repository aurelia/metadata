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

  resolveAnnotations(fn);

  let annotations = fn.annotations;

  if(annotations === undefined){
    return null;
  }

  for(let annotation of annotations){
    if(annotation instanceof annotationType){
      return annotation;
    }
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
 * @return {Array} Returns an array of the specified annotation type.
 * @for export
 */
export function getAllAnnotations(fn, annotationType){

  resolveAnnotations(fn);

  let annotations = fn.annotations;

  if(annotations === undefined){
    return noAnnotations;
  }

  let found = [];

  for(let annotation of annotations){
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

  resolveAnnotations(fn);
  
  let annotations = fn.annotations || (fn.annotations = []);
  annotations.push(annotation);
}

function resolveAnnotations(fn){
 if(typeof fn.annotations === 'function'){
    fn.annotations = fn.annotations();
  }
}
