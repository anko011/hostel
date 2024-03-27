export class NotExistsTokenException extends Error {
  constructor() {
    super(`Token  is not exists`);
    Object.setPrototypeOf(this, NotExistsTokenException.prototype);
  }
}
