import { Component, OnInit, Inject } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'; 
import {RouterExtensions} from 'nativescript-angular/router'; 
import { switchMap } from 'rxjs/operators';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';
import { Toasty, ToastPosition, ToastDuration } from 'nativescript-toasty';

@Component({
    selector: 'app-dishdetail',
    moduleId: module.id,
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.css']
  })
  export class DishdetailComponent implements OnInit {
  
    dish: Dish;
    id: number;
    comment: Comment;
    errMess: string;
    avgstars: string; 
    numcomments: number; 
    favorite: boolean;  

    constructor(private dishservice: DishService,
      private route: ActivatedRoute,
      private routerExtensions: RouterExtensions,
      private favoriteService: FavoriteService, 
      @Inject('baseURL') private baseURL) { }
  
    ngOnInit() {
      this.route.params
        .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
        .subscribe(dish => {
          this.dish = dish
          this.favorite = this.favoriteService.isFavorite(this.dish.id); 
          
          //compute the average of the comments
          this.numcomments = this.dish.comments.length;           
          let total =0; 
          this.dish.comments.forEach(comment =>total += comment.rating); 
          this.avgstars = (total/this.numcomments).toFixed(2); 
             },
            errmess => this.errMess = <any>errmess); 
          }

          addToFavorites(){
            if(!this.favorite){
              this.favorite  = this.favoriteService.addFavorite(this.dish.id);

              const toast = new Toasty({text: 'Added dish ' + this.dish.id}); 
              toast.setToastPosition(ToastPosition.CENTER); 
              toast.setToastDuration(ToastDuration.LONG); 
              toast.show();  
              
            }
          }
          
    goBack(): void {
      this.routerExtensions.back();
    }
  }
