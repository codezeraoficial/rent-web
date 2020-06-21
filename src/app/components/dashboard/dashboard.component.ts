import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle';
import { VehicleService } from '../../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private vehicleService: VehicleService) { }

  vehicles: Vehicle[] = [];

   ngOnInit() {
    this.getVehicles();
    console.log(this.vehicles);
  }

  getVehicles(): void {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles);
  }

}
