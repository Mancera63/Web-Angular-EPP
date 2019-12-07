import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  constructor(private dataService: DataService) { }

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

  /*changePage(event?: PageEvent) {
    this.pageSize = 10;
    this.pageIndex = 0;
    //console.log(event);
    if (event != null) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
    }
    this.getClientes();
    //console.log('cambio'); 
    return event;
  }*/

  getClientes() {
    this.dataService.cargarClientes().subscribe(
      x => {
        x.forEach(element => {
          this.data.push(element);
        });

        this.dataSource = new MatTableDataSource(this.data);

        //this.dataSource = new MatTableDataSource(x);  
        //this.dataSource.sort = this.sort;
        this.length= x.length;
      },
      error => {
        console.log('There was an error while retrieving Clientes!' + error);
      });
  }

  onEdit() {

  }

}
