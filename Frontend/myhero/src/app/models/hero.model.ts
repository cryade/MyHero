import { Category } from "./category.model";
import { Deserializable } from "./deserializable.model";

export class Hero implements Deserializable {

    public category: Category[];
    public _id: string;
    public name: string;
    public description: string;
    public _v: number;


  deserialize(input: any): this {
    Object.assign(this, input);

    this.category = input.category.map(cat =>
      new Category().deserialize(cat)
    );
      console.log(this)
    return this;
  }
}
