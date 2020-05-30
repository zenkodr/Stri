import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'; 
import {RouterExtensions} from 'nativescript-angular/router'; 
import { switchMap } from 'rxjs/operators';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';
import { Toasty, ToastPosition, ToastDuration } from 'nativescript-toasty';
import { action } from 'tns-core-modules/ui/dialogs/dialogs';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { CommentComponent } from '../comment/comment.component';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

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
      private vcRef: ViewContainerRef,
      private modalService: ModalDialogService, 
      private http: HttpClient,
      @Inject('baseURL') private baseURL) { }
  
    ngOnInit() {
      this.route.params
      
        .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
        .subscribe(dish => {
          this.dish = dish
          this.favorite = this.favoriteService.isFavorite(this.dish.id); 
          console.log(Object.keys(this.dish.comments))
          //compute the average of ratings and render the number of comments
          this.numcomments =  this.dish.comments.length;           
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
    showDialog(): void {
      let options = {
          title: "Actions",
          message: "Select an Action",
          cancelButtonText: "Cancel",
          actions: ["Add to Favorites", "Add Comment"]
      };

      action(options).then((result) => {
          console.log(result);
          switch(result) {
              case "Add to Favorites":
                  this.addToFavorites();
                  break;
              case "Add Comment":
                  this.showCommentModalForm();
                  break;
          }
      });
  }

  showCommentModalForm(): void {
      let options: ModalDialogOptions = {
          viewContainerRef: this.vcRef,
          fullscreen: false
      };
      this.modalService.showModal(CommentComponent, options)
          .then((result: any) => {
              const d = new Date();
              const n = d.toISOString();
              this.comment = {
                  author: result.author,
                  comment: result.comment,
                  rating: result.rating,
                  date: n
              };
               this.http.post(baseURL + 'dishes/' + this.dish.id + '/comments.json', this.comment)
                .subscribe(res => {
                  console.log(Object.keys(res))
                })
                let total = 0;
                this.numcomments = this.dish.comments.length;
                this.dish.comments.forEach(comment => total += comment.rating);
                this.avgstars = (total/this.numcomments).toFixed(2);
               // this.dish.comments.push(this.comment);
               
              
          });
    }
  }
