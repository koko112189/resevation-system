import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReservationDto } from "../../../../core/dtos/reservation.dto";
import { Observable } from "rxjs";
import { Reservation } from "../../../../core/models/reservation.entity";

@Injectable({
    providedIn: 'root',
})
export class ReservationRepository {
    private apiUrl = 'https://localhost:44365/api/Reservations'; 

    constructor(private http: HttpClient) {}
  
    async save(reservation: ReservationDto): Promise<void> {
      try {
        await this.http.post<ReservationDto>(this.apiUrl, reservation).toPromise();
      } catch (error : any) {
        if (error.error && error.message) {
          throw new Error(error.error);
        } else {
          throw new Error('Error al guardar la reservación');
        }
      }
    }
  
    async getAll(userId : string | null, spaceId? : string | null, startDate? : string | null, endDate? : string | null): Promise<Observable<Reservation[]>> {
      return await this.http.get<Reservation[]>(`${this.apiUrl}?userId=${userId}&spaceId=${spaceId}&startDate=${startDate}&endDate=${endDate}`);
    }

    delete(reservationId: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${reservationId}`);
    }
}