import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() vehicle: Vehicle;

  constructor() { }

  ngOnInit(): void {
  }

}
