import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ResaleService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'assets/list.json';
  private apiUrlForm = 'assets/quotation.json';

  getList(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getFormData() {
    return this.http.get(this.apiUrlForm);
  }

  AddFromData(data: any) {
    //  console.log("data",data);
    //   return this.http.post(this.apiUrlForm, data);
    this.http.post(this.apiUrlForm, data).subscribe((res: any) => {
      alert(res.message);
    });
  }

  //  app.post('/', (req, res) => {
  //   console.log('Received request');
  //   fs.writeFile('json.json', JSON.stringify(req.body), (err) => {
  //     if (err) throw err;
  //     console.log('File written to JSON.json');
  //     res.send('File written to JSON.json')
  //   })
  // });

  getdataAsync(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlForm}`, data);
  }

  data = new BehaviorSubject<any>([]);
  data$ = this.data.asObservable();

  detailsData(item: any) {
    this.data?.next(item);
  }

  addData = new BehaviorSubject<any>(false);
  addData$ = this.data.asObservable();

  addNewData(change: boolean) {
    this.addData.next(change);
  }

  newentry = new BehaviorSubject<any>(false);
  newentry$ = this.data.asObservable();

  newEntry(change: boolean) {
    this.newentry.next(change);
  }

  




  publishdata = new BehaviorSubject<any>([]);
  publishdata$ = this.data.asObservable();

  publishData(item: any) {
    this.publishdata?.next(item);
  }

 

}
