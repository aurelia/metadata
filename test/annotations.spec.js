import {
  getAnnotation,
  getAllAnnotations,
  addAnnotation,
} from '../src/index';

describe('annotations', () => {
  it('can be located by type', () => {
    var found = getAnnotation(HasAnnotations, SampleAnnotation);
    expect(found instanceof SampleAnnotation).toBe(true);
  });

  it('can be located by base type', () => {
    var found = getAllAnnotations(HasAnnotations, BaseAnnotation);
    expect(found.length).toBe(2);
  });

  it('can be normalized to handle the fallback metadata location', () => {
    var found = getAnnotation(HasFallbackAnnotations, SampleAnnotation);
    expect(found instanceof SampleAnnotation).toBe(true);
  });

  it('can be dynamically added', () => {
    var found = getAllAnnotations(HasOneAnnotation, SampleAnnotation);
    expect(found.length).toBe(1);

    addAnnotation(HasOneAnnotation, new SampleAnnotation());
    found = getAllAnnotations(HasOneAnnotation, SampleAnnotation);
    expect(found.length).toBe(2);
  });

  it('can override base annotations', () => {
    var found = getAnnotation(OverridesAnnotations, SampleAnnotation);
    expect(found.id).toBe(3);
  });

  it('can inherit base annotations when searching deep by type', () => {
    var found = getAnnotation(DerivedWithBaseAnnotations, SampleAnnotation, true);
    expect(found instanceof SampleAnnotation).toBe(true);
  });

  it('can be added with function', () => {
    class Annotated {}

    Annotated.annotations = () => {
      return [new SampleAnnotation(), new SampleAnnotation(), new SampleAnnotation()];
    };

    var found = getAllAnnotations(Annotated, SampleAnnotation);
    expect(found.length).toBe(3);
  });

  describe('when searching by type', () => {
    it('returns null if the input type is falsy', () => {
      expect(getAnnotation(undefined, SampleAnnotation)).toBe(null);
      expect(getAnnotation(null, SampleAnnotation)).toBe(null);
    });

    it('returns null if no annotation is defined for the type', () => {
      var found = getAnnotation(HasNoAnnotation, SampleAnnotation);
      expect(found).toBe(null);
    });

    it('retruns the base annotation when serching deep if no annotation is defined for the type', () => {
      var found = getAnnotation(DerivedWithBaseAnnotations, SampleAnnotation, true);
      expect(found instanceof SampleAnnotation).toBe(true);
    });
  });

  describe('when searching for all', () => {
    it('return empty array if the input type is falsy', () => {
      expect(getAllAnnotations(undefined, SampleAnnotation)).toEqual([]);
      expect(getAllAnnotations(null, SampleAnnotation)).toEqual([]);
    });

    it('returns empty array if no annotation is defined for the type', () => {
      var found = getAllAnnotations(HasNoAnnotation, SampleAnnotation);
      expect(found).toEqual([]);
    });

    it('retruns the base annotations when serching deep if no annotation is defined for the type', () => {
      var found = getAllAnnotations(DerivedWithBaseAnnotations, SampleAnnotation, true);
      expect(found.length).toEqual(2);
    });
  });

  class BaseAnnotation {}
  class SampleAnnotation extends BaseAnnotation {
    constructor(id) {
      this.id = id;
    }
  }

  class SampleAnnotation2 extends BaseAnnotation {}

  class HasAnnotations {}
  HasAnnotations.annotations = [new SampleAnnotation(1), new SampleAnnotation(2)];

  class HasFallbackAnnotations {
    static annotations() {
      return [new SampleAnnotation()];
    }
  }

  class HasOneAnnotation {}
  HasOneAnnotation.annotations = [new SampleAnnotation()];

  class OverridesAnnotations extends HasAnnotations {}
  OverridesAnnotations.annotations = [new SampleAnnotation(3)];

  class DerivedWithBaseAnnotations extends HasAnnotations {}
  DerivedWithBaseAnnotations.annotations = ['foo'];

  class HasNoAnnotation {}

  class DerivedTypeWithNoAnnotation extends HasAnnotations {}
});
