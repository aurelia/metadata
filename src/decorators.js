import {DecoratorApplicator} from './decorator-applicator';

interface DecoratorsConfigType {
  parameterizedDecorator(name: string, decorator: Function): void;
  simpleDecorator(name: string, decorator: Function): void;
}

interface DecoratorsType {
  configure: DecoratorsConfigType;
}

export const Decorators: DecoratorsType = {
  configure: {
    parameterizedDecorator(name: string, decorator: Function): void {
      Decorators[name] = function() {
        let applicator = new DecoratorApplicator();
        return applicator[name].apply(applicator, arguments);
      };

      DecoratorApplicator.prototype[name] = function() {
        let result = decorator.apply(null, arguments);
        return this.decorator(result);
      };
    },
    simpleDecorator(name: string, decorator: Function): void {
      Decorators[name] = function() {
        return new DecoratorApplicator().decorator(decorator);
      };

      DecoratorApplicator.prototype[name] = function() {
        return this.decorator(decorator);
      };
    }
  }
};
