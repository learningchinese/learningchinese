import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import { SingleCharacter } from "../models/single-character.model";
import { Service } from "./service";
import { AppConfig } from "../configs/app.config";
import { HitList } from "../models/hit-list.model";

import { StringUtil } from "../utils/string.util"
import { StoreUtil } from "../utils/store.util"
import { resolve } from "url";
import { reject } from "q";

@Injectable()
export class SingleCharacterService extends Service<SingleCharacter> {

    private static get CHAR_MAP_IDX() { return 'CHAR_MAP_IDX' };

    constructor(http: Http, private appConfig: AppConfig, private stringUtil: StringUtil, private storeUtil: StoreUtil) {
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
                return this.findSingleCharacter(c);
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

    private findSingleCharacter(c): Promise<SingleCharacter> {
        return this.findCharacterIndexPage(c)
            .then(idx => {
                return this.findCommonCharacters(idx, 20).then(hitList => {
                    let char: SingleCharacter = hitList.hits.find(t => t.sc === c || t.tc === c);
                    if (!char) {
                        throw Error(`Not found character "${c}"`);
                    }
                    return char;
                }).catch(err => err);
            }).catch(err => err);
    }

    private findCharacterIndexPage(c: string): Promise<number> {
        if (this.storeUtil.cache.has(SingleCharacterService.CHAR_MAP_IDX)) {
            let charMapIdx = this.storeUtil.cache.get(SingleCharacterService.CHAR_MAP_IDX);
            return Promise.resolve(+charMapIdx[c]);
        } else {
            return this.http.get('/assets/json/common-characters/index.json')
                .toPromise()
                .then(res => {
                    let charMapIdx = res.json();
                    this.storeUtil.cache.set(SingleCharacterService.CHAR_MAP_IDX, charMapIdx);
                    return +charMapIdx[c];
                }).catch(err => err);
        }
    }

    /**
     * Find common characters
     * @param page {number} - page index
     * @param size {number} - page size
     */
    findCommonCharacters(page: number = 0, size?: number): Promise<HitList<SingleCharacter>> {
        let url = `/assets/json/common-characters/${page}.json`;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                let data = response.json();;
                return new HitList<SingleCharacter>(data);
            })
            .catch(this.handleError);
    }
}