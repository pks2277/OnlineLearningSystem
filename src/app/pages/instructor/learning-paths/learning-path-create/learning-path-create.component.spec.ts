import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPathCreateComponent } from './learning-path-create.component';

describe('LearningPathCreateComponent', () => {
  let component: LearningPathCreateComponent;
  let fixture: ComponentFixture<LearningPathCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningPathCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningPathCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
