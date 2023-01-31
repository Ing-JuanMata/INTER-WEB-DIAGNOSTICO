import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private store: AngularFirestore) {}

  getUsers() {
    return this.store.collection<User[]>('users');
  }

  getUser(username: string) {
    return this.store.collection<User>('users').ref.where('username', '==', username);
  }

  createUser(user: User) {
    return this.store.collection<User>('users').add(user);
  }

  updateUser(id: string, user: User) {
    return this.store.collection<User>('users').doc(id).update(user);
  }

  deleteUser(id: string) {
    return this.store.collection<User>('users').doc(id).delete();
  }
}
