import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RentalHomeComponent} from './rental-home.component';

describe('RentalHomeComponent', () => {
  let component: RentalHomeComponent;
  let fixture: ComponentFixture<RentalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentalHomeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
