import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehicleService } from 'src/app/app.service';
import { EventEmitterService } from 'src/app/event/emitter/index.service';
import { Vehicle } from 'src/app/interfaces/vehicle';


@Component({
  selector: 'app-addVehicle',
  templateUrl: './addVehicle.component.html',
  styleUrls: ['./addVehicle.component.scss']
})
export class ModalAddOrEditVehicle  {
  constructor(private vehicleService: VehicleService, public dialog: MatDialog, private eventEmitterService: EventEmitterService ) { }

  vehicle: Vehicle = {} as Vehicle;

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  async saveVehicle() {
    if (this.isEmpty(this.vehicle)){
      return;
    }
   this.vehicleService.addVehicle(this.vehicle).then(resolve =>{
     if(resolve){
       this.eventEmitterService.onGetVehiclesDashBoard();
     }
   }).catch(error=>{})    
  }

  @Input()
  cols: number
  @Input()
  colspan: number
}
