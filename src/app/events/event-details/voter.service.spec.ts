import { VoterService } from './voter.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ISession } from './../shared/event.model';
import { Observable, of } from 'rxjs';

describe('Voter Service', () => {
  let voterService: VoterService, mockHttp: any;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    voterService = new VoterService(mockHttp);
  });

  describe('Delete voter', () => {
    it("Should remove voter from voter's list", () => {
      let session = { id: 1, voters: ['ahmad', 'ibrahim'] };
      mockHttp.delete.and.returnValue(of(false));

      voterService.deleteVoter(4, <ISession>session, 'ibrahim');

      expect(session.voters.length).toEqual(1);
      expect(session.voters[0]).toBe('ahmad');
    });
  });
});
