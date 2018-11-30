import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor()
  {

  }

  ngOnInit()
  {
    console.log("in app ngOnInit()")
  }
}
