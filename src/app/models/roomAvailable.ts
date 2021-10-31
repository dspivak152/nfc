export class RoomAvailable {
    constructor(roomNumber: number,
        name: string,
        hotelId: number,
        deviceId: string,
        names: string[]) {

        this.roomNumber = roomNumber;
        this.name = name;
        this.hotelId = hotelId;
        this.deviceId = deviceId;
        this.names = names;
    }

    roomNumber: number;
    name: string;
    hotelId: number;
    deviceId: string;
    names: string[];
}