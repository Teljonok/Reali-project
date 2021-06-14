import {Action} from '@ngrx/store';
import {Customer} from '../../models/customer';

export const LOAD_CUSTOMERS = '[Customers] Load Customers';
export const LOAD_CUSTOMERS_FAIL = '[Customers] Load Customers Fail';
export const LOAD_CUSTOMERS_SUCCESS = '[Customers] Load Customers Success';

export const ADD_CUSTOMER = '[Customers] Add New Customer';
export const DELETE_CUSTOMER = '[Customers] Delete a Customer';
export const UPDATE_CUSTOMER = '[Customers] Update a Customer';

export class LoadCustomers implements Action {
  readonly type: string = LOAD_CUSTOMERS;
}

export class LoadCustomersFail implements Action {
  readonly type: string = LOAD_CUSTOMERS_FAIL;
}

export class LoadCustomersSuccess implements Action {
  readonly type: string = LOAD_CUSTOMERS_SUCCESS;
  
  constructor(public payload: Customer[]) {
  }
}

export class AddCustomer implements Action {
  readonly type: string = ADD_CUSTOMER;
  
  constructor(public payload: Customer) {
  }
}

export class DeleteCustomer implements Action {
  readonly type: string = DELETE_CUSTOMER;
  
  constructor(public payload: Customer) {
  }
}

export class UpdateCustomer implements Action {
  readonly type: string = UPDATE_CUSTOMER;
  
  constructor(public payload: Customer) {
  }
}

export type CustomerActions =
  LoadCustomers | LoadCustomersSuccess | LoadCustomersFail | AddCustomer | DeleteCustomer | UpdateCustomer;
