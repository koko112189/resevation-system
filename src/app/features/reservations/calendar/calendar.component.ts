import { Component, Input, SimpleChanges } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { Reservation } from '../../../core/models/reservation.entity';
import { ReservationRepository } from '../infrastructure/repositories/reservation.repository';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Space } from '../../../core/models/space.entity';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule,MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatSelectModule,MatAutocompleteModule,MatDialogModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  @Input() reservations: Reservation[] = [];
  @Input() spaces: Space[] = [];
  calendarEvents: EventInput[] = [

  ];
  selectedSpace: string | null = null;
  selectedUser: string | null = null;
  startDate: string | null = null;
  endDate: string | null = null;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    selectable: true,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay' 
    },
    weekends: true,
    contentHeight: 650,
    events: this.calendarEvents,
    eventContent: this.renderEventContent.bind(this),
    //eventClick: this.handleEventClick.bind(this)
  };
  constructor(private reservationRepository: ReservationRepository) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reservations']) {
      // this.calendarEvents = this.reservations.map(reservation  => ({
      //   title: `${reservation.user.name} - ${reservation.space.name}`,
      //   start: reservation.startDateTime,
      //   end: reservation.endDateTime,
      //   extendedProps: {
      //     reservationId: reservation.id
      //   }
      // }));
      this.updateCalendarEvents();
    }
  }

  updateCalendarEvents() {
    this.calendarEvents = this.reservations
      .filter(reservation => {
        return (
          (!this.selectedSpace || reservation.space.id === this.selectedSpace) &&
          (!this.selectedUser || reservation.user.name.toLowerCase().includes(this.selectedUser.toLowerCase()) || reservation.user.id === this.selectedUser) &&
          (!this.startDate || new Date(reservation.startDateTime) >= new Date(this.startDate)) &&
          (!this.endDate || new Date(reservation.endDateTime) <= new Date(this.endDate))
        );
      })
      .map(reservation => ({
        title: `${reservation.user.name} - ${reservation.space.name}`,
        start: reservation.startDateTime,
        end: reservation.endDateTime,
        extendedProps: {
          reservationId: reservation.id
        }
      }));
  }

  onFilterChange() {
    this.updateCalendarEvents();
  }

  resetFilters() {
    this.selectedSpace = null;
    this.selectedUser = null;
    this.startDate = null;
    this.endDate = null;
    this.updateCalendarEvents();
  }

  renderEventContent(eventInfo: any, createElement: any) {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Eliminar';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => this.handleDeleteClick(eventInfo.event);

    const titleElement = document.createElement('div');
    titleElement.innerHTML = eventInfo.event.title;

    const container = document.createElement('div');
    container.appendChild(titleElement);
    container.appendChild(deleteButton);

    return { domNodes: [container] };
  }

  handleDeleteClick(event: any) {
    const reservationId = event.extendedProps.reservationId;
    if (confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      this.reservationRepository.delete(reservationId).subscribe(() => {
        event.remove();
        alert('Reserva eliminada correctamente');
      }, (error: { message: string; }) => {
        alert('Error al eliminar la reserva: ' + error.message);
      });
    }
  }
}
