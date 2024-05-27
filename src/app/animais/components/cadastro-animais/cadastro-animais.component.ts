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
  animalId: number | null;
  animalForm: FormGroup;
  imagensSelecionadas: string[] = [];

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
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.animalId = parseInt(id);
      this.animalService.getAnimal(this.animalId).subscribe((animal) => {
        this.animalForm = this.createForm(animal);

        if (animal.imagem) {
          this.imagensSelecionadas.push(animal.imagem);
        }
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
      imagem: new FormControl(animal?.imagem || ''),   
    });
  }


  salvar() {
    const animal: AnimalInterface = {
      ...this.animalForm.value,
      id: this.animalId,
      imagem: this.imagensSelecionadas[0] || '',
      adotado: 'N',
    };
    console.log('Animal para salvar:', animal);
    this.animalService.salvar(animal).subscribe(
      () => this.router.navigate(['animais']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o animal ${animal.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  selecionarArquivo(event: any) {
    const arquivo = event.target.files[0];
  
    if (arquivo) {
      const url = URL.createObjectURL(arquivo);
      console.log('URL da imagem:', url);
  
      // Atualiza a array com a nova imagem (substituindo qualquer imagem existente)
      this.imagensSelecionadas = [url];
  
      // Define a propriedade 'imagem' do formulário com a URL, garantindo que seja uma string
      this.animalForm.get('imagem')?.setValue(url ?? '');
    }
  }

  get nome() {
    return this.animalForm.get('nome');
  }

  get raca() {
    return this.animalForm.get('raca');
  }

  get imagem() {
    return this.animalForm.get('imagem');
  }

}
