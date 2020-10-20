import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { VehicleService } from 'src/app/app.service';
import { EventEmitterService } from 'src/app/event/emitter/index.service';
import { Vehicle } from '../../interfaces/vehicle';
import { ModalAddOrEditVehicle } from '../addVehicle/addVehicle.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  constructor(private vehicleService: VehicleService, private eventEmitterService: EventEmitterService, public dialog: MatDialog) {

  }
  
  @Input() vehicle: Vehicle;

  @Input()
  color: ThemePalette

  
  openDialog(vehicle: Vehicle) {
    this.eventEmitterService.onSetVehicle(vehicle);
    const dialogRef = this.dialog.open(ModalAddOrEditVehicle, { data: vehicle});
    dialogRef.afterClosed().subscribe();
  }


  deleteVehicle(id: string) {
    if (!id || id === null) {
      return;
    }
    this.vehicleService.deleteVehicle(id).then(resolve => {
      if (resolve) {
        this.eventEmitterService.onGetVehiclesDashBoard();
      }
    }).catch(error => { })
  }

  ngOnInit(): void {
  }

}
