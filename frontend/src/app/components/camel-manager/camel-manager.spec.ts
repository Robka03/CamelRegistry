import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamelManagerComponent } from './camel-manager';

describe('CamelManagerComponent', () => {
  let component: CamelManagerComponent;
  let fixture: ComponentFixture<CamelManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamelManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamelManagerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('a form legyen érvénytelen, ha a név üres', () => {
    component.camelForm.controls['name'].setValue('');
    expect(component.camelForm.controls['name'].valid).toBeFalsy();
  });

  it('a névnek legalább 2 karakternek kell lennie', () => {
    const nameControl = component.camelForm.controls['name'];
    nameControl.setValue('A');
    expect(nameControl.errors?.['minlength']).toBeTruthy();
  });


  it('a púpok száma csak 1 vagy 2 lehet', () => {
    const humpControl = component.camelForm.controls['humpCount'];
    humpControl.setValue(3); 
    expect(humpControl.valid).toBeFalsy();
    
    humpControl.setValue(2); 
    expect(humpControl.valid).toBeTruthy();
  });


});

