import { Injectable, EventEmitter } from '@angular/core';    
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';    
import { Vehicle } from 'src/app/interfaces/vehicle';
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
  constructor(public dialog: MatDialog) { }    
    
  invokeGetVehicles = new EventEmitter();    
  invokeSetVehicle = new EventEmitter<Vehicle>();    
  invokeSetLoading = new EventEmitter<boolean>();    
  subsVar: Subscription;    
    
    
  onGetVehiclesDashBoard() {    
    this.invokeGetVehicles.emit();    
  }    
  onSetVehicle(vehicle: Vehicle) {  
    this.invokeSetVehicle.subscribe(vehicle);    
  }    
  onSetLoading() {  
    this.invokeSetLoading.emit();    
  }    
} 