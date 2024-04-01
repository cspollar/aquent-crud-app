import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonFormComponent } from '../person-form/person-form.component';

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, PersonFormComponent],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss'
})
export class PersonEditComponent implements OnInit {
  title = 'Edit Person';
  initialData: any;
  loading = true;
  personId: number | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.personId = params['id'];
      if (this.personId) {
        this.fetchPerson(this.personId);
      }
    });
  }

  fetchPerson(personId: number): void {
    this.http.get<any>(`api/v1/people/${personId}`).subscribe({
      next: response => {
        this.loading = false;
        this.initialData = response;
      },
      error: error => {
        // TODO Add toast in v2
        console.error('Error posting form data:', error);
      }
    });
  }

  onSubmit(formData: any) {
    this.http.put<any>(`api/v1/people/${this.personId}`, formData).subscribe({
      next: () => {
        this.router.navigate(['/people']);
      },
      error: error => {
        // TODO Add toast in v2
        console.error('Error posting form data:', error);
      }
    });
  }

}
