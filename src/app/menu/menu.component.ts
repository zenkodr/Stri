import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  moduleId: module.id,
  
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dish: Dish; 
  dishErrMess: string; 
  dishes: Dish[];
  errMess: string;
  featured: Dish;

  constructor(private dishService: DishService,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any> errmess);
  }
  
}