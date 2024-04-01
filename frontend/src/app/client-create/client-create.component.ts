import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, ClientFormComponent],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.scss'
})
export class ClientCreateComponent {

  constructor(private router: Router, private http: HttpClient) { }

  onSubmit(formData: any) {
    this.http.post<any>('api/v1/clients', formData).subscribe({
      next: response => {
        console.log('success!', response);
        // Redirect to another page
        this.router.navigate(['/clients']);
      },
      error: error => {
        // TODO Add toast in v2
        console.error('Error posting form data:', error);
      }
    });
  }

}
