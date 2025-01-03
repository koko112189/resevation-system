import { Injectable } from "@angular/core";
import { ReservationDto } from "../../../../core/dtos/reservation.dto";
import { Reservation } from "../../../../core/models/reservation.entity";
import { ReservationRepository } from "../../../reservations/infrastructure/repositories/reservation.repository";
import { UserRepository } from "../../../reservations/infrastructure/repositories/user.repository";
import { UserDto } from "../../../../core/dtos/user.dto";



@Injectable({
    providedIn: 'root',
})
export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}
    async execute(user: UserDto): Promise<void> {
        const new_user : UserDto = {
            name: user.name,
            email: user.email,
            }
        await this.userRepository.save(new_user);
    }
}