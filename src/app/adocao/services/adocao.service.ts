import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { AdocaoInterface } from '../types/adocao.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdocaoService {

  private url = 'http://localhost:3000/adocao';

  constructor(
    private httpClient: HttpClient
  ) {}

  getAdocoes(): Observable<AdocaoInterface[]> {
    return this.httpClient.get<AdocaoInterface[]>(this.url);
  }

  excluir(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getAdocao(id: string): Observable<AdocaoInterface> {
    return this.httpClient.get<AdocaoInterface>(`${this.url}/${id}`);
  }

  private adicionar(adocao: AdocaoInterface)  {
    return this.httpClient.post(this.url, adocao);
  }

  private atualizar(id: string, adocao: AdocaoInterface) {
    return this.httpClient.patch(`${this.url}/${id}`, adocao);
  }

  salvar(id: string | null, adocao: AdocaoInterface) {
    if( id ) {
      return this.atualizar(id, adocao);
    }

    return this.adicionar(adocao);
  }
}
