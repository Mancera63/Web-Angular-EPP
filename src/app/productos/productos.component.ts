import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Producto {
  idProducto: number;
  nomProducto: String;
  costo: number;
  precio: number;
  existencia: number;
  reorden: number;
  comprometidas: number;
  vigente: boolean;
  imagen: String;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  constructor(private dataService: DataService, public dialog: MatDialog, public notificationService: NotificationService) { }

  ngOnInit() {
    this.getProducto();
  }

  dataSource: any;
  data: Array<any> = [];
  displayedColumns: string[] = ['nomProducto', 'costo', 'precio', 'existencia', 'reorden', 'comprometidas', 'vigente', 'imagen', 'edit'];
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageIndex = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  getProducto() {
    this.dataService.cargarProductos().subscribe(
      x => {
        x.forEach(element => {
          this.data.push(element);
        });

        this.dataSource = new MatTableDataSource(this.data);
        this.length = x.length;
      },
      error => {
        console.log('There was an error while retrieving Productos!' + error);
      });
  }

  editDialog(producto: Producto): void {
    const dialogRef = this.dialog.open(DialogProducto, {
      panelClass: ['col-sm-12', 'col-md-10', 'col-lg-8'],
      //width: '250px',
      data: { idProducto: producto.idProducto, nomProducto: producto.nomProducto, costo: producto.costo, precio: producto.precio, existencia:producto.existencia, comprometidas: producto.comprometidas, reorden:producto.reorden, vigente:producto.vigente, imagen:producto.imagen }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = [];
      this.getProducto();
      //this.animal = result;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogProducto, {
      panelClass: ['col-sm-12', 'col-md-10', 'col-lg-8'],
      data: { idProducto: 0, nomProducto: "", costo: 0, precio: 0, existencia: 0, comprometidas: 0, reorden: 0, vigente: false, imagen: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = [];
      this.getProducto();
    });
  }

  removeProducto(producto: Producto): void {
    if(confirm("Estás seguro de eliminar el producto: "+producto.nomProducto)) {
      this.dataService.eliminarProducto(producto.idProducto).subscribe(
        (result)=>{
          this.notificationService.success('Producto eliminado.');
          this.data = [];
          this.getProducto();
        },
        (error)=>{
          this.notificationService.error('Error desconocido. Favor de reportarlo con el administrador.');
        }
      );
    }
  }
}

@Component({
  selector: 'dialog-producto',
  templateUrl: 'dialog-producto.html',
})
export class DialogProducto {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogProducto>,
    @Inject(MAT_DIALOG_DATA) public data: Producto, private formBuilder: FormBuilder, private dataService: DataService, public notificationService: NotificationService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      idProducto: [this.data.idProducto],
      nomProducto: [this.data.nomProducto, Validators.required],
      precio: [this.data.precio, Validators.required],
      costo: [this.data.costo, Validators.required],
      comprometidas: [this.data.comprometidas, Validators.required],
      existencia: [this.data.existencia, Validators.required],
      reorden: [this.data.reorden, Validators.required],
      vigente: [(this.data.vigente)?"1":"0", Validators.required],
      imagen: [this.data.imagen, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveData() {
    var idProducto = this.form.value.idProducto;
    var prod = this.form.value;
    prod['vigente'] = (this.form.value.vigente==0)?false:true;
    if (idProducto == 0) {
      this.dataService.insertarProducto(prod).subscribe(
        (result) => {
          //console.log(result);
          this.notificationService.success('Producto insertado.');
          this.dialogRef.close();
        },
        (error) => {
          console.log(error);
          this.notificationService.error('Error desconocido. Favor de reportarlo con el administrador.');
        }
      );
    } else {
      //this.form.removeControl('idProducto');
      delete prod['idProducto'];
      this.dataService.actualizarProducto(prod, idProducto).subscribe(
        (result) => {
          //console.log(result);
          this.notificationService.success('Producto actualizado.');
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
