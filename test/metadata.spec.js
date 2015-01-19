import {
  getFunctionMetadata,
  getAllFunctionMetadata,
  addFunctionMetadata,
} from '../src/index';

describe('metadata', () => {
  it('can be located by type', () => {
    var found = getFunctionMetadata(HasMetadata, SampleMetadata);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can be located by base type', () => {
    var found = getAllFunctionMetadata(HasMetadata, BaseMetadata);
    expect(found.length).toBe(2);
  });

  it('can be normalized to handle the fallback metadata location', () => {
    var found = getFunctionMetadata(HasFallbackMetadata, SampleMetadata);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can be dynamically added', () => {
    var found = getAllFunctionMetadata(HasOneMetadataInstance, SampleMetadata);
    expect(found.length).toBe(1);

    addFunctionMetadata(HasOneMetadataInstance, new SampleMetadata());
    found = getAllFunctionMetadata(HasOneMetadataInstance, SampleMetadata);
    expect(found.length).toBe(2);
  });

  it('can override base metadata', () => {
    var found = getFunctionMetadata(OverridesMetadata, SampleMetadata);
    expect(found.id).toBe(3);
  });

  it('can inherit base metadata when searching deep by type', () => {
    var found = getFunctionMetadata(DerivedWithBaseMetadata, SampleMetadata, true);
    expect(found instanceof SampleMetadata).toBe(true);
  });

  it('can be added with function', () => {
    class Annotated {}

    Annotated.metadata = () => {
      return [new SampleMetadata(), new SampleMetadata(), new SampleMetadata()];
    };

    var found = getAllFunctionMetadata(Annotated, SampleMetadata);
    expect(found.length).toBe(3);
  });

  describe('when searching by type', () => {
    it('returns null if the input type is falsy', () => {
      expect(getFunctionMetadata(undefined, SampleMetadata)).toBe(null);
      expect(getFunctionMetadata(null, SampleMetadata)).toBe(null);
    });

    it('returns null if no metadata is defined for the type', () => {
      var found = getFunctionMetadata(HasNoMetadata, SampleMetadata);
      expect(found).toBe(null);
    });

    it('retruns the base metadata when serching deep if no metadata is defined for the type', () => {
      var found = getFunctionMetadata(DerivedWithBaseMetadata, SampleMetadata, true);
      expect(found instanceof SampleMetadata).toBe(true);
    });
  });

  describe('when searching for all', () => {
    it('return empty array if the input type is falsy', () => {
      expect(getAllFunctionMetadata(undefined, SampleMetadata)).toEqual([]);
      expect(getAllFunctionMetadata(null, SampleMetadata)).toEqual([]);
    });

    it('returns empty array if no metadata is defined for the type', () => {
      var found = getAllFunctionMetadata(HasNoMetadata, SampleMetadata);
      expect(found).toEqual([]);
    });

    it('retruns the base metadata when serching deep if no metadata is defined for the type', () => {
      var found = getAllFunctionMetadata(DerivedWithBaseMetadata, SampleMetadata, true);
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
