import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { GenericListComponent } from 'src/app/generic-list.component';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent extends GenericListComponent<Activity> implements OnInit {

  constructor(protected service: ActivityService) {super(service) }

  displayedColumns: string[] = ['title', 'contact'];

  
}
