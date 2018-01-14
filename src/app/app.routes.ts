import { Routes, RouterModule } from "@angular/router";

import { DashBoardComponent } from "./components/common/dash-board.component";
import { AboutComponent } from "./components/about/about.component";
import { CharacterComponent } from "./components/character/character.component";

const appRoutes: Routes = [
    {
        path: "",
        //redirectTo: "/dashboard",
        //pathMatch: "full"
        component: DashBoardComponent
    },
    {
        path: "home",
        component: DashBoardComponent
    },
    {
        path: "character",
        component: CharacterComponent
    },
    {
        path: "character/:char",
        component: CharacterComponent
    },
    {
        path: "about",
        component: AboutComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true }); // url path /#/path