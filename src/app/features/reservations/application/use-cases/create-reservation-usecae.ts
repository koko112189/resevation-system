import { Injectable } from "@angular/core";
import { ReservationDto } from "../../../../core/dtos/reservation.dto";
import { Reservation } from "../../../../core/models/reservation.entity";
import { ReservationRepository } from "../../infrastructure/repositories/reservation.repository";


@Injectable({
    providedIn: 'root',
})
export class CreateReservationUseCase {
    constructor(private reservationRepository: ReservationRepository) {}
    async execute(reservation: ReservationDto): Promise<void> {
        const new_reservation : ReservationDto = {
            userId: reservation.userId,
            spaceId: reservation.spaceId,
            startDateTime: reservation.startDateTime,
            endDateTime: reservation.endDateTime}
        await this.reservationRepository.save(new_reservation);
    }
}