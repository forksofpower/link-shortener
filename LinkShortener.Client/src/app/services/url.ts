import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:5162/api/shorten';

  shortenUrl(longUrl: string): Observable<{ shortCode: string }> {
    // pass longUrl as query param
    return this.http.post<{ shortCode: string }>(
      `${this.apiUrl}?longUrl=${encodeURIComponent(longUrl)}`,
      {}
    )
  }
}
