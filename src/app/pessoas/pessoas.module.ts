import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { PessoasPageRoutingModule } from './pessoas-routing.module';

import { ListaPessoasComponent } from './components/lista-pessoas/lista-pessoas.page';
import { CadastroPessoasComponent } from './components/cadastro-pessoas/cadastro-pessoas.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    PessoasPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [ListaPessoasComponent, CadastroPessoasComponent]
})
export class PessoasPageModule {}
