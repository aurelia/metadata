/**
 * Utilities for reading and writing the metadata of JavaScript functions.
 *
 * @module metadata
 */
 
export {Origin} from './origin';
export {ResourceType} from './resource-type';
export {
  addFunctionMetadataLocation,
  addFunctionMetadataLocator,
  getFunctionMetadata,
  getAllFunctionMetadata,
  addFunctionMetadata
} from './metadata';