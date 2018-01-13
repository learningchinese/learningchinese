import {Entity} from "./entity.model";

export class SingleCharacter extends Entity {
    sc: string;
    tc: string;
    pinyinNum: string;
    pinyinTone: string;
    pinyinSort: string;
    definition: string;
    soundFiles: string[];
}