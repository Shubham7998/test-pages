import { Injectable } from '@angular/core';
import { AbstractControl,ValidatorFn } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  constructor() { }



  validateName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formData = JSON.parse(localStorage.getItem('New Quotation') || '[]');
      const duplicateName = formData.some((item: any) => {
        return item.quotation_Details.QuotationName === control.value;
      });
  
      if (duplicateName) {
        return { duplicateName: true };
      } else {
        return null;
      }
    };
  }

    
  
  validatedata(control: AbstractControl): Promise<{ [key: string]: any } | null> {
    return new Promise(resolve => {
      const formData = JSON.parse(localStorage.getItem('New Quotation') || '[]');
      const duplicateName = formData.some((item: any) => {
        return item.quotation_Details.QuotationName === control.value;
      });

      if (duplicateName) {
        console.log("duplicateName: true");
        resolve({ duplicateName: true, message: 'Quotation name already exists' });
      } else {
        console.log("duplicateName: false");
        resolve(null);
      }
    });
  }
}




