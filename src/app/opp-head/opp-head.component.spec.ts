import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OppHeadComponent } from './opp-head.component';

describe('OppHeadComponent', () => {
  let component: OppHeadComponent;
  let fixture: ComponentFixture<OppHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OppHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OppHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
