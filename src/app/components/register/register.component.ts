import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm!:UntypedFormGroup;
  RegexEmail:string="[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
  constructor(private title:Title,private router:Router,private authService:AuthService) { 
    title.setTitle("Register to Hire Freelancer or Find Jobs Online");
  }

  ngOnInit(): void {
    if(this.authService.isloggedUser())
    this.router.navigateByUrl('/')
    this.RegisterForm=new UntypedFormGroup({
      emailControl:new UntypedFormControl("",[Validators.required,Validators.pattern(this.RegexEmail)])
    })
  }
  get email(){
      return this.RegisterForm.get("emailControl")
  }
  onSubmit(){
      this.RegisterForm.markAllAsTouched();
      if(this.RegisterForm.valid)
        this.router.navigate(['/register/details'],{state:{data:this.email?.value}});
  }
}
