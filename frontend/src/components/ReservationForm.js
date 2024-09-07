import { useState } from 'react'
import { useReservationContext } from '../hooks/useReservationContext'
import { useAuthContext } from '../hooks/useAuthContext'

const ReservationForm = () => {
  const { dispatch } = useReservationContext()
  const { user } = useAuthContext()

  const [fname, setFname] = useState('')
  const [days, setDays] = useState('')
  const [lname, setLname] = useState('')
  const [nic, setNic] = useState('')
  const [room, setRoom] = useState('')
  const [members, setMembers] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user) {
      setError('You must be logged in')
      return
    }

    const reservation = {fname, lname, nic, room, members, phone, days}

    const response = await fetch('api/reservation', {
      method: 'POST',
      body: JSON.stringify(reservation),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()
    

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields); 
    }

    if(response.ok){
      setFname('')
      setDays('')
      setLname('')
      setNic('')
      setRoom('')
      setPhone('')
      setMembers('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_RESERVATION', payload: json})
    }
  }


  return(
    <form className='enter-details' onSubmit={handleSubmit}>
      <h2><center>Add new Reservation</center></h2>

      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFname(e.target.value)}
        value={fname}
        className={emptyFields.includes('fname') ? 'error' : ''}
      />

      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLname(e.target.value)}
        value={lname}
        className={emptyFields.includes('lname') ? 'error' : ''}
      />

      <label>NIC:</label>
      <input
        type="text"
        onChange={(e) => setNic(e.target.value)}
        value={nic}
        className={emptyFields.includes('nic') ? 'error' : ''}
      />

      <label>Phone Number:</label>
      <input
        type="text"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className={emptyFields.includes('phone') ? 'error' : ''}
      />

      <label>Room Number:</label>
      <input
        type="text"
        onChange={(e) => setRoom(e.target.value)}
        value={room}
        className={emptyFields.includes('room') ? 'error' : ''}
      />

      <label>Members:</label>
      <input
        type="number"
        onChange={(e) => setMembers(e.target.value)}
        value={members}
        className={emptyFields.includes('members') ? 'error' : ''}
      />

      <label>Days:</label>
      <input
        type="number"
        onChange={(e) => setDays(e.target.value)}
        value={days}
        className={emptyFields.includes('days') ? 'error' : ''}
      />

      <button>Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ReservationForm