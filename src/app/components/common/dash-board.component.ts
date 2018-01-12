import { Component, OnInit, OnDestroy } from "@angular/core";

import { PopupService } from "../../services/popup.service";

@Component({
    selector: "dashboard",
    template: `
    Dash board
    `,
    styleUrls: []
})
export class DashBoardComponent implements OnInit, OnDestroy {

    constructor(private popupService: PopupService) {
    }

    ngOnInit(): void {

    }

    ngOnDestroy() {
    }
}