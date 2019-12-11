import { Deserializable } from './deserializable.model';
export class Category implements Deserializable{

    public _id: string;
    public name: string;
  
    deserialize(input: any): this {
      return Object.assign(this, input);
    }
}
