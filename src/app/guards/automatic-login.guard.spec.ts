import { TestBed, async, inject } from '@angular/core/testing';

import { AutomaticLoginGuard } from './automatic-login.guard';

describe('AutomaticLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutomaticLoginGuard]
    });
  });

  it('should ...', inject([AutomaticLoginGuard], (guard: AutomaticLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
