import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ToastrService } from '../common/toastr.service';

declare let toastr: any;

@Component({
  template: `
    <div>
      <hr />
      <h1>Upcoming Angular Events</h1>
      <div class="row">
        <div *ngFor="let event of events" class="col-md-5">
          <events-thumbnail
            (click)="handleThumbnailClick(event.name)"
            [event]="event"
          ></events-thumbnail>
        </div>
      </div>
    </div>
  `,
})
export class EventsListComponent implements OnInit {
  events!: any[];

  constructor(
    private eventService: EventService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.events = this.eventService.getEvents();
  }

  handleThumbnailClick(eventName: any) {
    this.toastr.success(eventName);
  }
}
