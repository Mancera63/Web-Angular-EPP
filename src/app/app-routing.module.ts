import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuardianService } from './login/login-guardian.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AreasComponent } from './areas/areas.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuardianService] },
  {
    path: 'dash', component: DashboardComponent, children: [
      { path: 'areas', component: AreasComponent, canActivate: [LoginGuardianService] }
    ]
  },
  /*{path: 'menu', component: MenuComponent, canActivate:[LoginGuardian], children:[
  {path: 'tabla-clientes', component: TablaClientesComponent, canActivate:[LoginGuardian]},
  {path: 'tabla-interesados', component: TablaInteresadosComponent, canActivate:[LoginGuardian]},
  {path: 'lista-recordatorios', component: ListaRecoComponent, canActivate:[LoginGuardian]},
  {path: 'tabla-reportes', component: TablaReporteComponent, canActivate:[LoginGuardian]},
  {path: 'tabla-ventas', component: TablaVentasComponent, canActivate:[LoginGuardian]},
]},*/
  { path: '**', component: DashboardComponent, canActivate: [LoginGuardianService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
