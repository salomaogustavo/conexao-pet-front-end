import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PessoaInterface } from '../types/pessoa.interface';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private url = 'http://localhost:3000/pessoa';

  constructor(
    private httpClient: HttpClient
  ) {}

  getPessoas(): Observable<PessoaInterface[]> {
    return this.httpClient.get<PessoaInterface[]>(this.url);
  }

  excluir(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getPessoa(id: string): Observable<PessoaInterface> {
    return this.httpClient.get<PessoaInterface>(`${this.url}/${id}`);
  }

  private adicionar(pessoa: PessoaInterface)  {
    return this.httpClient.post(this.url, pessoa);
  }

  private atualizar(id: string, pessoa: PessoaInterface) {
    return this.httpClient.patch(`${this.url}/${id}`, pessoa);
  }

  salvar(id: string | null, pessoa: PessoaInterface) {
    if( id ) {
      return this.atualizar(id, pessoa);
    }

    return this.adicionar(pessoa);
  }
}
