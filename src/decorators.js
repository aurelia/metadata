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
