import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';

import {
  EventsListComponent,
  EventThumbNailComponent,
  EventService,
  EventDetailsComponent,
  EventRouteActivator,
  EventListResolver,
  CreateEventComponent
} from './events/index'

import {EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { ToastrService } from './common/toastr.service';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';

@NgModule({

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],

  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbNailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component
  ],

   providers: [
     EventService,
    ToastrService,
    EventListResolver,
    AuthService,
    EventRouteActivator,{
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }


export function checkDirtyState(component:CreateEventComponent){

  if(component.isDirty){
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
