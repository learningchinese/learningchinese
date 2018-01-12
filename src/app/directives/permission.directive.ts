import { Directive, ElementRef, OnInit, Input, Renderer } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Directive({
    selector: "[permission]"
})
export class PermissionDirective implements OnInit {
    @Input("permission") permission: string;
    constructor(private el: ElementRef, private renderer: Renderer, private authService: AuthService) { }

    ngOnInit(): void {
        if (this.authService.checkPermission(this.permission) === false) {
            // this.renderer.setElementStyle(this.el.nativeElement, "display", "none");
            let elem: HTMLElement = this.el.nativeElement;
            elem.parentNode.removeChild(elem);
        }
    }
}