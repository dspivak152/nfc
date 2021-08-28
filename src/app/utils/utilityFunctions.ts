import { AbstractControl } from '@angular/forms';

export function validateNumberPositive(control: AbstractControl): { [key: string]: any; } {
    if (Number(control.value) <= 0) {
        return { nonZero: true };
    } else {
        return null;
    }
}
