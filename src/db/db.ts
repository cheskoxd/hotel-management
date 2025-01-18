import PocketBase from 'pocketbase';
import toast from 'react-hot-toast';

export const pb = new PocketBase('https://hotel-managment.pockethost.io');

pb.autoCancellation(false);
interface Guest {
    name: string;
//   email: string;
}

export async function createGuest(guest:Guest ){
    const id =  toast.loading("Creating guest...")
    try {
        const record = await pb.collection('guests').create(guest);
        toast.success("Created guest!")
        return record
    } catch (error:any) {
        toast.error(error)
    } finally {
        toast.dismiss(id)
    }
    
} 

export async function getRooms(){
const record = await pb.collection('rooms').getFullList(50 /* batch size */, {
    sort: 'number',
});
return record
}

export async function getGuests(){
    const record = await pb.collection('guests').getFullList(50 /* batch size */, {
        sort: '-created',
    });
    return record
}
//pnpm add react-hot-toast


export async function checkIn(gId:string, id:string ){
    const i =  toast.loading("Checking in...")
    try {
        const room = await pb.collection("rooms").getOne(id)
        if(room.occupied){
            return toast.error("This room is already occupied")
        }
        const guest = await pb.collection("guests").getOne(gId)
        if(!guest) {
            return toast.error("Guest does not exists")
        }

        await pb.collection('check_in').create({
            guests: gId,
            room: id,
            checkInDate: new Date().toISOString(),
        })
        
        await pb.collection("rooms").update(id, {
            guest: gId,
            occupied: true,
        })
        toast.success("Checked in on room " + room.number +  "!")
        return
    } catch (error:any) {
        toast.error(error)
    } finally {
        toast.dismiss(i)
    }
    
} 

export async function checkOut(gId:string, id:string ){
    const i =  toast.loading("Checking Out...")
    try {
        const room = await pb.collection("rooms").getOne(id)
        if(!room.occupied){
            return toast.error("This room is not occupied")
        }
        const guest = await pb.collection("guests").getOne(gId)
        if(!guest) {
            return toast.error("Guest does not exists")
        }

        await pb.collection('check_out').create({
            guests: gId,
            room: id,
            checkOutDate: new Date().toISOString(),
        })
        
        await pb.collection("rooms").update(id, {
            guest: gId,
            occupied: false,
        })
        toast.success("Checked out of room " + room.number +  "!")
        return
    } catch (error:any) {
        toast.error(error)
    } finally {
        toast.dismiss(i)
    }
    
} 
