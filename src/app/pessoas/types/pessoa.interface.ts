import { GeneroEnum } from './genero.enum';

export interface PessoaInterface {
  id?: string | null;
  nome: string;
  dataNascimento: Date;
  cpf: string;
  telefone: string;
  genero: GeneroEnum;
}
