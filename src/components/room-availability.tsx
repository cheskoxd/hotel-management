import { IRoomsAndGuests } from '@/lib/data'
// import { useEffect } from 'react'




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


      <div className="grid grid-cols-8 gap-2">
      {rooms.map(room => ( 
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
        ))}
      </div>
    </div>
  )
}

