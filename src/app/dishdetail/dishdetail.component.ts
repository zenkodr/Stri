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
import { Page } from 'tns-core-modules/ui/page/page';
import { Animation, AnimationDefinition } from "tns-core-modules/ui/animation";
import { View, Color } from "tns-core-modules/ui/core/view";
import { SwipeGestureEventData, SwipeDirection } from 'tns-core-modules/ui/gestures/gestures';
import * as enums from "tns-core-modules/ui/enums";

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

    showComments: boolean = false;

    cardImage: View;
    commentList: View;
    cardLayout: View;

    constructor(private dishservice: DishService,
      private route: ActivatedRoute,
      private routerExtensions: RouterExtensions,
      private favoriteService: FavoriteService, 
      private vcRef: ViewContainerRef,
      private modalService: ModalDialogService, 
      private http: HttpClient,
      private page: Page, 
      @Inject('baseURL') private baseURL) { }
  
    ngOnInit() {
      this.route.params
        .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
        .subscribe(dish => {
          this.dish = dish
          this.favorite = this.favoriteService.isFavorite(this.dish.id); 
          
            //compute the average of the comments and the render the length of the array
            const commentIds  = Object.keys(this.dish.comments);
            this.numcomments =  commentIds.length;           
            let total = 0; 
            commentIds.forEach(commentId => total += this.dish.comments[commentId].rating); 
            this.avgstars = (total/this.numcomments).toFixed(2) || null;
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
               .subscribe(() => {
                this.favorite = this.favoriteService.isFavorite(this.dish.id); 
                
                  //compute the average of the comments and the render the length of the array
                  const commentIds  = Object.keys(this.dish.comments);
                  this.numcomments =  commentIds.length;           
                  let total = 0; 
                  commentIds.forEach(commentId => total += this.dish.comments[commentId].rating); 
                  this.avgstars = (total/this.numcomments).toFixed(2) || null;
                   },
                  errmess => this.errMess = <any>errmess); 
             
          });
    }

    onSwipe(args: SwipeGestureEventData) {

      if (this.dish) {
        this.cardImage = <View>this.page.getViewById<View>("cardImage");
        this.cardLayout = <View>this.page.getViewById<View>("cardLayout");
        this.commentList = <View>this.page.getViewById<View>("commentList");
  
        if (args.direction === SwipeDirection.up && !this.showComments ) {
          this.animateUp();
        }
        else if (args.direction === SwipeDirection.down && this.showComments ) {
          this.showComments = false;
          this.animateDown();
        }
      }
  
    }

    showAndHideComments() {
      this.cardImage = <View>this.page.getViewById<View>("cardImage");
      this.cardLayout = <View>this.page.getViewById<View>("cardLayout");
      this.commentList = <View>this.page.getViewById<View>("commentList");

      if (!this.showComments ) {
        this.animateUp();
      }
      else if (this.showComments ) {
        this.showComments = false;
        this.animateDown();
      }
  }

  animateUp() {
    let definitions = new Array<AnimationDefinition>();
    let a1: AnimationDefinition = {
        target: this.cardImage,
        scale: { x: 1, y: 0 },
        translate: { x: 0, y: -200 },
        opacity: 0,
        duration: 500,
        curve: enums.AnimationCurve.easeIn
    };
    definitions.push(a1);

    let a2: AnimationDefinition = {
        target: this.cardLayout,
        backgroundColor: new Color("#ffc107"),
        duration: 500,
        curve: enums.AnimationCurve.easeIn
    };
    definitions.push(a2);

    let animationSet = new Animation(definitions);

    animationSet.play().then(() => {
      this.showComments = true;
    })
    .catch((e) => {
        console.log(e.message);
    });
  } 

  animateDown() {
    let definitions = new Array<AnimationDefinition>();
    let a1: AnimationDefinition = {
        target: this.cardImage,
        scale: { x: 1, y: 1 },
        translate: { x: 0, y: 0 },
        opacity: 1,
        duration: 500,
        curve: enums.AnimationCurve.easeIn
    };
    definitions.push(a1);

    let a2: AnimationDefinition = {
        target: this.cardLayout,
        backgroundColor: new Color("#ffffff"),
        duration: 500,
        curve: enums.AnimationCurve.easeIn
    };
    definitions.push(a2);

    let animationSet = new Animation(definitions);

    animationSet.play().then(() => {
    })
    .catch((e) => {
        console.log(e.message);
    });
  } 
  
  }
