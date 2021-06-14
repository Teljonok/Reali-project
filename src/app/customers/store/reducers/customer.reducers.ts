import {Customer} from '../../models/customer';
import {
  ADD_CUSTOMER,
  AddCustomer,
  CustomerActions, DELETE_CUSTOMER, DeleteCustomer,
  LOAD_CUSTOMERS,
  LOAD_CUSTOMERS_FAIL,
  LOAD_CUSTOMERS_SUCCESS,
  LoadCustomersSuccess,
  UPDATE_CUSTOMER, UpdateCustomer
} from '../actions/customer.actions';

export interface CustomersState {
  customers: Customer[];
  loading: boolean;
}

export const initialState: CustomersState = {
  customers: [],
  loading: false
};

export function customersReducer(
  state = initialState,
  action: CustomerActions): CustomersState {
  
  switch (action.type) {
    case LOAD_CUSTOMERS: {
      return {
        ...state,
        loading: true
      };
    }
    case LOAD_CUSTOMERS_SUCCESS: {
      const successAction = action as LoadCustomersSuccess;
      const customers = successAction.payload;
      return {
        ...state,
        loading: false,
        customers
      };
    }
    case LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case ADD_CUSTOMER: {
      const addCustomerAction = action as AddCustomer;
      const customer = addCustomerAction.payload;
      
      return {
        ...state,
        customers: [customer, ...state.customers]
      };
    }
    case UPDATE_CUSTOMER: {
      const updateCustomerAction = action as UpdateCustomer;
      const updatedCustomer = updateCustomerAction.payload;
      
      const existingCustomer = state.customers.find(b => b.id === updatedCustomer.id);
      if (!existingCustomer) {
        return state;
      }
      
      const index = state.customers.indexOf(existingCustomer);
      const customersCopy = [...state.customers];
      customersCopy[index] = {...existingCustomer, ...updatedCustomer};
      
      return {
        ...state,
        customers: customersCopy
      };
    }
    case DELETE_CUSTOMER: {
      const deleteCustomerAction = action as DeleteCustomer;
      const deletedCustomer = deleteCustomerAction.payload;
      
      const index = state.customers.findIndex(b => b.id === deletedCustomer.id);
      if (index < 0) {
        return state;
      }
      
      return {
        ...state,
        customers: state.customers.filter(b => b.id !== deletedCustomer.id)
      };
    }
  }
  
  return state;
}
