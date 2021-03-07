function alwaysValid() { return true; }
function noCompose() {/* empty */}

function ensureProtocolOptions(options): ProtocolOptions {
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
    const result = validate(target);
    return result === true;
  };
}

function createProtocolAsserter(name, validate) {
  return function(target) {
    const result = validate(target);
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

  const result = function(target) {
    const resolvedTarget = typeof target === 'function'
        ? target.prototype
        : target;

    (options as ProtocolOptions).compose(resolvedTarget);
    result.assert(resolvedTarget);

    Object.defineProperty(resolvedTarget, 'protocol:' + name, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: true
    });
  } as any;

  result.validate = createProtocolValidator((options as ProtocolOptions).validate);
  result.assert = createProtocolAsserter(name, (options as ProtocolOptions).validate);

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
  const hidden = 'protocol:' + name;
  const result = function(target) {
    const decorator = protocol(name, options);
    return target ? decorator(target) : decorator;
  } as any;

  result.decorates = function(obj) { return obj[hidden] === true; };
  result.validate = createProtocolValidator(options.validate);
  result.assert = createProtocolAsserter(name, options.validate);

  return result as Function;
};
