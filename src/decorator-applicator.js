export class DecoratorApplicator {
  constructor(){
    this._first = null;
    this._second = null;
    this._third = null;
    this._rest = null;
  }

  decorator(decorator:Function):DecoratorApplicator{
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

  _decorate(target:Function){
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
