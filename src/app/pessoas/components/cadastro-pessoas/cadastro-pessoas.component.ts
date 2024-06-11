import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PessoaInterface } from '../../types/pessoa.interface';
import { PessoaService } from '../../services/pessoa.service';
import { GeneroEnum } from '../../types/genero.enum';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.scss'],
})
export class CadastroPessoasComponent implements OnInit {

  pessoaId: string | null;
  pessoaForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private pessoaService: PessoaService,
    private router: Router
  ) {
    this.pessoaId = null;
    this.pessoaForm = this.createForm();
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if ( id ) {
      this.pessoaId = id;
      this.pessoaService.getPessoa(this.pessoaId).subscribe((pessoa) => {
        this.pessoaForm = this.createForm(pessoa);
      });
    }
  }

  private createForm(pessoa?: PessoaInterface) {
    return new FormGroup({
      nome: new FormControl(pessoa?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      dataNascimento: new FormControl(
        pessoa?.dataNascimento || new Date().toISOString()
      ),
      cpf: new FormControl(pessoa?.cpf || '', [
        Validators.required,
        Validators.pattern('[0-9]{11}'),
      ]),
      telefone: new FormControl(pessoa?.telefone || '', [
        Validators.required,
        Validators.pattern('[0-9]{11}'),
      ]),
      genero: new FormControl(
        pessoa?.genero || GeneroEnum.FEMININO,
        Validators.required
      ),
    });
  }

  salvar() {
    let pessoa: PessoaInterface = {
      ...this.pessoaForm.value,
    };

    let message = '';

    this.pessoaService.salvar(this.pessoaId, pessoa).subscribe(
      () => {
        this.router.navigate(['pessoas']);

        if ( !this.pessoaId ) {
          message = `Pessoa cadastrada com sucesso.`;
        } else {
          message = `Pessoa atualizada com sucesso.`;
        }

        this.toastController
          .create({
            message: message,
            duration: 5000,
            keyboardClose: true,
            color: 'success',
          })
          .then((t) => t.present());
      },
      (erro) => {
        console.error(erro);

        if ( !this.pessoaId ) {
          message = `Não foi possível salvar a pessoa ${pessoa.nome}: ${erro.error.message}`;
        } else {
          message = `Não foi possível atualizar a pessoa ${pessoa.nome}: ${erro.error.message}`;
        }

        this.toastController
          .create({
            message: message,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.pessoaForm.get('nome');
  }

  get cpf() {
    return this.pessoaForm.get('cpf');
  }

  get telefone() {
    return this.pessoaForm.get('telefone');
  }
}
