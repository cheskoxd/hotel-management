import { IRoomsAndGuests } from '@/lib/data'
// import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Badge } from "@/components/ui/badge"



export default function RoomAvailability({rooms}:IRoomsAndGuests) {

  
  return (
    <div className="space-y-4 ">
      <h2 className="text-2xl font-semibold">Room Availability</h2>
      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Guest</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map(room => ( 
            <TableRow key={room.id}>
              <TableCell>{room.number}</TableCell>
              <TableCell>{room.type}</TableCell>
              <TableCell>{room.occupied ? 'Occupied' : 'Available'}</TableCell>
              <TableCell>
                {room.guestId
                  ? guests.find(g => g.id === room.guestId)?.name || 'Unknown'
                  : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}


      <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
      {rooms.map(room => ( 
       

<Dialog>
<DialogTrigger asChild>
<button key={room.id} className={`flex items-center justify-center w-20 aspect-square border-b py-2 ${room.occupied ? 'bg-red-400' : 'bg-green-400'}`}>
            <p className="text-lg font-semibold">{room.number}</p>
          
          {/* <div>
            <p className="text-sm text-gray-500">
              {room.guestId
                ? guests.find(g => g.id === room.guestId)?.name || 'Unknown'
                : '-'}
            </p>
          </div> */}
        </button>
</DialogTrigger>
<DialogContent className="sm:max-w-[425px]">
  <DialogHeader>
    <DialogTitle>Room {room.number} <Badge className={room.occupied ? "bg-red-400" : "bg-green-400"} variant="outline">{room.occupied ? "Occupied" : "Available"}</Badge></DialogTitle>
  </DialogHeader>
 {room.occupied && <div className="grid gap-4 py-4">
    <div className="grid items-center grid-cols-4 gap-4">
      <Label htmlFor="name" className="text-right">
        Guest
      </Label>
      <span
        id="name"
        
        className="col-span-3"
      >{room.expand.guest.name}</span>
    </div>
  </div>}
</DialogContent>
</Dialog>
        ))}
      </div>
    </div>
  )
}

