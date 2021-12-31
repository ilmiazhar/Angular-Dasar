import { Component } from '@angular/core';
import { EventService } from '../events/shared/event.service';
import { AuthService } from './../user/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .nav.navbar-nav {
        font-size: 15px;
      }
      #searchForm {
        margin-right: 100px;
      }
      @media (max-width: 1200px) {
        #searchForm {
          display: none;
        }
      }
      li > a.active {
        color: #f97924;
      }
    `,
  ],
})
export class NavBarComponent {
  searchTerm: string = "";
  foundSessions?: any[];

  constructor(public auth: AuthService, public eventService: EventService) {}

  searchSessions(searchTerm: any) {
    this.eventService.searchSessions(searchTerm).subscribe((sessions: any) => {
      this.foundSessions = sessions;
      console.log(this.foundSessions);
    });
  }
}
