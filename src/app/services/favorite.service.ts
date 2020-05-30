import {Injectable} from '@angular/core'; 
import {Observable} from 'rxjs'; 
import {map} from 'rxjs/operators'

///
import {Dish} from '../shared/dish'; 
import {DishService} from '../services/dish.service'; 
import { CouchbaseService } from './couchbase.service';

@Injectable()
export class FavoriteService{

    favorites: Array<number>; 
    docId: string = "favorites"; 

    constructor(private dishService: DishService, private CouchbaseService: CouchbaseService) {
        this.favorites =[];

        let doc = this.CouchbaseService.getDocument(this.docId);
            if(doc == null) {
                this.CouchbaseService.createDocument({"favorites": []}, this.docId)
            }

            else {
                this.favorites =  doc.favorites; 
            }
    }
    isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id)
    }

    addFavorite (id: number): boolean{
        if(!this.isFavorite(id)){
            this.favorites.push(id); 
            this.CouchbaseService.updateDocument(this.docId, {"favorites": this.favorites});
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
            this.CouchbaseService.updateDocument(this.docId, {"favorites": this.favorites});
            return this.getFavorites(); 
        }
        else{
            return Observable.throw('You are trying to delete a non existing favorite')
        }
    }
}