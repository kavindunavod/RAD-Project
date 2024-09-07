import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate, useLocation} from 'react-router-dom'

const RoomUpdate = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuthContext()
  const room = location.state?.room

  const [roomNo, setUpdatedRoomNo] = useState(room.roomNo)
  const [roomType, setUpdatedRoomType] = useState(room.roomType)
  const [roomRates, setUpdatedRoomRates] = useState(room.roomRates)
  const [airConditioning, setUpdatedAirConditioning] = useState(room.airConditioning)
  const [roomStatus, setUpdatedRoomStatus] = useState(room.roomStatus)
  const [error, setUpdatedError] = useState(null)

  const handleUpdate = async (e) => {
    e.preventDefault()
    
    if(!user) {
      return
    }

    const updatedRoom = {roomNo, roomType, roomRates, airConditioning, roomStatus}
    
    const response = await fetch('/api/room/' + room._id , {
      method: 'PATCH',
      body: JSON.stringify(updatedRoom),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json();

    if (!response.ok){
      setUpdatedError(json.error);
    }
    if (response.ok) {
      console.log('Room updated', json)
      
      navigate("/room");
    }
  };

  return (
  
    <form className="update" onSubmit={handleUpdate}>
      <h3>Update Room </h3>

      <label>Room Number:</label>
      <input 
        type="text" 
        onChange={(e) => setUpdatedRoomNo(e.target.value)} 
        value={roomNo}
      />

      <label>Room Type:</label>
      <input 
        type="text" 
        onChange={(e) => setUpdatedRoomType(e.target.value)} 
        value={roomType}
      />

      <label>Room Rates (Rs.) :</label>
      <input 
        type="text" 
        onChange={(e) => setUpdatedRoomRates(e.target.value)} 
        value={roomRates} 
      />

      <label>Air Conditioning:</label>
      <input 
        type="text" 
        onChange={(e) => setUpdatedAirConditioning(e.target.value)} 
        value={airConditioning} 
      />

      <label>Room Status:</label>
      <input 
        type="text" 
        onChange={(e) => setUpdatedRoomStatus(e.target.value)} 
        value={roomStatus} 
      />
      
      <button type="submit">Update</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RoomUpdate;
