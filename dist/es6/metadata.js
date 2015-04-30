import meta from './reflect-metadata';

function ensureDecorators(target){
  var applicator;

  if(typeof target.decorators === 'function'){
    applicator = target.decorators();
  }else{
    applicator = target.decorators;
  }

  if(typeof applicator._decorate === 'function'){
    delete target.decorators;
    applicator._decorate(target);
  }else{
    throw new Error('The return value of your decorator\'s method was not valid.');
  }
}

/**
* Provides helpers for working with metadata.
*
* @class Metadata
* @static
*/
export var Metadata = {
  resource:'aurelia:resource',
  paramTypes:'design:paramtypes',
  properties:'design:properties',
  get(metadataKey, target, propertyKey){
    if(!target){
      return undefined;
    }

    let result = Metadata.getOwn(metadataKey, target, propertyKey);
    return result === undefined ? Metadata.get(metadataKey, Object.getPrototypeOf(target), propertyKey) : result;
  },
  getOwn(metadataKey, target, propertyKey){
    if(!target){
      return undefined;
    }

    if(target.hasOwnProperty('decorators')){
      ensureDecorators(target);
    }

    return Reflect.getOwnMetadata(metadataKey, target, propertyKey);
  },
  getOrCreateOwn(metadataKey, Type, target, propertyKey){
    let result = Metadata.getOwn(metadataKey, target, propertyKey);

    if(result === undefined){
      result = new Type();
      Reflect.defineMetadata(metadataKey, result, target, propertyKey);
    }

    return result;
  }
}
