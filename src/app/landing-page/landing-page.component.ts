import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrimaryKeyClassService } from '../primary-key-class.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  userName:string = "";
  password:string = "";
  errorStringFromResponse:string = "";

  loginType:string = "";

  errorFromResponse:boolean = false;
  errorShow:boolean = false;

  constructor(private http: HttpClient , private router: Router, private primaryKeyService: PrimaryKeyClassService)
  {
  }

  ngOnInit() {
    console.log("in login ngOnInit()");
  }

  onTextEnteredInInputForUserName(event:any)
  {
      this.userName = event.target.value;
  }

  onTextEnteredInInputForPassword(event:any)
  {
      this.password = event.target.value;
  }

  radioLoginType(event:any)
  {
    this.loginType = event.target.value;
  }

  validateLogin()
  {
    if(this.loginType.length > 0 && this.loginType == "client")
    {

      if( this.userName.length > 0 && this.password.length > 0)
      {
        this.errorShow = false;
        this.errorFromResponse = false;
        console.log("valid parameters");
        let obs = this.http.get('http://localhost:8080/restproject/webapi/products/login/'+this.userName+"/"+this.password);
        obs.subscribe((data:any) =>
        {
          console.log("login response : "+data.errorMessage);

          if(data.result == true)
          {
            //login --> change module
            this.primaryKeyService.setPrimaryKey(data.clientPrimaryKey);

            this.router.navigate(['/homepage']);
          }
          else
          {
            this.errorFromResponse = true;
            this.errorStringFromResponse = data.errorMessage;
          }

        });

      }
      else
      {
        this.errorShow = true;
        this.errorFromResponse = false;
        console.log("fail");
      }
    }
    else if(this.loginType.length > 0 && this.loginType == "trader")
    {
      if( this.userName.length > 0 && this.password.length > 0)
      {
        this.errorShow = false;
        this.errorFromResponse = false;
        console.log("valid parameters trader");
        let obs = this.http.get('http://localhost:8080/restproject/webapi/products/loginTrader/'+this.userName+"/"+this.password);
        obs.subscribe((data:any) =>
        {
          console.log("login response : "+data.errorMessage);

          if(data.result == true)
          {
            //login --> change module
            this.primaryKeyService.setPrimaryKeyTrader(data.clientPrimaryKey);

            this.router.navigate(['/homepageTrader']);
          }
          else
          {
            this.errorFromResponse = true;
            this.errorStringFromResponse = data.errorMessage;
          }

        });

      }
      else
      {
        this.errorShow = true;
        this.errorFromResponse = false;
        console.log("fail");
      }
    }
    else
    {
      this.errorFromResponse = true;
      this.errorStringFromResponse = "Select client or trader ";
    }
  }
}
