import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";

import { Pagination } from "../../models/pagination.model";

@Component({
    selector: "pagination",
    templateUrl: "./pagination.component.html"
})
export class PaginationComponent {
    @Input("pagination") pagination: Pagination;
    @Output("onSelectPage") onSelectPage: EventEmitter<void> = new EventEmitter<void>();
    @Output("onPrePagination") onPrePagination: EventEmitter<void> = new EventEmitter<void>();
    @Output("onNextPagination") onNextPagination: EventEmitter<void> = new EventEmitter<void>();

    invokeSelectPage(e): void {
        this.onSelectPage.next(e);
    }

    invokePrePagination(e): void {
        this.onPrePagination.next(e);
    }

    invokeNextPagination(e): void {
        this.onNextPagination.next(e);
    }
}