import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-menu',
  moduleId: module.id,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;
  constructor(private dishService: DishService, private RE: RouterExtensions ) { }
  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any> errmess);
  }
  
  goBack(){
    this.RE.back(); 
  }
}