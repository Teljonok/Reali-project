import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import { Customer } from './models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private readonly Customers_API_URL =
   'any_api' //should be get from local storage or index.db

  constructor(public http: HttpClient) {
  }
  
  id?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address: string;

  getCustomers(): Observable<Customer[]> {
    return this
      .http
      .get(this.Customers_API_URL)
      .pipe(
        map((data: any) => data.items),
        map((items: any) => {
          return items.map(api_customer => {
            return {
              id:api_customer.id,
              firstName: api_customer.firstName,
              lastName: api_customer.lastName,
              phone: api_customer.phone,
              address: api_customer.address,
            };
          });
        })
      );
  }

  deleteCustomer(customer: Customer) {
    return of(customer).pipe(delay(1000));
  }

  updateCustomer(customer: Customer) {
    return of(customer).pipe(delay(1000));
  }

  addNewCustomer(customer: Customer) {
    return of(customer).pipe(delay(1000));
  }
}
