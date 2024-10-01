import { Component, output } from '@angular/core';

@Component({
  selector: 'app-google-button',
  standalone: true,
  imports: [],
  templateUrl: './google-button.component.html',
  styles: ``
})
export class GoogleButtonComponent {
  signInWithGoogle = output<void>();
}
