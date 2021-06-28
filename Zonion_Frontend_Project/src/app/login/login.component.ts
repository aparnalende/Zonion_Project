import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  isInvalidLogin = false;

  constructor(
    private router: Router,
    private loginService: AuthenticationService
  ) {}

  ngOnInit(): void {}
pattern:string='';
  loginCheck() {
    if (this.loginService.authenticate(this.username, this.password)) {
      Swal.fire('success', '', 'success');
      this.router.navigate(['admin']);
      this.isInvalidLogin = false;
    } else {
      this.isInvalidLogin = true;
      Swal.fire('Enter valid credential', '', 'error');
    }
  }
}
