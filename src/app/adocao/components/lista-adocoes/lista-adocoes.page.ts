import { Component } from '@angular/core';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { AdocaoInterface } from '../../types/adocao.interface';
import {AdocaoService } from '../../services/adocao.service';
import { AnimalService } from 'src/app/animais/services/animal.service';

@Component({
  selector: 'app-adocoes',
  templateUrl: './lista-adocoes.page.html',
  styleUrls: ['./lista-adocoes.page.scss'],
})
export class ListaAdocoesComponent implements ViewWillEnter {

  adocoes: AdocaoInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private adocaoService: AdocaoService,
  ) {}

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    const observable = this.adocaoService.getAdocoes();
    observable.subscribe(
      (dados) => {
        this.adocoes = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar as adoções`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(adocao:AdocaoInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir essa adoção?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(adocao),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(adocao: AdocaoInterface) {
    if (adocao.id) {
      this.adocaoService.excluir(adocao.id).subscribe(
        () => {
          this.listar();

          this.toastController
          .create({
            message: `Adoção excluida com sucesso.`,
            duration: 5000,
            keyboardClose: true,
            color: 'success'
          })
          .then((t) => t.present());
        },
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir a adoção: ${erro.error.message}`,
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
