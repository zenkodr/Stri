import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application"; 

@Component({
    selector: 'app-contact', 
    moduleId: module.id,
    templateUrl: './contact.component.html', 
    styleUrls: ['./contact.component.css'] 
})

export class ContactComponent implements OnInit {
    constructor(private RE: RouterExtensions ) { }
    ngOnInit() {
    }  

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    goBack(){
        this.RE.back(); 
    }
}