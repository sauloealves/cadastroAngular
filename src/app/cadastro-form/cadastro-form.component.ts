import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cadastro } from '../model/cadastro';
import { CadastroService } from '../services/cadastro.service';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.scss']
})
export class CadastroFormComponent implements OnInit {
  cadastros: Cadastro[] = [];
  formulario!: FormGroup;
  submit: boolean = false;
  metodo: string = "cadastrar";
  indexStorage: number = 0;

  constructor(private formBuilder: FormBuilder, private cadastroService: CadastroService){}

  async ngOnInit() {
    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, Validators.required],
      cpf: [null, Validators.required],
      phone: [null, Validators.required]
    })

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

  onSubmit(){

    if (this.formulario.valid){

      const cadastro: Cadastro = {
        name: this.formulario.get('name')?.value,
        phone: this.formulario.get('phone')?.value,
        cpf: this.formulario.get('cpf')?.value,
        email: this.formulario.get('email')?.value,
      }

      if (this.metodo === 'cadastrar'){
        const cadastrosString = localStorage.getItem('cadastros');
        let cadastros: Cadastro[] = cadastrosString ? JSON.parse(cadastrosString) : [];
        cadastros.push(cadastro);
        localStorage.setItem('cadastros', JSON.stringify(cadastros));
      }else{
        this.salvarEdicaoNoLocalStorage(this.indexStorage,cadastro)  
        this.metodo = 'cadastrar';
      }

      this.atualizarTabela();
      this.formulario.reset();
    }
    else{
      for (const nomeControle in this.formulario.controls){
        this.submit = false;
        if(this.formulario.controls[nomeControle].invalid){
          this.submit = true;
          this.aplicarCssErro(nomeControle);
        }
      }
    }
  }

  aplicarCssErro(campo: any){
    return {
      ' has-error': this.verificarValidTouched(campo) || this.submit,
      ' has-feedback': this.verificarValidTouched(campo) || this.submit
    }
  }
 
  verificarValidTouched(campo: any): boolean {
    return Boolean(!this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched);
  }

  
  limpar(){
    this.formulario.reset();
  }

  confirmarExclusao(index: number){
    if (confirm('Deseja realmente excluir este item?')) {
      this.excluirItemLocalStorage(index);
    }
  }

  excluirItemLocalStorage(index: number): void {
    
    const cadastrosData = localStorage.getItem('cadastros');
    const data = cadastrosData ? JSON.parse(cadastrosData) : [];
    data.splice(index, 1);
    localStorage.setItem('cadastros', JSON.stringify(data));
    this.cadastros.splice(index, 1);

  }

  editar(index: number): void {
    this.indexStorage = index;
    this.metodo = "editar";
    const cadastrosData = localStorage.getItem('cadastros');
    const data = cadastrosData ? JSON.parse(cadastrosData) : [];
    
    if (index >= 0 && index < data.length) {
      const cadastro = data[index];
      this.formulario.patchValue({
        name: cadastro.name,
        email: cadastro.email,
        cpf: cadastro.cpf,
        phone: cadastro.phone
      });
    }
  }

  salvarEdicaoNoLocalStorage(index: number, cadastroEditado: any): void {

    const cadastrosData = localStorage.getItem('cadastros');
    const data = cadastrosData ? JSON.parse(cadastrosData) : [];
  
    if (index >= 0 && index < data.length) {
      data[index] = cadastroEditado;
      localStorage.setItem('cadastros', JSON.stringify(data));
    }
  }

  cancelar(){
    this.metodo = 'cadastrar';
    this.limpar();
  }

  verificarTamanhoMinimoCampo(campo : any){
    if (this.verificarValidTouched(campo)){
      let selecionado = this.formulario.get(campo);

      if (selecionado?.errors){
        debugger;
        return true;
      }
  
    }
    return false;    

  }


}
