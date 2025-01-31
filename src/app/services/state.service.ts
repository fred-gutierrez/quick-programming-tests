import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StateService {
  private isLoginOpenSubject = new BehaviorSubject<boolean>(false)
  isLoginOpen$ = this.isLoginOpenSubject.asObservable()

  constructor() { }

  toggleLoginWindow() {
    const currentState = this.isLoginOpenSubject.getValue();
    this.isLoginOpenSubject.next(!currentState)
  }
}
