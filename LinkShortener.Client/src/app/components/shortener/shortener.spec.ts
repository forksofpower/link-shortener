import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Shortener } from './shortener';
import { describe, it, expect, beforeEach, type Mock, vi } from 'vitest';
import {FormsModule} from '@angular/forms';
import {UrlService} from '../../services/url.service';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';


describe('Shortener Component', () => {
  let component: Shortener;
  let fixture: ComponentFixture<Shortener>;
  let mockUrlService: { shortenUrl: Mock };

  beforeEach(async () => {
    mockUrlService = {
      shortenUrl: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Shortener, FormsModule],
      providers: [
        { provide: UrlService, useValue: mockUrlService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Shortener);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call service when button is clicked', () => {
    // create mock return value
    mockUrlService.shortenUrl.mockReturnValue(of({ shortCode: 'abc1234' }));

    // type into the input
    const inputEl = getElementWithSelector(fixture, 'input');
    inputEl.value = 'https://wikipedia.org';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // click the button
    const buttonEl = getElementWithSelector(fixture, 'button');
    buttonEl.click();
    fixture.detectChanges();

    // assertions
    expect(mockUrlService.shortenUrl).toHaveBeenCalled();

    const linkEl = getElementWithSelector(fixture, 'a');
    expect(linkEl.textContent).toContain('abc1234');
  });
});

// helpers
function getElementWithSelector(cf: ComponentFixture<Shortener>, selector: string) {
  return cf.debugElement.query(By.css(selector)).nativeElement;
}
