import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Person } from '../model/person';
import { unitedStatesStates } from '../utils';
import { Client } from '../model/client';


@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButton, HttpClientModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})
export class PersonFormComponent {
  @Input() initialData: any = Person;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    clientId: [''],
    lastName: ['', Validators.required],
    emailAddress: ['', [Validators.required, Validators.email]],
    streetAddress: ['', Validators.required],
    city: ['' , Validators.required],
    state: ['', [Validators.minLength(2), Validators.maxLength(2), Validators.required]],
    zipCode: ['', [Validators.minLength(5), Validators.maxLength(5), Validators.required]],
  });

  loading = true;

  clients: Client[] = [];


  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.fetchClients();
    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  fetchClients(): void {
    this.loading = true;
    this.http.get<any>('api/v1/clients').subscribe((data: any) => {
      this.clients = data?._embedded?.clients;
      this.loading = false;
    });
  }

  get clientId() {
    return this.form.get('clientId');
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('firstName');
  }

  get emailAddress() {
    return this.form.get('emailAddress');
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