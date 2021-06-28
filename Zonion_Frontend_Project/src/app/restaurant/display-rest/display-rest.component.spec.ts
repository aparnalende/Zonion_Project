import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRestComponent } from './display-rest.component';

describe('DisplayRestComponent', () => {
  let component: DisplayRestComponent;
  let fixture: ComponentFixture<DisplayRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayRestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
