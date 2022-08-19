import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Tab } from "./tab.interface";
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, Tab {

  @Input() title:string;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  public isActive:boolean = false;

  constructor( ) { }

  ngOnInit() {
    //this.tabs.addTab( this );
  }

  clickTabContent(){
    this.onClick.emit();
  }


}
