import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LikedPage } from './liked.page';

describe('LikedPage', () => {
  let component: LikedPage;
  let fixture: ComponentFixture<LikedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LikedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
