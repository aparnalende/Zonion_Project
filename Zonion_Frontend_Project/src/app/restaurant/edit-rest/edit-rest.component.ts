import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantServiceService } from 'src/app/services/restaurant-service.service';
import { Restourant } from '../Restourant';
@Component({
  selector: 'app-edit-rest',
  templateUrl: './edit-rest.component.html',
  styleUrls: ['./edit-rest.component.css'],
})
export class EditRestComponent implements OnInit {
  id: number = 0;
  restaurant: Restourant | any;
  public restaurantForm: FormGroup | any;
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private restServ: RestaurantServiceService
  ) {}

  ngOnInit() {
    this.restaurantForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
        Validators.pattern('[a-zA-Z0-9]+'),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      phonenumber: new FormControl('', [
        Validators.required,
        Validators.pattern("[7-9]{1}[0-9]{9}")
      ]),
      opentime: new FormControl('', [Validators.required]),
      closetime: new FormControl('', [Validators.required]),
    });

    this.restaurant = new Restourant();
    this.id = this.router.snapshot.params['id'];
    this.restServ.getRestoById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.restaurant = data;
      },
      (error) => console.log(error)
    );
  }

  hasError = (controlName: string, errorName: string) => {
    return this.restaurantForm.controls[controlName].hasError(errorName);
  };

  updateRestaurant(restaurantForm:any) {
    console.log("I am in update method of edit restaurant")
    this.restServ.changeById(this.id, this.restaurant).subscribe(
      (data) => {
        console.log(data);
        this.restaurant = new Restourant();
        this.gotoList();
      },
      (error) => console.log(error)
    );
  }
  gotoList(){
    this.route.navigate(['/admin/disprest']);
  }
}
