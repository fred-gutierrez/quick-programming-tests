import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  isLoginOpen!: boolean;

  constructor(private stateService: StateService) {
    this.stateService.isLoginOpen$.subscribe(isOpen => this.isLoginOpen = isOpen)
  }

  toggleLoginWindow() {
    this.stateService.toggleLoginWindow()
  }
}
