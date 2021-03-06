import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application"; 
import * as Email from 'nativescript-email';
import * as Phone from 'nativescript-phone';

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

    sendEmail(){
        Email.available()
        .then((avail: boolean)=> {

            if(avail){
                Email.compose({
                    to: ['walid.bouguima@gmail.com'], 
                    subject: '[Service]: Transaction', 
                    body: 'Dear sir/madame'
                })
            }
            else{
                console.log('No email configured in this device');
            }
        })
    }

    callRestaurant() {
        Phone.dial("+21629799125", true)
    }
}