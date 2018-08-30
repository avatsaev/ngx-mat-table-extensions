import {Component} from '@angular/core';

@Component({
  selector: 'app-veil',
  template: `
    <div class="veil"></div>
  `,
  styles: [`
    .veil {
      z-index: 999;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: white;
      opacity: 0.5;
    }
  `]
})
export class VeilComponent {}
