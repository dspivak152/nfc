export class GenericModel {
    id: number;
    name: string;

    constructor(item: any) {
        this.id = item.id;
        this.name = item.name;
    }
}