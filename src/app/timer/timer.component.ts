import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'], 
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;

  private countdownEndSubscription: Subscription = null;
  private countdownSubscription: Subscription = null;
  public countdown: number = 0;

  get progress(){
    console.log('progeress');
    return (this.init - (this.countdown)) / this.init * 100;
  }

  constructor( 
    public timer: TimerService,
    private cdref: ChangeDetectorRef
   ) { }

  ngOnInit(): void {
    this.timer.restartCountdown( this.init );

    this.countdownEndSubscription = this.timer.countdownEnd$.subscribe( ()=>{
      console.log('end');
      this.onComplete.emit();
    });

    this.countdownSubscription = this.timer.countdown$.subscribe(( data )=>{
      this.countdown = data;
      this.cdref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.timer.destroy();
    this.countdownEndSubscription.unsubscribe();
    this.countdownSubscription.unsubscribe();
  }

}
