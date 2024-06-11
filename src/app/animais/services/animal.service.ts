import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimalInterface } from '../types/animal.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private url = 'http://localhost:3000/animal';

  constructor(
    private httpClient: HttpClient
  ) {}

  getAnimais(): Observable<AnimalInterface[]> {
    return this.httpClient.get<AnimalInterface[]>(this.url);
  }

  excluir(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getAnimal(id: string): Observable<AnimalInterface> {
    return this.httpClient.get<AnimalInterface>(`${this.url}/${id}`);
  }

  private adicionar(animal: AnimalInterface)  {
    return this.httpClient.post(this.url, animal);
  }

  private atualizar(id: string, animal: AnimalInterface) {
    return this.httpClient.patch(`${this.url}/${id}`, animal);
  }

  salvar(id: string | null, animal: AnimalInterface) {
    if( id ) {
      return this.atualizar(id, animal);
    }

    return this.adicionar(animal);
  }
}
