import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResaleService } from '../../../services/resale-service.service';
import { List } from '../../../list';
import { ActivatedRoute } from '@angular/router';
import { CustomvalidationService } from '../../../services/customvalidation.service';
import { successAlert } from '../../../Helpers/Swirl/Swirl';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-quotation-form',
  templateUrl: './quotation-form.component.html',
  styleUrls: ['./quotation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationFormComponent implements OnInit, OnChanges {
  @Input() editData: any = [];
  // @Input() checkIsChangeDetected!: (isChangeDetected: boolean) => void;
  formData: any = [];
  tempData: any;
  newData: any;
  list: List[] = [];
  country: List[] = [];
  dataContainerId = 1;
  Id?: number;
  matchedData: any;
  QuotationFormData: any;
  groupStatus?: string;
  changeDetect: boolean = false;

  ListHeader = [
    'Supplier_Pricing_Type',
    'Vendor_Bid_Term',
    'Vendor',
    'CurrencyCode',
    'PayTerms',
    'ResaleCategory',
    'LOB_Flag',
    'Supplier_Type',
    'Country Location',
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private resaleService: ResaleService,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editData']) {
      this.formData = this.getLocalStorageData('New Quotation');
      this.setFormData(changes['editData'].currentValue);
      this.tempData = this.editData;
      // this.tempData = JSON.parse((this.editData));
    }
  }

  ngOnInit(): void {
    this.loadData(this.ListHeader);
    this.route.params.subscribe((params) => {
      this.Id = params['id'];
    });
    this.route.queryParams.subscribe((queryParams) => {
      this.groupStatus = queryParams['status'];
    });
    this.observeData();
  }

  observeData() {
    this.setFormData(this.editData);
  }

  QuotationForm = new FormGroup({
    QuotationName: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z0-9 ]*$/),
      ],
      [this.validateQuotationName.bind(this)]
    ),
    SupplierType: new FormControl('', Validators.required),
    QuotationDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(2),

      Validators.pattern(/^[a-zA-Z0-9 ]*$/),
    ]),
    SupplierName: new FormControl('', Validators.required),
    SupplierPricingType: new FormControl(''),
    LobFlag: new FormControl('', Validators.required),
    CurrencyQuotation: new FormControl('', Validators.required),
    Country: new FormControl(''),
    //countryLocation: new FormControl(''),
    QuotationLink: new FormControl(
      '',
      Validators.pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\/.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\/+.~#?&/=]*)/
      )
    ),
    FreightDuty: new FormControl('', [Validators.max(100)]),
    INCOTerm: new FormControl(''),
    INCOLocation: new FormControl(''),
    PriceDate: new FormControl(''),
    PriceValidDate: new FormControl('' ,
       //[this.validateDate.bind(this)]
    ),
    AnnualEscalation: new FormControl('', [Validators.max(100)]),
    ForexExposure: new FormControl('', [Validators.maxLength(12)]),
    WarrantyCost: new FormControl(''),
    Warrenty: new FormControl('', [Validators.maxLength(5)]),
    PaymentTerms: new FormControl(''),
    OtherTerms: new FormControl(''),
  });

  setFormData(data: any) {
    this.QuotationForm.patchValue({
      QuotationName: data?.QuotationName || '',
      SupplierType: data?.SupplierType || '',
      QuotationDescription: data?.QuotationDescription || '',
      SupplierName: data?.SupplierName || '',
      SupplierPricingType: data?.SupplierPricingType || '',
      LobFlag: data?.LobFlag || '',
      CurrencyQuotation: data?.CurrencyQuotation || '',
      Country: data?.Country || '',
      QuotationLink: data?.QuotationLink || '',
      FreightDuty: data?.FreightDuty || '',
      INCOTerm: data?.INCOTerm || '',
      INCOLocation: data?.INCOLocation || '',
      PriceDate: data?.PriceDate || '',
      PriceValidDate: data?.PriceValidDate || '',
      AnnualEscalation: data?.AnnualEscalation || 0,
      ForexExposure: data?.ForexExposure || '',
      WarrantyCost: data?.WarrantyCost || '',
      Warrenty: data?.Warranty || '',
      PaymentTerms: data?.PaymentTerms || '',
      OtherTerms: data?.OtherTerms || '',
    });
  }

  getLocalStorageData(key: string): any[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  loadData(input: string[]): void {
    this.http.get('assets/list.json').subscribe((res: any) => {
      this.list = res.root.filter((item: any) =>
        input.includes(item.list_Name)
      );
    });
  }

  validateQuotationName(
    control: AbstractControl
  ): Promise<{ [key: string]: any } | null> {
    return new Promise((resolve) => {
      const formData = this.getLocalStorageData('New Quotation');
      let duplicateName = -1;
      if (this.Id != undefined) {
        duplicateName = formData.findIndex(
          (item: any) =>
            item.quotation_Details[0]?.QuotationName === control.value &&
            item.DataContainerId != this.Id
        );
      } else {
        duplicateName = formData.findIndex(
          (item: any) =>
            item.quotation_Details[0]?.QuotationName === control.value
        );
      }
      if (duplicateName !== -1) {
        resolve({
          duplicateName: true,
          message: 'Quotation name already exists',
        });
      } else {
        resolve(null);
      }
    });
  }

  validateDate(control: AbstractControl): Promise<{ [key: string]: any } | null> {
    const priceDate = control.get('PriceDate')?.value;
      
    const priceValidDate = control.get('PriceValidDate')?.value;
    console.log("PriceDate",priceDate);
    console.log("PriceValidDate",priceValidDate);
    return new Promise((resolve) => {
      // const priceDate = control.get('PriceDate')?.value;
      
      // const priceValidDate = control.get('PriceValidDate')?.value;

      if (!priceDate || !priceValidDate) {
        resolve(null);
        return;
      }

      const priceDateObj = new Date(priceDate);
      console.log("priceDateObj",priceDateObj);
      const priceValidDateObj = new Date(priceValidDate);
      console.log("priceValidDateObj",priceValidDateObj);

      if (priceValidDateObj > priceDateObj) {
        resolve(null);
      } 
      else {

        resolve({
          dateComparison: true,
          message: 'Price Valid Date must be greater than Price Date'
        });
      }
    });
  }

  checkIsDataChange(): boolean {
    var tempArray = JSON.stringify(this.QuotationForm.value);

    for (let i = 0; i < this.matchedData?.length; i++) {
      if (tempArray[i] != this.matchedData[i]) {
        // this.checkIsChangeDetected(false);
        console.log('helllo false');
        return false;
      }
    }
    console.log('hello-true');
    // this.checkIsChangeDetected(true);
    successAlert('Data is unchanged');
    return true;
  }

  onSubmit(event: any) {
    if (this.QuotationForm.valid) {
      const quotationFormData = this.QuotationForm.value;
      if (this.Id !== undefined) {
        this.changeDetect = false;
        // console.log('quotaionForm', this.QuotationForm.value);
        this.editData = this.mapData();
        this.resaleService.detailsData([this.editData]);
        this.QuotationForm.reset();
        this.changeDetect = this.isNotEqual(this.tempData, this.editData);
        this.resaleService.addNewData(this.changeDetect);
      } else {
        let localStorageData = this.getLocalStorageData('New Quotation');
        console.log(localStorageData);
        let dataContainerIdNumber = localStorageData.length + 2;
        const QuotationFormData = [
          {
            DataContainerId: dataContainerIdNumber,
            OperationType: 'Draft',
            ActionType: 'Add',
            IsChangeQuotaionSummary: false,
            IsChangeQuotationDetail: true,
            quotation_Details: [quotationFormData],
            Quotation_Summary: [],
          },
        ];

        this.saveToLocalStorage('New Quotation', QuotationFormData);
        this.resaleService.newEntry(true);
      }
      const buttonRef = document.getElementById('closeBtn');
      buttonRef?.click();
      
      this.closeScreen();
    } else {
      this.QuotationForm.markAllAsTouched();
    }
  }

  incrementDataContainerId(): number {
    let dataContainerId = localStorage.getItem('dataContainerId');
    let dataContainerIdNumber = dataContainerId ? Number(dataContainerId) : 1;
    localStorage.setItem(
      'dataContainerId',
      (++dataContainerIdNumber).toString()
    );

    return dataContainerIdNumber;
  }

  saveToLocalStorage(key: string, data: any): void {
    let storedData = this.getLocalStorageData(key);
    storedData.push(data[0]);
    localStorage.setItem(key, JSON.stringify(storedData));
  }

  mapData() {
    const values = this.QuotationForm.getRawValue();
    return {
      // DataContainerId: this.Id,
      QuotationName: values?.QuotationName || '',
      SupplierName: values?.SupplierName,
      QuotationDescription: values?.QuotationDescription,
      QuotationLink: values?.QuotationLink,
      SupplierType: values?.SupplierType,
      SupplierPricingType: values?.SupplierPricingType,
      LobFlag: values?.LobFlag,
      CurrencyQuotation: values?.CurrencyQuotation,
      FreightDuty: values?.FreightDuty || '',
      Country: values?.Country || '',
      PriceDate: values?.PriceDate || '',
      PriceValidDate: values?.PriceValidDate || '',
      AnnualEscalation: values?.AnnualEscalation || 0,
      INCOTerm: values?.INCOTerm,
      INCOLocation: values?.INCOLocation || '',
      Warranty: values?.Warrenty || '',
      WarrantyCost: values?.WarrantyCost || 0,
      PaymentTerms: values?.PaymentTerms || '',
      ForexExposure: values?.ForexExposure || '',
      OtherTerms: values?.OtherTerms || '',
      // groupStatus: 'Draft',
      // SummaryCount: 0,
      // TotalCost: 0,
      // TotalExpectationCost: 0,
      // isActive: false,
    };
  }

  closeScreen(): void {
    if (this.Id !== 0) {
      this.setFormData(this.editData);
    } else {
      this.QuotationForm.reset();
    }
    if (this.Id === undefined || this.Id === 0) this.QuotationForm.reset();
  }

  loadExistingQuotationNames(): string[] {
    const storedData = this.getLocalStorageData('New Quotation');
    return storedData.map((item: any) => item.quotation_Details.QuotationName);
  }

  get QuotationFormControl() {
    return this.QuotationForm.controls;
  }

  get QuotationName() {
    return this.QuotationForm.get('QuotationName');
  }

  isNotEqual(dataA: any, dataB: any) {
    // for(let key in dataA){
    //   if(dataA[key] !== dataB[key]){
    //     return true;
    //   }
    // }

    console.log('tempData => ', dataA);
    console.log('editedData => ', dataB);
    const a = JSON.stringify(dataA) !== JSON.stringify(dataB);
    console.log('isEql value', a);
    return a;
  }
}
