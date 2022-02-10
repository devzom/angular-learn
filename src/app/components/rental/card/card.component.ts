import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'rental-card',
  templateUrl: './card.component.html',
  styles: ['.active-card{ outline: 2px solid green}']
})
export class CardComponent implements OnInit {
  @Input() vehicle!: IVehicle;
  @Input() disabledBtn: boolean = false;
  @Input() pickedVehicleId: any;
  @Input() dailyPrice: number = 0;
  @Input() index: any; // test

  // outputs
  @Output() addVehicleToRent = new EventEmitter()


  ngOnInit() {
    // console.log('Init vehicle card: ', {
    //   vehicle: this.vehicle,
    //   index: this.index,
    //   dailyPrice: this.dailyPrice
    // })
  }


  onRentalButtonClick(vehicle: IVehicle) {
    // send signal to parent component
    // console.log('Emit vehicle from card comp: ', vehicle)
    this.addVehicleToRent.emit(vehicle)
  }

  isPicked() {
    return this.vehicle.id === this.pickedVehicleId
  }

}
