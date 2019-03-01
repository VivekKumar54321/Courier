import { TestBed } from '@angular/core/testing';

import { CourierDataProviderService } from './courier-data-provider.service';

describe('CourierDataProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourierDataProviderService = TestBed.get(CourierDataProviderService);
    expect(service).toBeTruthy();
  });
});
