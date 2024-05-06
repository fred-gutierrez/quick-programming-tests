import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  constructor(private authService: AuthService) { }

  googleAuth() {
    const url = this.authService.googleAuthUrl()
    window.open(url, "_blank")
  }
}
