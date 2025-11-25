import { Component } from '@angular/core';
import { ContainerComponent } from "../../layout/container/container.component";
import { CardLanchoneteComponent } from "../../shared/components/card-lanchonete/card-lanchonete.component";
import { CardAvaliacaoComponent } from "../../shared/components/card-avaliacao/card-avaliacao.component";

@Component({
  selector: 'app-home',
  imports: [ContainerComponent, CardLanchoneteComponent, CardAvaliacaoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
