/* used https://nehalist.io/angular-7-models/ as reference for the way models are handled */

export interface Deserializable {
    deserialize(input: any): this;
}