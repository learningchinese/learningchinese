import { Component, OnInit } from "@angular/core";

import { PopupService } from "../../services/popup.service";
import { SingleCharacterService } from "../../services/single-character.service";
import { SingleCharacter } from "../../models/single-character.model";
import { Pagination } from "../../models/pagination.model";
import { StoreUtil } from "../../utils/store.util";

@Component({
    selector: "dashboard",
    templateUrl: "./dash-board.component.html",
    styleUrls: [],
})
export class DashBoardComponent implements OnInit {
    public characters: SingleCharacter[] = [];
    public pagination: Pagination;
    private total: number;
    private isPending: boolean;
    private page: number;

    constructor(
        private popupService: PopupService,
        private singleCharacterService: SingleCharacterService,
        private storeUtil: StoreUtil
    ) { }

    ngOnInit(): void {
        let page = this.storeUtil.cache.get('dash-board:page');
        this.page = page ? + page : 0;

        this.pagination = new Pagination();
        this.pagination.pageSize = 20;
        this.pagination.currentPage = -1;
        this.pagination.maxNumOfPages = 7;
        this.pagination.endPage = this.pagination.maxNumOfPages - 1;

        this.loadPage(this.page);
    }

    loadPage(page: number, forceLoad: boolean = false) {
        if (this.isPending) {
            return;
        }
        this.isPending = true;
        if (forceLoad === true || this.pagination.currentPage !== page) {
            this.singleCharacterService.findCommonCharacters(page, this.pagination.pageSize).then(hitList => {
                this.page = page;
                this.total = hitList.total;
                this.characters = hitList.hits;
                this.pagination.numOfPages = Math.floor(hitList.total / this.pagination.pageSize) + 1;
                if (this.pagination.numOfPages < this.pagination.maxNumOfPages) {
                    this.pagination.endPage = this.pagination.numOfPages - 1;
                }
                this.pagination.currentPage = page;
            }).catch(err => {
                console.log("Load common characters failed", err);
                this.popupService.showPopup('Load Data', 'Fail to load common characters.');
            }).then(() => this.isPending = false);
        }
    }

    detectPrePagination(e) {
        let p = this.pagination.detectPrePagination();
        if (p !== this.pagination) {
            this.pagination = p;
            this.loadPage(this.pagination.currentPage, true);
        }
    }

    detectNextPagination(e) {
        let p = this.pagination.detectNextPagination();
        if (p !== this.pagination) {
            this.pagination = p;
            this.loadPage(this.pagination.currentPage, true);
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
