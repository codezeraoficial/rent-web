import { Component, Inject, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleService } from 'src/app/app.service';
import { EventEmitterService } from 'src/app/event/emitter/index.service';
import { Vehicle } from 'src/app/interfaces/vehicle';


@Component({
  selector: 'app-addVehicle',
  templateUrl: './addVehicle.component.html',
  styleUrls: ['./addVehicle.component.scss']
})
export class ModalAddOrEditVehicle implements OnInit {
  @Input() vehicle: Vehicle;
  @Input()
  color: ThemePalette
  isVehicle: boolean;
  constructor(private vehicleService: VehicleService, public dialog: MatDialog, private eventEmitterService: EventEmitterService, @Inject(MAT_DIALOG_DATA) public data: Vehicle) {
    this.vehicle = data
  }

  ngOnInit() {
    if(!this.vehicle){
      this.vehicle = {} as Vehicle
      this.isVehicle = false
    } else{
      this.isVehicle = true

    }
  }


  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  async saveVehicle() {
    if (this.isEmpty(this.vehicle)) {
      return;
    }
    
    if(!this.vehicle._id){
      this.vehicleService.addVehicle(this.vehicle).then(resolve => {
        if (resolve) {
          this.eventEmitterService.onGetVehiclesDashBoard();
        }
      }).catch(error => { })
    }else{
      this.vehicleService.updateVehicle(this.vehicle).then(resolve => {
        if (resolve) {
          this.eventEmitterService.onGetVehiclesDashBoard();
        }
      }).catch(error => { })
    }
    
  }

  @Input()
  cols: number
  @Input()
  colspan: number
}
