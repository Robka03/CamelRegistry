import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamelManager } from './camel-manager';

describe('CamelManager', () => {
  let component: CamelManager;
  let fixture: ComponentFixture<CamelManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamelManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamelManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
