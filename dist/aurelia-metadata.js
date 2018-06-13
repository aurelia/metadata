import {PLATFORM} from 'aurelia-pal';

function isObject(val) {
  return val && (typeof val === 'function' || typeof val === 'object');
}

/**
* Helpers for working with metadata on functions.
*
* Note for the Typescript to ES5 transpiler: Due to the non-standard compliant implementation of 'extends', these methods, when applied to derived classes, will operate on the parent class and not on the child class. This can be circumvented by either transpiling to ES2015 (ES6) or by making the targetKey parameter class-specific eg. by using target.name for the targetKey parameter.
*/
interface MetadataType {
  /**
  * The metadata key representing pluggable resources.
  */
  resource: string;
  /**
  * The metadata key representing parameter type information.
  */
  paramTypes: string;
  /**
  * The metadata key representing object property type information.
  */
  propertyType: string;
  /**
  * The metadata key representing property information.
  */
  properties: string;
  /**
  * Gets metadata specified by a key on a target, searching up the inheritance hierarchy.
  * @param metadataKey The key for the metadata to lookup.
  * @param target The target to lookup the metadata on.
  * @param targetKey The member on the target to lookup the metadata on.
  */
  get(metadataKey: string, target: Function, targetKey?: string): Object;
  /**
  * Gets metadata specified by a key on a target, only searching the own instance.
  * @param metadataKey The key for the metadata to lookup.
  * @param target The target to lookup the metadata on.
  * @param targetKey The member on the target to lookup the metadata on.
  */
  getOwn(metadataKey: string, target: Function, targetKey?: string): Object;
  /**
  * Defines metadata specified by a key on a target.
  * @param metadataKey The key for the metadata to define.
  * @param target The target to set the metadata on.
  * @param targetKey The member on the target to set the metadata on.
  */
  define(metadataKey: string, metadataValue: Object, target: Function, targetKey?: string): void;
  /**
  * Gets metadata specified by a key on a target, or creates an instance of the specified metadata if not found.
  * @param metadataKey The key for the metadata to lookup or create.
  * @param Type The type of metadata to create if existing metadata is not found.
  * @param target The target to lookup or create the metadata on.
  * @param targetKey The member on the target to lookup or create the metadata on.
  */
  getOrCreateOwn(metadataKey: string, Type: Function, target: Function, targetKey?: string): Object;
}

/**
* Provides helpers for working with metadata.
*/
export const metadata: MetadataType = {
  resource: 'aurelia:resource',
  paramTypes: 'design:paramtypes',
  propertyType: 'design:type',
  properties: 'design:properties',
  get(metadataKey: string, target: Function, targetKey?: string): Object {
    if (!isObject(target)) {
      return undefined;
    }
    let result = metadata.getOwn(metadataKey, target, targetKey);
    return result === undefined ? metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
  },
  getOwn(metadataKey: string, target: Function, targetKey?: string): Object {
    if (!isObject(target)) {
      return undefined;
    }
    return Reflect.getOwnMetadata(metadataKey, target, targetKey);
  },
  define(metadataKey: string, metadataValue: Object, target: Function, targetKey?: string): void {
    Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
  },
  getOrCreateOwn(metadataKey: string, Type: Function, target: Function, targetKey?: string): Object {
    let result = metadata.getOwn(metadataKey, target, targetKey);

    if (result === undefined) {
      result = new Type();
      Reflect.defineMetadata(metadataKey, result, target, targetKey);
    }

    return result;
  }
};

const originStorage = new Map();
const unknownOrigin = Object.freeze({moduleId: undefined, moduleMember: undefined});

/**
* A metadata annotation that describes the origin module of the function to which it's attached.
*/
export class Origin {
  /**
  * The id of the module from which the item originated.
  */
  moduleId: string;
  /**
  * The member name of the export on the module object from which the item originated.
  */
  moduleMember: string;

  /**
  * Creates an instance of Origin metadata.
  * @param moduleId The id of the module from which the item originated.
  * @param moduleMember The member name of the export on the module object from which the item originated.
  */
  constructor(moduleId: string, moduleMember: string) {
    this.moduleId = moduleId;
    this.moduleMember = moduleMember;
  }

  /**
  * Get the Origin metadata for the specified function.
  * @param fn The function to inspect for Origin metadata.
  * @return Returns the Origin metadata.
  */
  static get(fn: Function): Origin {
    let origin = originStorage.get(fn);

    if (origin === undefined) {
      PLATFORM.eachModule((key, value) => {
        if (typeof value === 'object') {
          for (let name in value) {
            try {
              let exp = value[name];
              if (exp === fn) {
                originStorage.set(fn, origin = new Origin(key, name));
                return true;
              }
            } catch (e) {
              // IE11 in cross origin frame fails when accessing Window['frameElement'] with Access Denied script error.
              // Window gets exported from webpack buildin/global.js.
            }
          }
        }

        if (value === fn) {
          originStorage.set(fn, origin = new Origin(key, 'default'));
          return true;
        }

        return false;
      });
    }

    return origin || unknownOrigin;
  }

  /**
  * Set the Origin metadata for the specified function.
  * @param fn The function to set the Origin metadata on.
  * @param fn The Origin metadata to store on the function.
  * @return Returns the Origin metadata.
  */
  static set(fn: Function, origin: Origin): void {
    originStorage.set(fn, origin);
  }
}

/**
* An object capable of applying it's captured decorators to a target.
*/
interface DecoratorApplicator {
  /**
  * Applies the decorators to the target.
  * @param target The target.
  * @param key If applying to a method, the member name.
  * @param descriptor If applying to a method, you may supply an initial descriptor to pass to the decorators.
  */
  on(target: any, key?: string, descriptor?: PropertyDescriptor): any;
}

/**
* Enables applying decorators, particularly for use when there is no syntax support in the language, such as with ES5 and ES2016.
* @param rest The decorators to apply.
*/
export function decorators(...rest: Function[]): DecoratorApplicator {
  let applicator = function(target, key, descriptor) {
    let i = rest.length;

    if (key) {
      descriptor = descriptor || {
        value: target[key],
        writable: true,
        configurable: true,
        enumerable: true
      };

      while (i--) {
        descriptor = rest[i](target, key, descriptor) || descriptor;
      }

      Object.defineProperty(target, key, descriptor);
    } else {
      while (i--) {
        target = rest[i](target) || target;
      }
    }

    return target;
  };

  applicator.on = applicator;
  return applicator;
}

/**
* Options that control how the deprected decorator should function at runtime.
*/
interface DeprecatedOptions {
  /**
  * Specifies a custom deprecation message.
  */
  message: string;
  /**
  * Specifies whether or not the deprecation should throw an error.
  */
  error: boolean;
}

/**
* Decorator: Enables marking methods as deprecated.
* @param optionsOrTarget Options for how the deprected decorator should function at runtime.
*/
export function deprecated(optionsOrTarget?: DeprecatedOptions, maybeKey?: string, maybeDescriptor?: Object): any {
  function decorator(target, key, descriptor) {
    const methodSignature = `${target.constructor.name}#${key}`;
    let options = maybeKey ? {} : optionsOrTarget || {};
    let message = `DEPRECATION - ${methodSignature}`;

    if (typeof descriptor.value !== 'function') {
      throw new SyntaxError('Only methods can be marked as deprecated.');
    }

    if (options.message) {
      message += ` - ${options.message}`;
    }

    return {
      ...descriptor,
      value: function deprecationWrapper() {
        if (options.error) {
          throw new Error(message);
        } else {
          console.warn(message);
        }

        return descriptor.value.apply(this, arguments);
      }
    };
  }

  return maybeKey ? decorator(optionsOrTarget, maybeKey, maybeDescriptor) : decorator;
}

/**
* Decorator: Enables mixing behaior into a class.
* @param behavior An object with keys for each method to mix into the target class.
*/
export function mixin(behavior: Object): any {
  const instanceKeys = Object.keys(behavior);

  function _mixin(possible) {
    let decorator = function(target) {
      let resolvedTarget = typeof target === 'function'
        ? target.prototype
        : target;

      let i = instanceKeys.length;
      while (i--) {
        let property = instanceKeys[i];
        Object.defineProperty(resolvedTarget, property, {
          value: behavior[property],
          writable: true
        });
      }
    };

    return possible ? decorator(possible) : decorator;
  }

  return _mixin;
}

function alwaysValid() { return true; }
function noCompose() {}

function ensureProtocolOptions(options) {
  if (options === undefined) {
    options = {};
  } else if (typeof options === 'function') {
    options = {
      validate: options
    };
  }

  if (!options.validate) {
    options.validate = alwaysValid;
  }

  if (!options.compose) {
    options.compose = noCompose;
  }

  return options;
}

function createProtocolValidator(validate) {
  return function(target) {
    let result = validate(target);
    return result === true;
  };
}

function createProtocolAsserter(name, validate) {
  return function(target) {
    let result = validate(target);
    if (result !== true) {
      throw new Error(result || `${name} was not correctly implemented.`);
    }
  };
}

/**
* Options used during protocol creation.
*/
interface ProtocolOptions {
  /**
  * A function that will be run to validate the decorated class when the protocol is applied. It is also used to validate adhoc instances.
  * If the validation fails, a message should be returned which directs the developer in how to address the issue.
  */
  validate?: (target: any) => string | boolean;
  /**
  * A function which has the opportunity to compose additional behavior into the decorated class when the protocol is applied.
  */
  compose?: (target: any) => void;
}

/**
* Decorator: Creates a protocol.
* @param name The name of the protocol.
* @param options The validation function or options object used in configuring the protocol.
*/
export function protocol(name: string, options?: ((target: any) => string | boolean) | ProtocolOptions): any {
  options = ensureProtocolOptions(options);

  let result = function(target) {
    let resolvedTarget = typeof target === 'function'
        ? target.prototype
        : target;

    options.compose(resolvedTarget);
    result.assert(resolvedTarget);

    Object.defineProperty(resolvedTarget, 'protocol:' + name, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: true
    });
  };

  result.validate = createProtocolValidator(options.validate);
  result.assert = createProtocolAsserter(name, options.validate);

  return result;
}

/**
* Creates a protocol decorator.
* @param name The name of the protocol.
* @param options The validation function or options object used in configuring the protocol.
* @return The protocol decorator;
*/
protocol.create = function(name: string, options?: ((target: any) => string | boolean) | ProtocolOptions): Function {
  options = ensureProtocolOptions(options);
  let hidden = 'protocol:' + name;
  let result = function(target) {
    let decorator = protocol(name, options);
    return target ? decorator(target) : decorator;
  };

  result.decorates = function(obj) { return obj[hidden] === true; };
  result.validate = createProtocolValidator(options.validate);
  result.assert = createProtocolAsserter(name, options.validate);

  return result;
};
