import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'rental-card',
  templateUrl: './card.component.html',
  styles: ['.active-card{ outline: 2px solid green}']
})
export class CardComponent {
  @Input() vehicle!: IVehicle;
  @Input() disabledBtn: boolean = false;
  @Input() allowPickAction: boolean | string = false;
  @Input() pickedVehicleId: any = 0;
  @Input() dailyPrice: number = 0;
  @Input() index: any; // test

  // outputs
  @Output() addVehicleToRent = new EventEmitter()

  // send signal to parent component
  onRentalButtonClick(vehicle: IVehicle) {
    if (this.disabledBtn) return

    this.addVehicleToRent.emit(vehicle)
  }

  isPicked() {
    return this.vehicle.id === this.pickedVehicleId
  }

}
