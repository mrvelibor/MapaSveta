import {Pipe, PipeTransform} from '@angular/core';
import {UserRole} from '../models/user-role';

@Pipe({name: 'user_type'})
export class UserTypePipe implements PipeTransform {
  transform(value: UserRole, args: string[]): any {
    if (!value) {
      return '';
    }
    switch (value.roleId) {
      case 1:
        return 'admin';
      case 2:
        return 'profesor';
      case 3:
        return 'student';
    }
    return value;
  }
}
