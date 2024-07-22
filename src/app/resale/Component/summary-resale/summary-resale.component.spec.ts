import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryResaleComponent } from './summary-resale.component';

describe('SummaryResaleComponent', () => {
  let component: SummaryResaleComponent;
  let fixture: ComponentFixture<SummaryResaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryResaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryResaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
