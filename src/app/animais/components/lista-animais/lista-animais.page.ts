import { Component } from '@angular/core';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { AnimalInterface } from '../../types/animal.interface';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animais',
  templateUrl: './lista-animais.page.html',
  styleUrls: ['./lista-animais.page.scss'],
})
export class ListaAnimaisComponent implements ViewWillEnter {

  animais: AnimalInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private animalService: AnimalService
  ) {}

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    const observable = this.animalService.getAnimais();

    observable.subscribe(
      (dados) => {
        this.animais = dados.filter(animal => animal.adotado === false);
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os animais.`,
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
    if ( animal.id ) {
      this.animalService.excluir(animal.id).subscribe(
        () => {
          this.listar();

          this.toastController
          .create({
            message: `Animal excluido com sucesso.`,
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
              message: `Não foi possível excluir o animal ${animal.nome}: ${erro.error.message}`,
        duration: 5000,
              keyboardClose: true,
              color: 'danger'
            })
            .then((t) => t.present());
        }
      );
    }
  }

  public calcularIdade(dataNascimento: string): number {
    let newDataNascimento = new Date(dataNascimento);
    let dataAtual = new Date();
    let idade = dataAtual.getFullYear() - newDataNascimento.getFullYear();
    let diferencaMensal = dataAtual.getMonth() - newDataNascimento.getMonth();

    if (
      diferencaMensal < 0 ||
      (
        diferencaMensal === 0 &&
        dataAtual.getDate() < newDataNascimento.getDate()
      )
    ) {
      idade--;
    }

    return idade;
  }
}

