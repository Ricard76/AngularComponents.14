import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'], 
  providers: [TimerService],
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;

  private countdownEndSubscription: Subscription = null;

  constructor( public timer: TimerService ) { }

  ngOnInit(): void {
    this.timer.restartCountdown( this.init );

    this.countdownEndSubscription = this.timer.countdownEnd$.subscribe( ()=>{
      console.log('end');
      this.onComplete.emit();
    });
  }

  ngOnDestroy(): void {
    this.timer.destroy();
    this.countdownEndSubscription.unsubscribe();
  }


}
