import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rental-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {
  @Input() makes$ = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
