import { Deserializable } from "./deserializable.model";
import { Rating } from "./rating.model";
import { Hero } from "./hero.model";

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
    public ratings: Rating[];
    public bookedHeroes: Hero[];

  deserialize(input: any): this {
    Object.assign(this, input);

    this.ratings = input.ratings.map((rat: Rating) =>
      new Rating().deserialize(rat)
    );

    this.bookedHeroes = input.bookedHeroes.map((hero: Hero) =>
      new Hero().deserialize(hero));
    return this;
  }
}
