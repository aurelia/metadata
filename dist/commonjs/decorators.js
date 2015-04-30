'use strict';

exports.__esModule = true;

var _DecoratorApplicator = require('./decorator-applicator');

var Decorators = {
  configure: {
    parameterizedDecorator: function parameterizedDecorator(name, decorator) {
      Decorators[name] = function () {
        var applicator = new _DecoratorApplicator.DecoratorApplicator();
        return applicator[name].apply(applicator, arguments);
      };

      _DecoratorApplicator.DecoratorApplicator.prototype[name] = function () {
        var result = decorator.apply(null, arguments);
        return this.decorator(result);
      };
    },
    simpleDecorator: function simpleDecorator(name, decorator) {
      Decorators[name] = function () {
        return new _DecoratorApplicator.DecoratorApplicator().decorator(decorator);
      };

      _DecoratorApplicator.DecoratorApplicator.prototype[name] = function () {
        return this.decorator(decorator);
      };
    }
  }
};
exports.Decorators = Decorators;