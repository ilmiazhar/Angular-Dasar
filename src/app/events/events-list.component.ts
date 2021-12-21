import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, IEvent} from './shared/index';

// declare let toastr: any

@Component({
  template: `
    <div>
      <hr />
      <h1>Upcoming Angular Events</h1>
      <div class="row">
        <div *ngFor="let event of events" class="col-md-5">
          <event-thumbnail
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
    private eventService: EventService, private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.events = this.route.snapshot.data['events']
  }

}
