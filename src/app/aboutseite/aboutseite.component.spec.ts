import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutseiteComponent } from './aboutseite.component';

describe('AboutseiteComponent', () => {
  let component: AboutseiteComponent;
  let fixture: ComponentFixture<AboutseiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutseiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutseiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
