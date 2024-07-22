import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryQdataComponent } from './summary-qdata.component';

describe('SummaryQdataComponent', () => {
  let component: SummaryQdataComponent;
  let fixture: ComponentFixture<SummaryQdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryQdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryQdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
