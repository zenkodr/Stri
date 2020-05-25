import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
///

import { AppRoutingModule } from "./app-routing.module";

import { MenuComponent } from './menu/menu.component';
import { DishService } from './services/dish.service';
import { AppComponent } from "./app.component";
import { DishdetailComponent } from "./dishdetail/dishdetail.component";
import { ProcessHTTPMsgService } from './services/process-http.service';

import { baseURL } from './shared/baseurl';
import { HomeComponent } from "./Home/home.component";
import { PromotionService } from "./services/promotion.service";
import { LeaderService } from "./services/leader.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        HttpClientModule, 
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        MenuComponent,
        HomeComponent, 
        DishdetailComponent, 
    ],
    providers: [
        {provide: 'baseURL', useValue: baseURL},
        DishService,
        LeaderService, 
        PromotionService, 
        ProcessHTTPMsgService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
