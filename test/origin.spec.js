import {Origin} from '../src/index';

describe('origin', () => {
  var origin1 = new Origin('ModuleId1', 'ModuleMember1'),
      origin2 = new Origin('ModuleId2', 'ModuleMember2');

  describe('get', () => {
    it('should return undefined if not set', () => {
      class HasNoOrigin {}
      expect(Origin.get(HasNoOrigin)).toBe(undefined);
    });

    it('should return the origin if set', () => {
      class HasOrigin {}
      Origin.set(HasOrigin, origin1);

      expect(Origin.get(HasOrigin)).toBe(origin1);
    });

    it('should normalize static origin property with Origin value', () => {
      class HasNoOrigin {}
      HasNoOrigin.origin = origin2;

      expect(Origin.get(HasNoOrigin)).toBe(origin2);
      expect(HasNoOrigin.origin).toBe(origin2);
    });

    it('should normalize static origin property with string value', () => {
      class HasNoOrigin {}
      HasNoOrigin.origin = 'TestOrigin';

      expect(Origin.get(HasNoOrigin).moduleId).toBe('TestOrigin');
      expect(HasNoOrigin.origin).toBe('TestOrigin');
    });

    it('should normalize static origin property with function():string value', () => {
      class HasNoOrigin {
        static origin(){ return 'TestOrigin' }
      }

      expect(Origin.get(HasNoOrigin).moduleId).toBe('TestOrigin');
      expect(typeof HasNoOrigin.origin === 'function').toBe(true);
    });

    it('should normalize static origin property with function():Origin value', () => {
      class HasNoOrigin {
        static origin(){ return new Origin('TestOrigin'); }
      }

      expect(Origin.get(HasNoOrigin).moduleId).toBe('TestOrigin');
      expect(typeof HasNoOrigin.origin === 'function').toBe(true);
    });
  });

  describe('set', () => {
    it('should attach an origin if one does not exist', () => {
      class HasNoOrigin {}
      Origin.set(HasNoOrigin, origin2);

      expect(Origin.get(HasNoOrigin)).toBe(origin2);
    });

    it('should not attach an origin if one exists', () => {
      class HasOrigin {}
      Origin.set(HasOrigin, origin1);
      Origin.set(HasOrigin, origin2);

      expect(Origin.get(HasOrigin)).toBe(origin1);
    });
  });
});