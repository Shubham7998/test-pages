import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-qdata',
  templateUrl: './details-qdata.component.html',
  styleUrls: ['./details-qdata.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DetailsQdataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  activeIndex: number | null = null;

  toggleIndex(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  Options = [
    { value: 1, viewValue: 'Include' },
    { value: 2, viewValue: 'Exclude' },
    { value: 3, viewValue: 'Option' }

  ];
}

