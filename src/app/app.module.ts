import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {
  Toastr,
  JQ_TOKEN,
  appRoutes,
  AuthService,
  EventService,
  DurationPipe,
  TOASTR_TOKEN,
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
  CollapsibleWellComponent,
  SessionListComponent,
} from './index';

//declare let toastr: Toastr;
let toastr: Toastr = (window as { [key: string]: any })['toastr']
let jQuery = (window as { [key: string]: any })['$']

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    DurationPipe,
    NavBarComponent,
    Error404Component,
    EventsAppComponent,
    EventsListComponent,
    CreateEventComponent,
    SessionListComponent,
    EventDetailsComponent,
    CreateSessionComponent,
    EventThumbnailComponent,
    CollapsibleWellComponent,
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
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
