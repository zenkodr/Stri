import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Switch } from 'tns-core-modules/ui/switch/switch';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { ReservationModalComponent } from '../reservationModal/reservationmodal.component';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application"; 
import { View, Page } from 'tns-core-modules/ui/page/page';
import { CouchbaseService } from '../services/couchbase.service';

@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html',
})
export class ReservationComponent implements OnInit {

    reservation: FormGroup;
    reservationForm: View;
    reservationInfoCard: View;
    reservationInfo;
    docId: string = "reservations";
    reservations: Array<any>;


    constructor(
        private formBuilder: FormBuilder, 
        private modalService: ModalDialogService, 
        private vcRef: ViewContainerRef, 
        private couchbaseService: CouchbaseService, 
        private page: Page) {

            this.reservation = this.formBuilder.group({
                guests: 3,
                smoking: false,
                dateTime: ['', Validators.required]
            });
    }

    ngOnInit() {

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservation.patchValue({ smoking: true });
        }
        else {
            this.reservation.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ guests: textField.text});
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ dateTime: textField.text});
    }

    createModalView(args) {

        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen: false
        };

        this.modalService.showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if (args === "guest") {
                    this.reservation.patchValue({guests: result});
                }
                else if (args === "date-time") {
                    this.reservation.patchValue({ dateTime: result});
                }
            });

    }

    onSubmit() {
        this.reservations =[];
        this.reservationForm = <View>this.page.getViewById<View>("reservationForm");
        this.reservationInfo = this.reservation.value;
        let doc = this.couchbaseService.getDocument(this.docId);
        if (doc == null) {
            this.couchbaseService.createDocument({ "reservations": [] }, this.docId);
        }
        doc = this.couchbaseService.getDocument(this.docId);
        console.log(JSON.stringify(doc));
        this.reservations = doc.reservations;
        this.reservations.push(this.reservationInfo);
        this.couchbaseService.updateDocument(this.docId, { "reservations": this.reservations });
        this.reservationForm.animate({
            duration: 500,
            opacity: 0,
            scale: { x: 0, y: 0 }
        }).then(() => {
            this.reservationInfoCard = <View>this.page.getViewById<View>("reservationInfo");
            this.reservationInfoCard.animate({
                duration: 500,
                opacity: 1,
                scale: { x: 1, y: 1 }
            })
        });
    }
}