import {Entity} from "./entity.model";

export class HitList<T extends Entity> {
    total: number = 0;
    count: number = 0;
    hits: Array<T> = [];
    constructor(data: Object) {
        if (typeof data === "object" && data !== null) {
            this.total = data["total"];
            this.count = data["count"];
            for(var i = 0; i < this.count; i++) {
                var item = data["hits"][i];
                this.hits.push(item as T);
            }
        }
    }
}