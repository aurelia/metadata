declare module 'aurelia-metadata' {
  import 'core-js';
  import { PLATFORM }  from 'aurelia-pal';
  
  /**
  * Helpers for working with metadata on functions.
  */
  export interface MetadataType {
    
    /**
      * The metadata key representing pluggable resources.
      */
    resource: string;
    
    /**
      * The metadata key representing parameter type information.
      */
    paramTypes: string;
    
    /**
      * The metadata key representing property information.
      */
    properties: string;
    get(metadataKey: string, target: Function, targetKey: string): Object;
    getOwn(metadataKey: string, target: Function, targetKey: string): Object;
    define(metadataKey: string, metadataValue: Object, target: Function, targetKey: string): void;
    getOrCreateOwn(metadataKey: string, Type: Function, target: Function, targetKey: string): Object;
  }
  
  /**
  * An object capable of applying it's captured decorators to a target.
  */
  export interface DecoratorApplicator {
    on(target: any, key?: string, descriptor?: Object): any;
  }
  
  /**
  * Options that control how the deprected decorator should function at runtime.
  */
  export interface DeprecatedOptions {
    
    /**
      * Specifies a custom deprecation message.
      */
    message: string;
    
    /**
      * Specifies whether or not the deprecation should throw an error.
      */
    error: boolean;
  }
  
  /**
  * Options used during protocol creation.
  */
  export interface ProtocolOptions {
    validate(target: any): string | boolean;
    compose(target: any): void;
  }
  
  /**
  * Provides helpers for working with metadata.
  */
  export const metadata: MetadataType;
  
  /**
  * A metadata annotation that describes the origin module of the function to which it's attached.
  */
  export class Origin {
    
    /**
      * The id of the module from which the item originated.
      */
    moduleId: string;
    
    /**
      * The member name of the export on the module object from which the item originated.
      */
    moduleMember: string;
    
    /**
      * Creates an instance of Origin metadata.
      * @param moduleId The id of the module from which the item originated.
      * @param moduleMember The member name of the export on the module object from which the item originated.
      */
    constructor(moduleId: string, moduleMember: string);
    
    /**
      * Get the Origin metadata for the specified function.
      * @param fn The function to inspect for Origin metadata.
      * @return Returns the Origin metadata.
      */
    static get(fn: Function): Origin;
    
    /**
      * Set the Origin metadata for the specified function.
      * @param fn The function to set the Origin metadata on.
      * @param fn The Origin metadata to store on the function.
      * @return Returns the Origin metadata.
      */
    static set(fn: Function, origin: Origin): void;
  }
  
  /**
  * Enables applying decorators, particularly for use when there is no syntax support in the language, such as with ES5 and ES2016.
  * @param rest The decorators to apply.
  */
  export function decorators(...rest: Function[]): DecoratorApplicator;
  
  /**
  * Decorator: Enables marking methods as deprecated.
  * @param optionsOrTarget Options for how the deprected decorator should function at runtime.
  */
  export function deprecated(optionsOrTarget?: DeprecatedOptions, maybeKey?: string, maybeDescriptor?: Object): any;
  
  /**
  * Decorator: Enables mixing behaior into a class.
  * @param behavior An object with keys for each method to mix into the target class.
  */
  export function mixin(behavior: Object): any;
  
  /**
  * Decorator: Creates a protocol.
  * @param name The name of the protocol.
  * @param options The validation function or options object used in configuring the protocol.
  */
  export function protocol(name: string, options?: ((target: any) => string | boolean) | ProtocolOptions): any;
}