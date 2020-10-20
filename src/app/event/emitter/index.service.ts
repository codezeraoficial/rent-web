import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  invokeGetVehicles = new EventEmitter();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  onGetVehiclesDashBoard() {    
    this.invokeGetVehicles.emit();    
  }    
} 