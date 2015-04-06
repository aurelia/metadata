var metadataStoreLookup = new Map(),
    locateMetadataElsewhere;

/**
* Stores metadata and provides helpers for searching and adding to it.
*
* @class MetadataStore
*/
export class MetadataStore {
  constructor(owner){
    this._owner = owner;
    this._first = null;
    this._second = null;
    this._third = null;
    this._rest = null;
  }

  /**
  * Searches metadata and returns the first instance of a particular type.
  *
  * @method first
  * @param {Function} type The metadata type to look for.
  * @param {Boolean} searchPrototype Indicates whether or not to search the inheritance hierarchy for metadata.
  * @return {Object} Returns an instance of the specified metadata type if found; otherwise null.
  */
  first(type, searchPrototype){
    var potential, i, ii, rest;

    if(this._first instanceof type){
      return this._first;
    }

    if(this._second instanceof type){
      return this._second;
    }

    if(this._third instanceof type){
      return this._third;
    }

    rest = this._rest;
    if(rest !== null){
      for(i = 0, ii = rest.length; i < ii; ++i){
        potential = rest[i];
        if(potential instanceof type){
          return potential;
        }
      }
    }

    if(searchPrototype && this._owner !== undefined){
      return Metadata.on(Object.getPrototypeOf(this._owner)).first(type, searchPrototype);
    }

    return null;
  }

  /**
  * Searches metadata and returns true if a particular type of metadata is present.
  *
  * @method has
  * @param {Function} type The metadata type to look for.
  * @param {Boolean} searchPrototype Indicates whether or not to search the inheritance hierarchy for metadata.
  * @return {Object} Returns true if found; false null.
  */
  has(type, searchPrototype){
    return this.first(type, searchPrototype) !== null;
  }

  /**
  * Searches metadata for all instances of a particular type.
  *
  * @method all
  * @param {Function} type The metadata type to look for.
  * @param {Boolean} searchPrototype Indicates whether or not to search the inheritance hierarchy for metadata.
  * @return {Array} Returns an array of the specified metadata type.
  */
  all(type, searchPrototype){
    var potential, i, ii, rest, found = [];

    if(this._first instanceof type){
      found.push(this._first);
    }

    if(this._second instanceof type){
      found.push(this._second);
    }

    if(this._third instanceof type){
      found.push(this._third);
    }

    rest = this._rest;
    if(rest !== null){
      for(i = 0, ii = rest.length; i < ii; ++i){
        potential = rest[i];
        if(potential instanceof type){
          found.push(potential);
        }
      }
    }

    if(searchPrototype && this._owner !== undefined){
      found = found.concat(Metadata.on(Object.getPrototypeOf(this._owner)).all(type, searchPrototype));
    }

    return found;
  }

  /**
  * Searches metadata and returns the first instance of a particular type or creates and adds one if none is found.
  *
  * @method first
  * @param {Function} type The metadata type to look for.
  * @param {Boolean} searchPrototype Indicates whether or not to search the inheritance hierarchy for metadata.
  * @return {Object} Returns an instance of the specified metadata type.
  */
  firstOrAdd(type, searchPrototype){
    var existing = this.first(type, searchPrototype);
    if(existing === null){
      existing = new type();
      this.add(existing);
    }
    return existing;
  }

  /**
  * Adds metadata.
  *
  * @method add
  * @param {Object} instance The metadata instance to add.
  */
  add(instance){
    if(this._first === null){
      this._first = instance;
      return;
    }

    if(this._second === null){
      this._second = instance;
      return;
    }

    if(this._third === null){
      this._third = instance;
      return;
    }

    if(this._rest === null){
      this._rest = [];
    }

    this._rest.push(instance);

    return this;
  }
}

/**
* Provides access to metadata.
*
* @class Metadata
* @static
*/
export var Metadata = {
  none: Object.freeze(new MetadataStore()),
  /**
  * Locates the metadata on the owner.
  *
  * @method on
  * @param {Function} owner The owner of the metadata.
  * @return {MetadataStorage} Returns the stored metadata.
  */
  on(owner){
    var metadata;

    if(!owner){
      return this.none;
    }

    metadata = metadataStoreLookup.get(owner);
    if(metadata !== undefined && metadata._owner === owner){
      return metadata;
    }

    metadata = new MetadataStore(owner);
    metadataStoreLookup.set(owner, metadata);

    if('decorators' in owner){
      var applicator;

      if(typeof owner.decorators === 'function'){
        applicator = owner.decorators();
      }else{
        applicator = owner.decorators;
      }

      if(typeof applicator._decorate === 'function'){
        applicator._decorate(owner);
      }else{
        throw new Error('The return value of your decorator\'s method was not valid.');
      }
    }else if(locateMetadataElsewhere !== undefined){
      locateMetadataElsewhere(owner, metadata);
    }

    return metadata;
  },
  configure: {
    /**
    * Adds a function capable of locating metadata.
    *
    * @method locator
    * @param {Function} locator Configures a function which searches for metadata.
    */
    locator(loc){
      if(locateMetadataElsewhere === undefined){
        locateMetadataElsewhere = loc;
        return;
      }

      var original = locateMetadataElsewhere;
      locateMetadataElsewhere = function(fn, meta){
        original(fn, meta);
        loc(fn, meta);
      };
    }
  }
}
