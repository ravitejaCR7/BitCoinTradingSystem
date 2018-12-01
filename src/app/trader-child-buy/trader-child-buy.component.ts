import { Component, OnInit, Input } from '@angular/core';
import { PrimaryKeyClassService } from '../primary-key-class.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trader-child-buy',
  templateUrl: './trader-child-buy.component.html',
  styleUrls: ['./trader-child-buy.component.css']
})
export class TraderChildBuyComponent implements OnInit {
  @Input() buyIdFromParent:number;

  clientId:string = "";
  transVal:number;
  paymentStatus:string = "";

  errorFlag:boolean = false;
  buttonsFlag:boolean = true;
  errorMessageFromResponse:string = "";

  traderPrimaryKey:string="";

  constructor(private http: HttpClient , private router: Router , private primaryKeyService: PrimaryKeyClassService) { }

  ngOnInit() {
    this.traderPrimaryKey = this.primaryKeyService.getPrimaryKeyTrader();
    this.getThePaymentTransactionInfo();
  }

  getThePaymentTransactionInfo()
  {
    console.log("inside");

    let obs = this.http.get('http://localhost:8080/restproject/webapi/products/clientBuyTransInfo/'+this.buyIdFromParent);

    obs.subscribe((data:any) =>
    {

      if(data.result == false)
      {
        console.log("false");
        //there is an error
        this.errorFlag = true;
        this.errorMessageFromResponse = data.errorMessage;

      }
      else if(data.result == true)
      {
        console.log("true");
        //there is no error
        this.errorFlag = false;
        this.errorMessageFromResponse = "";

        this.clientId = data.clientId;
        this.transVal = data.amountPaid;
        this.paymentStatus = data.paymentStatus;

      }

    });
  }

  acceptTrans()
  {


    let obs = this.http.post('http://localhost:8080/restproject/webapi/products/acceptRejectBuyTrans/',
    {"transactionId":this.buyIdFromParent,
      "clientId":this.clientId,
      "transStatus":"accept",
      "traderId":this.traderPrimaryKey,
      "amountPaid":this.transVal
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

    let obs = this.http.post('http://localhost:8080/restproject/webapi/products/acceptRejectBuyTrans/',
    {"transactionId":this.buyIdFromParent,
      "clientId":this.clientId,
      "transStatus":"reject",
      "traderId":this.traderPrimaryKey,
      "amountPaid":this.transVal
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
