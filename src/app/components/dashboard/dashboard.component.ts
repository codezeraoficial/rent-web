import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle';
import { VehicleService } from '../../app.service';
import { ModalAddOrEditVehicle } from '../addVehicle/addVehicle.component';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { EventEmitterService } from 'src/app/event/emitter/index.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private vehicleService: VehicleService, public dialog: MatDialog, private eventEmitterService: EventEmitterService) { }

  vehicles: Vehicle[] = [];

  ngOnInit() {
    this.eventEmitterService.subsVar = undefined;
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeGetVehicles.subscribe((name: string) => {
          this.getVehicles();
        });
    }
    this.getVehicles();
  }

  @Input()
  color: ThemePalette

  openDialog() {
    const dialogRef = this.dialog.open(ModalAddOrEditVehicle);
    dialogRef.afterClosed().subscribe();
  }

  getVehicles(): void {
    this.eventEmitterService.onSetLoading();
    this.vehicleService.getVehicles()
      .subscribe((vehicles) => {
        setTimeout(() => {
          this.vehicles = vehicles;
          this.eventEmitterService.onSetLoading();
        }, 1000);
      });

  }
}
