import {PLATFORM} from 'aurelia-pal';

const originStorage = new Map();
const unknownOrigin = Object.freeze({moduleId: undefined, moduleMember: undefined});

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
  constructor(moduleId: string, moduleMember: string) {
    this.moduleId = moduleId;
    this.moduleMember = moduleMember;
  }

  /**
  * Get the Origin metadata for the specified function.
  * @param fn The function to inspect for Origin metadata.
  * @return Returns the Origin metadata.
  */
  static get(fn: Function): Origin {
    let origin = originStorage.get(fn);

    if (origin === undefined) {
      PLATFORM.eachModule((key, value) => {
        if (typeof value === 'object') {
          for (let name in value) {
            try {
              let exp = value[name];
              if (exp === fn) {
                originStorage.set(fn, origin = new Origin(key, name));
                return true;
              }
            } catch (e) {
              // IE11 in cross origin frame fails when accessing Window['frameElement'] with Access Denied script error.
              // Window gets exported from webpack buildin/global.js.
            }
          }
        }

        if (value === fn) {
          originStorage.set(fn, origin = new Origin(key, 'default'));
          return true;
        }

        return false;
      });
    }

    return origin || unknownOrigin;
  }

  /**
  * Set the Origin metadata for the specified function.
  * @param fn The function to set the Origin metadata on.
  * @param fn The Origin metadata to store on the function.
  * @return Returns the Origin metadata.
  */
  static set(fn: Function, origin: Origin): void {
    originStorage.set(fn, origin);
  }
}
