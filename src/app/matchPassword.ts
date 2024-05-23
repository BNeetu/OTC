import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatch(password: string, confirmPassword: string): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const passwordValue = form.get(password)?.value;
    const confirmPasswordValue = form.get(confirmPassword)?.value;

    if (passwordValue === confirmPasswordValue) {
      return null; 
    } else {
      return { passMisMatchError: true }; 
    }
  };
}
