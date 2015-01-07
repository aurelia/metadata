import {Origin} from '../src/index';

describe('origin', () => {
  var origin1 = new Origin('ModuleId1', 'ModuleMember1'),
      origin2 = new Origin('ModuleId2', 'ModuleMember2');

  describe('get', () => {
    it('should return null if fn.__origin__ is unset', () => {
      expect(Origin.get(HasNoOrigin)).toBe(null);
    });

    it('should return the origin if fn.__origin__ is set', () => {
      expect(Origin.get(HasOrigin)).toBe(origin1);
    });

    it('should prefer fn.origin if it exists', () => {
      HasNoOrigin.origin = origin2;
      expect(Origin.get(HasNoOrigin)).toBe(origin2);

      // Check to see if it's now set.
      expect(HasNoOrigin.__origin__).toBe(origin2);
    });
  });

  describe('set', () => {
    it('should attach an origin if one does not exist', () => {
      Origin.set(HasNoOrigin, origin2);
      expect(HasNoOrigin.__origin__).toBe(origin2);
    });

    it('should not attach an origin if one exists', () => {
      Origin.set(HasOrigin, origin2)
      expect(HasOrigin.__origin__).toBe(origin1);
    });
  });

  class HasNoOrigin {}
  class HasOrigin {}
  HasOrigin.__origin__ = origin1;
});