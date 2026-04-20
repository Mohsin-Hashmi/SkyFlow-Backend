export interface ISeat {
    seatNumber: string;
    class: 'economy' | 'business' | 'first';
    isBooked: boolean;
}