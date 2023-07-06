import { Component, OnInit, ViewChild } from '@angular/core';
import { Cadastro } from './model/cadastro';
import  {CadastroService} from './services/cadastro.service';
import { FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  cadastros: Cadastro[] = [];

constructor(private cadastroService: CadastroService) {
  
 }

  async ngOnInit() {
    await this.getCadastros();
  }

  async getCadastros() {
    try {
      let response = (await this.cadastroService.getCadastro()) ?? [];
      localStorage.setItem('cadastros', JSON.stringify(response));      
      this.atualizarTabela();

    } catch (error) {
      console.log('Ocorreu um erro ao obter os cadastros:', error);
    }
  }

  atualizarTabela(){
    const cadastrosString = localStorage.getItem('cadastros');
    this.cadastros = cadastrosString ? JSON.parse(cadastrosString) : [];
  }
}
