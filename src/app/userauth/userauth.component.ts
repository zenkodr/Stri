import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { getString, setString } from "tns-core-modules/application-settings/application-settings";
import { Image } from 'tns-core-modules/ui/image';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as camera from 'nativescript-camera';
import * as app from "tns-core-modules/application";
import * as ImagePicker from "nativescript-imagepicker";

@Component({
    moduleId: module.id,
    templateUrl: './userauth.component.html'
})
export class UserAuthComponent implements OnInit {

    loginForm: FormGroup;
    registerForm: FormGroup;
    tabSelectedIndex: number = 0;

    constructor(private page: Page,
        private routerExtensions: RouterExtensions,
        private formBuilder: FormBuilder) {

        this.loginForm = this.formBuilder.group({
            userName: [getString('userName', ''), Validators.required],
            password: [getString('password', ''), Validators.required]
        });

        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userName: ['', Validators.required],
            password: ['', Validators.required],
            telnum: ['', Validators.required],
            email: ['', Validators.required]                
        });

    }

    ngOnInit() {

    }

    takePicture() {
        let isAvailable = camera.isAvailable();
        if (isAvailable) {
            camera.requestPermissions();
            var options = { width: 100, height: 100, keepAspectRatio: false, saveToGallery: true};

            camera.takePicture(options)
                .then((imageAsset) => {
                    let image = <Image>this.page.getViewById<Image>('myPicture');
                    image.src = imageAsset;
                })
                .catch((err) => console.log('Error -> ' + err.message));
        }

    }

    getFromLibrary() {

        let context = ImagePicker.create({
            mode: "single" // use multiple for multiple selections.
        }); 

        context.authorize()
               .then(()=> context.present())
               .then(pick => pick.forEach(imageFromGallery => {
                   let image = <Image>this.page.getViewById<Image>("myPicture"); 
                   image.src = imageFromGallery; 
               })); 
    }

    register() {
        this.tabSelectedIndex = 1;
    }

    onLoginSubmit() {
        console.log(JSON.stringify(this.loginForm.value));

        setString("userName", this.loginForm.get('userName').value);
        setString("password", this.loginForm.get('password').value);

        this.routerExtensions.navigate(["/home"], { clearHistory: true })
    }

    onRegisterSubmit() {
        console.log(JSON.stringify(this.registerForm.value));

        setString("userName", this.registerForm.get('userName').value);
        setString("password", this.registerForm.get('password').value);

        this.loginForm.patchValue({
            'userName': this.registerForm.get('userName').value,
            'password': this.registerForm.get('password').value});

            this.tabSelectedIndex = 0;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}