import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsBannerContentComponent } from './news-banner-content.component';

describe('NewsBannerContentComponent', () => {
  let component: NewsBannerContentComponent;
  let fixture: ComponentFixture<NewsBannerContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsBannerContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsBannerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
