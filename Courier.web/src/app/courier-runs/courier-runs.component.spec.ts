import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierRunsComponent } from './courier-runs.component';

describe('CourierRunsComponent', () => {
  let component: CourierRunsComponent;
  let fixture: ComponentFixture<CourierRunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierRunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
