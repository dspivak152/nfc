export class RoomAvailable {
    constructor(roomNumber: number,
        name: string,
        hotelId: number,
        deviceId: string,
        names: string[]) {

        this.roomNumber = roomNumber;
        this.name = name;
        this.hotelId = hotelId;
        this.DeviceId = deviceId;
        this.names = names;
    }

    roomNumber: number;
    name: string;
    hotelId: number;
    DeviceId: string;
    names: string[];
}