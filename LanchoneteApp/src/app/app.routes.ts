import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { PainelAdministrativoComponent } from './pages/painel-administrativo/painel-administrativo.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { MeusPedidosComponent } from './pages/meus-pedidos/meus-pedidos.component';
import { isLoggedGuard } from './core/guards/is-logged.guard';
import { noLoggedGuard } from './core/guards/no-logged.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [noLoggedGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [noLoggedGuard] },
  { path: 'cardapio', component: CardapioComponent },
  { path: 'administrativo', component: PainelAdministrativoComponent, canActivate: [adminGuard] },
  { path: 'perfil', component: EditarPerfilComponent, canActivate: [isLoggedGuard] },
  { path: 'meus-pedidos', component: MeusPedidosComponent, canActivate: [isLoggedGuard] },
  { path: '**', redirectTo: '' },
];
