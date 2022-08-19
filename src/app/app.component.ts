import { AfterViewInit, Component, ViewChild, AfterContentInit } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  public isAddTimerVisible: boolean = false;
  public isEndTimerVisible: boolean = false;
  public time: number = 0;
  public timers: Array<number> = [];

  @ViewChild(SimpleAlertViewComponent) alert: SimpleAlertViewComponent;

  constructor() {
    this.timers = [3, 20, 185];
  }

  ngAfterViewInit(){
    console.log('alert view:', this.alert);
    setTimeout(() =>  {
      this.alert.show();
      this.alert.title = 'Hi';
      this.alert.message = 'Hello world';
    });
  }

  logCountdownEnd(){
    console.log('the countdown has finished')
  }

  public showAddTimer(){
    this.isAddTimerVisible = true;
  }

  public hideAddTimer(){
    this.isAddTimerVisible = false;
  }

  public showEndTimerAlert(){
    this.isEndTimerVisible = true;  
  }

  public hideEndTimerAlert(){
    this.isEndTimerVisible = false; 
  }

  public submitAddtimer(){
    this.timers.push( this.time );
    this.hideAddTimer();
  }

}
