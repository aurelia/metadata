define(['exports', './reflect-metadata'], function (exports, _reflectMetadata) {
  'use strict';

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

  exports.__esModule = true;

  var _meta = _interopRequire(_reflectMetadata);

  function ensureDecorators(target) {
    var applicator;

    if (typeof target.decorators === 'function') {
      applicator = target.decorators();
    } else {
      applicator = target.decorators;
    }

    if (typeof applicator._decorate === 'function') {
      delete target.decorators;
      applicator._decorate(target);
    } else {
      throw new Error('The return value of your decorator\'s method was not valid.');
    }
  }

  var Metadata = {
    resource: 'aurelia:resource',
    paramTypes: 'design:paramtypes',
    properties: 'design:properties',
    get: function get(metadataKey, target, propertyKey) {
      if (!target) {
        return undefined;
      }

      var result = Metadata.getOwn(metadataKey, target, propertyKey);
      return result === undefined ? Metadata.get(metadataKey, Object.getPrototypeOf(target), propertyKey) : result;
    },
    getOwn: function getOwn(metadataKey, target, propertyKey) {
      if (!target) {
        return undefined;
      }

      if (target.hasOwnProperty('decorators')) {
        ensureDecorators(target);
      }

      return Reflect.getOwnMetadata(metadataKey, target, propertyKey);
    },
    getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, propertyKey) {
      var result = Metadata.getOwn(metadataKey, target, propertyKey);

      if (result === undefined) {
        result = new Type();
        Reflect.defineMetadata(metadataKey, result, target, propertyKey);
      }

      return result;
    }
  };
  exports.Metadata = Metadata;
});