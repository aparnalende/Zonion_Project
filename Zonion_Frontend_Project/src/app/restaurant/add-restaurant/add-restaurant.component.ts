import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Restourant } from '../Restourant';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RestaurantServiceService } from 'src/app/services/restaurant-service.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css'],
})
export class AddRestaurantComponent {
  Restourant = {
    name: '',
    address: '',
    phonenumber: '',
    opentime: '',
    closetime: '',
    flag: '',
  };

  list: Restourant[] = [];
  file: any;
  restData: any;

  public restaurantForm: FormGroup | any;
  constructor(
    private location: Location,
    private router: Router,
    private restoServ: RestaurantServiceService
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
        Validators.pattern('[7-9]{1}[0-9]{9}'),
      ]),
      opentime: new FormControl('', [Validators.required]),
      closetime: new FormControl('', [Validators.required]),
    });
  }

  onCancel() {
    this.location.back();
  }

  hasError = (controlName: string, errorName: string) => {
    return this.restaurantForm.controls[controlName].hasError(errorName);
  };

  addRestaurant(restaurantForm: FormGroup) {
    // Swal.fire('success', '', 'success');
    this.restoServ.postResto(this.Restourant).subscribe(
      (data) => {
        console.log(data);
        this.restData = data;
        // Swal.fire('Restourant', 'Add restaurant in list', 'success');
      },
      (error) => {
        Swal.fire('Fali', '', 'error');
      }
    );
    // this.router.navigate(['/admin/disprest']);
    // console.log(restaurantForm);
  }

  //upload image method

  uploadFile() {
    console.log('I am in upload' + this.file);
    console.log(this.restData.id);
    this.restoServ.addImageInResto(this.file, this.restData.id).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Restourant', 'Restaurant added successfully!!!', 'success');
        this.router.navigate(['/admin/disprest']);
      },
      (error: any) => console.log(error)
    );
  }
  onFileChangeEvent(file: any) {
    this.file = file;
    console.log('file change event=', this.file);
  }
}
