import './setup';
import { metadata } from '../src/metadata';
import { decorators } from '../src/decorators';

declare global {
  // eslint-disable-next-line
  namespace Reflect {
    const deleteMetadata: (...args: any[]) => void;
  }
}

describe('metadata', () => {
  it('can be located by key', () => {
    const found = metadata.getOwn(metadata.resource, HasMetadata);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can be normalized to handle the fallback metadata location', () => {
    const found = metadata.getOwn(metadata.resource, HasFallbackMetadata);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can override base metadata', () => {
    const found = metadata.getOwn(metadata.resource, OverridesMetadata) as typeof OverridesMetadata;
    expect(found.id).toBe(3);
  });

  it('can inherit base metadata when searching deep by type', () => {
    const found = metadata.get(metadata.resource, DerivedWithBaseMetadata);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('attempting to access metadata of primitive targets returns undefined', () => {
    const metadataKey = 'fizz:bang';
    const targets = [null, undefined, 'aurelia-dom-boundary', '', 0, 1, true, false];
    let i = targets.length;
    while (i--) {
      const target = targets[i] as any;
      expect(metadata.get(metadataKey, target)).toBe(undefined);
      expect(metadata.getOwn(metadataKey, target)).toBe(undefined);
    }
  });

  it('attempting to access metadata of object targets succeeds', () => {
    const metadataKey = 'fizz:bang';
    const metadataValue = 'foo bar';
    const targets = [function () {/* empty */}, {}, /*Object.create(null),*/ Object.prototype];
    let i = targets.length;
    while (i--) {
      const target = targets[i] as any;

      expect(metadata.get(metadataKey, target)).toBe(undefined);
      expect(metadata.getOwn(metadataKey, target)).toBe(undefined);

      Reflect.defineMetadata(metadataKey, metadataValue, target);

      expect(metadata.get(metadataKey, target)).toBe(metadataValue);
      expect(metadata.getOwn(metadataKey, target)).toBe(metadataValue);

      if (Reflect.deleteMetadata) {
        Reflect.deleteMetadata(metadataKey, target);
      } else if (target.__metadata__) {
        delete target.__metadata__;
      }

      expect(metadata.get(metadataKey, target)).toBe(undefined);
      expect(metadata.getOwn(metadataKey, target)).toBe(undefined);
    }
  });

  it('can be added with function', () => {
    class Annotated { }

    decorators(sampleES7Decorator()).on(Annotated);

    const found = metadata.getOwn(metadata.resource, Annotated);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  describe('when searching', () => {
    it('returns undefined if the input type is falsy', () => {
      expect(metadata.getOwn(metadata.resource, undefined)).toBe(undefined);
      expect(metadata.getOwn(metadata.resource, null)).toBe(undefined);
    });

    it('returns undefined if no metadata is defined for the type', () => {
      const found = metadata.getOwn(metadata.resource, HasNoMetadata);
      expect(found).toBe(undefined);
    });

    it('retruns the base metadata when serching deep if no metadata is defined for the type', () => {
      const found = metadata.get(metadata.resource, DerivedWithBaseMetadata);
      expect(found instanceof SampleMetadata).toBe(true);
    });
  });

  class SampleMetadata {
    constructor(public id) {}
  }

  function sampleES7Decorator(value?) {
    return function (target) {
      metadata.define(metadata.resource, new SampleMetadata(value), target);
    }
  }

  const HasMetadata = decorators(sampleES7Decorator()).on(class { });
  const HasFallbackMetadata = decorators(sampleES7Decorator()).on(class { });
  const HasOneMetadataInstance = decorators(sampleES7Decorator()).on(class { });
  const OverridesMetadata = decorators(sampleES7Decorator(3)).on(class extends HasMetadata { });

  class DerivedWithBaseMetadata extends HasMetadata { }
  metadata.define('another', 'foo', DerivedWithBaseMetadata);

  class HasNoMetadata { }
  class DerivedTypeWithNoMetadata extends HasMetadata { }
});
