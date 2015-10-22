interface DecoratorApplicator {
  on(target: any, key?: string, descriptor?: Object): any;
}

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
