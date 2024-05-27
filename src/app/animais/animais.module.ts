import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { AnimaisPageRoutingModule } from './animais-routing.module';

import { ListaAnimaisComponent } from './components/lista-animais/lista-animais.page';
import { CadastroAnimaisComponent } from './components/cadastro-animais/cadastro-animais.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    AnimaisPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [ListaAnimaisComponent, CadastroAnimaisComponent]
})
export class AnimaisPageModule {}
