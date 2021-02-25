import {  OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { GenericService } from './generic.service';


export abstract class GenericListComponent<T extends { id: any; }> implements OnInit {

  objects: T[];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource(this.objects);
  id = null;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(protected service: GenericService<T>) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(
      (result) => {
        this.objects = result;
        this.dataSource = new MatTableDataSource(result)
      },
      (error) => console.log('Error intercepted')
    )
  }

  openDetails(object: T) {
    this.id = object.id;
  }

  add() {
    this.id = null;
  }

  onUpdated(updated: boolean) {
    if (updated) {
      this.findAll();
    }
  }
}
