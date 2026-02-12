import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CamelService } from './camel'; 

describe('CamelService', () => {
  let service: CamelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CamelService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    
    service = TestBed.inject(CamelService); 
  });

  it('legyen létrehozva a szerviz', () => {
    expect(service).toBeTruthy();
  });
});