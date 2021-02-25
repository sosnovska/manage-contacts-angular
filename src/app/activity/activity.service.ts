import { Injectable } from '@angular/core';
import { GenericService } from '../generic.service';
import { Activity } from './activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends GenericService<Activity> {

  public objectUrl = 'activities';
}
