import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutsAssignedOrdersComponent } from './scouts-assigned-orders.component';

describe('ScoutsAssignedOrdersComponent', () => {
  let component: ScoutsAssignedOrdersComponent;
  let fixture: ComponentFixture<ScoutsAssignedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoutsAssignedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutsAssignedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
