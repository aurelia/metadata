/**
* Decorator: Enables mixing behaior into a class.
* @param behavior An object with keys for each method to mix into the target class.
*/
export function mixin(behavior: Object): any {
  const instanceKeys = Object.keys(behavior);

  function _mixin(possible) {
    const decorator = function(target) {
      const resolvedTarget = typeof target === 'function'
        ? target.prototype
        : target;

      let i = instanceKeys.length;
      while (i--) {
        const property = instanceKeys[i];
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
