/**
* Stores and applies a collection of decorators to a target.
*/
export class DecoratorApplicator {
  constructor() {
    this._first = null;
    this._second = null;
    this._third = null;
    this._rest = null;
  }

  /**
  * Adds a decorator to the collection.
  * @param decorator The decorator to add.
  * @return The current decorator applicator for chaining.
  */
  decorator(decorator: Function): DecoratorApplicator {
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
  }

  _decorate(target: Function): void {
    if (this._first !== null) {
      this._first(target);
    }

    if (this._second !== null) {
      this._second(target);
    }

    if (this._third !== null) {
      this._third(target);
    }

    let rest = this._rest;
    if (rest !== null) {
      for (let i = 0, ii = rest.length; i < ii; ++i) {
        rest[i](target);
      }
    }
  }
}
