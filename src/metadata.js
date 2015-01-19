var functionMetadataStorage = new Map(),
    emptyMetadata = Object.freeze([]),
    locateFunctionMetadataElsewhere;

function getFunctionMetadataStorage(fn){
  var metadata = functionMetadataStorage.get(fn);

  if(metadata === undefined){
    if('metadata' in fn){
      if(typeof fn.metadata === 'function'){
        functionMetadataStorage.set(fn, metadata = fn.metadata());
      }else if(Array.isArray(fn.metadata)){
        functionMetadataStorage.set(fn, metadata = fn.metadata);
      }else{
        throw new Error(`Incorrect metadata format for ${fn}.`);
      }
    }else if(locateFunctionMetadataElsewhere !== undefined){
      metadata = locateFunctionMetadataElsewhere(fn);
      
      if(metadata === undefined){
        metadata = [];
      } else if(Array.isArray(metadata)){
        functionMetadataStorage.set(fn, metadata);
      }else{
        throw new Error(`Incorrect metadata format for ${fn}.`);
      }
    }else{
      functionMetadataStorage.set(fn, metadata = []);
    }
  }

  return metadata;
}

/**
 * Adds an additional location to search for metadata in.
 *
 * @method addFunctionMetadataLocation
 * @param {String} staticPropertyName The name of the property on the function instance to search for metadata.
 * @for export
 */
export function addFunctionMetadataLocation(staticPropertyName){
  addMetadataLocator(function(fn){return fn[staticPropertyName];});
}

/**
 * Adds a function capable of locating metadata for functions.
 *
 * @method addFunctionMetadataLocator
 * @param {Function} locator A function which receives a function which it searched for metadata. It should return unefined if none are found.
 * @for export
 */
export function addFunctionMetadataLocator(locator){
  if(locateFunctionMetadataElsewhere === undefined){
    locateFunctionMetadataElsewhere = locator;
  }

  var original = locateFunctionMetadataElsewhere;
  locateFunctionMetadataElsewhere = function(fn){return original(fn) || locator(fn);};
}

/**
 * Searches a function's metadata for a particular type.
 *
 * @method getFunctionMetadata
 * @param {Function} fn The function whose metadata is being searched.
 * @param {Function} type The metadata type to look for.
 * @param {Boolean} searchPrototype Indicates whether or not to search the inheritance hierarchy for metadata.
 * @return {Object} Returns an instance of the specified metadata type if found; otherwise null.
 * @for export
 */
export function getFunctionMetadata(fn, type, searchPrototype){
  var metadata, i, ii, potential;

  if(!fn){
    return null;
  }

  metadata = getFunctionMetadataStorage(fn);

  if(metadata.length === 0){
    if(searchPrototype){
      return getFunctionMetadata(Object.getPrototypeOf(fn), type, searchPrototype);
    }

    return null;
  }

  for(i = 0, ii = metadata.length; i < ii; ++i){
    potential = metadata[i];

    if(potential instanceof type){
      return potential;
    }
  }

  if(searchPrototype){
    return getFunctionMetadata(Object.getPrototypeOf(fn), type, searchPrototype);
  }

  return null;
}

/**
 * Searches a function's metadata for all instances of a particular type.
 *
 * @method getAllFunctionMetadata
 * @param {Function} fn The function whose memtadata is being inspected.
 * @param {Function} type The metadata type to look for.
 * @param {Boolean} searchPrototype Indicates whether or not to search the inheritance hierarchy for metadata.
 * @return {Array} Returns an array of the specified metadata type.
 * @for export
 */
export function getAllFunctionMetadata(fn, type, searchPrototype){
  var metadata, i, ii, found, potential;

  if(!fn){
    return emptyMetadata;
  }

  metadata = getFunctionMetadataStorage(fn);

  if(metadata.length === 0){
    if(searchPrototype){
      return getAllFunctionMetadata(Object.getPrototypeOf(fn), type, searchPrototype);
    }

    return emptyMetadata;
  }

  found = [];

  for(i = 0, ii = metadata.length; i < ii; ++i){
    potential = metadata[i];

    if(potential instanceof type){
      found.push(potential);
    }
  }

  if(searchPrototype){
    found = found.concat(getAllFunctionMetadata(Object.getPrototypeOf(fn), type, searchPrototype));
  }

  return found;
}

/**
 * Adds metadata to a function.
 *
 * @method addFunctionMetadata
 * @param {Function} fn The function being tagged with metadata.
 * @param {Object} instance The metadata instance to add.
 * @for export
 */
export function addFunctionMetadata(fn, instance){
  var metadata = getFunctionMetadataStorage(fn);
  metadata.push(instance);
}