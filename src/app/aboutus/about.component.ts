import { Component, OnInit } from "@angular/core";
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application"

@Component({
    selector: 'app-about', 
    moduleId: module.id, 
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    leaders: Leader[];
    errMess: string;
    constructor(
      private leaderService: LeaderService, 
      private RouterExtension: RouterExtensions) { }
    ngOnInit() {
      this.leaderService.getLeaders()
        .subscribe(leaders => this.leaders = leaders,
          errmess => this.errMess = <any> errmess);
    }  

    onDrawerButtonTap(): void {
      const sideDrawer = <RadSideDrawer>app.getRootView();
      sideDrawer.showDrawer();
  }
    goBack(){
      this.RouterExtension.back(); 
    }
  }
