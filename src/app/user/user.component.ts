import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
    rol: '',
    photoURL: '',
    uid: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['username']) {
      this.userService
        .getUser(params['username'])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.user = doc.data();
          });
        })
        .catch((error) => console.log(error));
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
