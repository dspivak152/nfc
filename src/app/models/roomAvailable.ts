export class RoomAvailable {
    constructor(roomNumber: number, name: string, hotelId: number) {
        this.roomNumber = roomNumber;
        this.name = name;
        this.hotelId = hotelId;
    }

    roomNumber: number;
    name: string;
    hotelId: number;
}