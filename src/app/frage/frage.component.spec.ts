import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrageComponent } from './frage.component';

describe('FrageComponent', () => {
  let component: FrageComponent;
  let fixture: ComponentFixture<FrageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
