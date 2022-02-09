import {Component, Input} from '@angular/core';

@Component({
  selector: 'base-hero',
  templateUrl: './hero.component.html',
  styles: []
})
export class HeroComponent {
  @Input() title: string = 'Hero title';
  @Input() description: string = 'Hero description';
}
