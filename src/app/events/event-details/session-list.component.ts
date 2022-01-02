import { AuthService } from './../../user/auth.service';
import { VoterService } from './voter.service';
import { Component, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared/event.model';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styles: [
    `
      collapsible-well h6 {
        margin-top: -5px;
        margin-bottom: 10px;
      }
    `,
  ],
})
export class SessionListComponent implements OnChanges {
  @Input() sessions!: ISession[];
  @Input() filterBy!: string;
  @Input() orderBy!: string;
  @Input() eventId: any;
  visibleSessions: ISession[] = [];

  constructor(public voterService: VoterService, public auth: AuthService) {}

  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.orderBy === 'name'
        ? this.visibleSessions.sort(orderByNameAsc)
        : this.visibleSessions.sort(orderByVoteDesc);
    }
  }

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(
        this.eventId,
        session,
        this.auth.currentUser.userName
      );
    } else {
      this.voterService.addVoter(
        this.eventId,
        session,
        this.auth.currentUser.userName
      );
    }

    if (this.orderBy === 'votes') {
      this.visibleSessions.sort(orderByVoteDesc);
    }
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(
      session,
      this.auth.currentUser.userName
    );
  }

  filterSessions(filter: string) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions?.slice(0);
    } else {
      this.visibleSessions = this.sessions?.filter((session) => {
        return session.level.toLowerCase() === filter;
      });
    }
  }
}

function orderByNameAsc(a: ISession, b: ISession) {
  if (a.name > b.name) return 1;
  else if (a.name === b.name) return 0;
  else return -1;
}

function orderByVoteDesc(a: ISession, b: ISession) {
  return b.voters.length - a.voters.length;
}
