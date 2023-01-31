import { FormControl } from '@angular/forms';

export interface UserForm {
  photoURL: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
  rol: FormControl<string>;
}
