import { Component, OnInit, ViewChild} from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

///
import { Dish } from "../shared/dish";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { FavoriteService } from "../services/favorite.service";
import { ListViewEventData } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/page/page";

@Component({
    selector: 'app-favorites', 
    templateUrl: './favorites.component.html', 
    styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit{

    favorites: ObservableArray<Dish>;
    errMess: string; 

    @ViewChild('myListView', {static: false}) listViewComponent: RadListViewComponent;

    constructor(
        private favoriteService: FavoriteService
        ){}

    ngOnInit(){

        this.favoriteService.getFavorites()
            .subscribe(favorites => this.favorites = new ObservableArray(favorites), 
            errmess => this.errMess = errmess); 
    }

    deleteFavorite(id: number){
        this.favoriteService.deleteFavorite(id)
             .subscribe(favorites =>this.favorites = new ObservableArray(favorites), 
             errmess => this.errMess = errmess); 
    }

    public onCellSwiping(args: ListViewEventData){

        var swipelimits = args.data.swipelimits; 
        var currentItemView = args.object; 
        var currentView; 

        if(args.data.x > 200){

        }
        else if (args.data.x < -200){

        }

    }
    public onSwipeCellStarted(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];

        var leftItem = swipeView.getViewById<View>('mark-view');
        var rightItem = swipeView.getViewById<View>('delete-view');
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth()/2;
    }

    public onSwipeCellFinished(args: ListViewEventData){

    }
    public onLeftSiwpeClick(args: ListViewEventData){
        console.log('Left swipe click'); 
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }
    public onRightSwipeClick(args: ListViewEventData){
        this.deleteFavorite(args.object.bindingContext.id); 
        this.listViewComponent.listView.notifySwipeToExecuteFinished(); 
    }
}