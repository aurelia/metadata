'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaMetadata = require('./aurelia-metadata');

Object.keys(_aureliaMetadata).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaMetadata[key];
    }
  });
});