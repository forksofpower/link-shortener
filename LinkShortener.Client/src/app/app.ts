import { Component, signal } from '@angular/core';
import {Shortener} from './components/shortener/shortener';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Shortener],
  template: `<app-shortener></app-shortener>`
})
export class App {
  protected readonly title = signal('LinkShortener.Client');
}
