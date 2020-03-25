import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScoutsComponent } from './add-scouts.component';

describe('AddScoutsComponent', () => {
  let component: AddScoutsComponent;
  let fixture: ComponentFixture<AddScoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
