System.register(['core-js'], function (_export) {
  var core, _classCallCheck, _createClass, metadataStoreLookup, locateMetadataElsewhere, MetadataStore, Metadata;

  return {
    setters: [function (_coreJs) {
      core = _coreJs['default'];
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      metadataStoreLookup = new Map();

      MetadataStore = (function () {
        function MetadataStore(owner) {
          _classCallCheck(this, MetadataStore);

          this._owner = owner;
          this._first = null;
          this._second = null;
          this._third = null;
          this._rest = null;
        }

        _createClass(MetadataStore, [{
          key: 'first',
          value: function first(type, searchPrototype) {
            var potential, i, ii, rest;

            if (this._first instanceof type) {
              return this._first;
            }

            if (this._second instanceof type) {
              return this._second;
            }

            if (this._third instanceof type) {
              return this._third;
            }

            rest = this._rest;
            if (rest !== null) {
              for (i = 0, ii = rest.length; i < ii; ++i) {
                potential = rest[i];
                if (potential instanceof type) {
                  return potential;
                }
              }
            }

            if (searchPrototype && this._owner !== undefined) {
              return Metadata.on(Object.getPrototypeOf(this._owner)).first(type, searchPrototype);
            }

            return null;
          }
        }, {
          key: 'has',
          value: function has(type, searchPrototype) {
            return this.first(type, searchPrototype) !== null;
          }
        }, {
          key: 'all',
          value: function all(type, searchPrototype) {
            var potential,
                i,
                ii,
                rest,
                found = [];

            if (this._first instanceof type) {
              found.push(this._first);
            }

            if (this._second instanceof type) {
              found.push(this._second);
            }

            if (this._third instanceof type) {
              found.push(this._third);
            }

            rest = this._rest;
            if (rest !== null) {
              for (i = 0, ii = rest.length; i < ii; ++i) {
                potential = rest[i];
                if (potential instanceof type) {
                  found.push(potential);
                }
              }
            }

            if (searchPrototype && this._owner !== undefined) {
              found = found.concat(Metadata.on(Object.getPrototypeOf(this._owner)).all(type, searchPrototype));
            }

            return found;
          }
        }, {
          key: 'firstOrAdd',
          value: function firstOrAdd(type, searchPrototype) {
            var existing = this.first(type, searchPrototype);
            if (existing === null) {
              existing = new type();
              this.add(existing);
            }
            return existing;
          }
        }, {
          key: 'add',
          value: function add(instance) {
            if (this._first === null) {
              this._first = instance;
              return;
            }

            if (this._second === null) {
              this._second = instance;
              return;
            }

            if (this._third === null) {
              this._third = instance;
              return;
            }

            if (this._rest === null) {
              this._rest = [];
            }

            this._rest.push(instance);

            return this;
          }
        }]);

        return MetadataStore;
      })();

      _export('MetadataStore', MetadataStore);

      Metadata = {
        none: Object.freeze(new MetadataStore()),
        on: function on(owner) {
          var metadata;

          if (!owner) {
            return this.none;
          }

          metadata = metadataStoreLookup.get(owner);
          if (metadata !== undefined && metadata._owner === owner) {
            return metadata;
          }

          metadata = new MetadataStore(owner);
          metadataStoreLookup.set(owner, metadata);

          if (owner.hasOwnProperty('decorators')) {
            var applicator;

            if (typeof owner.decorators === 'function') {
              applicator = owner.decorators();
            } else {
              applicator = owner.decorators;
            }

            if (typeof applicator._decorate === 'function') {
              applicator._decorate(owner);
            } else {
              throw new Error('The return value of your decorator\'s method was not valid.');
            }
          } else if (locateMetadataElsewhere !== undefined) {
            locateMetadataElsewhere(owner, metadata);
          }

          return metadata;
        },
        configure: {
          locator: function locator(loc) {
            if (locateMetadataElsewhere === undefined) {
              locateMetadataElsewhere = loc;
              return;
            }

            var original = locateMetadataElsewhere;
            locateMetadataElsewhere = function (fn, meta) {
              original(fn, meta);
              loc(fn, meta);
            };
          }
        }
      };

      _export('Metadata', Metadata);
    }
  };
});