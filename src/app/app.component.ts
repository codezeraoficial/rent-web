import { Component, Input, OnInit } from '@angular/core';
import { EventEmitterService } from './event/emitter/index.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private eventEmitterService: EventEmitterService ) {

  }
  title = 'GoRent';

  @Input() isLoading = false;

  ngOnInit(): void {
    this.eventEmitterService.subsVar = undefined;
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeSetLoading.subscribe((name: string) => {
          this.isLoading = !this.isLoading
      });
    }
  }
}
