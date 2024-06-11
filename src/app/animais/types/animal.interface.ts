import { GeneroEnum } from './genero.enum';
import { TipoEnum } from './tipo.enum';

export interface AnimalInterface {
  id?: string | null;
  nome: string;
  dataNascimento: string;
  raca: string;
  genero: GeneroEnum;
  tipo: TipoEnum;
  adotado: boolean;
  foto?: string;
}
