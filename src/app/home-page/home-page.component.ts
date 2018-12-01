import { Component, OnInit } from '@angular/core';
import { PrimaryKeyClassService } from '../primary-key-class.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  bitCoins:number;
  fiatCurrency:number;
  userPrimaryKey:string="";

  errorMessageFromResponse:string="";
  errorFlag:boolean = false;

  //loading money
  amountLoaded:number;

  constructor(private http: HttpClient , private router: Router , private primaryKeyService: PrimaryKeyClassService) { }

  ngOnInit() {
    console.log("ngOnInit()"+this.primaryKeyService.getPrimaryKey());
    this.userPrimaryKey = this.primaryKeyService.getPrimaryKey();
    this.getTheUserAccountBalance();
  }

  //get the bitCoins and fiatCurrency
  getTheUserAccountBalance()
  {
    console.log("ngOnInit()++"+this.primaryKeyService.getPrimaryKey());

    let obs = this.http.get('http://localhost:8080/restproject/webapi/products/balance/'+this.userPrimaryKey);

    obs.subscribe((data:any) =>
    {

      console.log("accounts response : "+data.errorMessage);


      if(data.result == false)
      {
        this.errorMessageFromResponse = data.errorMessage;
        this.errorFlag = true;
      }
      else if(data.result == true)
      {
        this.bitCoins = data.clientBitCoins;
        this.fiatCurrency = data.clientFiatCurrency;
        this.errorFlag = false;
      }

    });
  }

  onTextEnteredInInputForLoadingMoney(event:any)
  {
    this.amountLoaded = event.target.value;
    this.errorMessageFromResponse = "";
    this.errorFlag = false;
  }

  loadAmount()
  {
    if(this.amountLoaded > 0)
    {
      console.log("amt : "+this.amountLoaded);

      let obs = this.http.post('http://localhost:8080/restproject/webapi/products/newClientAmountTransaction/',
      {"clientId":this.userPrimaryKey,
        "amount":this.amountLoaded,
        "transStatus":"new"
      }
      );

      obs.subscribe((data:any) =>
      {
        if(data.result == true)
        {
          //inserted
          this.amountLoaded = 0;
          this.errorMessageFromResponse = "Made new Payment";
          this.errorFlag = true;

        }
        else if(data.result == false)
        {
          this.errorMessageFromResponse = data.errorMessage;
          this.errorFlag = true;
        }
    });

      //This part should go into the trader (accept/reject payment transaction)
    //   let obs = this.http.post('http://localhost:8080/restproject/webapi/products/updateFiatAmount/',
    //   {"clientId":this.userPrimaryKey,
    //     "amount":this.amountLoaded
    //   }
    //   );
    //
    //   obs.subscribe((data:any) =>
    //   {
    //     if(data.result == true)
    //     {
    //       //inserted
    //       let obsNew = this.http.get('http://localhost:8080/restproject/webapi/products/balance/'+this.userPrimaryKey);
    //
    //       obsNew.subscribe((data:any) =>
    //       {
    //
    //         console.log("accounts response : "+data.errorMessage);
    //
    //
    //         if(data.result == false)
    //         {
    //           this.errorMessageFromResponse = data.errorMessage;
    //           this.errorFlag = true;
    //         }
    //         else if(data.result == true)
    //         {
    //           this.bitCoins = data.clientBitCoins;
    //           this.fiatCurrency = data.clientFiatCurrency;
    //           this.errorFlag = false;
    //         }
    //
    //       });
    //     }
    //     else if(data.result == false)
    //     {
    //       this.errorMessageFromResponse = data.errorMessage;
    //       this.errorFlag = true;
    //     }
    // });

    }
    else
    {
      this.errorMessageFromResponse = "Please enter valid amount";
      this.errorFlag = true;
    }
  }

  buyBitCoins()
  {
    this.router.navigate(['/buyBit']);
  }

  sellBitCoins()
  {
    this.router.navigate(['/sellBit']);
  }

}
