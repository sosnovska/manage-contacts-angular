import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { Contact } from './contact';
import { environment } from 'src/environments/environment';
import { GenericService } from '../generic.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends GenericService<Contact>{

  public objectUrl: string = 'contacts';

}
