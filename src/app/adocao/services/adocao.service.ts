import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { AdocaoInterface } from '../types/adocao.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdocaoService {

  private url = 'http://localhost:3000/adocoes';

  constructor(
    private httpClient: HttpClient
  ) {}

  getAdocoes(): Observable<AdocaoInterface[]> {
    return this.httpClient.get<AdocaoInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getAdocao(id: number): Observable<AdocaoInterface> {
    return this.httpClient.get<AdocaoInterface>(`${this.url}/${id}`);
  }

  private adicionar(adocao: AdocaoInterface)  {
    return this.httpClient.post(this.url, adocao);
  }

  private atualizar(adocao: AdocaoInterface) {
    return this.httpClient.put(`${this.url}/${adocao.id}`, adocao);
  }

  salvar(adocao: AdocaoInterface) {
    if(adocao.id) {
      return this.atualizar(adocao);
    } else {
      return this.adicionar(adocao);
    }
  }
}
