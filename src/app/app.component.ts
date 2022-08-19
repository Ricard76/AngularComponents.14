import { AfterViewInit, Component, ViewChild, AfterContentInit, ViewChildren, QueryList, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  public isAddTimerVisible: boolean = false;
  public time: number = 0;
  public timers: Array<number> = [];

  @ViewChildren(SimpleAlertViewComponent) alerts: QueryList<SimpleAlertViewComponent>;
  @ViewChild("timerInput") timeInput: ElementRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    this.timers = [3, 20, 185];
  }

  ngAfterViewInit(){

    console.log(this.timeInput);
    this.renderer.setAttribute(this.timeInput.nativeElement, 'placeholder', 'enter seconds');
    this.renderer.addClass(this.timeInput.nativeElement, 'time-in');
    
    this.alerts.forEach((item)=> {
      console.log( item );
      if (!item.title){
        item.title = 'Hi!';
        item.message = 'Hello world';
      }
    });
    this.cdRef.detectChanges();
  }

  logCountdownEnd(){
    console.log('the countdown has finished')
  }

  public showAddTimer(){
    this.isAddTimerVisible = true;
    setTimeout(()=>{
      this.renderer.selectRootElement(this.timeInput.nativeElement).focus();
    });
  }

  public hideAddTimer(){
    this.isAddTimerVisible = false;
  }

  public showEndTimerAlert(){
    this.alerts.first.show();
  }

  public submitAddtimer(){
    this.timers.push( this.time );
    this.hideAddTimer();
  }

}
