import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { PessoaInterface } from '../../types/pessoa.interface';
import {PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './lista-pessoas.page.html',
  styleUrls: ['./lista-pessoas.page.scss'],
})
export class ListaPessoasComponent
  implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave
{
  pessoas: PessoaInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private pessoaService: PessoaService
  ) {}

  ionViewWillEnter() {
    this.listar();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnInit() {}

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
            message: `Não foi possível listar as pessoas`,
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
        () => this.listar(),
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
