import { Component,Input , OnInit } from '@angular/core';
import { PrimaryKeyClassService } from '../primary-key-class.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trader-childs',
  templateUrl: './trader-childs.component.html',
  styleUrls: ['./trader-childs.component.css']
})
export class TraderChildsComponent implements OnInit {
  @Input() parentTrader:number;

  errorFlag:boolean = false;
  buttonsFlag:boolean = true;
  errorMessageFromResponse:string = "";

  traderPrimaryKey:string="";

  clientId:string = "";
  transType:string = "";
  transVal:number;
  transCommission:number;
  transCommissionType:string = "";
  transStatus:string = "";
  bitCoinValue:number;

  constructor(private http: HttpClient , private router: Router , private primaryKeyService: PrimaryKeyClassService) { }

  ngOnInit() {
    this.traderPrimaryKey = this.primaryKeyService.getPrimaryKeyTrader();

    this.getTheTransactionInfo();

  }

  getTheTransactionInfo()
  {
    let obs = this.http.get('http://localhost:8080/restproject/webapi/products/clientTransInfo/'+this.parentTrader);

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

  acceptTrans()
  {
    //accept the trans
    //so no change in the the client account

    //###but change the status of the transaction to accepted

    let obs = this.http.post('http://localhost:8080/restproject/webapi/products/acceptRejectTrans/',
    {"transactionId":this.parentTrader,
      "clientId":this.clientId,
      "transStatus":"accept",
      "traderId":this.traderPrimaryKey
    }
    );


    obs.subscribe((data:any) => {
      console.log(data);
      if(data.result == true)
      {
        this.buttonsFlag = false;
      }
      else if(data.result == false)
      {
        this.buttonsFlag = true;
        this.errorMessageFromResponse = data.errorMessage;
        this.errorFlag = true;
      }
      } ,
      (err:any) => {
          console.log(err);
      });

  }

  rejectTrans()
  {

    let obs = this.http.post('http://localhost:8080/restproject/webapi/products/acceptRejectTrans/',
    {"transactionId":this.parentTrader,
      "clientId":this.clientId,
      "transStatus":"reject",
      "traderId":this.traderPrimaryKey
    }
    );


    obs.subscribe((data:any) => {
      console.log(data);
      if(data.result == true)
      {
        this.buttonsFlag = false;
      }
      else if(data.result == false)
      {
        this.buttonsFlag = true;
        this.errorMessageFromResponse = data.errorMessage;
        this.errorFlag = true;
      }
      } ,
      (err:any) => {
          console.log(err);
      });

  }



}
