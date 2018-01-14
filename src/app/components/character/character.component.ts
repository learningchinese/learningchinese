import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute } from "@angular/router";

import { StoreUtil } from "../../utils/store.util"
import { StringUtil } from "../../utils/string.util";
import { PopupService } from "../../services/popup.service";
import { SingleCharacter } from "../../models/single-character.model"
import { SingleCharacterService } from "../../services/single-character.service"

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
    private flagCustomImg: boolean = false;
    private sub: Subscription;

    public char: SingleCharacter;

    @ViewChild("gifImg") viewGifImg: ElementRef;

    constructor(private stringUtil: StringUtil,
        private popupService: PopupService,
        private renderer: Renderer,
        private singleCharacterService: SingleCharacterService,
        private storeUtil: StoreUtil,
        private route: ActivatedRoute,
    ) {
        this.char = new SingleCharacter();
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.term = params['char'];
            if (!this.term) {
                this.term = this.storeUtil.cache.has(CharacterComponent.LAST_TERM_STORE_KEY) ? this.storeUtil.cache.get(CharacterComponent.LAST_TERM_STORE_KEY) : '好';
            }
            this.searchCharacter;
        });

        this.renderer.listen(this.viewGifImg.nativeElement, "load", (event) => {
            this.flagLockImg = true;
            if (this.viewGifImg.nativeElement.complete) {
                if (!this.flagCustomImg) {
                    setTimeout(() => {
                        let c = document.createElement('canvas');
                        let w = c.width = this.viewGifImg.nativeElement.width;
                        let h = c.height = this.viewGifImg.nativeElement.height;
                        c.getContext('2d').drawImage(this.viewGifImg.nativeElement, 0, 0, w, h);
                        this.gifUrl = c.toDataURL("image/gif");
                        this.flagCustomImg = true;
                        this.flagLockImg = false;
                    }, 4950);
                } else {
                    this.flagLockImg = false;
                }
            }
        });

        this.renderer.listen(this.viewGifImg.nativeElement, "click", (event) => {
            if (!this.flagLockImg) {
                this.loadGifImg();
            } else {
                this.popupService.showPopup('Locked', 'Locked');
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private loadGifImg() {
        this.gifUrl = this.char.sc ? '/assets/gif/char/' + this.char.sc : '';
        this.flagCustomImg = false;
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
            let lines = s.split('\n').filter(t => !!t && t.length > 0);
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