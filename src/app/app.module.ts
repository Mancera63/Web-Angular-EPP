import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatProgressSpinnerModule, MatCardModule, MatFormFieldModule, MatToolbarModule, MatButtonToggleModule,
  MatInputModule, MatIconModule, MatCheckboxModule, MatButtonModule, MatSnackBarModule, MatListModule,
  MatSidenavModule, MatTableModule, MatPaginatorModule, MatDialogModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreasComponent } from './areas/areas.component';
import { ClientesComponent, DialogCliente } from './clientes/clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AreasComponent,
    ClientesComponent,
    DialogCliente
  ],
  imports: [
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogCliente
  ]
})
export class AppModule { }
