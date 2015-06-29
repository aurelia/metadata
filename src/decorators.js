import {DecoratorApplicator} from './decorator-applicator';

export var Decorators = {
  configure: {
    parameterizedDecorator(name:string, decorator:Function){
      Decorators[name] = function(){
        var applicator = new DecoratorApplicator();
        return applicator[name].apply(applicator, arguments);
      };

      DecoratorApplicator.prototype[name] = function(){
        var result = decorator.apply(null, arguments);
        return this.decorator(result);
      };
    },
    simpleDecorator(name:string, decorator:Function){
      Decorators[name] = function(){
        return new DecoratorApplicator().decorator(decorator);
      };

      DecoratorApplicator.prototype[name] = function(){
        return this.decorator(decorator);
      }
    }
  }
}
