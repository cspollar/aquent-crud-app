import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, ClientFormComponent],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent {
  title = 'Edit Client';
  initialData: any;
  loading = true;
  clientId: number | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = params['id'];
      if (this.clientId) {
        this.fetchClient(this.clientId);
      }
    });
  }

  fetchClient(clientId: number): void {
    this.http.get<any>(`api/v1/clients/${clientId}`).subscribe({
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
    this.http.put<any>(`api/v1/clients/${this.clientId}`, formData).subscribe({
      next: () => {
        this.router.navigate(['/clients']);
      },
      error: error => {
        // TODO Add toast in v2
        console.error('Error posting form data:', error);
      }
    });
  }

}
