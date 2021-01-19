import './setup';
import {mixin} from '../src/mixin';

describe('mixin', () => {
  it('can add methods to a class', () => {
    const instance = new TargetClass() as TargetClass & typeof sourceMixin;
    expect(typeof instance.testMethod1).toBe('function');
    expect(typeof instance.testMethod2).toBe('function');
    expect(typeof instance.testMethod3).toBe('function');
  });
  
  it('can add properties to a class', () => {
    const instance = new TargetClass() as TargetClass & typeof sourceMixin;
    expect(instance.name).toBe('aurelia');
    
    instance.name = 'framework';
    expect(instance.name).toBe('framework');
  });
  
  const sourceMixin = {
    testMethod1() {},
    testMethod2() {},
    testMethod3() {},
    name: 'aurelia'
  };
  
  @mixin(sourceMixin)
  class TargetClass {}  
});
