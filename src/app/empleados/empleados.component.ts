import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Empleado {
  idEmpleado: number;
  nomEmpleado: String;
  apePatEmp: String;
  apeMatEmp: String;
  fechaNac: Date;
  emailEmp: String;
}

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  constructor(private dataService: DataService, public dialog: MatDialog, public notificationService: NotificationService) { }

  ngOnInit() {
    this.getEmpleado();
  }

  dataSource: any;
  data: Array<any> = [];
  displayedColumns: string[] = ['nomEmpleado', 'apePatEmp', 'apeMatEmp', 'fechaNac', 'emailEmp', 'edit'];
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageIndex = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  getEmpleado() {
    this.dataService.cargarEmpleados().subscribe(
      x => {
        x.forEach(element => {
          this.data.push(element);
        });

        this.dataSource = new MatTableDataSource(this.data);
        this.length = x.length;
      },
      error => {
        console.log('There was an error while retrieving Empleados!' + error);
      });
  }

  editDialog(empleado: Empleado): void {
    const dialogRef = this.dialog.open(DialogEmpleado, {
      panelClass: ['col-sm-12', 'col-md-10', 'col-lg-8'],
      //width: '250px',
      data: { idEmpleado: empleado.idEmpleado, nomEmpleado: empleado.nomEmpleado, apePatEmp: empleado.apePatEmp, apeMatEmp: empleado.apeMatEmp, fechaNac: formatDate(new Date(empleado.fechaNac)), emailEmp: empleado.emailEmp }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = [];
      this.getEmpleado();
      //this.animal = result;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEmpleado, {
      panelClass: ['col-sm-12', 'col-md-10', 'col-lg-8'],
      data: { idEmpleado: 0, nomEmpleado: "", apePatEmp: "", apeMatEmp: "", fechaNac: null, emailEmp: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = [];
      this.getEmpleado();
    });
  }

  removeEmpleado(empleado: Empleado): void {
    if(confirm("Estás seguro de eliminar el empleado: "+empleado.nomEmpleado)) {
      this.dataService.eliminarEmpleado(empleado.idEmpleado).subscribe(
        (result)=>{
          this.notificationService.success('Empleado eliminado.');
          this.data = [];
          this.getEmpleado();
        },
        (error)=>{
          this.notificationService.error('Error desconocido. Favor de reportarlo con el administrador.');
        }
      );
    }
  }
}

@Component({
  selector: 'dialog-empleado',
  templateUrl: 'dialog-empleado.html',
})
export class DialogEmpleado {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogEmpleado>,
    @Inject(MAT_DIALOG_DATA) public data: Empleado, private formBuilder: FormBuilder, private dataService: DataService, public notificationService: NotificationService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      idEmpleado: [this.data.idEmpleado],
      nomEmpleado: [this.data.nomEmpleado, Validators.required],
      apePatEmp: [this.data.apePatEmp, Validators.required],
      apeMatEmp: [this.data.apeMatEmp, Validators.required],
      fechaNac: [this.data.fechaNac, Validators.required],
      emailEmp: [this.data.emailEmp, [Validators.required, Validators.email]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveData() {
    var idEmpleado = this.form.value.idEmpleado;
    if (idEmpleado == 0) {
      this.dataService.insertarEmpleado(this.form.value).subscribe(
        (result) => {
          //console.log(result);
          this.notificationService.success('Empleado insertado.');
          this.dialogRef.close();
        },
        (error) => {
          console.log(error);
          this.notificationService.error('Error desconocido. Favor de reportarlo con el administrador.');
        }
      );
    } else {
      this.form.removeControl('idEmpleado');
      this.dataService.actualizarEmpleado(this.form.value, idEmpleado).subscribe(
        (result) => {
          //console.log(result);
          this.notificationService.success('Empleado actualizado.');
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

function formatDate(date:Date) {
  var day = date.getUTCDate();
  var month = date.getUTCMonth()+1;
  var year = date.getUTCFullYear();
  //console.log(year.toString().length);

  return year+'-'+((month.toString().length==1)?'0'+month:month)+'-'+((day.toString().length==1)?'0'+day:day);
}