import {Component, Input} from '@angular/core';

@Component({
  selector: 'base-button',
  template: `
    <button [disabled]="disabled"
            [ngClass]="{'w-100 mx-auto': full}"
            disabled class="btn btn-sm btn-dark">
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})
export class ButtonComponent {
  @Input() disabled: boolean = true;
  @Input() full: boolean = false;
}
