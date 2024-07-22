import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ResaleService } from '../../../services/resale-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty, Subscription } from 'rxjs';
import { errorAlert, successAlert } from '../../../Helpers/Swirl/Swirl';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnChanges {
  @Input() id: number = 0;
  groupStatus: string = '';
  storeData: any[] = [];
  DetailsData: any[] = [];
  matchedData: any;
  changeDetect: boolean = false;
  editData: any[] = [];
  private subscription = Subscription.EMPTY;
  opportunityID: any;
  constructor(
    private resaleService: ResaleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  checkIsChangeDetected(isChangeDetected: boolean) {
    // this.changeDetect = isChangeDetected;
    console.log('helllo hello');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.mapIdToDetailsData();
    }
  }

  ngOnInit(): void {
    this.observeData();
  }

  ngOnDestroy() {
    //alert('called')
    this.editData = [];
    this.subscription.unsubscribe();
    this.resaleService.detailsData([]);
  }

  observeData() {
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];
      console.log('id', this.id);
      this.route.queryParams.subscribe((p) => {
        this.groupStatus = p['status'];

        console.log(p);
        //  this.groupStatus = this.groupStatus === "" ? p['status'] : this.groupStatus
        this.mapIdToDetailsData();
      });
      console.log('groupstatus', this.groupStatus);
    });

    // this.route.queryParams.subscribe((queryParams: any) => {
    //   // this.opportunityID = queryParams['opportunityID'] ;
    //   this.groupStatus = queryParams['status'];
    //   console.log('status', this.groupStatus);
    // });

    this.subscription = this.resaleService.data.subscribe((res: any) => {
      this.editData = res;
      this.mapIdToDetailsData();
    });

    this.mapIdToDetailsData();

    this.resaleService.addData.subscribe((res: any) => {
      this.changeDetect = res;
      if (this.changeDetect) {
        this.mapIdToDetailsData();
      }
    });
  }

  status(type: string) {
    console.log('Status Method', this.changeDetect);
    let dataArray = [];
    let storedData = localStorage.getItem('New Quotation');

    dataArray = storedData ? JSON.parse(storedData) : [];
    let Action = this.changeDetect ? 'Edit' : 'Add';

    const QuotationFormData = {
      DataContainerId: Number(this.id),
      OperationType: type,
      ActionType: Action,
      IsChangeQuotaionSummary: false,
      IsChangeQuotationDetail: this.changeDetect,
      quotation_Details: [this.matchedData],
      Quotation_Summary: [],
    };

    const existingIndex = dataArray.findIndex(
      (item: any) =>
        item.DataContainerId === Number(this.id) &&
        item.OperationType == this.groupStatus
    );

    if (existingIndex !== -1) {
      // const existingItem = dataArray[existingIndex];

      if (this.changeDetect) {
        if (this.groupStatus == 'Draft' && type == 'Draft') {
          console.log('Draft2Draft', this.changeDetect);
          if (this.changeDetect) {
            this.updateLocalData(QuotationFormData);
            successAlert(`Data added in ${type} successfully.`);
          }
          // this.router.navigate(['resale/summary/draft']);
          return;
        }

        if (this.groupStatus == 'Publish' && type == 'Publish') {
          console.log('publish to publish changeDetetc', this.changeDetect);

          this.updateLocalData(QuotationFormData);
          this.resaleService.addNewData(true);
          successAlert(`Data added in ${type} successfully.`);

          // this.router.navigate(['resale/summary/draft']);
          return;
        }
        if (this.groupStatus === 'Publish' && type === 'Draft') {
          dataArray = dataArray.filter(
            (item: any) =>
              !(
                item.DataContainerId === Number(this.id) &&
                item.OperationType === 'Draft'
              )
          );
          dataArray.push(QuotationFormData);
          localStorage.setItem('New Quotation', JSON.stringify(dataArray));
          successAlert(`Data added in ${type} successfully.`);
          this.router.navigate(['resale/summary/draft']);
          return;
        }

        this.observeData();
      }
      if (this.groupStatus === 'Draft' && type === 'Publish') {
        console.log("d2p");
        console.log("not condition changedetect",this.changeDetect);
        this.updateStatus(QuotationFormData);
        successAlert(`Data added in ${type} successfully.`);
        this.resaleService.addNewData(true);

        // this.resaleService.addNewData(this.changeDetect);
        this.router.navigate(['resale/summary/draft']);

        return;
      }

      if (!this.changeDetect) {
      
       
       

          errorAlert(` No change detected in  ${type} `);
          this.changeDetect = false;
          this.observeData();
        
      }

      this.observeData();
    } else {
      dataArray.push(QuotationFormData);
    }
  }

  updateStatus(updateDate: any) {
    let localStorageData = localStorage.getItem('New Quotation');
    if (localStorageData) {
      let dataArray = JSON.parse(localStorageData);
      const draftDataIndex = dataArray.findIndex(
        (item: any) =>
          item.DataContainerId == this.id && item.OperationType == 'Draft'
      );
      if (draftDataIndex !== -1) {
        let publicDataIndex;
        // console.log("publicDataIndex",publicDataIndex);
        while (publicDataIndex !== -1) {
          publicDataIndex = dataArray.findIndex(
            (item: any) => item.DataContainerId == this.id
          );
          if (publicDataIndex != -1) {
            dataArray.splice(publicDataIndex, 1);
          }
        }
        dataArray.push(updateDate);
        localStorage.clear();
        localStorage.setItem('New Quotation', JSON.stringify(dataArray));
      }
    }
  }

  updateLocalData(updatedData: any) {
    // //console.log("updateLocalData");
    let storedData = localStorage.getItem('New Quotation');
    // //console.log('storedData', storedData);

    if (storedData) {
      let dataArray = JSON.parse(storedData);
      // //console.log('dataarr', dataArray);
      const index = dataArray.findIndex(
        (item: any) =>
          item.DataContainerId == this.id &&
          item.OperationType == this.groupStatus
      );
      // //console.log("index ",index);
      if (index !== -1) {
        dataArray.splice(index, 1);
        // //console.log('dataArray',dataArray);

        //dataArray[index] = [updatedData];
        dataArray.push(updatedData);
        // //console.log("updateLocalData index");

        // //console.log('updatedData', updatedData);
        localStorage.clear();

        localStorage.setItem('New Quotation', JSON.stringify(dataArray));

        // //console.log('Updated JSON Data   :', dataArray);
      } else {
        // dataArray.push(updatedData);
        // localStorage.setItem('New Quotation', JSON.stringify(dataArray));
        // // //console.log('dataContainerId not found.');
      }
    } else {
      // //console.log('No data  in localStorage.');
    }
  }

  mapIdToDetailsData(): void {
    let existingIndex;
    if (this.editData?.length !== 0) {
      this.matchedData = this.editData[0];
      // this.editData[0] = null;
    } else {
      // //console.log('else');
      let storedData = localStorage.getItem('New Quotation');
      let dataArray = storedData ? JSON.parse(storedData) : [];
      // //console.log('dataArray', dataArray);

      // if(Status){
      //   existingIndex = dataArray.findIndex(
      //     (item: any) =>
      //       item.DataContainerId == this.id &&
      //       item.OperationType === Status
      //   );
      // }
      // else{

      existingIndex = dataArray.findIndex(
        (item: any) =>
          item.DataContainerId == this.id &&
          item.OperationType == this.groupStatus
      );

      /// }
      // const existingIndex = dataArray.findIndex(
      //   (item: any) =>
      //     item.DataContainerId == this.id &&
      //     item.OperationType === status !== null ? status : this.groupStatus
      // );
      if (existingIndex !== -1) {
        const existingItem = dataArray[existingIndex];

        // //console.log('groupStatus', this.groupStatus);

        if (
          existingItem.quotation_Details &&
          existingItem.quotation_Details.length > 0
        ) {
          this.matchedData = existingItem.quotation_Details[0];
          // console.log("matchedData",this.matchedData);
        } else {
          this.matchedData = null;
        }
      } else {
        this.matchedData = null;
      }
    }
  } 
}
