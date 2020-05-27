import {Injectable} from '@angular/core'; 
import {Observable} from 'rxjs'; 
import {map} from 'rxjs/operators'

///
import {Dish} from '../shared/dish'; 
import {DishService} from '../services/dish.service'; 

@Injectable()
export class FavoriteService{

    favorites: Array<number>; 

    constructor(private dishService: DishService) {
        this.favorites =[];
    }
    isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id)
    }

    addFavorite (id: number): boolean{
        if(!this.isFavorite(id)){
            this.favorites.push(id)
        }
        return true; 
    }

    getFavorites(): Observable<Dish[]>{
        return this.dishService.getDishes()
            .pipe(map(dishes => dishes.filter(dish =>this.favorites.some(el => el ===dish.id)))); 
    }

    deleteFavorite(id: number): Observable<Dish[]>{
        let index =this.favorites.indexOf(id); 
        if(index >= 0){
            this.favorites.splice(index, 1); 
            return this.getFavorites(); 
        }
        else{
            return Observable.throw('You are trying to delete a non existing favorite')
        }
    }
}