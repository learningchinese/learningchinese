import { Component, OnInit } from "@angular/core";
import { PubSubService } from "../../services/pub-sub.service";

@Component({
    selector: "about-page",
    template: `
    About
    `,
    styleUrls: []
})
export class AboutComponent implements OnInit {

    constructor(private pubSubService: PubSubService) {
    }

    ngOnInit(): void {
        this.pubSubService.publish(PubSubService.TOPICS.NAVIGAION_TAB_CHANGE, 'About');
    }
}