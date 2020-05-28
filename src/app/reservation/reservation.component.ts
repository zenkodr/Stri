import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Switch } from 'tns-core-modules/ui/switch/switch';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { ReservationModalComponent } from '../reservationModal/reservationmodal.component';

@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html',
})
export class ReservationComponent implements OnInit {

    reservation: FormGroup;

    constructor(
        private formBuilder: FormBuilder, 
        private modalService: ModalDialogService, 
        private vcRef: ViewContainerRef) {

            this.reservation = this.formBuilder.group({
                guests: 3,
                smoking: false,
                dateTime: ['', Validators.required]
            });
    }

    ngOnInit() {

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
        console.log(JSON.stringify(this.reservation.value));
        this.reservation.reset(); 
    }
}