import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuardianService } from './login/login-guardian.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AreasComponent } from './areas/areas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AreasClientesComponent } from './areas-clientes/areas-clientes.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuardianService] },
  {
    path: 'dash', component: DashboardComponent, canActivate: [LoginGuardianService], children: [
      { path: 'areas', component: AreasComponent, canActivate: [LoginGuardianService] },
      { path: 'clientes', component: ClientesComponent, canActivate: [LoginGuardianService] },
      { path: 'areas-clientes', component: AreasClientesComponent, canActivate: [LoginGuardianService] }
    ]
  },
  { path: '**', component: DashboardComponent, canActivate: [LoginGuardianService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
