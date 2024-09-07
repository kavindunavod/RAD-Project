import { useState } from 'react'
import { useRoomContext } from '../hooks/useRoomContext' 
import { useAuthContext } from '../hooks/useAuthContext'

const RoomForm = () => {
  const {dispatch} = useRoomContext()
  const { user } = useAuthContext()
  
  const [roomNo, setRoomNo] = useState('')
  const [roomType, setRoomType] = useState('')
  const [roomRates, setRoomRates] = useState('')
  const [airConditioning, setAirConditioning] = useState('')
  const [roomStatus, setRoomStatus] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user) {
      setError('You must be logged in')
      return
    }

    const room = {roomNo, roomType, roomRates, airConditioning, roomStatus} 
    
    const response = await fetch('/api/room', {
      method: 'POST',
      body: JSON.stringify(room),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setRoomNo('')
      setRoomType('')
      setRoomRates('')
      setAirConditioning('')
      setRoomStatus('')
      setEmptyFields([])
      console.log('new room added:', json)
      dispatch({type: 'CREATE_ROOM', payload: json})
    }
  }

  return (
    <form className="enter-details" onSubmit={handleSubmit}> 
      <h2><center>Add new Room</center></h2>

      <label>Room Number:</label>
      <input 
        type="text" 
        onChange={(e) => setRoomNo(e.target.value)} 
        value={roomNo}
        className={emptyFields.includes('roomNo')? 'error': ''}
      />

      <label>Room Type:</label>
      <input 
        type="text" 
        onChange={(e) => setRoomType(e.target.value)} 
        value={roomType}
        className={emptyFields.includes('roomType')? 'error': ''}
      />

      <label>Room Rates (Rs.) :</label>
      <input 
        type="text" 
        onChange={(e) => setRoomRates(e.target.value)} 
        value={roomRates} 
        className={emptyFields.includes('roomRates')? 'error': ''}
      />

      <label>Air Conditioning:</label>
      <input 
        type="text" 
        onChange={(e) => setAirConditioning(e.target.value)} 
        value={airConditioning} 
        className={emptyFields.includes('airConditioning')? 'error': ''}
      />

      <label>Room Status:</label>
      <input 
        type="text" 
        onChange={(e) => setRoomStatus(e.target.value)} 
        value={roomStatus} 
        className={emptyFields.includes('roomStatus')? 'error': ''}
      />
      
      <button>Add Room</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default RoomForm