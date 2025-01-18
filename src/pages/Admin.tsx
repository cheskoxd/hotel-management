import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CheckInOut from '@/components/check-in-out'
import CreateGuest from '@/components/create-guest'
import RoomAvailability from '@/components/room-availability'
import { getGuests, getRooms, pb } from '@/db/db'
import { Toaster } from 'react-hot-toast'

export default function Admmin() {
  const [refresh, setRefresh] = useState(0)
  const [guests, setGuests] = useState<any>([])
  const [rooms, setRooms] = useState<any>([])

  async function getData(){
    let r = await getRooms()
    let g = await getGuests()
    setGuests(g)
    setRooms(r)
    console.log(r)
    console.log(g)
  }
  const handleRefresh = () => {
    setRefresh(prev => prev + 1)
  }

  useEffect(() => {

  async function start(){
      await getData()

      await pb.collection('rooms').subscribe('*', function (e) {
        console.log(e.action);
        console.log(e.record);

        rooms.forEach((room:any) => {
          if(room.id == e.record.id){
            room.occupied = e.record.occupied
            room.guest = e.record.guest
          }
        })
        
    })}

    start()
    return () => {
      pb.collection("rooms").unsubscribe()
    }
    
  }, [])

  return (
    <div className="container flex flex-col items-center p-4 mx-auto">
      <Toaster
  position="bottom-center"

/>
      <h1 className="mb-6 text-3xl font-bold ">Hotel Management System</h1>
      <Tabs defaultValue="check-in-out">
        <TabsList className='mb-4'>
          <TabsTrigger value="create-guest">Create Guest</TabsTrigger>
          <TabsTrigger value="check-in-out">Check-in/Check-out</TabsTrigger>
          <TabsTrigger value="room-availability">Room Availability</TabsTrigger>
        </TabsList>
        <TabsContent value="check-in-out">
          <CheckInOut onRefresh={handleRefresh} guests={guests} rooms={rooms} get={getData} />
        </TabsContent>
        <TabsContent value="create-guest">
          <CreateGuest onRefresh={handleRefresh} get={getData}/>
        </TabsContent>
        <TabsContent value="room-availability">
          <RoomAvailability key={refresh} guests={guests} rooms={rooms} get={getData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}