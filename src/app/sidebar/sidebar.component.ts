import {  Component, OnInit } from '@angular/core';
import { ResaleService } from '../services/resale-service.service';
import { List } from '../list';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  opportunityID?: string;
  formData: any[] = [];
  publishData: any[] = [];
  changeDetect: boolean = false;
  addChangeDetect: boolean = false;

  activeOpportunityIndex: number | null = null;
  activeQdataIndex: number | null = null;

  activeResaleIndex: number | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private resaleService: ResaleService,
    private router: Router
  ) {}

  QuotationFormData: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.opportunityID = params['opportunityID'];
    });

    this.loadData();

    this.resaleService.addData.subscribe((res: any) => {
      this.changeDetect = res;
      console.log('changedata', this.changeDetect);
      if (this.changeDetect) {
        console.log('addData sidebar');
        this.loadData();
      }
    });
   
    this.setActiveAccordion();
  }

  loadData() {
    setTimeout(() => {
      this.formData = JSON.parse(localStorage.getItem('New Quotation') || '[]');
      this.publishData = this.formData?.filter(
        (item) => item.OperationType === 'Publish'
      );
      console.log('publishData', this.publishData);
    }, 100);
  }



  toggleOpportunity(index: number) {
    this.activeOpportunityIndex =
      this.activeOpportunityIndex === index ? null : index;
  }
  toggleResaleIndex(index: number) {
    this.activeResaleIndex = this.activeResaleIndex === index ? null : index;
  }
  toggleQdataIndex(index: number) {
    this.activeQdataIndex = this.activeQdataIndex === index ? null : index;
  }

   setActiveAccordion() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('/opportunity/')) {
      this.activeOpportunityIndex = 0;
    } else if (currentRoute.includes('/resale/')) {
      this.activeResaleIndex = 0;
    }
  }
}
