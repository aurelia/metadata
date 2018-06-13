import {Origin} from '../src/origin';
import {PLATFORM} from 'aurelia-pal';

describe('origin', () => {
  let origin1;
  let origin2;

  beforeEach(() => {
    origin1 = new Origin('ModuleId1', 'ModuleMember1');
    origin2 = new Origin('ModuleId2', 'ModuleMember2');
  });

  describe('get', () => {
    it('should return an empty origin if not set', () => {
      class HasNoOrigin {}
      expect(Origin.get(HasNoOrigin).moduleId).toBe(undefined);
    });

    it('should return the origin if set', () => {
      class HasOrigin {}
      Origin.set(HasOrigin, origin1);

      expect(Origin.get(HasOrigin)).toBe(origin1);
    });
  });

  describe('get - search modules', () => {
    let modules = undefined;
    beforeEach(()=> {
      modules = {'text-file': 'abcdef', 'real-module':{name: 'test', x() { return 'hey' }}};
      spyOn(PLATFORM, 'eachModule').and.callFake((callback) => {
        for (let key in modules) callback(key, modules[key]);
      });
    });

    it('should search modules when called', () => {
      class Test {}
      expect(Origin.get(Test).moduleId).toBe(undefined);
      expect(PLATFORM.eachModule).toHaveBeenCalled();
    });

    it('should find member of loaded module', () => {
      let origin = Origin.get(modules['real-module']['x']);
      expect(origin.moduleId).toBe('real-module');
    });

    it('but it should not search in strings', () => {
      expect(Origin.get('a').moduleId).toBe(undefined);
    });

    it('should not fail on accessing restricted/failing members', () => {
      Object.defineProperty(modules['real-module'], 'restricted1', { get: () => { throw new Error('restricted') }, enumerable: true });
      class Test {}
      expect(Origin.get(Test).moduleId).toBe(undefined);
      expect(PLATFORM.eachModule).toHaveBeenCalled();
    });
  });

  describe('set', () => {
    it('should attach an origin if one does not exist', () => {
      class HasNoOrigin {}
      Origin.set(HasNoOrigin, origin2);

      expect(Origin.get(HasNoOrigin)).toBe(origin2);
    });
  });
});
