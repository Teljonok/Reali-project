import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  LOAD_CUSTOMERS,
  AddCustomer, DELETE_CUSTOMER, DeleteCustomer,
  ADD_CUSTOMER,
  LOAD_CUSTOMERS_FAIL,
  LoadCustomersFail,
  LoadCustomersSuccess,
  UPDATE_CUSTOMER,
  UpdateCustomer
} from '../actions/customer.actions';



import {CustomersService} from '../../customers.service';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of, pipe} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class CustomersEffects {
  constructor(
    public actions$: Actions,
    public customersService: CustomersService,
    public matSnackBar: MatSnackBar) {
  }

  @Effect()
  loadCustomers$ = this.actions$.pipe(
    ofType(LOAD_CUSTOMERS),
    switchMap(() => {
      return this
        .customersService
        .getCustomers()
        .pipe(
          map(customers => new LoadCustomersSuccess(customers),
            catchError(() => of([]))
          )
        );
    }),
    catchError(() => of(new LoadCustomersFail()))
  );

  @Effect({dispatch: false})
  addNewCustomer$ = this.actions$.pipe(
    pipe(
      ofType(ADD_CUSTOMER),
      switchMap((action: AddCustomer) => {
        return this
          .customersService
          .addNewCustomer(action.payload)
          .pipe(
            catchError(() => of({}))
          );
      })
    )
  );

  @Effect({dispatch: false})
  updateCustomer$ = this.actions$.pipe(
    pipe(
      ofType(UPDATE_CUSTOMER),
      switchMap((action: UpdateCustomer) => {
        return this
          .customersService
          .updateCustomer(action.payload)
          .pipe(
            catchError(() => of({}))
          );
      })
    )
  );

  @Effect({dispatch: false})
  deleteCustomer$ = this.actions$.pipe(
    pipe(
      ofType(DELETE_CUSTOMER),
      switchMap((action: DeleteCustomer) => {
        return this
          .customersService
          .deleteCustomer(action.payload)
          .pipe(
            catchError(() => of({}))
          );
      })
    )
  );

  @Effect({dispatch: false})
  loadCustomersFailed$ = this.actions$.pipe(
    ofType(LOAD_CUSTOMERS_FAIL),
    tap(() => {
      console.log('CUSTOMERS_FAIL');
      this.matSnackBar.open('Failed to load customers', 'ok');
    }));
}
