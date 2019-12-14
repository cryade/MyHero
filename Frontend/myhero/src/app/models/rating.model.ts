import { Deserializable } from "./deserializable.model";

export class Rating implements Deserializable {

    public id: string;
    public title: string;
    public description: string;
    public rating: number;
    public user: string;
    public hero: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
      }
}
