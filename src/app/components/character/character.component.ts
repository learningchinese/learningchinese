import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute } from "@angular/router";

import { StoreUtil } from "../../utils/store.util"
import { StringUtil } from "../../utils/string.util";
import { PopupService } from "../../services/popup.service";
import { SingleCharacter } from "../../models/single-character.model"
import { SingleCharacterService } from "../../services/single-character.service"
import { PubSubService } from "../../services/pub-sub.service";

@Component({
    selector: "character-page",
    templateUrl: "./character.component.html",
    styleUrls: []
})
export class CharacterComponent implements OnInit, OnDestroy {
    private static get LAST_TERM_STORE_KEY() { return 'LAST_TERM_STORE_KEY' };

    public term: string;
    public gifUrl: string;
    private flagLockImg: boolean = false;
    private sub: Subscription;

    public char: SingleCharacter = new SingleCharacter();

    @ViewChild("gifImg") viewGifImg: ElementRef;

    constructor(private stringUtil: StringUtil,
        private popupService: PopupService,
        private renderer: Renderer,
        private singleCharacterService: SingleCharacterService,
        private storeUtil: StoreUtil,
        private route: ActivatedRoute,
        private pubSubService: PubSubService
    ) {
    }

    ngOnInit(): void {
        this.pubSubService.publish(PubSubService.TOPICS.NAVIGAION_TAB_CHANGE, 'Character');

        this.sub = this.route.params.subscribe(params => {
            let c = params['char'];
            if (!!c) {
                this.term = c;
            } else {
                this.term = this.storeUtil.cache.has(CharacterComponent.LAST_TERM_STORE_KEY) ? this.storeUtil.cache.get(CharacterComponent.LAST_TERM_STORE_KEY) : '好';
            }
            this.searchCharacter();
        });

        this.renderer.listen(this.viewGifImg.nativeElement, "load", (event) => {
            this.flagLockImg = true;
            if (this.viewGifImg.nativeElement.complete) {
                this.flagLockImg = false;
            }
        });

        this.renderer.listen(this.viewGifImg.nativeElement, "click", (event) => {
            if (!this.flagLockImg) {
                let c = document.createElement('canvas');
                let w = c.width = this.viewGifImg.nativeElement.width;
                let h = c.height = this.viewGifImg.nativeElement.height;
                c.getContext('2d').drawImage(this.viewGifImg.nativeElement, 0, 0, w, h);
                this.gifUrl = c.toDataURL("image/gif");

                this.flagLockImg = true;
                setTimeout(() => {
                    this.loadGifImg();
                    this.flagLockImg = false;
                }, 500);
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private loadGifImg() {
        this.gifUrl = !!this.term ? '/assets/gif/char/' + this.term.charAt(0) : '';
    }

    public searchCharacter() {
        if (this.term != null && this.term.trim() != '') {
            this.singleCharacterService.findByCharacter(this.term)
                .then(entity => {
                    this.char = entity;
                    this.loadGifImg();
                    this.storeUtil.cache.set(CharacterComponent.LAST_TERM_STORE_KEY, this.term);
                })
                .catch(err => {
                    this.popupService.showPopup("Search Character", err);
                });
        }
    }

    public enterSearch(keyCode: number) {
        if (keyCode == 13) {
            this.searchCharacter();
        }
    }

    prettyDefinition(s: string) {
        let html = '';
        if (s) {
            let ulOpen = false;
            let lines = s.split('\n')
                .filter(t => !!t && t.length > 0)
                .map(t => {
                    //add link for each Chinese character
                    let r = '';
                    for (let i = 0, n = t.length; i < n; i++) {
                        if (this.stringUtil.checkChineseCharacter(t.charAt(i))) {
                            r += `<a href="#/character/${t.charAt(i)}">${t.charAt(i)}</a>`;
                        } else {
                            r += t.charAt(i);
                        }
                    }
                    return r;
                });
            for (let i = 0, n = lines.length; i < n; i++) {
                if (/^\s+/.test(lines[i])) {
                    if (!ulOpen) {
                        html += '<ul>';
                        ulOpen = true;
                    }
                    html += `<li>${lines[i]}</li>`;
                } else {
                    if (ulOpen) {
                        html += '</ul>';
                        ulOpen = false;
                    }
                    html += `<p>${lines[i]}</p>`;
                }
            }
        }
        return html;
    }
}