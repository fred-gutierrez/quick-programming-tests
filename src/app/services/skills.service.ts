import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor(private httpClient: HttpClient) { }

  // private baseUrl = 'http://localhost:3000';
  private baseUrl = 'https://quick-programming-tests-backend.onrender.com'

  getAllSkills(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/api/skills`);
  }
}
