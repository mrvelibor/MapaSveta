import {Directive, forwardRef} from '@angular/core';
import {FormControl, NG_VALIDATORS} from '@angular/forms';

@Directive({
  selector: '[validateIsObject][ngModel],[validateIsObject][formControl]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => IsObjectValidator), multi: true}
  ]
})
export class IsObjectValidator {
  validator: Function;

  constructor() {
    this.validator = (c: FormControl) => {
      return typeof c.value === 'object' ? null : {
        validateIsObject: {
          valid: false
        }
      };
    };
    ;
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}
