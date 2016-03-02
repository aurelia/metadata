import {metadata} from '../src/metadata';
import {decorators} from '../src/decorators';

describe('metadata', () => {
  it('can be located by key', () => {
    var found = metadata.getOwn(metadata.resource, HasMetadata);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can be normalized to handle the fallback metadata location', () => {
    var found = metadata.getOwn(metadata.resource, HasFallbackMetadata);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can override base metadata', () => {
    var found = metadata.getOwn(metadata.resource, OverridesMetadata);
    expect(found.id).toBe(3);
  });

  it('can inherit base metadata when searching deep by type', () => {
    var found = metadata.get(metadata.resource, DerivedWithBaseMetadata);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can be added with function', () => {
    class Annotated {}

    decorators(new sampleES7Decorator()).on(Annotated);

    var found = metadata.getOwn(metadata.resource, Annotated);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  describe('when searching', () => {
    it('returns undefined if the input type is falsy', () => {
      expect(metadata.getOwn(metadata.resource, undefined)).toBe(undefined);
      expect(metadata.getOwn(metadata.resource, null)).toBe(undefined);
    });

    it('returns undefined if no metadata is defined for the type', () => {
      var found = metadata.getOwn(metadata.resource, HasNoMetadata);
      expect(found).toBe(undefined);
    });

    it('retruns the base metadata when serching deep if no metadata is defined for the type', () => {
      var found = metadata.get(metadata.resource, DerivedWithBaseMetadata);
      expect(found instanceof SampleMetadata).toBe(true);
    });
  });

  class SampleMetadata {
    constructor(id) {
      this.id = id;
    }
  }

  function sampleES7Decorator(value){
    return function(target){
      metadata.define(metadata.resource, new SampleMetadata(value), target);
    }
  }

  let HasMetadata = decorators(sampleES7Decorator()).on(class {});
  let HasFallbackMetadata = decorators(sampleES7Decorator()).on(class {});
  let HasOneMetadataInstance = decorators(sampleES7Decorator()).on(class {});
  let OverridesMetadata = decorators(sampleES7Decorator(3)).on(class extends HasMetadata {});

  class DerivedWithBaseMetadata extends HasMetadata {}
  metadata.define('another', 'foo', DerivedWithBaseMetadata);

  class HasNoMetadata {}
  class DerivedTypeWithNoMetadata extends HasMetadata {}
});
