import {Origin} from '../src/origin';

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

  describe('set', () => {
    it('should attach an origin if one does not exist', () => {
      class HasNoOrigin {}
      Origin.set(HasNoOrigin, origin2);

      expect(Origin.get(HasNoOrigin)).toBe(origin2);
    });
  });
});
