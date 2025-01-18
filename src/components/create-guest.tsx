import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" 
import { createGuest } from '@/db/db'

interface cGuest {
  onRefresh: () => void,
  get: () => Promise<void>

}

export default function CreateGuest({ onRefresh, get }: cGuest) {
  const [name, setName] = useState('')
  // const [email, setEmail] = useState('')

  const handleCreateGuest = async () => {
    if (name.trim()) {
      await createGuest({name})
      get()
      onRefresh()
      setName('')
      // setEmail('')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Create Guest</h2>
      <div className="flex space-x-4">
        <Input
          placeholder="Guest name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* <Input
          placeholder="Guest email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        <Button onClick={handleCreateGuest}>Create Guest</Button>
      </div>
    </div>
  )
}
