import {Injectable} from "@angular/core";

@Injectable()
export class StoreUtil {
    cache: Map<string, string> = new Map<string, string>();
}