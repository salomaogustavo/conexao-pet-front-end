import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AnimalInterface } from '../../types/animal.interface';
import { AnimalService } from '../../services/animal.service';
import { GeneroEnum } from '../../types/genero.enum';
import { TipoEnum } from '../../types/tipo.enum';

@Component({
  selector: 'app-animais-cadastro',
  templateUrl: './cadastro-animais.component.html',
  styleUrls: ['./cadastro-animais.component.scss'],
})
export class CadastroAnimaisComponent implements OnInit {

  private URL_PATTERN: RegExp = new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

  animalId: string | null;
  animalForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private animalService: AnimalService,
    private router: Router
  ) {
    this.animalId = null;
    this.animalForm = this.createForm();
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if ( id ) {
      this.animalId = id;
      this.animalService.getAnimal(this.animalId).subscribe((animal) => {
        this.animalForm = this.createForm(animal);
      });
    }
  }

  private createForm(animal?: AnimalInterface) {
    return new FormGroup({
      nome: new FormControl(animal?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      dataNascimento: new FormControl(
        animal?.dataNascimento || new Date().toISOString()
      ),
      raca: new FormControl(animal?.raca || '', [
        Validators.required,
      ]),
      genero: new FormControl(
        animal?.genero || GeneroEnum.MACHO,
        Validators.required
      ),
      tipo: new FormControl(
        animal?.tipo || TipoEnum.CACHORRO,
        Validators.required
      ),
      foto: new FormControl('http://', Validators.pattern(this.URL_PATTERN)),
    });
  }


  salvar() {
    let animal: AnimalInterface = {
      ...this.animalForm.value,
      adotado: false,
    };

    animal.dataNascimento = this.formatarDataDeNascimento(animal.dataNascimento);
    let message = ''

    this.animalService.salvar(this.animalId, animal).subscribe(
      () => {
        this.router.navigate(['animais']);

        if ( !this.animalId ) {
          message = `Animal cadastrado com sucesso.`;
        } else {
          message = `Animal atualizado com sucesso.`;
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
        if ( !this.animalId ) {
          message = `Não foi possível salvar o animal ${animal.nome}: ${erro.error.message}`;
        } else {
          message = `Não foi possível atualizar o animal ${animal.nome}: ${erro.error.message}`;
        }

        this.toastController
        .create({
          message: message,
          duration: 5000,
          keyboardClose: true,
          color: 'danger',
        })
        .then((t) => t.present());

        console.error(erro);
      }
    );
  }

  formatarDataDeNascimento(dataNascimento: string) {
    let dataNascimentoDate = new Date(dataNascimento);
    let offset = dataNascimentoDate.getTimezoneOffset() * 60 * 1000;
    let dataNascimentoSemOffset = new Date(dataNascimentoDate.getTime() - offset);
    let isoString = dataNascimentoSemOffset.toISOString();
    isoString = isoString.split('T')[0];

    return isoString;
  }

  get nome() {
    return this.animalForm.get('nome');
  }

  get raca() {
    return this.animalForm.get('raca');
  }

  get imagem() {
    return this.animalForm.get('foto');
  }
}

