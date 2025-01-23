import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionListComponent } from './seccion-list.component';

describe('SeccionListComponent', () => {
  let component: SeccionListComponent;
  let fixture: ComponentFixture<SeccionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
