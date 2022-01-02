import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
  Toastr,
  JQ_TOKEN,
  appRoutes,
  AuthService,
  VoterService,
  EventService,
  DurationPipe,
  TOASTR_TOKEN,
  EventResolver,
  UpvoteComponent,
  NavBarComponent,
  Error404Component,
  LocationValidator, 
  EventListResolver,
  EventsAppComponent,
  EventsListComponent,
  SimpleModalComponent,
  CreateEventComponent,
  EventDetailsComponent,
  CreateSessionComponent,
  EventThumbnailComponent,
  CollapsibleWellComponent,
  ModalTriggerDirective,
  SessionListComponent,
} from './index';

// declare let toastr: Toastr;
// declare let jQuery: any;
let toastr: Toastr = (window as { [key: string]: any })['toastr'];
let jQuery = (window as { [key: string]: any })['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  declarations: [
    DurationPipe,
    NavBarComponent,
    UpvoteComponent,
    Error404Component,
    LocationValidator,
    EventsAppComponent,
    EventsListComponent,
    CreateEventComponent,
    SimpleModalComponent,
    SessionListComponent,
    EventDetailsComponent,
    ModalTriggerDirective,
    CreateSessionComponent,
    EventThumbnailComponent,
    CollapsibleWellComponent,
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    EventResolver,
    EventListResolver,
    AuthService,
    VoterService,
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
