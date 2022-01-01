import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService, IEvent, ISession } from '../shared/index';

@Component({
  templateUrl: './event-details.component.html',
  styles: [
    `
      .container {
        padding-left: 20px;
        padding-right: 20px;
      }
      .event-image {
        height: 100px;
      }
      a {
        cursor: pointer;
      }
    `,
  ],
})
export class EventDetailsComponent implements OnInit {
  event?: IEvent;
  addMode!: boolean;
  filterBy: string = 'all';
  orderBy: string = 'vote';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  addSession() {
    this.addMode = true;
  }
  ngOnInit() {
    this.route.data.forEach((data) => {
      this.event = data['event'];
      this.addMode = false;
    });
  }

  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(
      null,
      this.event!.sessions.map((session) => session.id)
    );
    session.id = nextId + 1;
    this.event?.sessions.push(session);
    this.eventService.saveEvent(this.event).subscribe();
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}

// this.eventService.getEvent(+params['id']).subscribe((event: IEvent) => {
//   this.event = event;
//   this.addMode = false
// })
