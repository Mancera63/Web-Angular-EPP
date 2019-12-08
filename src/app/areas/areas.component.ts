import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Area {
  idArea: number;
  nomArea: string;
}

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  constructor(private dataService: DataService, public dialog: MatDialog, public notificationService: NotificationService) { }

  ngOnInit() {
    this.getAreas();
  }

  dataSource: any;
  data: Array<any> = [];
  displayedColumns: string[] = ['nomArea', 'edit'];
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageIndex = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  getAreas() {
    this.dataService.cargarAreas().subscribe(
      x => {
        x.forEach(element => {
          this.data.push(element);
        });

        this.dataSource = new MatTableDataSource(this.data);
        this.length= x.length;
      },
      error => {
        console.log('There was an error while retrieving Areas!' + error);
      });
  }

  editDialog(area: Area): void {
    const dialogRef = this.dialog.open(DialogArea, {
      panelClass: ['col-sm-12', 'col-md-10', 'col-lg-8'],
      //width: '250px',
      data: { idArea: area.idArea, nomArea: area.nomArea }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = [];
      this.getAreas();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogArea, {
      panelClass: ['col-sm-12', 'col-md-10', 'col-lg-8'],
      data: { idArea: 0, nomArea: "", dirArea: "", emailArea: "", telArea: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = [];
      this.getAreas();
    });
  }

  removeArea(area: Area): void {
    if(confirm("Estás seguro de eliminar el area: "+area.nomArea)) {
      this.dataService.eliminarArea(area.idArea).subscribe(
        (result)=>{
          this.notificationService.success('Area eliminado.');
          this.data = [];
          this.getAreas();
        },
        (error)=>{
          this.notificationService.error('Error desconocido. Favor de reportarlo con el administrador.');
        }
      );
    }
  }
}

@Component({
  selector: 'dialog-area',
  templateUrl: 'dialog-area.html',
})
export class DialogArea {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogArea>,
    @Inject(MAT_DIALOG_DATA) public data: Area, private formBuilder: FormBuilder, private dataService: DataService, public notificationService: NotificationService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      idArea: [this.data.idArea],
      nomArea: [this.data.nomArea, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveData() {
    var idArea = this.form.value.idArea;
    if (idArea == 0) {
      this.dataService.insertarArea(this.form.value).subscribe(
        (result) => {
          //console.log(result);
          this.notificationService.success('Area insertado.');
          this.dialogRef.close();
        },
        (error) => {
          console.log(error);
          this.notificationService.error('Error desconocido. Favor de reportarlo con el administrador.');
        }
      );
    } else {
      this.form.removeControl('idArea');
      this.dataService.actualizarArea(this.form.value, idArea).subscribe(
        (result) => {
          //console.log(result);
          this.notificationService.success('Area actualizado.');
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