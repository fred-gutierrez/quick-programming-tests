import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})

export class AuthComponent {
  isNewAccountSelected = false
  isLoginOpen!: boolean;
  accountForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {
    this.stateService.isLoginOpen$.subscribe(isOpen => this.isLoginOpen = isOpen)

    this.accountForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]]
    })
  }

  // UI
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

  toggleLoginWindow() {
    this.stateService.toggleLoginWindow()
  }

  // Auth
  googleAuth() {
    const url = this.authService.googleAuthUrl()
    window.open(url, "_blank")
  }

  newAccountSubmit() {
    console.log("Nice", this.accountForm.value)
  }
}
