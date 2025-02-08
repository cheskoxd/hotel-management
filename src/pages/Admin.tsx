import { useEffect, useState, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateGuest from '@/components/create-guest'
import RoomAvailability from '@/components/room-availability'
import { getGuests, getRooms, pb } from '@/db/db'
import { Toaster } from 'react-hot-toast'

export default function Admmin() {
  const [refresh, setRefresh] = useState(0)
  const [guests, setGuests] = useState<any>([])
  const [rooms, setRooms] = useState<any>([])

  const roomsRef = useRef(rooms);

  useEffect(() => {
    roomsRef.current = rooms;
  }, [rooms]);


  async function getData(){
    let g = await getGuests()
    let r = await getRooms()
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
        if(e.action !== "update") return
        const updatedRooms = roomsRef.current.map((room: any) =>
          room.id === e.record.id ? { ...room, ...e.record } : room
        );

        console.log("*---------------------")
        console.log(updatedRooms)
        console.log(rooms)
        setRooms(updatedRooms)
        
    }, {expand: "guest"})}

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
      <h1 className="mb-6 text-3xl font-bold ">Sistema de Hotel</h1>
      <Tabs defaultValue="room-availability">
        <TabsList className='mb-4'>
          <TabsTrigger value="create-guest">Huespedes</TabsTrigger>
          {/* <TabsTrigger value="check-in-out">Check-in/Check-out</TabsTrigger> */}
          <TabsTrigger value="room-availability">Habitaciones</TabsTrigger>
        </TabsList>
        {/* <TabsContent value="check-in-out">
          <CheckInOut onRefresh={handleRefresh} guests={guests} rooms={rooms} get={getData} />
        </TabsContent> */}
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