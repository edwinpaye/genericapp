import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionDetailComponent } from './seccion-detail.component';

describe('SeccionDetailComponent', () => {
  let component: SeccionDetailComponent;
  let fixture: ComponentFixture<SeccionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
