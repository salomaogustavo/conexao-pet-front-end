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
  adocaoId: number | null;
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
      this.animais = animais;
    });

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.adocaoId = parseInt(id);
      this.adocaoService.getAdocao(this.adocaoId).subscribe((adocao) => {
        this.adocaoForm.setValue({
          idPessoa: adocao.idPessoa,
          idAnimal: adocao.idAnimal,
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
      idPessoa: new FormControl(adocao?.idPessoa || null, Validators.required),
      idAnimal: new FormControl(adocao?.idAnimal || null, Validators.required),
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
    const adocao: AdocaoInterface = {
      ...this.adocaoForm.value,
      id: this.adocaoId,
    };
    this.adocaoService.salvar(adocao).subscribe(
      () => {
        const animalAssociado = this.animais.find((animal) => animal.id === adocao.idAnimal);
        if (animalAssociado) {
          animalAssociado.adotado = 'S';
        }
        this.router.navigate(['adocoes']);
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar a adocao ${adocao.id}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
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
