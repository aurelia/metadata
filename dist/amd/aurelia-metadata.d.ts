declare module 'aurelia-metadata' {
  import core from 'core-js';
  export class DecoratorApplicator {
    constructor();
    decorator(decorator: any): any;
    _decorate(target: any): any;
  }
  export var Decorators: any;
  
  /**
  * Provides helpers for working with metadata.
  *
  * @class Metadata
  * @static
  */
  export var Metadata: any;
  
  /**
  * A metadata annotation that describes the origin module of the function to which it's attached.
  *
  * @class Origin
  * @constructor
  * @param {string} moduleId The origin module id.
  * @param {string} moduleMember The name of the export in the origin module.
  */
  export class Origin {
    constructor(moduleId: any, moduleMember: any);
    
    /**
      * Get the Origin annotation for the specified function.
      *
      * @method get
      * @static
      * @param {Function} fn The function to inspect for Origin metadata.
      * @return {Origin} Returns the Origin metadata.
      */
    static get(fn: any): any;
    
    /**
      * Set the Origin annotation for the specified function.
      *
      * @method set
      * @static
      * @param {Function} fn The function to set the Origin metadata on.
      * @param {origin} fn The Origin metadata to store on the function.
      * @return {Origin} Returns the Origin metadata.
      */
    static set(fn: any, origin: any): any;
  }
}