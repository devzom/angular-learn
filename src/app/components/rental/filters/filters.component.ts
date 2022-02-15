import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'rental-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Input() param: string = 'param'; // used as query param key
  @Input() title: string = 'Filters'; // section title
  @Input() filters: Array<string> = []; // array of filters

  // outputs
  @Output() setFilter = new EventEmitter()

  constructor() {
  }

  handleRadioChange(event: any) {
    const filterObj = {
      param: this.param,
      value: event.target.value
    }

    this.setFilter.emit(filterObj)
  }

  ngOnInit() {


  }
}
