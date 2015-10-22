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

interface ProtocolOptions {
  validate?: (target: any) => string | boolean;
  compose?: (target: any) => void;
}

export function protocol(name: string, options?: ProtocolOptions): Function {
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

protocol.create = function(name, options) {
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
