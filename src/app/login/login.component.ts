import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from '../interfaces/login';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loggFail = false;
  userForm = new FormGroup<Login>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService
      .getUser(this.userForm.value.username)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().password === this.userForm.value.password) {
            const route = ['/', doc.data().rol];
            if (doc.data().rol !== 'admin') route.push(doc.data().username);
            this.router.navigate(route);
            this.loggFail = false;
            return;
          }
          this.loggFail = true;
        });
      })
      .catch((error) => console.log(error));
  }
}
