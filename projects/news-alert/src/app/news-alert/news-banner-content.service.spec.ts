import { TestBed } from '@angular/core/testing';

import { NewsBannerContentService } from './news-banner-content.service';

describe('NewsBannerContentService', () => {
  let service: NewsBannerContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsBannerContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
