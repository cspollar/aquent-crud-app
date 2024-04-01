import { Component } from '@angular/core';
import { Client } from '../model/client';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTableModule, MatIconModule, HttpClientModule],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss'
})
export class ClientsListComponent {
  title = 'Client List';
  loading = true;
  clients: Client[] = [];
  displayedColumns = ['clientName', 'websiteUri', 'phoneNumber', 'actions'];
  feedback: any = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loading = true;
    this.http.get<any>('api/v1/clients').subscribe((data: any) => {
      this.clients = data?._embedded?.clients;
      this.loading = false;
      this.feedback = {};
    });
  }

  delete(client: Client): void {
    if (confirm(`Are you sure you want to delete "${client.clientName}"?`)) {
      // Optimistically delete to speed up the UI
      this.clients = this.clients.filter(c => c !== client);

      this.http.delete(`${client._links.self.href}`).subscribe({
        next: () => {
          this.feedback = {type: 'success', message: `"${client.clientName}" was deleted`};
          setTimeout(() => {
            this.ngOnInit();
          }, 1000);
        },
        error: () => {
          this.feedback = {type: 'warning', message: `Unable to delete "${client.clientName}". Try again later.`};
          // On failure, add back the removed client
          this.clients.push(client);
        }
      });
    }
  }

  protected readonly event = event;
}
