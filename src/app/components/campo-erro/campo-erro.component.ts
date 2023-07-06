import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-campo-erro',
  templateUrl: './campo-erro.component.html',
  styleUrls: ['./campo-erro.component.scss']
})
export class CampoErroComponent implements OnInit{
  @Input() msgErro: string = "";
  @Input() mostrarErro: boolean = false;
  
  ngOnInit(): void {
    
  }
  constructor(){}

}
