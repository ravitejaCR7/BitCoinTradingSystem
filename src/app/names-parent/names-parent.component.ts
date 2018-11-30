import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-names-parent',
  templateUrl: './names-parent.component.html',
  styleUrls: ['./names-parent.component.css']
})
export class NamesParentComponent implements OnInit {
  @Input() parentName:string;

  @Output() parentEmitter = new EventEmitter<string>();

  childPassedName:string = '';

  namesList = ['ravi','teja','Talari','Ramesh','Rama']
  constructor() { }

  ngOnInit() {
  }

  childEmitter(passedChild:string){
      this.childPassedName = passedChild;

  }

  passFromParent(childPassedName)
  {
      this.parentEmitter.emit(childPassedName);
  }

}
