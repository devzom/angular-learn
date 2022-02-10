import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'rental-checkout',
  templateUrl: './checkout.component.html',
  styles: []
})
export class CheckoutComponent implements OnInit {
  @Input() isDisabled: boolean = true
  @Input() isLoading: boolean = false

  // outputs
  @Output() onCheckoutClick = new EventEmitter()


  constructor() {
  }

  checkOutClick() {
    this.onCheckoutClick.emit()
  }

  ngOnInit(): void {
  }

}
