import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class FitmentService {
  constructor(private http: HttpClient) {}

  getYears(): Observable<any> {
    return this.http.get("https://6080be3273292b0017cdbf2a.mockapi.io/years");
  }

  getMakes(year: any): Observable<any> {
    return this.http.get(
      "https://6080be3273292b0017cdbf2a.mockapi.io/makes?year=" + year
    );
  }

  getModels(parameters: any): Observable<any> {
    return this.http.get(
      "https://6080be3273292b0017cdbf2a.mockapi.io/models" + parameters
    );
  }

  getStyles(parameters: any): Observable<any> {
    return this.http.get(
      "https://6080be3273292b0017cdbf2a.mockapi.io/trim" + parameters
    );
  }
}
