

import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { successAlert } from '../../../Helpers/Swirl/Swirl'; 
// import { ResaleService } from 'src/app/services/resale-service.service';
import { ResaleService } from '../../../services/resale-service.service';


interface ListItem {
  id: number;
  status: string;
}

@Component({
  selector: 'app-summary-resale',
  templateUrl: './summary-resale.component.html',
  styleUrls: ['./summary-resale.component.scss']
})
export class SummaryResaleComponent implements OnInit {
  // @Input('formData') formData: any[];

  displayedColumns: string[] = [
    'Quotation Name',
    'Item Count',
    'Total Excepted Cost',
    'Total List Price',
    'Total Net Price',
  ];

  summary: any;
  formData: any = [];
  // dlist: number[] = [];
  dlist: any[] = [];
  publicEditFlag: boolean = false;
  draftEditFlag: boolean = false;
  draftCount = 0;
  publishCount = 0;
  tempDelete: boolean = false;
  isClicked = false;

  constructor(private http: HttpClient, private resaleService: ResaleService) {}

  deleteRowDataLine(id: number, status: string): boolean {
    // console.log("this.dlist", this.dlist)
    // console.log("Id ", id);
    // console.log("status",status);
    // let index = this.dlist.findIndex((data: any) => data.id === id && data.status === status);
    const index = this.dlist.findIndex(
      (data: any) => data.id == id && data.status == status
    );

   // console.log('Index', index);J
    let deleteFlag = false;
    for (let i = 0; i < this.dlist.length; i++) {
      if (this.dlist[i].id === Number(id) && this.dlist[i].status === status) {
        deleteFlag = true;
      }
    }
   // console.log('delete', deleteFlag, id, status);

    return deleteFlag;
  }

  // deleteRowDataLine(id: number, status: string): boolean {
  //   console.log("this.dlist", this.dlist);
  //   console.log("Id", id);
  //   console.log("Status", status);

  //   // Find the index of the item with the given id and status
  //   const index = this.dlist.findIndex((data: ListItem) => data.id === id && data.status === status);
  //   console.log("Index", index);

  //   // If the item exists, return true
  //   if (index !== -1) {
  //     return true;
  //   }

  //   // Otherwise, return false
  //   return false;
  // }

  ngOnInit(): void {
    this.loadData();
    if (this.dlist.length != 0) {
      // this.deleteRowDataLine(0);
    }
    this.resaleService.addData.subscribe((res: any) => {
      const changedata = res;
      if (changedata) {
        this.loadData();
      }
    });
    this.resaleService.newentry.subscribe((res: any) => {
      if (res) {
        this.loadData();
      }
    });
  }

  loadData(event?: any) {
    this.draftCount = 0;
    this.publishCount = 0;
    // this.http.get('assets/Quotation.json').subscribe((res: any) => {
    //   this.summary = res.root[0].quotation_Details || [];
    // });
    this.formData = JSON.parse(localStorage.getItem('New Quotation') || '[]');
    for (let i = 0; i < this.formData.length; i++) {
      let item = this.formData[i];
      if (item.OperationType === 'Draft') {
        this.draftCount++;
       
      } else if (item.OperationType === 'Publish') {
        this.publishCount++;
       
      }
      
    

    }
    // console.log('draftCount', this.draftCount);
    // console.log('publishCount', this.publishCount);

    this.setData();
    if(this.draftCount == 0){
      this.draftEditFlag = false;
      
    }
    if(this.publishCount == 0){
        this.publicEditFlag = false;
      }
  }

  setData() {
    this.formData = JSON.parse(localStorage.getItem('New Quotation') || '[]');
    // console.log('this.formData');
    // console.log(this.formData);
    this.summary = [];

    for (let i = 0; i < this.formData?.length; i++) {
      // // console.log(i + 3);
      const newQuotationDetails = {
        //DataContainerId: i + 2,
        DataContainerId: this.formData[i]?.DataContainerId,
        QuotationName:
          this.formData[i]?.quotation_Details[0]?.QuotationName || '',
        SupplierName: this.formData[i]?.quotation_Details[0]?.SupplierName,

        Interco: this.formData[i]?.quotation_Details[0]?.IncoTerms,
        QuotationDescription:
          this.formData[i]?.quotation_Details[0]?.QuotationDescription,
        QuotationLink: this.formData[i]?.quotation_Details[0]?.QuotationLink,
        SupplierType: this.formData[i]?.quotation_Details[0].SupplierType,
        SupplierPricingType:
          this.formData[i]?.quotation_Details[0]?.SupplierPricing,
        LobFlag: this.formData[i]?.quotation_Details[0].LobFlag,
        CurrencyQuotation:
          this.formData[i]?.quotation_Details[0]?.CurrencyQuotation,
        FreightDuty: this.formData[i]?.quotation_Details[0]?.FreightDuty || '',
        Country: this.formData[i]?.quotation_Details[0]?.CountryLocation || '',
        PriceDate:
          this.formData[i]?.quotation_Details[0]?.LatestPriceSetDate || '',

        PriceValidDate:
          this.formData[i]?.quotation_Details[0]?.PriceValidUntilDate || '',
        AnnualEscalation:
          this.formData[i]?.quotation_Details[0]?.AnnualEscalationandDuty || 0,
        INCOTerm: this.formData[i]?.quotation_Details[0]?.IncoSupplierTerm,
        INCOLocation:
          this.formData[i]?.quotation_Details[0]?.IncoLocation || '',
        Warranty:
          this.formData[i]?.quotation_Details[0]?.WarrentyArgumentMonths || '',
        WarrantyCost:
          this.formData[i]?.quotation_Details[0]?.AnnualWarrantyCost || 0,
        PaymentTerms: this.formData[i]?.quotation_Details[0]?.PayTerms || '',
        ForexExposure:
          this.formData[i]?.quotation_Details[0]?.forexExposure || '',
        OtherTerms: this.formData[i]?.quotation_Details[0]?.OtherTerms || '',
        groupStatus: this.formData[i].OperationType,
        SummaryCount: 0,
        TotalCost: 0,
        TotalExpectationCost: 0,
        isActive: false,
      };
      this.summary?.push(newQuotationDetails);
      // console.log('this.summary', this.summary);
      // console.log(newQuotationDetails);
    }

    // this.resaleService.detailsData(this.summary);
    // console.log('summary ', this.summary);
  }

  // EditSummary(editFlag : boolean){
  //   // debugger
  //   this.draftEditFlag = !this.draftEditFlag;
  // }

  onClickDraftEditFlag() {
    this.draftEditFlag = !this.draftEditFlag;
    this.publicEditFlag = false;
    
    console.log(this.draftEditFlag);
    this.dlist = [];
  }
  onClickPublishEditFlag() {
    this.publicEditFlag = !this.publicEditFlag;
    console.log(this.publicEditFlag);
    this.draftEditFlag = false;
    this.dlist = [];
  }
  onClickCancel() {
    this.draftEditFlag = false;
    this.publicEditFlag = false;
    this.dlist = [];
  }

  DeleteList(id: any, status: string) {
    // this.tempDelete = true;
    // console.log("dlist", this.dlist);
    //console.log("status",status);
    //  this.deleteRowDataLine(id ,status);
    // const index = this.dlist.indexOf(Number(id));
    const index = this.dlist.findIndex(
      (data: any) => data.id == id && data.status == status
    );

    // console.log("index", index)
    if (index !== -1) {
      this.dlist.splice(index, 1);
    } else {
      // this.dlist.push(id);
      this.dlist.push({ id: id, status: status });
    }
    //console.log("dlist",this.dlist);
  }

  trashData(status: string) {
    this.isClicked = true;
    const storedData = localStorage.getItem('New Quotation');
    const dataArray = storedData ? JSON.parse(storedData) : [];

    for (let data of this.dlist) {
      let index = dataArray.findIndex(
        (item: any) =>
          item.DataContainerId == data.id && item.OperationType == data.status
      );
      console.log('index', index);
      if (status === 'Publish') {
        while (index !== -1) {
          dataArray.splice(index, 1);
          let draftIndex = dataArray.findIndex(
            (item: any) =>
              item.DataContainerId == data.id && item.OperationType == 'Draft'
          );
          if (draftIndex !== -1) {
            dataArray.splice(draftIndex, 1);
        }
          index = dataArray.findIndex(
            (item: any) =>
              item.DataContainerId == data.id && item.OperationType == status
          );

          console.log('index', index);
        }
      } else if (index !== -1) {
        dataArray.splice(index, 1);
      }
      successAlert(`${status} data deleted successfully.`);
      // this.tempDelete = false;
    }

    localStorage.setItem('New Quotation', JSON.stringify(dataArray));
    this.dlist = [];
    this.loadData();
    this.ngOnInit();
  }

  toggleIcon(item: any) {
    item.isTrashIcon = !item.isTrashIcon;
  }
}
