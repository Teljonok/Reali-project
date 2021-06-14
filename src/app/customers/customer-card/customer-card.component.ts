import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Customer} from '../models/customer';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerCardComponent {
  @Input() customer: Customer;

  @Output() delete = new EventEmitter<Customer>();
  @Output() edit = new EventEmitter<Customer>();

  constructor() {
  }
}
