import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class AuthService {
  // private baseUrl = 'http://localhost:3000'
  private baseUrl = 'https://quick-programming-tests-backend.onrender.com'


  googleAuthUrl(): string {
    return `${this.baseUrl}/auth/google/callback`
  }
}
