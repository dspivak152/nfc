import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule, MatCardModule, MatGridListModule,
        MatDialogModule, MatProgressSpinnerModule, MatProgressBarModule, MatListModule, MatTableModule, MatPaginatorModule,
        MatExpansionModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatStepperModule, MatSidenavModule],

    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule, MatCardModule, MatGridListModule,
        MatDialogModule, MatProgressSpinnerModule, MatProgressBarModule, MatListModule, MatTableModule, MatPaginatorModule,
        MatExpansionModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatStepperModule, MatSidenavModule]
})

export class MaterialModule { }