import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Area } from '../areas/areas.component';
import { Cliente } from '../clientes/clientes.component';

export interface AreaCliente {
  idAreaCliente: number;
  noEmpleados: number;
  area: Area;
  cliente: Cliente;
}

@Component({
  selector: 'app-areas-clientes',
  templateUrl: './areas-clientes.component.html',
  styleUrls: ['./areas-clientes.component.scss']
})
export class AreasClientesComponent implements OnInit {

  constructor(private dataService: DataService, public dialog: MatDialog, public notificationService: NotificationService) { }

  ngOnInit() {
    this.getAreaClientes();
  }

  dataSource: any;
  data: Array<any> = [];
  displayedColumns: string[] = ['noEmpleados', 'area', 'cliente', 'edit'];
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageIndex = 0;
  area: Area;
  cliente: Cliente;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  getAreaClientes() {
    this.dataService.cargarAreasClientes().subscribe(
      x => {
        x.forEach(element => {
          this.dataService.cargarArea(element.area.idArea).subscribe(
            area => {
              element.area = area[0];
            }
          );
          this.dataService.cargarCliente(element.cliente.idCliente).subscribe(
            cliente => {
              element.cliente = cliente[0];
            }
          );
          //console.log(element);
          this.data.push(element);
        });

        this.dataSource = new MatTableDataSource(this.data);
        this.length = x.length;
      },
      error => {
        console.log('There was an error while retrieving AreasClientes!' + error);
      });
  }

  editDialog(areacliente: AreaCliente): void {
    const dialogRef = this.dialog.open(DialogAreaCliente, {
      panelClass: ['col-sm-12', 'col-md-10', 'col-lg-8'],
      //width: '250px',
      data: { idAreaCliente: areacliente.idAreaCliente, noEmpleados: areacliente.noEmpleados, area: areacliente.area, cliente: areacliente.cliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = [];
      this.getAreaClientes();
      //this.animal = result;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAreaCliente, {
      panelClass: ['col-sm-12', 'col-md-10', 'col-lg-8'],
      data: { idAreaCliente: 0, noEmpleados: "", area: {idArea:0}, cliente: {idCliente:0} }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = [];
      this.getAreaClientes();
    });
  }

  removeAreaCliente(areacliente: AreaCliente): void {
    if (confirm("Estás seguro de eliminar el area-cliente: " + areacliente.idAreaCliente)) {
      this.dataService.eliminarAreaCliente(areacliente.idAreaCliente).subscribe(
        (result) => {
          this.notificationService.success('Area-Cliente eliminado.');
          this.data = [];
          this.getAreaClientes();
        },
        (error) => {
          this.notificationService.error('Error desconocido. Favor de reportarlo con el administrador.');
        }
      );
    }
  }
}
@Component({
  selector: 'dialog-area-cliente',
  templateUrl: 'dialog-area-cliente.html',
})
export class DialogAreaCliente {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAreaCliente>,
    @Inject(MAT_DIALOG_DATA) public data: AreaCliente, private formBuilder: FormBuilder, private dataService: DataService, public notificationService: NotificationService) { }

  areas: Area[] = [];
  clientes: Cliente[] = [];

  ngOnInit() {
    this.dataService.cargarAreas().subscribe(
      x => {
        this.areas = x;
      }
    );

    this.dataService.cargarClientes().subscribe(
      x => {
        this.clientes = x;
      }
    );

    this.form = this.formBuilder.group({
      idAreaCliente: [this.data.idAreaCliente],
      noEmpleados: [this.data.noEmpleados, Validators.required],
      area: [this.data.area.idArea, Validators.required],
      cliente: [this.data.cliente.idCliente, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveData() {
    var areacte = this.form.value;
    areacte['area'] = { idArea: areacte['area'] };
    areacte['cliente'] = { idCliente: areacte['cliente'] };
    //console.log(areacte);
    var idAreaCliente = this.form.value.idAreaCliente;
    if (idAreaCliente == 0) {
      this.dataService.insertarAreaCliente(areacte).subscribe(
        (result) => {
          //console.log(result);
          this.notificationService.success('Area-Cliente insertado.');
          this.dialogRef.close();
        },
        (error) => {
          console.log(error);
          this.notificationService.error('Error desconocido. Favor de reportarlo con el administrador.');
        }
      );
    } else {
      //this.form.removeControl('idAreaCliente');
      delete areacte["idAreaCliente"];
      this.dataService.actualizarAreaCliente(areacte, idAreaCliente).subscribe(
        (result) => {
          //console.log(result);
          this.notificationService.success('Area-Cliente actualizado.');
          this.dialogRef.close();
        },
        (error) => {
          console.log(error);
          this.notificationService.error('Error desconocido. Favor de reportarlo con el administrador.');
        }
      );
    }
  }
}