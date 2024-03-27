export class IncorrectCredentialsException extends Error {
  constructor() {
    super('Incorrect credentials');
    Object.setPrototypeOf(this, IncorrectCredentialsException.prototype);
  }
}
