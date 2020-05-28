/* Imports */
import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

///

import { MenuComponent } from "./menu/menu.component";
import { DishdetailComponent } from "./dishdetail/dishdetail.component";
import { HomeComponent } from "./Home/home.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./aboutus/about.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { ReservationComponent } from "./reservation/reservation.component";



/*Start */
const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent }, 
    { path: "menu", component: MenuComponent }, 
    { path: "dishdetail/:id", component: DishdetailComponent }, 
    { path: "about", component: AboutComponent }, 
    { path: "favorites", component: FavoritesComponent }, 
    { path: "reservation", component: ReservationComponent }, 
    { path: "contact", component: ContactComponent }, 
]

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
