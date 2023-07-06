import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-cadastrar',
  templateUrl: './botao-cadastrar.component.html',
  styleUrls: ['./botao-cadastrar.component.scss']
})
export class BotaoCadastrarComponent {

  @Input() disabled : boolean = false
  @Input() texto : string = "Cadastrar"
}
