import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestayrentDashComponent } from './restayrent-dash.component';

describe('RestayrentDashComponent', () => {
  let component: RestayrentDashComponent;
  let fixture: ComponentFixture<RestayrentDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestayrentDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestayrentDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
