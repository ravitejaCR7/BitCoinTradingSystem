import { Component, OnInit } from '@angular/core';
import { PrimaryKeyClassService } from '../primary-key-class.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage-trader',
  templateUrl: './homepage-trader.component.html',
  styleUrls: ['./homepage-trader.component.css']
})


export class HomepageTraderComponent implements OnInit {

  namesList:number[];
  clientName:string = "";

  errorFlag:boolean = false;
  errorMessage:string = "";

  showDetails:boolean = false;

  clientId:string = "";
  clientFirstName:string = "";
  clientCity:string = "";
  clientState:string = "";
  clientType:string = "";
  phoneNumber:number;
  clientZipCode:number;
  transCount:number;

  constructor(private http: HttpClient , private router: Router , private primaryKeyService: PrimaryKeyClassService) { }

  ngOnInit() {
    console.log("ngOnInit() "+this.primaryKeyService.getPrimaryKey());
    console.log("ngOnInit()++ "+this.primaryKeyService.getPrimaryKeyTrader());

    this.getTheTransIdsList();
  }

  getTheTransIdsList()
  {
    let obs = this.http.get('http://localhost:8080/restproject/webapi/products/getAllNewTransactions/new');

    obs.subscribe((data:any) =>
    {

      if(data.result == false)
      {
        //there is an error
        this.errorFlag = true;
        this.errorMessage = data.errorMessage;

      }
      else if(data.result == true)
      {
        //there is no error
        this.errorFlag = false;
        this.errorMessage = "";

        this.namesList = data.transactionIds;
      }

    });
  }

  findTheUserDetails(event:any)
  {
    this.clientName = event.target.value;
    this.showDetails = false;
  }

  findTheUserDetailsButtons()
  {
    let obs = this.http.get('http://localhost:8080/restproject/webapi/products/getTheCompleteUserInfo/'+this.clientName);

    obs.subscribe((data:any) =>
    {

      if(data.result == false)
      {
        //there is an error
        this.errorFlag = true;
        this.showDetails = false;
        this.errorMessage = data.errorMessage;

      }
      else if(data.result == true)
      {
        //there is no error
        this.errorFlag = false;
        this.showDetails = true;
        this.errorMessage = "";

        this.clientId = data.clientId;
        this.clientFirstName = data.clientName;
        this.clientCity = data.clientCity;
        this.clientState = data.clientState;
        this.clientType = data.clientType;
        this.phoneNumber = data.phoneNumber;
        this.clientZipCode = data.clientZipCode;
        this.transCount = data.transCount;
      }

    });
  }

}
