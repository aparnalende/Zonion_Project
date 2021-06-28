import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRestComponent } from './edit-rest.component';

describe('EditRestComponent', () => {
  let component: EditRestComponent;
  let fixture: ComponentFixture<EditRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
