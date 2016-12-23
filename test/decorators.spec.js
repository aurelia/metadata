import {decorators} from '../src/decorators';

describe('decorators', () => {
  it('can decorate class', () => {
    class MyClass { }
    decorators(decorator).on(MyClass);

    function decorator(target) {
      expect(target === MyClass);
    }
  });

  it('can decorate class method', () => {
    class MyClass {
      method() { }
    }
    decorators(decorator).on(MyClass, 'method');

    function decorator(target, key, descriptor) {
      expect(target === MyClass.prototype);
      expect(key === 'method');
      expect(typeof descriptor).toBe('object');
    }
  });

  it('can decorate class property', () => {
    class MyClass {
      property;
    }
    decorators(decorator).on(MyClass, 'property');

    function decorator(target, key, descriptor) {
      expect(target === MyClass.prototype);
      expect(key === 'property');
      expect(typeof descriptor).toBe('object');
    }
  });
});
