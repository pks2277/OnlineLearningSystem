import { Component } from '@angular/core';

@Component({
  selector: 'app-from',
  standalone: true,
  imports: [],
  templateUrl: './from.component.html',
  styleUrl: './from.component.scss'
})
export class FromComponent {
  firstName="James";
  lastName="Bond";
}
