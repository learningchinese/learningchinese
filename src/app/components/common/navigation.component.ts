import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AppConfig } from "../../configs/app.config";

import { AuthService }  from '../../services/auth.service';
import { PopupService }  from '../../services/popup.service';
import { fail } from "assert";

@Component({
    selector: "navigation",
    templateUrl: "./navigation.component.html",
    styleUrls: []})

export class NavigationComponent implements OnInit {
    menuItems: Object[];
    menuRightItems: Object[];
    currentTab: Object;
    
constructor(private appConfig: AppConfig, private authService: AuthService, private router: Router, private popupService: PopupService) {}
    
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
    }
    
    changeCurrentTab(menuItem: Object) {
        this.currentTab = menuItem;
    }

    isLoginEnable(): boolean {
        //return !this.authService.isAuthenticated();
        return false;
    }
    
    logout(): void {
        this.popupService.showPopup("Log Out", "Do you want to log out ?", () => {
            this.authService.logout().then(data => this.router.navigate(['/'])).catch(err => {
                console.log(err);
            });
            this.popupService.hide();
        }, () => this.popupService.hide());
    }
}