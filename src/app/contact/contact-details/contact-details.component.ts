import { Component, OnInit, Input, OnChanges, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { GenericDetailsComponent } from 'src/app/generic-details.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent extends GenericDetailsComponent<Contact> implements OnInit, OnChanges {

  constructor(
    protected formBuilder: FormBuilder,
    public service: ContactService,
    public _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    super(formBuilder, service, _snackBar)
  }
    
  displayedColumns = ['name', 'weight'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      telephoneNumber: new FormControl,
      address1: new FormControl,
      address2: new FormControl,
      city: new FormControl,
      postCode: new FormControl
    })
  }

  deleteObject() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {object: 'contact'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        super.deleteObject();
      }      
    });
  }

}

const ELEMENT_DATA: Contact[] = [

];