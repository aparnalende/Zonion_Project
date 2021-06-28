import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestaurantServiceService } from 'src/app/services/restaurant-service.service';
import { Restourant } from '../Restourant';

@Component({
  selector: 'app-display-rest',
  templateUrl: './display-rest.component.html',
  styleUrls: ['./display-rest.component.css'],
})
export class DisplayRestComponent implements OnInit, OnChanges {
  restaurants: Observable<Restourant[]> | any;
  restArr: Restourant[];
  p: number = 1;
  flag: boolean = false; //activate/deactivate
  searchText: string; //searching filter
  activate: boolean;
  constructor(
    private restoServ: RestaurantServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(' I am in display component  ngOninit method');
    this.reloadData();
    this.restaurants = this.restoServ.getAllResto();
    this.restaurants.subscribe((data: any) => {
      this.restArr = data;
      console.log('ng onint data reload method :' + data);
    });
  }
  reloadData() {
    this.restaurants = this.restoServ.getAllResto();
    this.restaurants.subscribe((data: any) => {
      this.restArr = data;
      console.log('ng onint data reload method :' + data);
    });
  }

  deleteResto(id: number) {
    this.restoServ.deleteById(id).subscribe(
      (data) => {
        this.reloadData();
      },
      (error) => console.log(error)
    );
    // this.reloadData();
  }

  updateResto(id: number) {
    this.router.navigate(['update', id]);
  }

  ngOnChanges() {
    console.log(' I am in changes...');
    this.reloadData();
  }

  editResto(id: number) {
    this.router.navigate(['/admin/editrest', id]);
  }

  viewResto(id: number) {
    this.router.navigate(['/viewrest', id]);
  }

  changeStatus(id: number) {
    console.log(' I am in change status methosd of display component');
    this.restoServ.setChangedStatus(id).subscribe((data) => {
      this.reloadData();
    });
  }
}
