import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cadastro } from '../model/cadastro';
@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl = 'https://private-9d65b3-tinnova.apiary-mock.com/users';
    cadastros: Cadastro[] = [];
  constructor(private http: HttpClient) { }

  async getCadastro(): Promise<Cadastro[] |undefined> {
    const response = await this.http.get<Cadastro[]>(this.apiUrl).toPromise();
    return response;
  }
}
