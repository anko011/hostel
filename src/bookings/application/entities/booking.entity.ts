export class Booking {
  constructor(
    private _id: string,
    private _title: string,
    private _description: string,
    private _roomCount: number,
    private _pricePerDay: number,
  ) {}

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get roomCount(): number {
    return this._roomCount;
  }

  get pricePerDay(): number {
    return this._pricePerDay;
  }
}
