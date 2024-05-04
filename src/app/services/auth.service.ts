import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class AuthService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://localhost:3000'

  googleAuth(): Observable<string> {
    return this.httpClient.get<string>(`${this.baseUrl}/auth/google/callback`)
  }
}
