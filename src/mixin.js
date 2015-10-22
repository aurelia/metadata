export function mixin(behavior: Object) {
  const instanceKeys = Object.keys(behavior);

  function _mixin(possible) {
    let decorator = function(target) {
      let resolvedTarget = typeof target === 'function'
        ? target.prototype
        : target;

      for (let property of instanceKeys) {
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
