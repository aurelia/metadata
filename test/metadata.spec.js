import {Metadata} from '../src/metadata';
import {Decorators} from '../src/decorators';

describe('metadata', () => {
  it('can be located by key', () => {
    var found = Metadata.getOwn(Metadata.resource, HasMetadata);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can be normalized to handle the fallback metadata location', () => {
    var found = Metadata.getOwn(Metadata.resource, HasFallbackMetadata);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can override base metadata', () => {
    var found = Metadata.getOwn(Metadata.resource, OverridesMetadata);
    expect(found.id).toBe(3);
  });

  it('can inherit base metadata when searching deep by type', () => {
    var found = Metadata.get(Metadata.resource, DerivedWithBaseMetadata);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can be added with function', () => {
    class Annotated {}

    Annotated.decorators = () => {
      return Decorators.sample();
    };

    var found = Metadata.getOwn(Metadata.resource, Annotated);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  describe('when searching', () => {
    it('returns undefined if the input type is falsy', () => {
      expect(Metadata.getOwn(Metadata.resource, undefined)).toBe(undefined);
      expect(Metadata.getOwn(Metadata.resource, null)).toBe(undefined);
    });

    it('returns undefined if no metadata is defined for the type', () => {
      var found = Metadata.getOwn(Metadata.resource, HasNoMetadata);
      expect(found).toBe(undefined);
    });

    it('retruns the base metadata when serching deep if no metadata is defined for the type', () => {
      var found = Metadata.get(Metadata.resource, DerivedWithBaseMetadata);
      expect(found instanceof SampleMetadata).toBe(true);
    });
  });

  function sampleES7Decorator(value){
    return function(target){
      Metadata.define(Metadata.resource, new SampleMetadata(value), target);
    }
  }

  Decorators.configure.parameterizedDecorator('sample', sampleES7Decorator);

  class SampleMetadata {
    constructor(id) {
      this.id = id;
    }
  }

  class HasMetadata {}
  HasMetadata.decorators = Decorators.sample();

  class HasFallbackMetadata {
    static decorators() {
      return Decorators.sample();
    }
  }

  class HasOneMetadataInstance {}
  HasOneMetadataInstance.decorators = Decorators.sample();

  class OverridesMetadata extends HasMetadata {}
  OverridesMetadata.decorators = Decorators.sample(3);

  class DerivedWithBaseMetadata extends HasMetadata {}
  Metadata.define('another', 'foo', DerivedWithBaseMetadata);

  class HasNoMetadata {}

  class DerivedTypeWithNoMetadata extends HasMetadata {}
});
