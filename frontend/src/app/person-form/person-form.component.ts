import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Person } from '../model/person';

interface State {
  value: string;
  viewValue: string;
}

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
    lastName: ['', Validators.required],
    emailAddress: ['', [Validators.required, Validators.email]],
    streetAddress: ['', Validators.required],
    city: ['' , Validators.required],
    state: ['', [Validators.minLength(2), Validators.maxLength(2), Validators.required]],
    zipCode: ['', [Validators.minLength(5), Validators.maxLength(5), Validators.required]],
  });

  ngOnInit(): void {
    if (this.initialData) {
      console.log('tets', this.initialData)
      this.form.patchValue(this.initialData);
    }
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


  // Sorry DC & Territories - maybe in v2
  unitedStatesStates: State[] = [
    { value: 'AL', viewValue: 'Alabama' },
    { value: 'AK', viewValue: 'Alaska' },
    { value: 'AZ', viewValue: 'Arizona' },
    { value: 'AR', viewValue: 'Arkansas' },
    { value: 'CA', viewValue: 'California' },
    { value: 'CO', viewValue: 'Colorado' },
    { value: 'CT', viewValue: 'Connecticut' },
    { value: 'DE', viewValue: 'Delaware' },
    { value: 'FL', viewValue: 'Florida' },
    { value: 'GA', viewValue: 'Georgia' },
    { value: 'HI', viewValue: 'Hawaii' },
    { value: 'ID', viewValue: 'Idaho' },
    { value: 'IL', viewValue: 'Illinois' },
    { value: 'IN', viewValue: 'Indiana' },
    { value: 'IA', viewValue: 'Iowa' },
    { value: 'KS', viewValue: 'Kansas' },
    { value: 'KY', viewValue: 'Kentucky' },
    { value: 'LA', viewValue: 'Louisiana' },
    { value: 'ME', viewValue: 'Maine' },
    { value: 'MD', viewValue: 'Maryland' },
    { value: 'MA', viewValue: 'Massachusetts' },
    { value: 'MI', viewValue: 'Michigan' },
    { value: 'MN', viewValue: 'Minnesota' },
    { value: 'MS', viewValue: 'Mississippi' },
    { value: 'MO', viewValue: 'Missouri' },
    { value: 'MT', viewValue: 'Montana' },
    { value: 'NE', viewValue: 'Nebraska' },
    { value: 'NV', viewValue: 'Nevada' },
    { value: 'NH', viewValue: 'New Hampshire' },
    { value: 'NJ', viewValue: 'New Jersey' },
    { value: 'NM', viewValue: 'New Mexico' },
    { value: 'NY', viewValue: 'New York' },
    { value: 'NC', viewValue: 'North Carolina' },
    { value: 'ND', viewValue: 'North Dakota' },
    { value: 'OH', viewValue: 'Ohio' },
    { value: 'OK', viewValue: 'Oklahoma' },
    { value: 'OR', viewValue: 'Oregon' },
    { value: 'PA', viewValue: 'Pennsylvania' },
    { value: 'RI', viewValue: 'Rhode Island' },
    { value: 'SC', viewValue: 'South Carolina' },
    { value: 'SD', viewValue: 'South Dakota' },
    { value: 'TN', viewValue: 'Tennessee' },
    { value: 'TX', viewValue: 'Texas' },
    { value: 'UT', viewValue: 'Utah' },
    { value: 'VT', viewValue: 'Vermont' },
    { value: 'VA', viewValue: 'Virginia' },
    { value: 'WA', viewValue: 'Washington' },
    { value: 'WV', viewValue: 'West Virginia' },
    { value: 'WI', viewValue: 'Wisconsin' },
    { value: 'WY', viewValue: 'Wyoming' }
  ];

  // constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

  constructor(private formBuilder: FormBuilder) { }


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