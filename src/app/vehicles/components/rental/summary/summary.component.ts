import {Component, Input} from '@angular/core';

@Component({
  selector: 'rental-summary',
  templateUrl: './summary.component.html',
  styles: []
})
export class SummaryComponent {
  @Input() price: number = 0
  @Input() days: number = 0
  @Input() details: any = {}

  constructor() {
  }

}
