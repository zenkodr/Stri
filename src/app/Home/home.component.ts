//core imports
import { Component, OnInit, Inject } from "@angular/core";
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { Page } from "tns-core-modules/ui/page";
import { View } from "tns-core-modules/ui/core/view";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures";
import * as enums from "tns-core-modules/ui/enums";
//models
import { Dish } from "../shared/dish";
import { Promotion } from "../shared/promotion";
import { Leader } from "../shared/leader";

//services 
import { DishService } from "../services/dish.service";
import { PromotionService } from "../services/promotion.service";
import { LeaderService } from "../services/leader.service";

@Component({
    selector: 'app-home', 
    moduleId: module.id, 
    templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit{

    dish: Dish; 
    dishErrMess: string; 

    promotion: Promotion; 
    promoErrMess: string; 

    leader: Leader; 
    leaderErrMess: string; 

    showLeftCard: boolean = true;
    showMiddleCard: boolean = false;
    showRightCard: boolean = false;
    leftCard: View;
    middleCard: View;
    rightCard: View;

    constructor(
        private page: Page,
        private dishservice: DishService,
        private promoService: PromotionService, 
        private leaderService: LeaderService){}
        
    ngOnInit(){

        this.dishservice.getFeaturedDish()
            .subscribe(
                FeaturedDish => this.dish= FeaturedDish, 
                errmess => this.dishErrMess = <any>errmess); 
        this.promoService.getFeaturedPromotion()
            .subscribe(
                FeaturedPromo => this.promotion = FeaturedPromo, 
                errmess=> this.promoErrMess = <any>errmess); 
        this.leaderService.getFeaturedLeader()
            .subscribe(
                FeaturedLeader=> this.leader = FeaturedLeader, 
                errmess => this.leaderErrMess = <any>errmess
            ); 
    }

    onSwipe(args: SwipeGestureEventData) {

        if (args.direction === SwipeDirection.left) {
          this.animateLeft();
        }
        else if (args.direction === SwipeDirection.right) {
          this.animateRight();
        }
    }


    animateRight() {
        if (this.dish && this.promotion && this.leader) {
          this.leftCard = this.page.getViewById<View>('leftCard');
          this.middleCard  = this.page.getViewById<View>('middleCard');
          this.rightCard  = this.page.getViewById<View>('rightCard');
    
          if( this.showLeftCard ) {
            this.middleCard.animate({
              translate: { x: -2000, y: 0 },
              duration: 500
            })
            .then(() => {
              this.leftCard.animate({
                translate: { x: 2000, y: 0 },
                duration: 500,
                curve: enums.AnimationCurve.easeInOut
              })
              .then(() => {
                this.showLeftCard = false;
                this.showRightCard = true;
                this.rightCard.animate({
                  translate: { x: 0, y: 0 },
                  duration: 500,
                  curve: enums.AnimationCurve.easeInOut
                });
              });
            });
          }
          else if( this.showMiddleCard ) {
            this.rightCard.animate({
              translate: { x: -2000, y: 0 },
              duration: 500
            })
            .then(() => {
              this.middleCard.animate({
                translate: { x: 2000, y: 0 },
                duration: 500,
                curve: enums.AnimationCurve.easeInOut
              })
              .then(() => {
                this.showMiddleCard = false;
                this.showLeftCard = true;
                this.leftCard.animate({
                  translate: { x: 0, y: 0 },
                  duration: 500,
                  curve: enums.AnimationCurve.easeInOut
                });
              });
            });
          }
          else if( this.showRightCard ) {
            this.leftCard.animate({
              translate: { x: -2000, y: 0 },
              duration: 500
            })
            .then(() => {
              this.rightCard.animate({
                translate: { x: 2000, y: 0 },
                duration: 500,
                curve: enums.AnimationCurve.easeInOut
              })
              .then(() => {
                this.showRightCard = false;
                this.showMiddleCard = true;
                this.middleCard.animate({
                  translate: { x: 0, y: 0 },
                  duration: 500
                });
              });
            });
          }
        }
      }

    animateLeft(){

        if(this.dish && this.promotion && this.leader){
            this.leftCard = this.page.getViewById<View>('leftCard');
            this.middleCard = this.page.getViewById<View>('middleCard');
            this.rightCard = this.page.getViewById<View>('rightCard');

            if(this.showLeftCard){
               this.rightCard.animate({
                   translate: {x: 2000, y: 0}
               })
               .then(()=> {
                   this.leftCard.animate({
                       translate: {x: -2000, y: 0},
                       duration: 500, 
                       curve: enums.AnimationCurve.easeInOut
                   })
                   .then(()=> {
                       this.showLeftCard = false; 
                       this.showMiddleCard = true; 
                       this.middleCard.animate({
                           translate: {x: 0, y: 0},
                           duration: 500, 
                           curve: enums.AnimationCurve.easeInOut
                       })
                   })
               })
            }
            else if (this.showMiddleCard) {
                this.leftCard.animate({
                    translate: { x: 2000, y: 0 },
                    duration: 500
                  })
                  .then(() => {
                    this.middleCard.animate({
                      translate: { x: -2000, y: 0 },
                      duration: 500,
                      curve: enums.AnimationCurve.easeInOut
                    })
                    .then(() => {
                      this.showMiddleCard = false;
                      this.showRightCard = true;
                      this.rightCard.animate({
                        translate: { x: 0, y: 0 },
                        duration: 500,
                        curve: enums.AnimationCurve.easeInOut
                      });
                    });
                  });
            }
            else if(this.showRightCard){
                this.middleCard.animate({
                    translate: { x: 2000, y: 0 },
                    duration: 500
                  })
                  .then(() => {
                    this.rightCard.animate({
                      translate: { x: -2000, y: 0 },
                      duration: 500,
                      curve: enums.AnimationCurve.easeInOut
                    })
                    .then(() => {
                      this.showRightCard = false;
                      this.showLeftCard = true;
                      this.leftCard.animate({
                        translate: { x: 0, y: 0 },
                        duration: 500
                      });
                    });
                });
            }
        }
    }
    
}

