import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateHeroComponent } from './rate-hero.component';

describe('RateHeroComponent', () => {
  let component: RateHeroComponent;
  let fixture: ComponentFixture<RateHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
