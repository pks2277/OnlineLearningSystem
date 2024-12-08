import { Component } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";
import { NavbarComponent } from "../../../components/navbar/navbar.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
