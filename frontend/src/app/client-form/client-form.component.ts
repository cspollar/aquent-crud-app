import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Person } from '../model/person';
import {unitedStatesStates} from '../utils'

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButton, HttpClientModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  @Input() initialData: any = Person;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup = this.formBuilder.group({
    clientName: ['', Validators.required],
    websiteUri: ['', Validators.required],
    phoneNumber: ['', [Validators.required]],
    streetAddress: ['', Validators.required],
    city: ['' , Validators.required],
    state: ['', [Validators.minLength(2), Validators.maxLength(2), Validators.required]],
    zipCode: ['', [Validators.minLength(5), Validators.maxLength(5), Validators.required]],
  });

  ngOnInit(): void {
    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }
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