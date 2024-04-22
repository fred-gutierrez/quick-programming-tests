import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class SkillsService {
  httpClient = inject(HttpClient)
  baseUrl = 'http://localhost:3000/api/skills'

  getAll() {
    return firstValueFrom(
      this.httpClient.get<any[]>(this.baseUrl)
    )
  }
}
