export class RoomAvailable {
    constructor(roomNumber: number,
        name: string,
        hotelId: number,
        deviceId: string,
        names: string[],
        deviceType: string) {

        this.roomNumber = roomNumber;
        this.name = name;
        this.hotelId = hotelId;
        this.deviceId = deviceId;
        this.names = names;
        this.deviceType = deviceType;
    }

    roomNumber: number;
    name: string;
    hotelId: number;
    deviceId: string;
    names: string[];
    deviceType: string;
}