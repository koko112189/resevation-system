import { Injectable } from "@angular/core";
import { ReservationDto } from "../../../../core/dtos/reservation.dto";
import { Reservation } from "../../../../core/models/reservation.entity";
import { ReservationRepository } from "../../../reservations/infrastructure/repositories/reservation.repository";
import { SpaceRepository } from "../../../reservations/infrastructure/repositories/space.repository";
import { Space } from "../../../../core/models/space.entity";
import { SpaceDto } from "../../../../core/dtos/space.dto";


@Injectable({
    providedIn: 'root',
})
export class CreateSpaceUseCase {
    constructor(private spaceRepository: SpaceRepository) {}
    async execute(space: SpaceDto): Promise<void> {
        const new_space : SpaceDto = {
            name: space.name,
            capacity: space.capacity,
            }
        await this.spaceRepository.save(new_space);
    }
}