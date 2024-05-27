import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AnimalInterface } from '../types/animal.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private url = 'http://localhost:3000/animais';

  constructor(
    private httpClient: HttpClient
  ) {}

  getAnimais(): Observable<AnimalInterface[]> {
    return this.httpClient.get<AnimalInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getAnimal(id: number): Observable<AnimalInterface> {
    return this.httpClient.get<AnimalInterface>(`${this.url}/${id}`);
  }

  private adicionar(animal: AnimalInterface)  {
    return this.httpClient.post(this.url, animal);
  }

  private atualizar(animal: AnimalInterface) {
    return this.httpClient.put(`${this.url}/${animal.id}`, animal);
  }

  salvar(animal: AnimalInterface) {
    if(animal.id) {
      return this.atualizar(animal);
    } else {
      return this.adicionar(animal);
    }
  }
}
