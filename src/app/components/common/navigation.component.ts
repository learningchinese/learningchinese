import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { AppConfig } from "../../configs/app.config";

import { AuthService } from '../../services/auth.service';
import { PopupService } from '../../services/popup.service';
import { PubSubService } from "../../services/pub-sub.service";

@Component({
    selector: "navigation",
    templateUrl: "./navigation.component.html",
    styleUrls: []
})
export class NavigationComponent implements OnInit, OnDestroy {
    menuItems: Object[];
    menuRightItems: Object[];
    currentTab: Object;
    private onChangeMenuTab: Function;

    constructor(
        private appConfig: AppConfig,
        private authService: AuthService,
        private router: Router,
        private popupService: PopupService,
        private pubSubService: PubSubService
    ) { }

    ngOnInit(): void {
        this.menuItems = [
            {
                title: "Home",
                path: "/",
                permission: this.appConfig.permissions.LOGIN
            },
            {
                title: "Character",
                path: "/character",
                permission: this.appConfig.permissions.LOGIN
            },
            {
                title: "About",
                path: "/about",
                permission: this.appConfig.permissions.LOGIN
            }
        ];
        this.menuRightItems = [
            {
                title: "Login",
                path: "/login",
                permission: this.appConfig.permissions.LOGIN
            },
            {
                title: "Change Password",
                path: "/profile/change-password",
                permission: this.appConfig.permissions.LOGIN
            }
        ];
        this.currentTab = this.menuItems[0];

        this.onChangeMenuTab = (args) => {
            let tab;
            if (args && args.length > 0) {
                tab = args[0];
            }
            if (typeof tab === 'number') {
                if (tab < this.menuItems.length) {
                    this.currentTab = this.menuItems[tab];
                }
            } if (typeof tab === 'string') {
                let cur = this.menuItems.find(t => t['title'] === tab || t['path'] === tab);
                if (!!cur) {
                    this.currentTab = cur;
                }
            } else {
                console.warn(`Can't set tab navigation to ${tab}`);
            }
        };
        this.pubSubService.subcribe(PubSubService.TOPICS.NAVIGAION_TAB_CHANGE, this.onChangeMenuTab);
    }

    changeCurrentTab(menuItem: Object) {
        this.currentTab = menuItem;
    }

    isRightMenuEnable(): boolean {
        return false;
    }

    isLoggedIn(): boolean {
        return !this.authService.isAuthenticated();
    }

    logout(): void {
        this.popupService.showPopup("Log Out", "Do you want to log out ?", () => {
            this.authService.logout().then(data => this.router.navigate(['/'])).catch(err => {
                console.log(err);
            });
            this.popupService.hide();
        }, () => this.popupService.hide());
    }

    ngOnDestroy(): void {
        this.pubSubService.unsubcribe(PubSubService.TOPICS.NAVIGAION_TAB_CHANGE, this.onChangeMenuTab);
    }
}