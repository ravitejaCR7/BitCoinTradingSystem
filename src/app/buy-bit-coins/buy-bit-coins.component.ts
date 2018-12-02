import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyClassService } from '../primary-key-class.service';

@Component({
  selector: 'app-buy-bit-coins',
  templateUrl: './buy-bit-coins.component.html',
  styleUrls: ['./buy-bit-coins.component.css']
})
export class BuyBitCoinsComponent implements OnInit {

  bitCoins:number;
  fiatCurrency:number;

  userPrimaryKey:string = "";

  bValue:number;
  bDesired:number;
  calSubTotal:number = 0;

  calCommissionFiat:number;
  calCommissionBit:number;
  commRate:number;

  errorFlag:boolean = false;
  errorMessageFromResponse:string="";

  buyFlag:boolean = true;

  //radioCommType
  radioSelected:string="";
  fiatRadioFlag:boolean = true;

  constructor(private http: HttpClient , private router: Router, private primaryKeyService: PrimaryKeyClassService) { }

  ngOnInit() {
    this.getTheCommissionRate();
    this.getTheUserAccountBalance();
    this.getTheCurrentBitValue();
  }

  getTheUserAccountBalance()
  {
    console.log("ngOnInit()++"+this.primaryKeyService.getPrimaryKey());

    let obs = this.http.get('http://localhost:8080/restproject/webapi/products/balance/'+this.userPrimaryKey);

    obs.subscribe((data:any) =>
    {

      console.log("accounts response in buying : "+data.errorMessage);


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

  getTheCurrentBitValue()
  {
    let obs = this.http.get('https://api.coindesk.com/v1/bpi/currentprice.json');
    obs.subscribe((data:any) =>
    {
      console.log("currentBitCoinValue response : "+data.bpi.USD.rate_float);
      this.bValue = data.bpi.USD.rate_float;
    });
  }

  getTheCommissionRate()
  {
    this.userPrimaryKey = this.primaryKeyService.getPrimaryKey();
    let obs = this.http.get('http://localhost:8080/restproject/webapi/products/clientType/'+this.userPrimaryKey);
    obs.subscribe((data:any) =>
    {
      console.log("response : "+data.commissionRate);
      this.commRate = data.commissionRate;
    });
  }

  onTextEnteredInInputForCalculatingBitCoinValues(event:any)
  {
    //calculations
    this.bDesired = event.target.value;

    this.calSubTotal = this.bValue * this.bDesired;

    //cal comm
    this.calCommissionFiat = this.calSubTotal * this.commRate;
    this.calCommissionBit = this.bDesired * this.commRate;

    if(this.fiatCurrency < this.calSubTotal)
    {
      //hiding the buy button
      console.log("trueeeee");
      this.buyFlag = false;
      this.errorFlag = true;
      this.errorMessageFromResponse = "No sufficient funds!";
    }
    else
    {
      ///showing the buy button
      console.log("false");
      this.buyFlag = true;
      this.errorFlag = false;
      this.errorMessageFromResponse = "";
    }

    //hiding the fiat currency radio button
    var balance = this.fiatCurrency - this.calSubTotal;
    if(balance < this.calCommissionFiat)
    {
      //no sufficient bal to pay the fiat currency. So hide the fiat radio button
      this.fiatRadioFlag = false;
    }
    else if(balance >= this.calCommissionFiat)
    {
      //Sufficient bal to pay the fiat currency. So show the fiat radio button
      this.fiatRadioFlag = true;
    }
  }

  radioCommType(event:any)
  {
    //radio
    this.radioSelected = event.target.value;
    console.log("this.radioSelected "+this.radioSelected);
  }

  buyBitCoins()
  {
    //final buy

    //bDesired should be a number > 0
    if(this.radioSelected.length > 0 && this.radioSelected == "BitCoin" && this.bDesired > 0 && !isNaN( this.bDesired ))
    {
        // console.log("buybuy");
        // console.log("clientId "+this.userPrimaryKey);
        // console.log("transVal "+this.bDesired);
        // console.log("transCommission "+this.calCommissionBit);
        // console.log("transCommissionType "+this.radioSelected);
        // console.log("bitCoinValue "+this.bValue);


        let obs111 = this.http.post('http://localhost:8080/restproject/webapi/products/newClientBuyTransaction/',
        {"clientId":this.userPrimaryKey,
          "transType":"buy",
          "transVal":this.bDesired,
          "transCommission":this.calCommissionBit,
          "transCommissionType":this.radioSelected,
          "transStatus":"new",
          "bitCoinValue":this.bValue
        }
        );


        obs111.subscribe((data:any) => {
          console.log("result : "+data.result);
          if(data.result == true)
          {

            let obsNew = this.http.get('http://localhost:8080/restproject/webapi/products/balance/'+this.userPrimaryKey);

            obsNew.subscribe((data:any) =>
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
          else if(data.result == false)
          {
            this.errorMessageFromResponse = data.errorMessage;
            this.errorFlag = true;
          }

          } ,
          (err:any) => {
              console.log("err : "+err);
          });

    }
    else if(this.radioSelected.length > 0 && this.radioSelected == "FiatCash" && this.bDesired > 0 && !isNaN( this.bDesired ))
    {
      //code for FiatCash
      console.log("radio : "+this.radioSelected);
      let obs111 = this.http.post('http://localhost:8080/restproject/webapi/products/newClientBuyTransaction/',
      {"clientId":this.userPrimaryKey,
        "transType":"buy",
        "transVal":this.bDesired,
        "transCommission":this.calCommissionFiat,
        "transCommissionType":this.radioSelected,
        "transStatus":"new",
        "bitCoinValue":this.bValue
      }
      );


      obs111.subscribe((data:any) => {
        console.log("result : "+data.result);
        if(data.result == true)
        {

          let obsNew = this.http.get('http://localhost:8080/restproject/webapi/products/balance/'+this.userPrimaryKey);

          obsNew.subscribe((data:any) =>
          {

            console.log("accounts response fiat : "+data.errorMessage);


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
        } ,
        (err:any) => {
            console.log("err : "+err);
        });
    }
    else
    {
      this.errorFlag = true;
      this.errorMessageFromResponse = "select Bitcoin or FiatCurrency";
    }
  }
}
