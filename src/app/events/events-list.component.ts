import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../common/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent} from './shared/index';

// declare let toastr: any

@Component({
  template: `
    <div>
      <hr />
      <h1>Upcoming Angular Events</h1>
      <div class="row">
        <div *ngFor="let event of events" class="col-md-5">
          <event-thumbnail
            (click)="handleThumbnailClick(event.name)"
            [event]="event"
          ></event-thumbnail>
        </div>
      </div>
    </div>
  `,
})
export class EventsListComponent implements OnInit {
  events?: IEvent[]

  constructor(
    private toastr: ToastrService, private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.events = this.route.snapshot.data['events']
  }

  handleThumbnailClick(eventName: any) {
    this.toastr.success(eventName);
  }
}
