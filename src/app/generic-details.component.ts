import { Component, Input, OnChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GenericService } from './generic.service';
import { MatSnackBar } from '@angular/material';

export abstract class GenericDetailsComponent<T extends { id: any; }> implements OnChanges, OnInit {

  form: FormGroup;
  @Input() id: number = null;
  @Output() updated = new EventEmitter();

  currentId: number = null;
  editMode: boolean = false;

  constructor(
    protected formBuilder: FormBuilder,
    protected service: GenericService<T>,
    protected _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({})
  }

  ngOnChanges() {
    if (this.id != this.currentId) {
      this.currentId = this.id;
      if (this.id == null) {
        this.editMode = false;
        this.form.reset();
      } else {
        this.editMode = true;
        this.setCurrentObject(this.id);
      }
    }
  }

  refreshObjectsList() {
    this.updated.emit(true);
  }

  setCurrentObject(id: number) {
    this.service.findOneById(id).subscribe(
      (result) => this.processObject(result),
      (error) => this.openSnackBar('Operation unsuccessfull', 'Error')

    )
  }

  deleteObject() {
    this.service.delete(this.id).subscribe(
      (result) => {
        this.refreshObjectsList();
        this.form.reset();
        this.currentId = null;
        this.editMode = false;
        this.openSnackBar('The object has been deleted', '')

      },
      (error) => this.openSnackBar('Operation unsuccessfull', 'Error')
    )
  }

  saveObject() {
    if (!this.editMode) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    this.service.create(this.form.getRawValue()).subscribe(
      (result) => {
        this.refreshObjectsList();
        this.form.reset();
        this.editMode = false;
        this.openSnackBar('The object has been created', '')
      },
      (error) => this.openSnackBar('Operation unsuccessfull', 'Error')
    )
  }

  update() {
    let currentObject = this.form.getRawValue();
    currentObject.id = this.currentId;
    this.service.update(currentObject).subscribe(
      (result) => {
        this.refreshObjectsList(); 
        this.openSnackBar('The object has been updated', '')
      },
      (error) => this.openSnackBar('Operation unsuccessfull', 'Error')
    )
  }

  processObject(object: T) {
    this.form.patchValue(object);
    this.currentId = object.id;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
