import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { AnimalInterface } from '../../types/animal.interface';
import {AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animais',
  templateUrl: './lista-animais.page.html',
  styleUrls: ['./lista-animais.page.scss'],
})
export class ListaAnimaisComponent
  implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave
{
  animais: AnimalInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private animalService: AnimalService
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
    const observable = this.animalService.getAnimais();
    observable.subscribe(
      (dados) => {
        this.animais = dados.filter(animal => animal.adotado === 'N');
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

  confirmarExclusao(animal:AnimalInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o animal ${animal.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(animal),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(animal: AnimalInterface) {
    if (animal.id) {
      this.animalService.excluir(animal.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o animal ${animal.nome}`,
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
