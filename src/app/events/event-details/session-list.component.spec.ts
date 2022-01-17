import { SessionListComponent } from './session-list.component';
import { ISession } from '../shared/event.model';

describe('Session List Component', () => {
  let component: SessionListComponent,
    mockAuthService: any,
    mockVoterService: any;

  beforeEach(() => {
    component = new SessionListComponent(mockAuthService, mockVoterService);
  });

  describe('ngOnChanges', () => {
    it('Should filter sessions correctly', () => {
      component.sessions = <ISession[]>[
        { name: 'session 3', level: 'advanced' },
        { name: 'session 2', level: 'intermediate' },
        { name: 'session 1', level: 'advanced' },
      ];
      component.filterBy = 'advanced';
      component.orderBy = 'name';
      component.eventId = 4;

      component.ngOnChanges();

      expect(component.visibleSessions.length).toBe(2);
      expect(component.visibleSessions[1].name).toBe('session 3');
    });
  });
});
