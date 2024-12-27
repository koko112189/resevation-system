import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateSpaceUseCase } from '../application/use-cases/create-space-usecase';
import { SpaceRepository } from '../infrastructure/repositories/space.repository';
import { Space } from '../../../core/models/space.entity';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateReservationUseCase } from '../application/use-cases/create-reservation-usecae';
import { ReservationDto } from '../../../core/dtos/reservation.dto';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/components/dialogcomponent/dialogcomponent.component';


@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatSelectModule,MatAutocompleteModule,MatDialogModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ReservationFormComponent implements OnInit {
  spaces: Space[] = [];
  spaceFilterControl = new FormControl();
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  constructor(
      private createspaceusecase: CreateSpaceUseCase,
      private spaceRepository: SpaceRepository,
      private createReservationUseCase: CreateReservationUseCase,
      private router: Router,
      public dialog: MatDialog
    ) {}
  ngOnInit(): void {
    this.loadSpaces();
  }
  async loadSpaces() {
    (await this.spaceRepository.getAll()).subscribe((data) => {
      this.spaces = data;
    });
  }

  private _filterSpaces(value: string): Space[] {
    const filterValue = value.toLowerCase();
    return this.spaces.filter(space => space.name.toLowerCase().includes(filterValue));
  }

  form = new FormGroup({
    space: new FormControl('', Validators.required),
    startDateTime: new FormControl('', Validators.required),
    endDateTime: new FormControl('', Validators.required),
  });

  filteredSpaces = this.spaceFilterControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filterSpaces(value))
  );

  async onSubmit() {
    if (this.form.valid) {
      const reservation: ReservationDto = {
        userId: '30A1E303-EC35-49CA-9884-F13A0FE8A34C',
        spaceId: this.form.value.space ?? '',
        startDateTime: new Date(this.form.value.startDateTime ?? ''),
        endDateTime: new Date(this.form.value.endDateTime ?? '')
      };
      await this.createReservationUseCase.execute(reservation).then(() => {
        const spaceName = this.spaces.find(space => space.id === reservation.spaceId)?.name || '';
        this.setMessage('success', `Espacio reservado correctamente: ${spaceName}, desde ${reservation.startDateTime} hasta ${reservation.endDateTime}`);
      }).catch(error => {
        this.setMessage('error', `Error al reservar el espacio: ${error.message}`);
      });
    }
  }

  openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title, message }
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.router.navigate(['/']);
    // });
  }

  setMessage(type: 'success' | 'error', message: string): void {
    this.messageType = type;
    this.message = message;
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
