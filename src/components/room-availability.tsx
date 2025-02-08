import { IRoomsAndGuests } from '@/lib/data'
// import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Badge } from "@/components/ui/badge"
import { checkIn, checkOut } from '@/db/db'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { BedSingle } from 'lucide-react'



export default function RoomAvailability({ rooms, guests }: IRoomsAndGuests) {
  const [selectedGuest, setSelectedGuest] = useState('')
  
    const handleCheckIn = async (room:string) => {
      if (selectedGuest && room) {
        await checkIn(selectedGuest, room)
        // onRefresh()
        // await get()
        setSelectedGuest('')
      }
    }
  
    const handleCheckOut = async (room:string, guest:string) => {
        await checkOut(guest, room)
        // onRefresh()
        setSelectedGuest('')

        // await get()
    }


  return (
    <div className="space-y-4 ">
      <h2 className="text-2xl font-semibold">Disponibilidad de Habitaciones</h2>

      <div className="grid grid-cols-4 gap-x-2 gap-y-2 md:grid-cols-8">
        {rooms.map(room => (


          <Dialog key={room.id}>
            <DialogTrigger asChild>
              <button className={`flex items-center flex-col rounded-md justify-center w-20 aspect-square border-b py-2 ${room.guest ? 'bg-red-400' : 'bg-green-400'}`}>
                <span className="text-lg font-semibold">{room.number}</span>
                <BedSingle />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" aria-describedby='room'>
              <DialogHeader>
                <DialogTitle>Habitacion #{room.number} <Badge className={room.guest ? "bg-red-400" : "bg-green-400"} variant="outline">{room.guest ? "Ocupado" : "Disponible"}</Badge></DialogTitle>
              </DialogHeader>
              <DialogDescription>
              {room.guest ? <div className="py-4">
                <div className="flex flex-col justify-center gap-4">
                  <Label htmlFor="name" className="">
                    Huesped:
                  <span
                    id="name"
                    className="ml-4 font-normal"
                  >{room.expand.guest.name}</span>
                  </Label>
                  <Button onClick={() => handleCheckOut(room.id, room.guest)} variant="destructive">Desalojar</Button>

                </div>
              </div> : <div className="py-4">
                <div className="flex flex-col justify-center gap-4">
                  <Label htmlFor="name" className="text-left">
                    Hospedar a:
                  </Label>
                <Select value={selectedGuest} onValueChange={setSelectedGuest}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select guest" />
                  </SelectTrigger>
                  <SelectContent>
                    {guests.map(guest => (
                      <SelectItem key={guest.id} value={guest.id}>{guest.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => handleCheckIn(room.id)}>Hospedar</Button>
                
                </div>
              </div> 
              }
              </DialogDescription>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}

