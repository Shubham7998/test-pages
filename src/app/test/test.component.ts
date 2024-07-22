import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }



}


//   list: List[] = [];
//   country: List[] = [];
//   ListHeader = [
//     'Supplier_Pricing_Type',
//     'Vendor_Bid_Term',
//     'Vendor',
//     'CurrencyCode',
//     'PayTerms',
//     'ResaleCategory',
//     'LOB_Flag',
//     'Supplier_Type',
//     'Country Location',
//   ];

//   ngOnInit(): void {
//     console.log('Hello');
//     this.loadData(this.ListHeader);
//     console.log('hi');
//     this.formatData();
//   }

//   loadData(input: string[]): void {
//     this.http.get('assets/list.json').subscribe((res: any) => {
//       this.list = res.root.filter((item: any) =>
//         input.includes(item.list_Name)
//       );
//       console.log(this.list);
//     });
//   }

//   formatData() {
//     console.log(this.quotationByName('quotationName'));
//     console.log(this.quotationByName('supplierType'));
//     console.log(this.quotationByName('quotationDescription'));
//     console.log(this.quotationByName('supplierName'));
//     console.log(this.quotationByName('supplierPricing'));
//     console.log(this.quotationByName('lobFlag'));
//     console.log(this.quotationByName('CurrencyQuotation'));
//     console.log(this.quotationByName('countryLocation'));
//     console.log(this.quotationByName('quotationLink'));
//     console.log(this.quotationByName('freightDuty'));
//   }

//   AddData() {
//     console.log('add Data');
//   }

//   QuotataionForm = new FormGroup({
//     quotationName: new FormControl('quotationName', [
//       Validators.required,
//       Validators.minLength(2),
//     ]),
//     supplierType: new FormControl('supplierType', Validators.required),
//     quotationDescription: new FormControl('quotationDescription', [
//       Validators.required,
//       Validators.minLength(2),
//     ]),
//     supplierName: new FormControl('supplierName', Validators.required),
//     supplierPricing: new FormControl('supplierPricing'),
//     lobFlag: new FormControl('lobFlag', Validators.required),
//     CurrencyQuotation: new FormControl('CurrencyQuotation', Validators.required),
//     countryLocation: new FormControl('countryLocation'),
//     quotationLink: new FormControl('quotationLink', [Validators.required]),
//     freightDuty: new FormControl('freightDuty', [
//       Validators.max(100),
//       Validators.maxLength(3),
//     ]),
//     incoTerms: new FormControl(''),
//     incoLocation: new FormControl(''),
//     latestPriceSetDate: new FormControl(''),
//     priceValidUntilDate: new FormControl(''),
//     annualEscalationandDuty: new FormControl('', [Validators.max(100)]),
//     forexExposure: new FormControl('', [Validators.maxLength(12)]),
//     annualWarrantyCost: new FormControl(''),
//     WarrentyArgumentMonths: new FormControl('', [Validators.maxLength(5)]),
//     payTerms: new FormControl(''),
//   });

//   QuotataionFormData() {
//     console.log(this.QuotataionForm.value);
//   }

//   //onSubmit(): void {

   
//     // console.log('add Data');
//     // if (this.QuotataionForm.valid) {
//     //   console.log('this.QuotataionFormData', this.QuotataionFormData);
//       //this.AddData();
//       //  [{
//       // "dataContainerId":1,
//       // "OperationType":"Draft",
//       // "ActionType":"Add",
//       // "isChangeQuotaionSummary":false,
//       // "isChangeQuotationDetail":true,
//       // "quotation_Details":[quotationFormData],
//       //"quotation_Summary":[]
//       //   }]

//       //datacontainerId += datacontainerId ;

//      // console.log('add Data valid');
//     // }
// //  }


// onSubmit(): void {
//   if (this.QuotataionForm.valid) {
//     const quotationFormData = this.QuotataionForm.value;

//     const jsonData = [{
//       dataContainerId: 1,
//       OperationType: "Draft",
//       ActionType: "Add",
//       isChangeQuotaionSummary: false,
//       isChangeQuotationDetail: true,
//       quotation_Details: [quotationFormData],
//       quotation_Summary: []
//     }];

//     console.log('JSON Data:', jsonData);

    
//   }
// }

//   get quotationName() {
//     return this.QuotataionForm.get('quotationName');
//   }

//   get quotationDescription() {
//     return this.QuotataionForm.get('quotationDescription');
//   }

//   get quotationLink() {
//     return this.QuotataionForm.get('quotationLink');
//   }

//   get forexExposure() {
//     return this.QuotataionForm.get('forexExposure');
//   }

//   get freightDuty() {
//     return this.QuotataionForm.get('freightDuty');
//   }

//   get annualEscalationandDuty() {
//     return this.QuotataionForm.get('annualEscalationandDuty');
//   }

//   get WarrentyArgumentMonths() {
//     return this.QuotataionForm.get('WarrentyArgumentMonths');
//   }

//   quotationByName(name: string) {
//     return this.QuotataionForm.get(name)?.value;
//   }
// }
