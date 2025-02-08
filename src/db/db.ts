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
    sort: 'number', expand: "guest"
});
return record
}

export async function getGuests(){
    const record = await pb.collection('guests').getFullList(50 /* batch size */, {
        sort: '-created'
    });
    return record
}
//pnpm add react-hot-toast


export async function checkIn(gId:string, id:string ){
    const i =  toast.loading("Verificando...")
    try {
        const room = await pb.collection("rooms").getOne(id)
        console.log("Rooms")
        if(room.guest){
            return toast.error("Este cuarto no esta disponible")
        }
        const guest = await pb.collection("guests").getOne(gId)
        console.log("Guests")

        if(!guest) {
            return toast.error("Huesped no existe")
        }

        const isInRoom = await pb.collection("rooms").getList(1,1, {filter: `guest="${gId}"`, skipTotal: true})
        console.log("isInRoom")

        if(isInRoom.items.length != 0) {
            return toast.error("Huesped ya hospedado en habitacion #"+isInRoom.items[0].number)
        }

        await pb.collection('check_in').create({
            guests: gId,
            room: id,
            checkInDate: new Date().toISOString(),
        })
        console.log("checin")
        
        await pb.collection("rooms").update(id, {
            guest: gId,
        })
        console.log("room occupied")

        toast.success("Hospedado huesped en cuarto #" + room.number +  "!")
        return
    } catch (error:any) {
        toast.error(error)
    } finally {
        toast.dismiss(i)
    }
    
} 

export async function checkOut(gId:string, id:string ){
    const i =  toast.loading("Desalojando...")
    try {
        const room = await pb.collection("rooms").getOne(id)
        if(!room.guest){
            return toast.error("Este cuarto no esta disponible")
        }
        const guest = await pb.collection("guests").getOne(gId)
        if(!guest) {
            return toast.error("Huesped no existe")
        }

        const isInRoom = await pb.collection("rooms").getList(1,1,{filter: `guest="${gId}"`})
        if(isInRoom.items.length == 0) {
            return toast.error("Huesped no esta hospedado en ningun cuarto")
        }

        if(isInRoom.items[0].id != id){
            return toast.error("Huesped no esta hospedado en este cuarto")
        }

        await pb.collection('check_out').create({
            guests: gId,
            room: id,
            checkOutDate: new Date().toISOString(),
        })
        
        await pb.collection("rooms").update(id, {
            guest: null,
        })
        toast.success("Habitacion #" + room.number +  " desalojada!")
        return
    } catch (error:any) {
        toast.error(error)
    } finally {
        toast.dismiss(i)
    }
    
} 
