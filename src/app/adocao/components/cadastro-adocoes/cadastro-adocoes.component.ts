import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdocaoInterface } from '../../types/adocao.interface';
import { AdocaoService } from '../../services/adocao.service';
import { PessoaService } from '../../../pessoas/services/pessoa.service';
import { AnimalService } from '../../../animais/services/animal.service';
import { PessoaInterface } from 'src/app/pessoas/types/pessoa.interface';
import { AnimalInterface } from 'src/app/animais/types/animal.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-adocoes-cadastro',
  templateUrl: './cadastro-adocoes.component.html',
  styleUrls: ['./cadastro-adocoes.component.scss'],
})
export class CadastroAdocoesComponent implements OnInit {

  adocaoId: string | null;
  adocaoForm: FormGroup;
  pessoas: PessoaInterface[] = [];
  animais: AnimalInterface[] = [];

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private adocaoService: AdocaoService,
    private pessoaService: PessoaService,
    private animalService: AnimalService,
    private router: Router
  ) {
    this.adocaoId = null;
    this.adocaoForm = this.createForm();
  }

  ngOnInit() {
    this.pessoaService.getPessoas().subscribe((pessoas) => {
      this.pessoas = pessoas;
    });

    this.animalService.getAnimais().subscribe((animais) => {
      this.animais = animais.filter(animal => animal.adotado === false);
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if ( id ) {
      this.adocaoId = id;
      this.adocaoService.getAdocao(this.adocaoId).subscribe((adocao) => {
        this.adocaoForm.setValue({
          pessoaId: adocao.pessoaId,
          animalId: adocao.animalId,
          descricao: adocao.descricao,
          rua: adocao.rua,
          bairro: adocao.bairro,
          cidade: adocao.cidade,
        });
      });
    }
  }

  private createForm(adocao?: AdocaoInterface) {
    return new FormGroup({
      pessoaId: new FormControl(adocao?.pessoaId || null, Validators.required),
      animalId: new FormControl(adocao?.animalId || null, Validators.required),
      descricao: new FormControl(adocao?.descricao || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      rua: new FormControl(adocao?.rua || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      bairro: new FormControl(adocao?.bairro || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      cidade: new FormControl(adocao?.cidade || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
    });
  }

  salvar() {
    let adocao: AdocaoInterface = {
      ...this.adocaoForm.value,
    };

    let message = '';

    this.adocaoService.salvar(this.adocaoId, adocao).subscribe(
      () => {
        const animalAssociado = this.animais.find((animal) => animal.id === adocao.animalId);

        if ( animalAssociado ) {
          animalAssociado.adotado = true;
        }

        this.router.navigate(['adocoes']);

        if ( !this.adocaoId ) {
          message = `Adoção cadastrada com sucesso.`;
        } else {
          message = `Adoção atualizada com sucesso.`;
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
        if ( !this.adocaoId ) {
          message = `Não foi possível salvar a adocao ${adocao.id}: ${erro.error.message}`
        } else {
          message = `Não foi possível atualizar a adocao ${adocao.id}: ${erro.error.message}`;
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

  get descricao() {
    return this.adocaoForm.get('descricao');
  }

  get rua() {
    return this.adocaoForm.get('rua');
  }

  get bairro() {
    return this.adocaoForm.get('bairro');
  }

  get cidade() {
    return this.adocaoForm.get('cidade');
  }
}

