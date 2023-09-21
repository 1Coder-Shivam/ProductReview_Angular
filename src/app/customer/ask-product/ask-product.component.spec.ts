import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskProductComponent } from './ask-product.component';

describe('AskProductComponent', () => {
  let component: AskProductComponent;
  let fixture: ComponentFixture<AskProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AskProductComponent]
    });
    fixture = TestBed.createComponent(AskProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
