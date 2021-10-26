import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {
  appRoutes,
  AuthService,
  EventService,
  ToastrService,
  NavBarComponent,
  Error404Component,
  EventListResolver,
  EventsAppComponent,
  EventsListComponent,
  EventRouteActivator,
  CreateEventComponent,
  EventDetailsComponent,
  CreateSessionComponent,
  EventThumbnailComponent,
  SessionListComponent
} from './index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    NavBarComponent,
    Error404Component,
    EventsAppComponent,
    EventsListComponent,
    CreateEventComponent,
    EventDetailsComponent,
    CreateSessionComponent,
    EventThumbnailComponent,
    SessionListComponent
  ],
  providers: [
    EventService,
    ToastrService,
    EventRouteActivator,
    EventListResolver,
    AuthService,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
  ],
  bootstrap: [EventsAppComponent],
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty)
    return window.confirm(
      'You have not saved this event, do you really want to continue?'
    );

  return true;
}
