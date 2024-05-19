import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})

export class LoginSignupComponent {
  isNewAccountSelected = false
  isLoginOpen!: boolean;
  accountForm: FormGroup;

  constructor(
    private authService: AuthService,
    private stateService: StateService,
    private fb: FormBuilder
  ) {
    this.stateService.isLoginOpen$.subscribe(isOpen => this.isLoginOpen = isOpen)
    this.accountForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]]
    })
  }

  signInSelect() {
    this.isNewAccountSelected = false

    document.getElementById("signIn-btn")?.classList.add("active")
    document.getElementById("newAccount-btn")?.classList.remove("active")
  }

  newAccountSelect() {
    this.isNewAccountSelected = true

    document.getElementById("newAccount-btn")?.classList.add("active")
    document.getElementById("signIn-btn")?.classList.remove("active")
  }

  toggleLogin() {
    this.stateService.toggleLogin()
  }

  googleAuth() {
    const url = this.authService.googleAuthUrl()
    window.open(url, "_blank")
  }

  createAccountSubmit() {
    if (this.accountForm.valid) {
      console.log("Nice", this.accountForm.value)
    }
  }
}
