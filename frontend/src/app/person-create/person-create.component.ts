import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { PersonFormComponent } from '../person-form/person-form.component';


@Component({
  selector: 'app-person-create',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, PersonFormComponent],
  templateUrl: './person-create.component.html',
  styleUrl: './person-create.component.scss'
})
export class PersonCreateComponent {

  constructor(private router: Router, private http: HttpClient) { }

  onSubmit(formData: any) {
    this.http.post<any>('api/v1/people', formData).subscribe({
      next: response => {
        console.log('success!', response);
        // Redirect to another page
        this.router.navigate(['/people']);
      },
      error: error => {
        // TODO Add toast in v2
        console.error('Error posting form data:', error);
      }
    });
  }

}
