export class InvalidBookingAttributeException extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidBookingAttributeException.prototype);
  }
}
