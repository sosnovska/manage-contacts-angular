import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { GenericListComponent } from 'src/app/generic-list.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent extends GenericListComponent<Contact> implements OnInit {

  constructor(protected service: ContactService) {super(service) }

  displayedColumns: string[] = ['name'];
  
}
