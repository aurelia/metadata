import {PLATFORM} from 'aurelia-pal';

const theGlobal = PLATFORM.global;
const emptyMetadata = Object.freeze({});
const metadataContainerKey = '__metadata__';

if (typeof theGlobal.Reflect === 'undefined') {
  theGlobal.Reflect = {};
}

if (typeof theGlobal.Reflect.getOwnMetadata === 'undefined') {
  Reflect.getOwnMetadata = function(metadataKey, target, targetKey) {
    return ((target[metadataContainerKey] || emptyMetadata)[targetKey] || emptyMetadata)[metadataKey];
  };
}

if (typeof theGlobal.Reflect.defineMetadata === 'undefined') {
  Reflect.defineMetadata = function(metadataKey, metadataValue, target, targetKey) {
    let metadataContainer = target.hasOwnProperty(metadataContainerKey) ? target[metadataContainerKey] : (target[metadataContainerKey] = {});
    let targetContainer = metadataContainer[targetKey] || (metadataContainer[targetKey] = {});
    targetContainer[metadataKey] = metadataValue;
  };
}

if (typeof theGlobal.Reflect.metadata === 'undefined') {
  Reflect.metadata = function(metadataKey, metadataValue) {
    return function(target, targetKey) {
      Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
    };
  };
}

function ensureDecorators(target) {
  let applicator;

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

interface MetadataType {
  resource: string;
  paramTypes: string;
  properties: string;
  get(metadataKey: string, target: Function, targetKey: string): Object;
  getOwn(metadataKey: string, target: Function, targetKey: string): Object;
  define(metadataKey: string, metadataValue: Object, target: Function, targetKey: string): void;
  getOrCreateOwn(metadataKey: string, Type: Function, target: Function, targetKey: string): Object;
}

/**
* Provides helpers for working with metadata.
*/
export const metadata: MetadataType = {
  resource: 'aurelia:resource',
  paramTypes: 'design:paramtypes',
  properties: 'design:properties',
  get(metadataKey: string, target: Function, targetKey: string): Object {
    if (!target) {
      return undefined;
    }

    let result = metadata.getOwn(metadataKey, target, targetKey);
    return result === undefined ? metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
  },
  getOwn(metadataKey: string, target: Function, targetKey: string): Object {
    if (!target) {
      return undefined;
    }

    if (target.hasOwnProperty('decorators')) {
      ensureDecorators(target);
    }

    return Reflect.getOwnMetadata(metadataKey, target, targetKey);
  },
  define(metadataKey: string, metadataValue: Object, target: Function, targetKey: string): void {
    Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
  },
  getOrCreateOwn(metadataKey: string, Type: Function, target: Function, targetKey: string): Object {
    let result = metadata.getOwn(metadataKey, target, targetKey);

    if (result === undefined) {
      result = new Type();
      Reflect.defineMetadata(metadataKey, result, target, targetKey);
    }

    return result;
  }
};
