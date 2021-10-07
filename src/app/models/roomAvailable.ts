export class RoomAvailable {
    constructor(roomNumber: number, name: string, hotelId: number, deviceId: string) {
        this.roomNumber = roomNumber;
        this.name = name;
        this.hotelId = hotelId;
        this.devideId = deviceId;
    }

    roomNumber: number;
    name: string;
    hotelId: number;
    devideId: string;
}