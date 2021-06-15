import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';

import {Customer} from '../models/customer';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomerModalMode } from '../models/customer-modal-mode';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class CustomerModalComponent implements OnInit {
  customerForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customer, mode: CustomerModalMode },
    public dialogRef: MatDialogRef<CustomerModalComponent>,
    public formBuilder: FormBuilder) {

    this.buildForm(data.customer);
  }

  ngOnInit(): void {
  
  }
  

  buildForm(customer) {
    this.customerForm = this
      .formBuilder
      .group({
        firstName: [this.isNewMode ? '' : customer.firstName, [Validators.required]],
        lastName: [this.isNewMode ? '' : customer.lastName, [Validators.required]],
        phone: [this.isNewMode ? '' : customer.phone, [Validators.required]],
        address: [this.isNewMode ? '' : customer.address, [Validators.required]]
      });
  }

  onSave(value) {
    const customer = {...value, id: this.isNewMode ? 0 : this.data.customer.id};

    this.dialogRef.close({
      customer,
      mode: this.data.mode
    });
  }
  

  get isNewMode(): boolean {
    return this.data.mode === CustomerModalMode.New;
  }

  get firstNameFormControl(): FormControl {
    return this.customerForm.get('firstName') as FormControl;
  }

  get lastNameFormControl(): FormControl {
    return this.customerForm.get('lastName') as FormControl;
  }
  
  get phoneFormControl(): FormControl {
    return this.customerForm.get('phone') as FormControl;
  }

  get addressFormControl(): FormControl {
    return this.customerForm.get('address') as FormControl;
  }
}
