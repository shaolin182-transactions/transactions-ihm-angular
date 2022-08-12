import {NgModule} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule, 
    MatSortModule, 
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonToggleModule,
    MatCheckboxModule, MatSelectModule
  ],
  exports: [
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule, 
    MatSortModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonToggleModule,
    MatCheckboxModule, MatSelectModule
 ]
})
export class MaterialModule {}
