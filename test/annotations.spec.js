import {
  getAnnotation, 
  getAllAnnotations, 
  addAnnotation,
  normalize
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
    HasAnnotations.annotations = () => {
      return [new SampleAnnotation(), new SampleAnnotation(), new SampleAnnotation()];
    };

    var found = getAllAnnotations(HasAnnotations, SampleAnnotation);
    expect(found.length).toBe(3);
  });

  it('can inherit base annotations when searching deep for all', () => {
    var found = getAllAnnotations(DerivedWithBaseAnnotations, SampleAnnotation, true);
    expect(found.length).toBe(3);
  });

  it('getAllAnnotatons returns empty array when annotation is undefined of the class', () => {  
    var found = getAllAnnotations(HasNoAnnotation, SampleAnnotation);
     expect(found).toEqual([]); 
  })


  class BaseAnnotation{}
  class SampleAnnotation extends BaseAnnotation {
    constructor(id){
      this.id = id;
    }
  }

  class SampleAnnotation2 extends BaseAnnotation {}

  class HasAnnotations{}
  HasAnnotations.annotations = [new SampleAnnotation(1), new SampleAnnotation(2)];

  class HasFallbackAnnotations{
    static annotations(){
      return [new SampleAnnotation()];
    }
  }

  class HasOneAnnotation{}
  HasOneAnnotation.annotations = [new SampleAnnotation()];

  class OverridesAnnotations extends HasAnnotations {}
  class HasNoAnnotation{}
  OverridesAnnotations.annotations = [new SampleAnnotation(3)];

  class DerivedWithBaseAnnotations extends HasAnnotations {}
  DerivedWithBaseAnnotations.annotations = ['foo'];
});
