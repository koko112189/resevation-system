import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReservationDto } from "../../../../core/dtos/reservation.dto";
import { Observable } from "rxjs";
import { Reservation } from "../../../../core/models/reservation.entity";
import { Space } from "../../../../core/models/space.entity";
import { SpaceDto } from "../../../../core/dtos/space.dto";
import { UserDto } from "../../../../core/dtos/user.dto";
import { User } from "../../../../core/models/user.entity";

@Injectable({
    providedIn: 'root',
})
export class UserRepository {
    private apiUrl = 'https://localhost:44317/api/users'; 

    constructor(private http: HttpClient) {}
  
    async save(user: UserDto): Promise<void> {
      try { await this.http.post<UserDto>(this.apiUrl, user).toPromise();}catch (error : any) {
        if (error.error && error.message) {
          throw new Error(error.error);
        } else {
          throw new Error('Error al guardar usuario');
        }
      }
    }
  
    async getAll(): Promise<Observable<User[]>> {
      return await this.http.get<User[]>(`${this.apiUrl}`);
    }
}