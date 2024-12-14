import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarativeComponent } from './declarative.component';

describe('DeclarativeComponent', () => {
  let component: DeclarativeComponent;
  let fixture: ComponentFixture<DeclarativeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeclarativeComponent]
    });
    fixture = TestBed.createComponent(DeclarativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
