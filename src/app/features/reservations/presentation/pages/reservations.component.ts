import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../calendar/calendar.component';
import { Reservation } from '../../../../core/models/reservation.entity';
import { CreateReservationUseCase } from '../../application/use-cases/create-reservation-usecae';
import { ReservationRepository } from '../../infrastructure/repositories/reservation.repository';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { SpaceRepository } from '../../infrastructure/repositories/space.repository';
import { Space } from '../../../../core/models/space.entity';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CalendarComponent,RouterLink,MatButtonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss',
  providers: [CreateReservationUseCase, ReservationRepository],
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  spaces: Space[] = [];

  constructor(
    private createreservationusecase: CreateReservationUseCase,
    private reservationRepository: ReservationRepository,
    private spaceRepository: SpaceRepository
  ) {}
  ngOnInit(): void {
    this.loadReservations();
    this.loadSpaces();
  }

  async loadReservations() {
    (await this.reservationRepository.getAll('', '', '', '')).subscribe((data) => {
      this.reservations = data;
    });
  }

  async loadSpaces() {
    (await this.spaceRepository.getAll()).subscribe((data) => {
      this.spaces = data;
    });
  }

  async createReservation(newReservationData: any) {
    this.createreservationusecase.execute(newReservationData).then(() => {
      this.loadReservations();
    });
  }
}
