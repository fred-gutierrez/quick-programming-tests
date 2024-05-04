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
    this.authService.googleAuth().subscribe({
      next: (url: string) => {
        window.open(url, "_self")
      },
      error: (error: any) => {
        console.error("Error opening Google Auth: ", error)
      }
    })

  }
}
