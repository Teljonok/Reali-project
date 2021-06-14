
import {CustomersState} from './customer.reducers';
import {createSelector} from '@ngrx/store';

const getLoading = (state: CustomersState) => state.loading;
const getCustomers = (state: CustomersState) => state.customers;

export const getCustomersState = (state: any) => state.customers;

export const getAllCustomersSelector = createSelector(
  getCustomersState,
  getCustomers
);


// check if i need it
export const getCustomersLoadingSelector = createSelector(
  getCustomersState,
  getLoading
);

