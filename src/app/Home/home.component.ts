//core imports
import { Component, OnInit, Inject } from "@angular/core";

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

    constructor(
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
}