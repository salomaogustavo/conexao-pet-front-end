import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroAdocoesComponent } from './components/cadastro-adocoes/cadastro-adocoes.component';
import { ListaAdocoesComponent } from './components/lista-adocoes/lista-adocoes.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAdocoesComponent
  },
  {
    path: 'cadastro',
    component: CadastroAdocoesComponent
  },
  {
    path: 'edicao/:id',
    component: CadastroAdocoesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdocoesPageRoutingModule {}
