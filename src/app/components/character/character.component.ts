import { Component, OnInit, ElementRef, ViewChild, Renderer } from "@angular/core";

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
export class CharacterComponent implements OnInit {
    private static get LAST_TERM_STORE_KEY() {return 'LAST_TERM_STORE_KEY'};

    private term: string;
    private gifUrl: string;
    private flagLockImg: boolean = false;
    private flagCustomImg: boolean = false;

    private char: SingleCharacter;

    @ViewChild("gifImg") viewGifImg: ElementRef;

    constructor(private stringUtil: StringUtil,
        private popupService: PopupService,
        private renderer: Renderer,
        private singleCharacterService: SingleCharacterService,
        private storeUtil: StoreUtil
    ) {
        this.char = new SingleCharacter();
    }

    ngOnInit(): void {
        this.term = this.storeUtil.cache.get(CharacterComponent.LAST_TERM_STORE_KEY);
        if (!this.term) {
            this.term = '好';
        }
        this.searchCharacter();

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

    private loadGifImg() {
        this.gifUrl = this.char.sc ? '/assets/gif/char/' + this.char.sc : '';
        this.flagCustomImg = false;
    }

    private searchCharacter() {
        if (this.term != null && this.term.trim() != '') {
            this.singleCharacterService.findByCharacter(this.term + '')
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

    private enterSearch(keyCode: number) {
        if (keyCode == 13) {
            this.searchCharacter();
        }
    }

}