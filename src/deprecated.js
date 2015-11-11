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
