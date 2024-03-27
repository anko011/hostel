export class NotExistsBookingException extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, NotExistsBookingException.prototype);
  }
}
