import { Component } from '@angular/core';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { PessoaInterface } from '../../types/pessoa.interface';
import {PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './lista-pessoas.page.html',
  styleUrls: ['./lista-pessoas.page.scss'],
})
export class ListaPessoasComponent implements ViewWillEnter {

  pessoas: PessoaInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private pessoaService: PessoaService
  ) {}

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    const observable = this.pessoaService.getPessoas();
    observable.subscribe(
      (dados) => {
        this.pessoas = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar as pessoas: ${erro.error.message}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(pessoa:PessoaInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja a pessoa ${pessoa.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(pessoa),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(pessoa: PessoaInterface) {
    if (pessoa.id) {
      this.pessoaService.excluir(pessoa.id).subscribe(
        () => {
          this.listar();

          this.toastController
            .create({
              message: `Pessoa excluida com sucesso.`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        },
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir a pessoa ${pessoa.nome}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }
}
