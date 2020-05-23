import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { HttpClientModule } from "@angular/common/http";

///

import { AppRoutingModule } from "./app-routing.module";

import { MenuComponent } from './menu/menu.component';
import { DishService } from './services/dish.service';
import { ProcessHTTPMsgService } from './services/process-http.service';

import { baseURL } from './shared/baseurl';
import { AppComponent } from "./app.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        MenuComponent
    ],
    providers: [
        {provide: 'baseURL', useValue: baseURL},
        DishService,
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
