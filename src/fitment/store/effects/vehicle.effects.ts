import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { VehicleAction } from "../actions/action.types";
import { LoadYearsFail, LoadYearsSuccess } from "../actions/vehicle.action";

@Injectable()
export class VehicleEffects {
  constructor(
    // inject Actions from @ngrx/effects
    private actions: Actions,
    private http: HttpClient
  ) {}

  // to define an Effect, use the `createEffect` method
  loadYears = createEffect(() => {
    return this.actions.pipe(
      // filter out the actions, except for `[Customers Page] Opened`
      ofType(VehicleAction.LOAD_YEARS),
      switchMap(() =>
        // call the service
        this.http.get("https://6080be3273292b0017cdbf2a.mockapi.io/years").pipe(
          // return a Success action when the HTTP request was successfull (`[Customers Api] Load Sucess`)
          map((response: any) => new LoadYearsSuccess(response.year)),
          // return a Failed action when something went wrong during the HTTP request (`[Customers Api] Load Failed`)
          catchError(error => of(new LoadYearsFail(error)))
        )
      )
    );
  });
}
