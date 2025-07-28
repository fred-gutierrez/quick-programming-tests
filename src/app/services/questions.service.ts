import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private httpClient: HttpClient) { }

  // private apiUrl = 'http://localhost:3000/api';
  private apiUrl = 'https://quick-programming-tests-backend.onrender.com/api';

  getQuestionsBySkill(skill_id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/questions/${skill_id}`);
  }

  getQuestionsBySkillAndType(
    skill_id: string,
    type: string
  ): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.apiUrl}/questions/${skill_id}/${type}`
    );
  }
}
