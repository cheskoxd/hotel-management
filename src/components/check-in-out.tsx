import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IRoomsAndGuests } from '@/lib/data'
import { checkIn, checkOut } from '@/db/db'

interface CheckInOut extends IRoomsAndGuests {
  onRefresh: () => void
}
export default function CheckInOut({ onRefresh, rooms, guests }: CheckInOut) {
  const [selectedGuest, setSelectedGuest] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')

  const handleCheckIn = async () => {
    if (selectedGuest && selectedRoom) {
      await checkIn(selectedGuest, selectedRoom)
      onRefresh()
      // await get()
      setSelectedGuest('')
      setSelectedRoom('')
    }
  }

  const handleCheckOut = async () => {
    if (selectedRoom) {
      await checkOut(selectedGuest, selectedRoom)
      onRefresh()
      setSelectedRoom('')
      // await get()

    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Check-in / Check-out</h2>
      <div className="flex flex-col items-center gap-2 md:space-x-4 md:flex-row">
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
        <Select value={selectedRoom} onValueChange={setSelectedRoom}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select room" />
          </SelectTrigger>
          <SelectContent>
            {rooms.map(room => (
              <SelectItem className='w-full' key={room.id} value={room.id}>
                <span className='flex items-center justify-between gap-4'>{room.number} {room.guest && <div className='w-[8px] h-[8px] rounded-full aspect-square bg-red-600'></div>}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleCheckIn}>Check-in</Button>
        <Button onClick={handleCheckOut} variant="secondary">Check-out</Button>
      </div>
    </div>
  )
}
