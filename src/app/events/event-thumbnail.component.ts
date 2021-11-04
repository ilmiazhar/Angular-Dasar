import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from './shared/event.model';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
      <h2>{{ event?.name | uppercase }}</h2>
      <div>Date: {{ event?.date | date: 'M/d/y' }}</div>
      <div [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">
        Time: {{ event?.time }}
        <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
        <span *ngSwitchDefault>(Normal Start)</span>
        <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
      </div>
      <div>Price: \${{ event?.price }}</div>
      <div [hidden]="!event?.location">
        <span>Location: {{ event?.location?.address }}</span>
        <span class="left-pad"
          >{{ event?.location?.city }}, {{ event?.location?.country }}</span
        >
      </div>
      <div *ngIf="event?.onlineUrl">Online URL: {{ event?.onlineUrl }}</div>
    </div>
  `,
  styles: [
    `
      .green {
        color: #003300 !important;
      }
      .bold {
        font-weight: bold;
      }
      .thumbnail {
        min-height: 210px;
      }
      .left-pad {
        margin-left: 10px;
      }

      .well div {
        color: #bbb;
      }
    `,
  ],
})
export class EventThumbnailComponent {
  @Input() event!: IEvent;
  @Output() eventClick = new EventEmitter();
  someProperty: any = 'some value';

  getStartTimeClass() {
    if (this.event && this.event.time === '8:00 am') return 'green bold';
    return '';
  }

  getStartTimeStyle() {
    if (this.event && this.event.time === '8:00 am')
      return { color: '#003300', 'font-weight': 'bold' };
    return {};
  }
}
