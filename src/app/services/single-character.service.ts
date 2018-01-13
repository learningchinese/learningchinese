import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import { SingleCharacter } from "../models/single-character.model";
import { Service } from "./service";
import { AppConfig } from "../configs/app.config";
import { HitList } from "../models/hit-list.model";

import { StringUtil } from "../utils/string.util"

@Injectable()
export class SingleCharacterService extends Service<SingleCharacter> {
    constructor(http: Http, private appConfig: AppConfig, private stringUtil: StringUtil) {
        super(http, appConfig.serverApiUrl + "/api/v1/character");
    }

    /**
     * Get by character
     * @param {string} c - a character
     */
    findByCharacter(c: string): Promise<SingleCharacter> {
        if (!c) {
            return Promise.reject('A character is required.');
        }
        c = c.trim();
        if (!this.stringUtil.checkChineseCharacter(c)) {
            return Promise.reject(`"${c}" is not Chinese character.`);
        }
        if (c.length > 1) {
            c = c.charAt(0);
        }
        //dummy check
        return this.checkImage('/assets/gif/char/' + c)
            .then(response => {
                console.log(response);
                let char = new SingleCharacter();
                char.sc = c;
                char.tc = char.sc;
                char.definition = 'Definition of ' + c;
                char.pinyinNum = 'pinyin num of ' + c;
                char.pinyinTone = 'pinyin of ' + c;
                return char;
            })
            .catch(err => {
                return Promise.reject('Character is not found.');
            });
    }

    private checkImage(imageSrc: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = (e) => {
                resolve(true);
            };
            img.onerror = (e) => {
                reject(e);
            }
            img.src = imageSrc;
        });
    }

}