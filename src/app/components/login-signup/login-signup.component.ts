import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent {
  signup = false
  isLoginOpen!: boolean;

  constructor(private authService: AuthService, private stateService: StateService) {
    this.stateService.isLoginOpen$.subscribe(isOpen => this.isLoginOpen = isOpen)
  }

  toggleLogin() {
    this.stateService.toggleLogin()
  }

  googleAuth() {
    const url = this.authService.googleAuthUrl()
    window.open(url, "_blank")
  }
}
