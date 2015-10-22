export function deprecated(optionsOrTarget, maybeKey, maybeDescriptor) {
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
