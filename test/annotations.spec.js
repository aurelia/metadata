import {
  getAnnotation, 
  getAllAnnotations, 
  addAnnotation,
  normalize
} from '../lib/index';

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
    normalize(HasFallbackAnnotations);
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

  class BaseAnnotation{}
  class SampleAnnotation extends BaseAnnotation {}

  class HasAnnotations{}
  HasAnnotations.annotations = [new SampleAnnotation(), new SampleAnnotation()];

  class HasFallbackAnnotations{
    static annotations(){
      return [new SampleAnnotation()];
    }
  }

  class HasOneAnnotation{}
  HasOneAnnotation.annotations = [new SampleAnnotation()];
});