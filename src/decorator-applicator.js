import {Metadata} from './metadata';

export class DecoratorApplicator {
  constructor(){
    this._first = null;
    this._second = null;
    this._third = null;
    this._rest = null;
  }

  metadata(...rest){
    return this.decorator(function(target){
      var meta = Metadata.on(target);
      for(var i = 0, ii = rest.length; i < ii; ++i){
        meta.add(rest[i]);
      }
    });
  }

  decorator(decorator){
    if(this._first === null){
      this._first = decorator;
      return this;
    }

    if(this._second === null){
      this._second = decorator;
      return this;
    }

    if(this._third === null){
      this._third = decorator;
      return this;
    }

    if(this._rest === null){
      this._rest = [];
    }

    this._rest.push(decorator);

    return this;
  }

  _decorate(target){
    var i, ii, rest;

    if(this._first !== null){
      this._first(target);
    }

    if(this._second !== null){
      this._second(target);
    }

    if(this._third !== null){
      this._third(target);
    }

    rest = this._rest;
    if(rest !== null){
      for(i = 0, ii = rest.length; i < ii; ++i){
        rest[i](target);
      }
    }
  }
}
