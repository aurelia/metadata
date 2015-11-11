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
