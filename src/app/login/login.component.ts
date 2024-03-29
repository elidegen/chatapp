import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  hide:boolean = false;
  loginForm: FormGroup

  constructor(private router: Router, private ms: MainService){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  navigateTo(path:string){
    this.hide = true;
    setTimeout(() => {
      this.router.navigate([path]);
    }, 300);
  }

  guestLogin(){
     this.ms.loader = true;
    
  }

  submit(){

  }


  //**************FORM CONTROL */
  isFormValid() {
    return this.loginForm.valid;
  }

  emailError(key:string){
    const field = this.getField(key);
    if (field) {
      return field.errors?.['email'] && this.dirtyTouched(field);
    }
  }

  getField(key:string){
    let myForm = this.loginForm;
    let field = myForm?.get(key);
    return field;
  }

  dirtyTouched(field:any){
    return (field.dirty ||
      field.touched);
  }

  isInvalid(key: string) {
    const field = this.getField(key);
    if (field) {
      return field.invalid &&
      this.dirtyTouched(field);
    } else {
      return false;
    }
  }


  isValidInput(key: string){
    const field = this.getField(key);
    if (field) {
      return !this.isInvalid(key) && field.valid;
    } else {
      return false;
    }
  }


  requiredErrors(key:string){
    const field = this.getField(key);
    if (field) {
      return field.errors?.['required'] && 
      this.dirtyTouched(field);
    } else {
      return false;
    }
  }


  minLengthError(key:string){
    const field = this.getField(key);
    if (field) {
      return field.errors?.['minlength'];
    } else {
      return false;
    }
  }


}
