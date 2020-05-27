import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

///

import { AppRoutingModule } from "./app-routing.module";

import { DishService } from './services/dish.service';
import { ProcessHTTPMsgService } from './services/process-http.service';
///
import { baseURL } from './shared/baseurl';
import { AppComponent } from "./app.component";
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from "./dishdetail/dishdetail.component";
import { HomeComponent } from "./Home/home.component";
import { PromotionService } from "./services/promotion.service";
import { LeaderService } from "./services/leader.service";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./aboutus/about.component";
import { FavoriteService } from "./services/favorite.service";
import { FavoritesComponent } from "./favorites/favorites.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        HttpClientModule, 
        NativeScriptUISideDrawerModule, 
        NativeScriptUIListViewModule
    ],
    declarations: [
        AppComponent,
        MenuComponent,
        HomeComponent, 
        DishdetailComponent, 
        ContactComponent, 
        AboutComponent, 
        FavoritesComponent
    ],
    providers: [
        {provide: 'baseURL', useValue: baseURL},
        DishService,
        LeaderService, 
        PromotionService, 
        ProcessHTTPMsgService, 
        FavoriteService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
