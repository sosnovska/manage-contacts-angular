import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { GenericDetailsComponent } from 'src/app/generic-details.component';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent extends GenericDetailsComponent<Activity> implements OnInit, OnChanges {

  constructor(
    protected formBuilder: FormBuilder,
    public service: ActivityService,
    public _snackBar: MatSnackBar
  ) {
    super(formBuilder, service, _snackBar)
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      contact: new FormControl(),
      activityType: new FormControl(),
      title: new FormControl(),
      dueDate: new FormControl('', [Validators.required]),
      notes: new FormControl('', [Validators.required]),
    })
  }

}
