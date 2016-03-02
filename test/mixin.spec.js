import {mixin} from '../src/mixin';

describe('mixin', () => {
  it('can add methods to a class', () => {
    let instance = new TargetClass();
    expect(typeof instance.testMethod1).toBe('function');
    expect(typeof instance.testMethod2).toBe('function');
    expect(typeof instance.testMethod3).toBe('function');
  });
  
  it('can add properties to a class', () => {
    let instance = new TargetClass();
    expect(instance.name).toBe('aurelia');
    
    instance.name = 'framework';
    expect(instance.name).toBe('framework');
  });
  
  let sourceMixin = {
    testMethod1() {},
    testMethod2() {},
    testMethod3() {},
    name: 'aurelia'
  };
  
  @mixin(sourceMixin)
  class TargetClass {}  
});