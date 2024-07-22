import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QdataFormComponent } from './qdata-form.component';

describe('QdataFormComponent', () => {
  let component: QdataFormComponent;
  let fixture: ComponentFixture<QdataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QdataFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QdataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
