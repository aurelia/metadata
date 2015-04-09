System.register(['./metadata'], function (_export) {
  var Metadata, _classCallCheck, _createClass, DecoratorApplicator;

  return {
    setters: [function (_metadata) {
      Metadata = _metadata.Metadata;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      DecoratorApplicator = (function () {
        function DecoratorApplicator() {
          _classCallCheck(this, DecoratorApplicator);

          this._first = null;
          this._second = null;
          this._third = null;
          this._rest = null;
        }

        _createClass(DecoratorApplicator, [{
          key: 'decorator',
          value: (function (_decorator) {
            function decorator(_x) {
              return _decorator.apply(this, arguments);
            }

            decorator.toString = function () {
              return _decorator.toString();
            };

            return decorator;
          })(function (decorator) {
            if (this._first === null) {
              this._first = decorator;
              return this;
            }

            if (this._second === null) {
              this._second = decorator;
              return this;
            }

            if (this._third === null) {
              this._third = decorator;
              return this;
            }

            if (this._rest === null) {
              this._rest = [];
            }

            this._rest.push(decorator);

            return this;
          })
        }, {
          key: '_decorate',
          value: function _decorate(target) {
            var i, ii, rest;

            if (this._first !== null) {
              this._first(target);
            }

            if (this._second !== null) {
              this._second(target);
            }

            if (this._third !== null) {
              this._third(target);
            }

            rest = this._rest;
            if (rest !== null) {
              for (i = 0, ii = rest.length; i < ii; ++i) {
                rest[i](target);
              }
            }
          }
        }]);

        return DecoratorApplicator;
      })();

      _export('DecoratorApplicator', DecoratorApplicator);
    }
  };
});