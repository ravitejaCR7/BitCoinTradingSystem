import { Component, OnInit, Input } from '@angular/core';
import { PrimaryKeyClassService } from '../primary-key-class.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.component.html',
  styleUrls: ['./client-history.component.css']
})
export class ClientHistoryComponent implements OnInit {
  @Input() transId:number;

  errorFlag:boolean = false;
  errorMessageFromResponse:string = "";

  clientId:string = "";
  transType:string = "";
  transVal:number;
  transCommission:number;
  transCommissionType:string = "";
  transStatus:string = "";
  bitCoinValue:number;

  constructor(private http: HttpClient , private router: Router , private primaryKeyService: PrimaryKeyClassService) { }

  ngOnInit() {
    this.getTheTransactionInfo();
  }

  getTheTransactionInfo()
  {
    let obs = this.http.get('http://localhost:8080/restproject/webapi/products/clientTransInfo/'+this.transId);

    obs.subscribe((data:any) =>
    {

      if(data.result == false)
      {
        //there is an error
        this.errorFlag = true;
        this.errorMessageFromResponse = data.errorMessage;

      }
      else if(data.result == true)
      {
        //there is no error
        this.errorFlag = false;
        this.errorMessageFromResponse = "";

        this.clientId = data.clientId;
        this.transType = data.transType;
        this.transVal = data.transVal ;
        this.transCommission = data.transCommission;
        this.transCommissionType = data.transCommissionType;
        this.transStatus = data.transStatus;
        this.bitCoinValue = data.bitCoinValue;
      }

    });
  }

}
