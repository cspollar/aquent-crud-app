import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import {PersonCreateComponent} from './person-create/person-create.component';
import {PersonEditComponent} from './person-edit/person-edit.component';
import {ClientCreateComponent} from './client-create/client-create.component';
import {ClientEditComponent} from './client-edit/client-edit.component'

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'people',
    component: PeopleListComponent
  },
  {
    path: 'people/new',
    component: PersonCreateComponent
  },
  {
    path: 'people/:id/edit',
    component: PersonEditComponent
  },
  {
    path: 'clients',
    component: ClientsListComponent
  },
  {
    path: 'clients/new',
    component: ClientCreateComponent
  },
  {
    path: 'clients/:id/edit',
    component: ClientEditComponent
  }
];
