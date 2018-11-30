import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrimaryKeyClassService {

  userPrimaryKey:string = "";
  userPrimaryKeyTrader:string = "";

  constructor() { }

  setPrimaryKey(value:string)
  {
    this.userPrimaryKey = value;
  }

  getPrimaryKey()
  {
    return this.userPrimaryKey;
  }

  setPrimaryKeyTrader(value1:string)
  {
    this.userPrimaryKeyTrader = value1;
  }

  getPrimaryKeyTrader()
  {
    return this.userPrimaryKeyTrader;
  }

}
