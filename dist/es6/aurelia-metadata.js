import 'core-js';

const theGlobal = (function() {
  // Workers don’t have `window`, only `self`
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  // Not all environments allow eval and Function
  // Use only as a last resort:
  return new Function('return this')();
})();

const emptyMetadata = Object.freeze({});
const metadataContainerKey = '__metadata__';

if (typeof theGlobal.System === 'undefined') {
  theGlobal.System = {isFake: true};
}

if (typeof theGlobal.System.forEachModule === 'undefined') {
  theGlobal.System.forEachModule = function() {};
}

if (typeof theGlobal.Reflect === 'undefined') {
  theGlobal.Reflect = {};
}

if (typeof theGlobal.Reflect.getOwnMetadata === 'undefined') {
  Reflect.getOwnMetadata = function(metadataKey, target, targetKey) {
    return ((target[metadataContainerKey] || emptyMetadata)[targetKey] || emptyMetadata)[metadataKey];
  };
}

if (typeof theGlobal.Reflect.defineMetadata === 'undefined') {
  Reflect.defineMetadata = function(metadataKey, metadataValue, target, targetKey) {
    let metadataContainer = target.hasOwnProperty(metadataContainerKey) ? target[metadataContainerKey] : (target[metadataContainerKey] = {});
    let targetContainer = metadataContainer[targetKey] || (metadataContainer[targetKey] = {});
    targetContainer[metadataKey] = metadataValue;
  };
}

if (typeof theGlobal.Reflect.metadata === 'undefined') {
  Reflect.metadata = function(metadataKey, metadataValue) {
    return function(target, targetKey) {
      Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
    };
  };
}

function ensureDecorators(target) {
  let applicator;

  if (typeof target.decorators === 'function') {
    applicator = target.decorators();
  } else {
    applicator = target.decorators;
  }

  if (typeof applicator._decorate === 'function') {
    delete target.decorators;
    applicator._decorate(target);
  } else {
    throw new Error('The return value of your decorator\'s method was not valid.');
  }
}

interface MetadataType {
  global: Object;
  noop: Function;
  resource: string;
  paramTypes: string;
  properties: string;
  get(metadataKey: string, target: Function, targetKey: string): Object;
  getOwn(metadataKey: string, target: Function, targetKey: string): Object;
  define(metadataKey: string, metadataValue: Object, target: Function, targetKey: string): void;
  getOrCreateOwn(metadataKey: string, Type: Function, target: Function, targetKey: string): Object;
}

/**
* Provides helpers for working with metadata.
*/
export const Metadata: MetadataType = {
  global: theGlobal,
  noop: function() {},
  resource: 'aurelia:resource',
  paramTypes: 'design:paramtypes',
  properties: 'design:properties',
  get(metadataKey: string, target: Function, targetKey: string): Object {
    if (!target) {
      return undefined;
    }

    let result = Metadata.getOwn(metadataKey, target, targetKey);
    return result === undefined ? Metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
  },
  getOwn(metadataKey: string, target: Function, targetKey: string): Object {
    if (!target) {
      return undefined;
    }

    if (target.hasOwnProperty('decorators')) {
      ensureDecorators(target);
    }

    return Reflect.getOwnMetadata(metadataKey, target, targetKey);
  },
  define(metadataKey: string, metadataValue: Object, target: Function, targetKey: string): void {
    Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
  },
  getOrCreateOwn(metadataKey: string, Type: Function, target: Function, targetKey: string): Object {
    let result = Metadata.getOwn(metadataKey, target, targetKey);

    if (result === undefined) {
      result = new Type();
      Reflect.defineMetadata(metadataKey, result, target, targetKey);
    }

    return result;
  }
};

let originStorage = new Map();
let unknownOrigin = Object.freeze({moduleId: undefined, moduleMember: undefined});

/**
* A metadata annotation that describes the origin module of the function to which it's attached.
*/
export class Origin {
  /**
  * Creates an instance of Origin metadata.
  * @param moduleId The origin module id.
  * @param moduleMember The name of the export in the origin module.
  */
  constructor(moduleId: string, moduleMember: string) {
    this.moduleId = moduleId;
    this.moduleMember = moduleMember;
  }

  /**
  * Get the Origin annotation for the specified function.
  * @param fn The function to inspect for Origin metadata.
  * @return Returns the Origin metadata.
  */
  static get(fn: Function): Origin {
    let origin = originStorage.get(fn);

    if (origin === undefined) {
      System.forEachModule((key, value) => {
        for (let name in value) {
          let exp = value[name];
          if (exp === fn) {
            originStorage.set(fn, origin = new Origin(key, name));
            return true;
          }
        }

        if (value === fn) {
          originStorage.set(fn, origin = new Origin(key, 'default'));
          return true;
        }
      });
    }

    return origin || unknownOrigin;
  }

  /**
  * Set the Origin annotation for the specified function.
  * @param fn The function to set the Origin metadata on.
  * @param fn The Origin metadata to store on the function.
  * @return Returns the Origin metadata.
  */
  static set(fn: Function, origin: Origin): void {
    originStorage.set(fn, origin);
  }
}

/**
* Stores and applies a collection of decorators to a target.
*/
export class DecoratorApplicator {
  constructor() {
    this._first = null;
    this._second = null;
    this._third = null;
    this._rest = null;
  }

  /**
  * Adds a decorator to the collection.
  * @param decorator The decorator to add.
  * @return The current decorator applicator for chaining.
  */
  decorator(decorator: Function): DecoratorApplicator {
    if (this._first === null) {
      this._first = decorator;
      return this;
    }

    if (this._second === null) {
      this._second = decorator;
      return this;
    }

    if (this._third === null) {
      this._third = decorator;
      return this;
    }

    if (this._rest === null) {
      this._rest = [];
    }

    this._rest.push(decorator);

    return this;
  }

  _decorate(target: Function): void {
    if (this._first !== null) {
      this._first(target);
    }

    if (this._second !== null) {
      this._second(target);
    }

    if (this._third !== null) {
      this._third(target);
    }

    let rest = this._rest;
    if (rest !== null) {
      for (let i = 0, ii = rest.length; i < ii; ++i) {
        rest[i](target);
      }
    }
  }
}

interface DecoratorsConfigType {
  parameterizedDecorator(name: string, decorator: Function): void;
  simpleDecorator(name: string, decorator: Function): void;
}

interface DecoratorsType {
  configure: DecoratorsConfigType;
}

export const Decorators: DecoratorsType = {
  configure: {
    parameterizedDecorator(name: string, decorator: Function): void {
      Decorators[name] = function() {
        let applicator = new DecoratorApplicator();
        return applicator[name].apply(applicator, arguments);
      };

      DecoratorApplicator.prototype[name] = function() {
        let result = decorator.apply(null, arguments);
        return this.decorator(result);
      };
    },
    simpleDecorator(name: string, decorator: Function): void {
      Decorators[name] = function() {
        return new DecoratorApplicator().decorator(decorator);
      };

      DecoratorApplicator.prototype[name] = function() {
        return this.decorator(decorator);
      };
    }
  }
};
