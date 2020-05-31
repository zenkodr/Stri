import { Component, OnInit, ViewChild} from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { ListViewEventData } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/page/page";
import { confirm } from "tns-core-modules/ui/dialogs";
import { Toasty, ToastPosition, ToastDuration } from "nativescript-toasty";
///
import { Dish } from "../shared/dish";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { FavoriteService } from "../services/favorite.service";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application"; 

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

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    deleteFavorite(id: number){

        let options = {
            title : "Confirm Delete", 
            message: "Do you want to delete dish " + id, 
            okButtonText: 'Yes', 
            cancelButtonText: 'No', 
            neutralButtonText: 'Cancel'
        }; 

        confirm(options)
            .then((result: boolean) => {
                if(result) {
                    
                    this.favorites = null;

                    this.favoriteService.deleteFavorite(id)
                    .subscribe(favorites => {
                        const toast = new Toasty({ text: "Deleted Dish "+ id});
                        toast.setToastPosition(ToastPosition.BOTTOM); 
                        toast.setToastDuration(ToastDuration.SHORT)
                        toast.show();
                        this.favorites = new ObservableArray(favorites)
                    }, 
                    errmess => this.errMess = errmess); 
                }else{
                    console.log('Delete cancelled')
                }
            });
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