import { Action } from "@ngrx/store";
// import model/interface from db.json here...

// Action constants
export const LOAD_YEARS = "[Fitment] Load Years";
export const LOAD_YEARS_FAIL = "[Fitment] Load Years Fail";
export const LOAD_YEARS_SUCCESS = "[Fitment] Load Years Success";

// Action creators
export class LoadYears implements Action {
  readonly type = LOAD_YEARS;
}
export class LoadYearsFail implements Action {
  readonly type = LOAD_YEARS_FAIL;
  constructor(public payload: any) {}
}
export class LoadYearsSuccess implements Action {
  readonly type = LOAD_YEARS_SUCCESS;
  constructor(public year: any) {} // Replace 'any' with interface
}

// Action types
export type VehicleAction = LoadYears | LoadYearsFail | LoadYearsSuccess;
