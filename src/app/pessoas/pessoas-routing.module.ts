import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroPessoasComponent } from './components/cadastro-pessoas/cadastro-pessoas.component';

import { ListaPessoasComponent } from './components/lista-pessoas/lista-pessoas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPessoasComponent
  },
  {
    path: 'cadastro',
    component: CadastroPessoasComponent
  },
  {
    path: 'edicao/:id',
    component: CadastroPessoasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoasPageRoutingModule {}
