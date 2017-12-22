import {Directive, forwardRef} from '@angular/core';
import {FormControl, NG_VALIDATORS} from '@angular/forms';

@Directive({
  selector: '[validateNospace][ngModel],[validateNospace][formControl]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => NospaceValidator), multi: true}
  ]
})
export class NospaceValidator {
  validator: Function;

  constructor() {
    this.validator = (c: FormControl) => {
      let regexp = /^\S*$/;
      return regexp.test(c.value) ? null : {
          validateNospace: {
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
