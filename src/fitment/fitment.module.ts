import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreModule } from "@ngrx/store";

import { reducers } from "./store";

import { FitmentContainerComponent } from "./fitment-container/fitment-container.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatGridListModule } from "@angular/material/grid-list";
import { FitmentService } from "./fitment.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { EffectsModule } from "@ngrx/effects";
import { VehicleEffects } from "./store/effects/vehicle.effects";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("fitment", reducers),
    MatTabsModule,
    MatGridListModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EffectsModule.forFeature([VehicleEffects])
  ],
  declarations: [FitmentContainerComponent],
  exports: [FitmentContainerComponent],
  providers: [FitmentService]
})
export class FitmentModule {}
