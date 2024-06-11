import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { AdocoesPageRoutingModule } from './adocoes-routing.module';
import { ListaAdocoesComponent } from './components/lista-adocoes/lista-adocoes.page';
import { CadastroAdocoesComponent } from './components/cadastro-adocoes/cadastro-adocoes.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    AdocoesPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListaAdocoesComponent, CadastroAdocoesComponent]
})
export class AdocoesPageModule {}
