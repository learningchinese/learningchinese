import { Component } from "@angular/core";
import { PopupService } from "../../services/popup.service";

@Component({
    selector: "popup",
    styles: ['show { display: block !important; }'],
    templateUrl: "./popup.component.html"
})
export class PopupComponent {
    constructor(public popupService: PopupService) { }
}