import { GeneroEnum } from './genero.enum';
import { TipoEnum } from './tipo.enum';

export interface AnimalInterface {
  id?: number | null;
  nome: string;
  dataNascimento: Date;
  raca: string;
  genero: GeneroEnum;
  tipo: TipoEnum;
  adotado:string;
  imagem?: string;
}
