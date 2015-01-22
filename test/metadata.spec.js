import {Metadata} from '../src/index';

describe('metadata', () => {
  it('can be located by type', () => {
    var found = Metadata.on(HasMetadata).first(SampleMetadata);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can be located by base type', () => {
    var found = Metadata.on(HasMetadata).all(BaseMetadata);
    expect(found.length).toBe(2);
  });

  it('can be normalized to handle the fallback metadata location', () => {
    var found = Metadata.on(HasFallbackMetadata).first(SampleMetadata);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can be dynamically added', () => {
    var found = Metadata.on(HasOneMetadataInstance).all(SampleMetadata);
    expect(found.length).toBe(1);

    Metadata.on(HasOneMetadataInstance).add(new SampleMetadata());
    found = Metadata.on(HasOneMetadataInstance).all(SampleMetadata);
    expect(found.length).toBe(2);
  });

  it('can override base metadata', () => {
    var found = Metadata.on(OverridesMetadata).first(SampleMetadata);
    expect(found.id).toBe(3);
  });

  it('can inherit base metadata when searching deep by type', () => {
    var found = Metadata.on(DerivedWithBaseMetadata).first(SampleMetadata, true);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can be added with function', () => {
    class Annotated {}

    Annotated.metadata = () => {
      return [new SampleMetadata(), new SampleMetadata(), new SampleMetadata()];
    };

    var found = Metadata.on(Annotated).all(SampleMetadata);
    expect(found.length).toBe(3);
  });

  describe('when searching by type', () => {
    it('returns null if the input type is falsy', () => {
      expect(Metadata.on(undefined).first(SampleMetadata)).toBe(null);
      expect(Metadata.on(null).first(SampleMetadata)).toBe(null);
    });

    it('returns null if no metadata is defined for the type', () => {
      var found = Metadata.on(HasNoMetadata).first(SampleMetadata);
      expect(found).toBe(null);
    });

    it('retruns the base metadata when serching deep if no metadata is defined for the type', () => {
      var found = Metadata.on(DerivedWithBaseMetadata).first(SampleMetadata, true);
      expect(found instanceof SampleMetadata).toBe(true);
    });
  });

  describe('when searching for all', () => {
    it('return empty array if the input type is falsy', () => {
      expect(Metadata.on(undefined).all(SampleMetadata)).toEqual([]);
      expect(Metadata.on(null).all(SampleMetadata)).toEqual([]);
    });

    it('returns empty array if no metadata is defined for the type', () => {
      var found = Metadata.on(HasNoMetadata).all(SampleMetadata);
      expect(found).toEqual([]);
    });

    it('retruns the base metadata when serching deep if no metadata is defined for the type', () => {
      var found = Metadata.on(DerivedWithBaseMetadata).all(SampleMetadata, true);
      expect(found.length).toEqual(2);
    });
  });

  class BaseMetadata {}
  class SampleMetadata extends BaseMetadata {
    constructor(id) {
      this.id = id;
    }
  }

  class SampleMetadata2 extends BaseMetadata {}

  class HasMetadata {}
  HasMetadata.metadata = [new SampleMetadata(1), new SampleMetadata(2)];

  class HasFallbackMetadata {
    static metadata() {
      return [new SampleMetadata()];
    }
  }

  class HasOneMetadataInstance {}
  HasOneMetadataInstance.metadata = [new SampleMetadata()];

  class OverridesMetadata extends HasMetadata {}
  OverridesMetadata.metadata = [new SampleMetadata(3)];

  class DerivedWithBaseMetadata extends HasMetadata {}
  DerivedWithBaseMetadata.metadata = ['foo'];

  class HasNoMetadata {}

  class DerivedTypeWithNoMetadata extends HasMetadata {}
});
