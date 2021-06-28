import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantServiceService } from 'src/app/services/restaurant-service.service';
import { Restourant } from '../Restourant';

@Component({
  selector: 'app-view-rest',
  templateUrl: './view-rest.component.html',
  styleUrls: ['./view-rest.component.css'],
})
export class ViewRestComponent implements OnInit {
  restaurant: Restourant | any;
  id: number = 0;
  url: any;
  imgUrl = 'http://localhost:8080/data';
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private restServ: RestaurantServiceService
  ) {}

  ngOnInit(): void {
    this.restaurant = new Restourant();
    this.id = this.router.snapshot.params['id'];
    console.log('I am in view rest ' + this.id);
    this.restServ.getRestoById(this.id).subscribe(
      (data) => {
        // console.log(data);
        this.restaurant = data;
        console.log(this.restaurant);
        this.url = `${this.imgUrl}/${this.restaurant.id}/${this.restaurant.filename}`;
        console.log('url----------------' + this.url);
      },
      (error) => console.log(error)
    );
  }
  back() {
    if (sessionStorage.getItem('username')) {
      this.route.navigate(['/admin/disprest']);
    } else {
      this.route.navigate(['']);
    }
  }
}
