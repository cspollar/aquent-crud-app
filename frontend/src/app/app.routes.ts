import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import {PersonCreateComponent} from './person-create/person-create.component';

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
    path: 'clients',
    component: ClientsListComponent
  }
];
