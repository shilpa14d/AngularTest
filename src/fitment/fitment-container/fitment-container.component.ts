import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild
} from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { FitmentService } from "../fitment.service";
import { FitmentState } from "../store/reducers";
import { MatDialog } from "@angular/material/dialog";
import { LoadYears, LOAD_YEARS } from "../store/actions/vehicle.action";
import { VehicleState } from "../store/reducers/vehicle.reducer";

@Component({
  selector: "app-fitment-container",
  templateUrl: "./fitment-container.component.html",
  styleUrls: ["./fitment-container.component.css"]
})
export class FitmentContainerComponent implements OnInit {
  years$: Observable<any>;
  makes$: Observable<any>;
  showTabs: boolean = false;
  @ViewChild("fitmentTab", { static: false }) fitmentTab: MatTabGroup;
  selectedYear: any;
  selectedMake: any;
  models$: Observable<any>;
  selectedModel: any;
  styles$: Observable<any>;
  selectedStyle: any;
  @ViewChild("selectionModal") selectionModal: TemplateRef<any>;
  initialMessage: number = 0;
  modalContent: any = [
    "What year is your vehicle?",
    "Select a Make",
    "Select a Model",
    "Select a Style"
  ];

  // import the store into the constructor
  constructor(
    private fitmentService: FitmentService,
    private store: Store<FitmentState>,
    public dialog: MatDialog
  ) {
    this.years$ = this.store.select(store => store.vehicle);
  }

  ngOnInit() {}

  openDialog() {
    this.initialMessage = 0;
    const dialogRef = this.dialog.open(this.selectionModal);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // Get Years data
  getYears() {
    this.openDialog();
    this.showTabs = true;
    this.selectedYear = "";
    this.selectedMake = "";
    this.selectedModel = "";
    this.selectedStyle = "";
    if (this.fitmentTab) {
      this.fitmentTab.selectedIndex = 0;
    }

    // Get Data from Store
    const action = new LoadYears();
    this.store.dispatch(action);
    this.years$ = this.fitmentService.getYears();
    // dispatch an action to get array of years

    // Year
    // https://6080be3273292b0017cdbf2a.mockapi.io/years
  }

  // To change next tab
  changeNextTab(state: number) {
    this.fitmentTab.selectedIndex = state;
    this.initialMessage = state;
  }

  // Get Makes data
  getMakes(year: any) {
    this.selectedYear = year;
    this.makes$ = this.fitmentService.getMakes(year);
    this.changeNextTab(1);
  }

  // Get Models data
  getModels(make: any) {
    this.selectedMake = make;
    let parameter = "?year=" + this.selectedYear + "&make=" + this.selectedMake;
    this.models$ = this.fitmentService.getModels(parameter);
    this.changeNextTab(2);
  }

  // Get Styles data
  getStyles(model: any) {
    this.selectedModel = model;
    let parameter =
      "?year=" +
      this.selectedYear +
      "&make=" +
      this.selectedMake +
      "&model=" +
      this.selectedModel;
    this.styles$ = this.fitmentService.getStyles(parameter);
    this.changeNextTab(3);
  }

  // To select Styles
  selectStyle(style: any) {
    this.selectedStyle = style;
  }

  // Make with year (2021)
  // https://6080be3273292b0017cdbf2a.mockapi.io/makes

  // Model with year and make (Acura)
  // https://6080be3273292b0017cdbf2a.mockapi.io/models

  // Trim with year, make, model (RDX)
  // https://6080be3273292b0017cdbf2a.mockapi.io/trim
}
