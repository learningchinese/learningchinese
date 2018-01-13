import {Injectable} from "@angular/core";

@Injectable()
export class StoreUtil {
    cache: Map<string, any> = new Map<string, any>();
}