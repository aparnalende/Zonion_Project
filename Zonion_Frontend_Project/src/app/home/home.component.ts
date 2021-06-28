import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Restourant } from '../restaurant/Restourant';
import { RestaurantServiceService } from '../services/restaurant-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnChanges {
  restaurants: Observable<Restourant[]> | any;
  url = ''; // create url
  //
  restArr: Restourant[];
  p: number = 1;
  searchText: string; //searching filter

  constructor(
    private restServ: RestaurantServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurants = this.restServ.getAllResto();
    this.restaurants.subscribe((data: any) => {
      this.restArr = data;
      console.log('ng onint data reload method of home component:' + data);
    });
  }
  reloadData() {
    this.restaurants = this.restServ.getAllResto();
  }

  ngOnChanges() {
    this.reloadData();
  }

  goToView(id: number) {
    console.log('home eye click');
    this.router.navigate(['/viewrest', id]);
  }
}
