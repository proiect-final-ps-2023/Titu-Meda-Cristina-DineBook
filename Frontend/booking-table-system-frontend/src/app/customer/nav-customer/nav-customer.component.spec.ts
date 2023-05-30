import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCustomerComponent } from './nav-customer.component';

describe('NavCustomerComponent', () => {
  let component: NavCustomerComponent;
  let fixture: ComponentFixture<NavCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavCustomerComponent]
    });
    fixture = TestBed.createComponent(NavCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
