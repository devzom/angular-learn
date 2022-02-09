import {Component, Input} from '@angular/core';

@Component({
  selector: 'base-button',
  template: `
    <button [disabled]="disabled" disabled class="btn btn-sm btn-dark m-2">
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})
export class ButtonComponent {
  @Input() disabled: boolean = true;
}
