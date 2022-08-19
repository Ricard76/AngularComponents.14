import { AfterContentInit, Component, ContentChild, OnInit, OnDestroy, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from "app/tab/tab.component";
import { Tab } from "../tab/tab.interface";


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

  

  @ContentChildren(TabComponent) public tabs:QueryList<TabComponent>;
  private tabClickSubscriptions: any = [];

  constructor() { }

  ngOnDestroy(): void {
    if(this.tabClickSubscriptions){
      this.tabClickSubscriptions.foreach(( item ) => item.unsubscribe());
    }
  }

  ngAfterContentInit(): void {
    console.log( this.tabs );
    this.tabs.forEach((tab)=>{
      let subscription = tab.onClick.subscribe( () => {
        console.log(`tab ${tab.title} content click`);
      });
      this.tabClickSubscriptions.push( subscription );
    });
    this.selectTab( this.tabs.first );
  }

  ngOnInit() { }

  selectTab(tab:Tab) {
    this.tabs.forEach(tab => tab.isActive = false);
    tab.isActive = true;
  }
  
}
