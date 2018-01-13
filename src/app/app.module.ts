import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, FormGroup, FormControl } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { routing } from "./app.routes";
import { AppComponent } from "./components/app.component";

import { NavigationComponent } from "./components/common/navigation.component";
import { DashBoardComponent } from "./components/common/dash-board.component";
import { AboutComponent } from "./components/about/about.component";
import { CharacterComponent } from "./components/character/character.component";

import { AppConfig } from "./configs/app.config";
import { PermissionDirective } from "./directives/permission.directive";

import { PopupComponent } from "./components/common/popup.component";
import { PopupService } from "./services/popup.service";

import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { SingleCharacterService } from "./services/single-character.service"

import { StringUtil } from "./utils/string.util";
import { StoreUtil } from "./utils/store.util";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    PermissionDirective,
    PopupComponent,
    DashBoardComponent,
    AboutComponent,
    CharacterComponent
  ],
  providers: [
    AppConfig,
    AuthService,
    StringUtil,
    PopupService,
    UserService,
    StoreUtil,
    SingleCharacterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}