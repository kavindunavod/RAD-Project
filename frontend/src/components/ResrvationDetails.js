import { useReservationContext } from '../hooks/useReservationContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ReservationDetails = ({ reservation }) => {
  const { dispatch } = useReservationContext() 
  const  { user } = useAuthContext()
  const navigate = useNavigate()

  const handleDelete = async () => {
    if(!user){
      return
    }
    const response = await fetch('/api/reservation/' + reservation._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if(response.ok) {
      dispatch({type: 'DELETE_RESERVATION', payload: json})
    }
  }

  const handleUpdate = async () => {
    if(!user){
      return
    }
    navigate('/reservation-update', {state: {reservation}})
  }

  return (
    <div className="details">
 
      <h4><strong>Room Number: </strong>{reservation.room}</h4>
      <p><strong>First Name: </strong>{reservation.fname}</p>
      <p><strong>Last Name: </strong>{reservation.lname}</p>
      <p><strong>NIC </strong>{reservation.nic}</p>
      <p><strong>Phone Number: </strong>{reservation.phone}</p>
      <p><strong>Members: </strong>{reservation.members}</p>
      <p><strong>Days: </strong>{reservation.days}</p>
      <p><strong>Make reservation at: </strong>{formatDistanceToNow(new Date(reservation.createdAt), {addSuffix: true})}</p>
      <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
      <button className="material-symbols-outlined" onClick={handleUpdate}>edit</button>
    </div>
  )
}
  
export default ReservationDetails