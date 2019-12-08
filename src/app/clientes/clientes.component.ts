import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../notification.service';

export interface Cliente {
  idCliente: number;
  nomCliente: string;
  dirCliente: string;
  emailCliente: string;
  telCliente: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  idCliente: number;
  nomCliente: string;
  dirCliente: string;
  emailCliente: string;
  telCliente: string;

  constructor(private dataService: DataService, public dialog: MatDialog, public notificationService: NotificationService) { }

  ngOnInit() {
    this.getClientes();
  }

  dataSource: any;
  data: Array<any> = [];
  displayedColumns: string[] = ['nomCliente', 'dirCliente', 'emailCliente', 'telCliente', 'edit'];
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageIndex = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  getClientes() {
    this.dataService.cargarClientes().subscribe(
      x => {
        x.forEach(element => {
          this.data.push(element);
        });

        this.dataSource = new MatTableDataSource(this.data);
        this.length = x.length;
      },
      error => {
        console.log('There was an error while retrieving Clientes!' + error);
      });
  }

  editDialog(cliente: Cliente): void {
    const dialogRef = this.dialog.open(DialogCliente, {
      panelClass: ['col-sm-12', 'col-md-10', 'col-lg-8'],
      //width: '250px',
      data: { idCliente: cliente.idCliente, nomCliente: cliente.nomCliente, dirCliente: cliente.dirCliente, emailCliente: cliente.emailCliente, telCliente: cliente.telCliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = [];
      this.getClientes();
      //this.animal = result;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCliente, {
      panelClass: ['col-sm-12', 'col-md-10', 'col-lg-8'],
      data: { idCliente: 0, nomCliente: "", dirCliente: "", emailCliente: "", telCliente: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = [];
      this.getClientes();
    });
  }

  removeCliente(cliente: Cliente): void {
    if(confirm("Estás seguro de eliminar el cliente: "+cliente.nomCliente)) {
      this.dataService.eliminarCliente(cliente.idCliente).subscribe(
        (result)=>{
          this.notificationService.success('Cliente eliminado.');
          this.data = [];
          this.getClientes();
        },
        (error)=>{
          this.notificationService.error('Error desconocido. Favor de reportarlo con el administrador.');
        }
      );
    }
  }
}

@Component({
  selector: 'dialog-cliente',
  templateUrl: 'dialog-cliente.html',
})
export class DialogCliente {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogCliente>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente, private formBuilder: FormBuilder, private dataService: DataService, public notificationService: NotificationService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      idCliente: [this.data.idCliente],
      nomCliente: [this.data.nomCliente, Validators.required],
      dirCliente: [this.data.dirCliente, Validators.required],
      emailCliente: [this.data.emailCliente, [Validators.required, Validators.email]],
      telCliente: [this.data.telCliente, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveData() {
    var idCliente = this.form.value.idCliente;
    if (idCliente == 0) {
      this.dataService.insertarCliente(this.form.value).subscribe(
        (result) => {
          //console.log(result);
          this.notificationService.success('Cliente insertado.');
          this.dialogRef.close();
        },
        (error) => {
          console.log(error);
          this.notificationService.error('Error desconocido. Favor de reportarlo con el administrador.');
        }
      );
    } else {
      this.form.removeControl('idCliente');
      this.dataService.actualizarCliente(this.form.value, idCliente).subscribe(
        (result) => {
          //console.log(result);
          this.notificationService.success('Cliente actualizado.');
          this.dialogRef.close();
        },
        (error) => {
          console.log(error);
          this.notificationService.error('Error desconocido. Favor de reportarlo con el administrador.');
        }
      );
    }
    //console.log(this.form.value);
  }

}