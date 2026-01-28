import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../services/url';

@Component({
  selector: 'app-shortener',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Yet Another Link Shortener</h1>

      <div class="input-group">
        <input
          [ngModel]="longUrl()"
          (ngModelChange)="longUrl.set($event)"
          type="url"
          class="url-input"
          placeholder="Paste URL..."
        />

        <button (click)="onShorten()" class="btn">Shorten</button>
      </div>

      @if (shortUrl()) {
        <div class="result" >
          <a [href]="shortUrl()" target="_blank">{{ shortUrl() }}</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 2rem auto;
      font-family: sans-serif;
    }
    .input-group {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .url-input {
      flex: 1;
      padding: 10px;
    }
    .btn {
      padding: 10px 20px;
      cursor: pointer;
    }
  `]
})
export class Shortener {
  private urlService = inject(UrlService);

  longUrl = signal('')
  shortUrl = signal('');
  private apiBase = 'http://localhost:5162/';

  onShorten() {
    if (!this.longUrl()) return;

    this.urlService.shortenUrl(this.longUrl()).subscribe({
      next: (res) => this.shortUrl.set(this.apiBase + res.shortCode)
    })
  }
}
