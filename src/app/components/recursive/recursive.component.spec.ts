import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveComponent } from './recursive.component';

describe('RecursiveComponent', () => {
  let component: RecursiveComponent;
  let fixture: ComponentFixture<RecursiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
