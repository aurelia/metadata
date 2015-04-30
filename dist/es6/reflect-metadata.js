import core from 'core-js';

// Load global or shim versions of Map, Set, and WeakMap
var functionPrototype = Object.getPrototypeOf(Function);
var _Map = Map;
var _Set = Set;
var _WeakMap = WeakMap;

// [[Metadata]] internal slot
var __Metadata__ = new _WeakMap();

function decorate(decorators, target, targetKey, targetDescriptor) {
    if (!IsUndefined(targetDescriptor)) {
        if (!IsArray(decorators)) {
            throw new TypeError();
        }
        else if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (IsUndefined(targetKey)) {
            throw new TypeError();
        }
        else if (!IsObject(targetDescriptor)) {
            throw new TypeError();
        }
        targetKey = ToPropertyKey(targetKey);
        return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
    }
    else if (!IsUndefined(targetKey)) {
        if (!IsArray(decorators)) {
            throw new TypeError();
        }
        else if (!IsObject(target)) {
            throw new TypeError();
        }
        targetKey = ToPropertyKey(targetKey);
        return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
    }
    else {
        if (!IsArray(decorators)) {
            throw new TypeError();
        }
        else if (!IsConstructor(target)) {
            throw new TypeError();
        }
        return DecorateConstructor(decorators, target);
    }
}
Reflect.decorate = decorate;

function metadata(metadataKey, metadataValue) {
    function decorator(target, targetKey) {
        if (!IsUndefined(targetKey)) {
            if (!IsObject(target)) {
                throw new TypeError();
            }
            targetKey = ToPropertyKey(targetKey);
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
        }
        else {
            if (!IsConstructor(target)) {
                throw new TypeError();
            }
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, undefined);
        }
    }
    return decorator;
}
Reflect.metadata = metadata;

function defineMetadata(metadataKey, metadataValue, target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    }
    else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
}
Reflect.defineMetadata = defineMetadata;

function hasMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    }
    else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryHasMetadata(metadataKey, target, targetKey);
}
Reflect.hasMetadata = hasMetadata;

function hasOwnMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    }
    else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
}
Reflect.hasOwnMetadata = hasOwnMetadata;

function getMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    }
    else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryGetMetadata(metadataKey, target, targetKey);
}
Reflect.getMetadata = getMetadata;

function getOwnMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    }
    else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
}
Reflect.getOwnMetadata = getOwnMetadata;

function getMetadataKeys(target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    }
    else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryMetadataKeys(target, targetKey);
}
Reflect.getMetadataKeys = getMetadataKeys;

function getOwnMetadataKeys(target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    }
    else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryOwnMetadataKeys(target, targetKey);
}
Reflect.getOwnMetadataKeys = getOwnMetadataKeys;

function deleteMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    }
    else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#deletemetadata-metadatakey-p-
    var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
    if (IsUndefined(metadataMap)) {
        return false;
    }
    if (!metadataMap.delete(metadataKey)) {
        return false;
    }
    if (metadataMap.size > 0) {
        return true;
    }
    var targetMetadata = __Metadata__.get(target);
    targetMetadata.delete(targetKey);
    if (targetMetadata.size > 0) {
        return true;
    }
    __Metadata__.delete(target);
    return true;
}
Reflect.deleteMetadata = deleteMetadata;

function DecorateConstructor(decorators, target) {
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target);
        if (!IsUndefined(decorated)) {
            if (!IsConstructor(decorated)) {
                throw new TypeError();
            }
            target = decorated;
        }
    }
    return target;
}
function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target, propertyKey, descriptor);
        if (!IsUndefined(decorated)) {
            if (!IsObject(decorated)) {
                throw new TypeError();
            }
            descriptor = decorated;
        }
    }
    return descriptor;
}
function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        decorator(target, propertyKey);
    }
}
// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#getorcreatemetadatamap--o-p-create-
function GetOrCreateMetadataMap(target, targetKey, create) {
    var targetMetadata = __Metadata__.get(target);
    if (!targetMetadata) {
        if (!create) {
            return undefined;
        }
        targetMetadata = new _Map();
        __Metadata__.set(target, targetMetadata);
    }
    var keyMetadata = targetMetadata.get(targetKey);
    if (!keyMetadata) {
        if (!create) {
            return undefined;
        }
        keyMetadata = new _Map();
        targetMetadata.set(targetKey, keyMetadata);
    }
    return keyMetadata;
}
// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryhasmetadata--metadatakey-o-p-
function OrdinaryHasMetadata(MetadataKey, O, P) {
    var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
    if (hasOwn) {
        return true;
    }
    var parent = GetPrototypeOf(O);
    if (parent !== null) {
        return OrdinaryHasMetadata(MetadataKey, parent, P);
    }
    return false;
}
// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryhasownmetadata--metadatakey-o-p-
function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
    var metadataMap = GetOrCreateMetadataMap(O, P, false);
    if (metadataMap === undefined) {
        return false;
    }
    return Boolean(metadataMap.has(MetadataKey));
}
// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarygetmetadata--metadatakey-o-p-
function OrdinaryGetMetadata(MetadataKey, O, P) {
    var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
    if (hasOwn) {
        return OrdinaryGetOwnMetadata(MetadataKey, O, P);
    }
    var parent = GetPrototypeOf(O);
    if (parent !== null) {
        return OrdinaryGetMetadata(MetadataKey, parent, P);
    }
    return undefined;
}
// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarygetownmetadata--metadatakey-o-p-
function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
    var metadataMap = GetOrCreateMetadataMap(O, P, false);
    if (metadataMap === undefined) {
        return undefined;
    }
    return metadataMap.get(MetadataKey);
}
// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarydefineownmetadata--metadatakey-metadatavalue-o-p-
function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
    var metadataMap = GetOrCreateMetadataMap(O, P, true);
    metadataMap.set(MetadataKey, MetadataValue);
}
// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarymetadatakeys--o-p-
function OrdinaryMetadataKeys(O, P) {
    var ownKeys = OrdinaryOwnMetadataKeys(O, P);
    var parent = GetPrototypeOf(O);
    if (parent === null) {
        return ownKeys;
    }
    var parentKeys = OrdinaryMetadataKeys(parent, P);
    if (parentKeys.length <= 0) {
        return ownKeys;
    }
    if (ownKeys.length <= 0) {
        return parentKeys;
    }
    var set = new _Set();
    var keys = [];
    for (var _i = 0; _i < ownKeys.length; _i++) {
        var key = ownKeys[_i];
        var hasKey = set.has(key);
        if (!hasKey) {
            set.add(key);
            keys.push(key);
        }
    }
    for (var _a = 0; _a < parentKeys.length; _a++) {
        var key = parentKeys[_a];
        var hasKey = set.has(key);
        if (!hasKey) {
            set.add(key);
            keys.push(key);
        }
    }
    return keys;
}
// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryownmetadatakeys--o-p-
function OrdinaryOwnMetadataKeys(target, targetKey) {
    var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
    var keys = [];
    if (metadataMap) {
        metadataMap.forEach(function (_, key) { return keys.push(key); });
    }
    return keys;
}
// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-undefined-type
function IsUndefined(x) {
    return x === undefined;
}
// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
function IsArray(x) {
    return Array.isArray(x);
}
// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-type
function IsObject(x) {
    return typeof x === "object" ? x !== null : typeof x === "function";
}
// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
function IsConstructor(x) {
    return typeof x === "function";
}
// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-symbol-type
function IsSymbol(x) {
    return typeof x === "symbol";
}
// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
function ToPropertyKey(value) {
    if (IsSymbol(value)) {
        return value;
    }
    return String(value);
}
function GetPrototypeOf(O) {
    var proto = Object.getPrototypeOf(O);
    if (typeof O !== "function" || O === functionPrototype) {
        return proto;
    }
    // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
    // Try to determine the superclass constructor. Compatible implementations
    // must either set __proto__ on a subclass constructor to the superclass constructor,
    // or ensure each class has a valid `constructor` property on its prototype that
    // points back to the constructor.
    // If this is not the same as Function.[[Prototype]], then this is definately inherited.
    // This is the case when in ES6 or when using __proto__ in a compatible browser.
    if (proto !== functionPrototype) {
        return proto;
    }
    // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
    var prototype = O.prototype;
    var prototypeProto = Object.getPrototypeOf(prototype);
    if (prototypeProto == null || prototypeProto === Object.prototype) {
        return proto;
    }
    // if the constructor was not a function, then we cannot determine the heritage.
    var constructor = prototypeProto.constructor;
    if (typeof constructor !== "function") {
        return proto;
    }
    // if we have some kind of self-reference, then we cannot determine the heritage.
    if (constructor === O) {
        return proto;
    }
    // we have a pretty good guess at the heritage.
    return constructor;
}
