import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserForm } from '../interfaces/user-form';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  userForm = new FormGroup<UserForm>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
    rol: new FormControl('user', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    photoURL: new FormControl('https://picsum.photos/200', {
      nonNullable: true,
    }),
  });

  constructor(private userService: UserService) {}

  onSubmit() {
    this.userService
      .createUser(this.userForm.value as User)
      .then(() => {
        alert('Usuario creado correctamente');
        this.userForm.reset();
      })
      .catch((error) => console.log(error));
  }
}
