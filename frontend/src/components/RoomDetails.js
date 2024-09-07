import { useRoomContext } from '../hooks/useRoomContext'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RoomDetails = ({ room }) => {
  const { dispatch } = useRoomContext()
  const  { user } = useAuthContext()
  const navigate = useNavigate()

  const handleDelete = async () => {
    if(!user){
      return
    }
    const response = await fetch('/api/room/' + room._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_ROOM', payload: json })
    }
  }

  const handleUpdate = async () => {
    if(!user){
      return
    }
    navigate('/room-update', {state: {room}})
  }

  return (
    <div className="details">
      <h4>{room.roomNo}</h4>
      <p><strong>Room Type : </strong>{room.roomType}</p>
      <p><strong>Room Rates : </strong>{room.roomRates}</p>
      <p><strong>Air Conditioning  : </strong>{room.airConditioning}</p>
      <p><strong>Room Status : </strong>{room.roomStatus}</p>
      <p>{formatDistanceToNow(new Date(room.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
      <button className="material-symbols-outlined" onClick={handleUpdate}>edit</button>
    </div>
  )
}

export default RoomDetails
