import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroAnimaisComponent } from './components/cadastro-animais/cadastro-animais.component';

import { ListaAnimaisComponent } from './components/lista-animais/lista-animais.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAnimaisComponent
  },
  {
    path: 'cadastro',
    component: CadastroAnimaisComponent
  },
  {
    path: 'edicao/:id',
    component: CadastroAnimaisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimaisPageRoutingModule {}
