import { Deserializable } from "./deserializable.model";
import { Rating } from "./rating.model";

export class User implements Deserializable {

    public username: String;
    public password: String;
    public firstName: String;
    public lastName: String;
    public birthdate: Date;
    public street: String;
    public housenumber: Number;
    public postalcode: Number;
    public city: String;
    public email: String;
    public rating: Rating[];

  deserialize(input: any): this {
    Object.assign(this, input);

    this.rating = input.rating.map(rat =>
      new Rating().deserialize(rat)
    );
    return this;
  }
}
