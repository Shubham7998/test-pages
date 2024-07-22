import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsQdataComponent } from './details-qdata.component';

describe('DetailsQdataComponent', () => {
  let component: DetailsQdataComponent;
  let fixture: ComponentFixture<DetailsQdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsQdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsQdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
