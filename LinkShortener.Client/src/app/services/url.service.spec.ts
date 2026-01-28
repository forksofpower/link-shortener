import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

describe('UrlService', () => {
  let service: UrlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UrlService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UrlService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensure no open requests remain
  });

  it('should send a POST request to shorten a URL', () => {
    const testUrl = 'https://google.com';
    const mockResponse = { shortCode: 'abc1234' };

    // call the service method
    service.shortenUrl(testUrl).subscribe(response => {
      expect(response.shortCode).toEqual(mockResponse.shortCode);
    })

    // assert: HTTP post request should have been made
    const req = httpMock.expectOne( req => req.url.includes('/api/shorten'));
    expect(req.request.method).toBe('POST');

    // simulate backend reply
    req.flush(mockResponse);
  });
});
