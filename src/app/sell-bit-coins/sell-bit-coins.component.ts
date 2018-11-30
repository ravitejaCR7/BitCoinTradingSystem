import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyClassService } from '../primary-key-class.service';

@Component({
  selector: 'app-sell-bit-coins',
  templateUrl: './sell-bit-coins.component.html',
  styleUrls: ['./sell-bit-coins.component.css']
})
export class SellBitCoinsComponent implements OnInit {

  userPrimaryKey:string = "";

  bitCoins:number;
  fiatCurrency:number;

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
  bitRadioFlag:boolean = true;

  constructor(private http: HttpClient , private router: Router, private primaryKeyService: PrimaryKeyClassService) { }

  ngOnInit() {

    this.getTheCommissionRate();
    this.getTheUserAccountBalance();
    this.getTheCurrentBitValue();

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


  getTheUserAccountBalance()
  {

    console.log("ngOnInit()++"+this.primaryKeyService.getPrimaryKey());

    let obs = this.http.get('http://localhost:8080/restproject/webapi/products/balance/'+this.userPrimaryKey);

    obs.subscribe((data:any) =>
    {

      console.log("accounts response inselling : "+data.errorMessage);


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

  onTextEnteredInInputForCalculatingBitCoinValues(event:any)
  {
    //calculations
    this.bDesired = event.target.value;

    this.calSubTotal = this.bValue * this.bDesired;

    //cal comm
    this.calCommissionFiat = this.calSubTotal * this.commRate;
    this.calCommissionBit = this.bDesired * this.commRate;

    if(this.bDesired > this.bitCoins)
    {
      //hiding the sell button
      console.log("trueeeee");
      this.buyFlag = false;
      this.errorFlag = true;
      this.errorMessageFromResponse = "No sufficient BitCoins!";
    }
    else
    {
      ///showing the buy button
      console.log("false");
      this.buyFlag = true;
      this.errorFlag = false;
      this.errorMessageFromResponse = "";
    }

    //hiding the bit coins radio button
    var commissionInBitCoins = Number(this.bDesired) + Number(this.calCommissionBit);
    if(commissionInBitCoins <= this.bitCoins)
    {
      //Sufficient bitcoins to sell the bit coins. So show the bitcoins radio button
      this.bitRadioFlag = true;
    }
    else if(commissionInBitCoins > this.bitCoins)
    {
      //no sufficient bitcoins to sell the bitcoins. So hide the bitcoins button
      this.bitRadioFlag = false;
    }
  }

  radioCommType(event:any)
  {
    //radio
    this.radioSelected = event.target.value;
    console.log("this.radioSelected "+this.radioSelected);
  }

  sellBitCoins()
  {
    //final sell

    //bDesired should be a number > 0
    if(this.radioSelected.length > 0 && this.radioSelected == "BitCoin" && this.bDesired > 0 && !isNaN( this.bDesired ))
    {

        let obs111 = this.http.post('http://localhost:8080/restproject/webapi/products/newClientBuyTransaction/',
        {"clientId":this.userPrimaryKey,
          "transType":"sell",
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
        "transType":"sell",
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
