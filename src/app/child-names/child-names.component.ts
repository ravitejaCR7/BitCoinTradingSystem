import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-names',
  templateUrl: './child-names.component.html',
  styleUrls: ['./child-names.component.css']
})
export class ChildNamesComponent implements OnInit {
  @Input() names:string;
  @Output() childEmitter = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  sendToParent(name ){
    // this.eventFromChildNames.emit(name);
    console.log("clicked : "+name);
    this.childEmitter.emit(name);
  }

}
