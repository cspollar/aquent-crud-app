import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Person } from '../model/person';
import { unitedStatesStates } from '../utils'
import { JsonPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink, RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';

interface MinimalContact {
  name: string,
  selected: boolean,
  personId: number,
}

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatListModule, RouterModule, JsonPipe, MatCheckboxModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButton, HttpClientModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  @Input() initialData: any = Person;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  personList: MinimalContact[] = [];
  loading = true

  form: FormGroup = this.formBuilder.group({
    clientName: ['', Validators.required],
    websiteUri: ['', Validators.required],
    phoneNumber: ['', [Validators.required]],
    streetAddress: ['', Validators.required],
    contacts: [''],
    city: ['', Validators.required],
    state: ['', [Validators.minLength(2), Validators.maxLength(2), Validators.required]],
    zipCode: ['', [Validators.minLength(5), Validators.maxLength(5), Validators.required]],
  });

  ngOnInit(): void {
    if (this.initialData) {
      this.form.patchValue(this.initialData);
      this.fetchAllContacts(this.initialData.clientId);
    }
  }

  fetchAllContacts(clientId: number | null = null): void {
    if (!clientId) {
      return
    }
    this.loading = true;
    this.http.get<any>(`api/v1/people`).subscribe((data: any) => {
      let results: Person[] = data?._embedded?.people
      results = results.filter((c) => c.personId !== clientId)
      this.personList = results.map(function (obj: any) {
        return {
          name: obj.firstName + ' ' + obj.lastName,
          selected: clientId ? String(clientId) === String(obj.clientId) : false,
          personId: obj.personId
        };

      });

      this.loading = false;
    });
  }

  get clientName() {
    return this.form.get('clientName');
  }

  get websiteUri() {
    return this.form.get('websiteUri');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get streetAddress() {
    return this.form.get('streetAddress');
  }

  get city() {
    return this.form.get('city');
  }

  get state() {
    return this.form.get('state');
  }

  get zipCode() {
    return this.form.get('zipCode');
  }

  unitedStatesStates = unitedStatesStates;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }


  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.formSubmit.emit(formData);
    } else {
      // TODO Add toast in v2
      console.error('invalid form');
    }
  }
}