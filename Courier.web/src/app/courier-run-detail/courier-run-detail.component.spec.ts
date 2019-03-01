import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierRunDetailComponent } from './courier-run-detail.component';

describe('CourierRunDetailComponent', () => {
  let component: CourierRunDetailComponent;
  let fixture: ComponentFixture<CourierRunDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierRunDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierRunDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
