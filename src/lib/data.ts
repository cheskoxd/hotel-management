export interface IGuest {
  id: string;
  name: string;
 
}

export interface IRoom {
  id: string;
  number: string;
  occupied: boolean;
  expand: any;
}

export interface IRoomsAndGuests {
  rooms: IRoom[]
  guests: IGuest[]
  get: () => Promise<void>

}
