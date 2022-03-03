import {FormGroup, ValidationErrors} from '@angular/forms';

export interface IFormError {
  control: string;
  error: string;
  value: any;
}

export function getFormValidationErrors(form: FormGroup) {
  const result: any[] = [];

  Object.keys(form.controls).forEach(key => {
    const formProperty = form.get(key);
    if (formProperty instanceof FormGroup) {
      result.push(...getFormValidationErrors(formProperty))
    }

    // @ts-ignore
    const controlErrors: ValidationErrors = formProperty.errors;

    if (controlErrors) {
      Object.keys(controlErrors).forEach(keyError => {
        result.push({
          'control': key,
          'error': keyError,
          'value': controlErrors[keyError]
        });
      });
    }
  });

  return result;
}
