import { Category } from "./category.model";
import { Rating } from "./rating.model";
import { Deserializable } from "./deserializable.model";

export class Hero implements Deserializable {

    public category: Category[];
    public rating: Rating[];
    public _id: string;
    public name: string;
    public description: string;
    public _v: number;


  deserialize(input: any): this {
    Object.assign(this, input);

    this.category = input.category.map(cat =>
      new Category().deserialize(cat)
    );
    return this;
  }
}
