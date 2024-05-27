import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { AdocaoInterface } from '../../types/adocao.interface';
import {AdocaoService } from '../../services/adocao.service';
import { AnimalService } from 'src/app/animais/services/animal.service';

@Component({
  selector: 'app-adocoes',
  templateUrl: './lista-adocoes.page.html',
  styleUrls: ['./lista-adocoes.page.scss'],
})
export class ListaAdocoesComponent
  implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave
{
  adocoes: AdocaoInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private adocaoService: AdocaoService,
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
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir a adoção`,
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
