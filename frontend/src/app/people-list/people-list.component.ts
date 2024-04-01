import { Component } from '@angular/core';
import { Person } from '../model/person';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTableModule, MatIconModule, HttpClientModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.scss'
})
export class PeopleListComponent {
  title = 'People List';
  loading = true;
  people: Person[] = [];
  displayedColumns = ['name', 'email', 'client', 'actions'];
  feedback: any = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loading = true;
    this.http.get<any>('api/v1/people').subscribe((data: any) => {
      this.people = data?._embedded?.people;
      this.loading = false;
      this.feedback = {};
    });
  }

  delete(person: Person): void {
    if (confirm(`Are you sure you want to delete "${person.firstName} ${person.lastName}"?`)) {
      this.http.delete(`${person._links.self.href}`).subscribe({
        next: () => {
          this.feedback = {type: 'success', message: `"${person.firstName} ${person.lastName}" was deleted`};
          setTimeout(() => {
            this.ngOnInit();
          }, 1000);
        },
        error: () => {
          this.feedback = {type: 'warning', message: `Unable to delete "${person.firstName} ${person.lastName}". Try again later.`};
        }
      });
    }
  }

  protected readonly event = event;
}
