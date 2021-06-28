import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRestComponent } from './view-rest.component';

describe('ViewRestComponent', () => {
  let component: ViewRestComponent;
  let fixture: ComponentFixture<ViewRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
