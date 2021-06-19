import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksInProgressComponent } from './works-in-progress.component';

describe('WorksInProgressComponent', () => {
  let component: WorksInProgressComponent;
  let fixture: ComponentFixture<WorksInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksInProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
