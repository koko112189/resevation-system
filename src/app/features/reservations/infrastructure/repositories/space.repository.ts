import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReservationDto } from "../../../../core/dtos/reservation.dto";
import { Observable } from "rxjs";
import { Reservation } from "../../../../core/models/reservation.entity";
import { Space } from "../../../../core/models/space.entity";
import { SpaceDto } from "../../../../core/dtos/space.dto";

@Injectable({
    providedIn: 'root',
})
export class SpaceRepository {
    private apiUrl = 'https://localhost:44354/api/Spaces'; 

    constructor(private http: HttpClient) {}
  
    async save(space: SpaceDto): Promise<void> {
      try { await this.http.post<SpaceDto>(this.apiUrl, space).toPromise();}catch (error : any) {
        if (error.error && error.message) {
          throw new Error(error.error);
        } else {
          throw new Error('Error al guardar la reservación');
        }
      }
    }
  
    async getAll(): Promise<Observable<Space[]>> {
      return await this.http.get<Space[]>(`${this.apiUrl}`);
    }
}