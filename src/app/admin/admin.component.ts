import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getUsers()
      .snapshotChanges()
      .subscribe((data) => {
        this.users = [];
        data.forEach((element) => {
          const usr = element.payload.doc.data();
          usr.uid = element.payload.doc.id;
          this.users.push(usr);
        });
      });
  }

  deleteUser(uid: string) {
    this.userService.deleteUser(uid).catch((err) => console.log(err));
  }

  updateUser(uid: string) {
    alert(`Inserte aqui codigo para actualizar al usuario con el id: ${uid}`);
  }
}
