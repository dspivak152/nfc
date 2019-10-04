export class RoomAvailable {
    constructor(roomNumber: number, name: string, hotelId: number) {
        this.roomNumber = roomNumber;
        this.name = name;
        //this.email = email;
        this.hotelId = hotelId;
    }

    roomNumber: number;
    name: string;
    //email: string;
    hotelId: number;
}