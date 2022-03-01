import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'rental-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent {
  @Input() filter: any = {}; // filter object which contains all data

  baseFilterOption = {
    parameter: this.filter.parameter,
    name: this.filter.name,
    value: 'all'
  }

  // outputs
  @Output() setFilter = new EventEmitter()

  handleRadioChange(event: any) {
    const filterObj = {
      param: this.filter.parameter,
      value: event.target.value,
      filterKey: ''
    }

    this.setFilter.emit(filterObj)
  }
}
