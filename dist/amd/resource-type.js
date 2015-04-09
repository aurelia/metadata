define(['exports'], function (exports) {
  'use strict';

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var ResourceType = (function () {
    function ResourceType() {
      _classCallCheck(this, ResourceType);
    }

    _createClass(ResourceType, [{
      key: 'load',
      value: function load(container, target) {
        return Promise.resolve(this);
      }
    }, {
      key: 'register',
      value: function register(registry, name) {
        throw new Error('All descendents of "ResourceType" must implement the "register" method.');
      }
    }]);

    return ResourceType;
  })();

  exports.ResourceType = ResourceType;
});