import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutsTableComponent } from './scouts-table.component';

describe('ScoutsTableComponent', () => {
  let component: ScoutsTableComponent;
  let fixture: ComponentFixture<ScoutsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoutsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
