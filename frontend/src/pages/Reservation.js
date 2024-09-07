import { useEffect } from "react"
import { useReservationContext } from "../hooks/useReservationContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ResrvationDetails from "../components/ResrvationDetails"
import Layout from "../components/Layout"
import ReservationForm from '../components/ReservationForm'

const Resrvation = () => {
  const { reservations, dispatch } = useReservationContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchReservation = async () => {
      const response = await fetch('/api/reservation', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_RESERVATIONS', payload: json})
      }
    }

    if(user){
      fetchReservation()
    }
    
  }, [dispatch, user])

  return (
    <Layout>
      <div>
        {reservations && reservations.map(reservation => (
          <ResrvationDetails reservation={reservation} key={reservation._id} />
        ))}
      </div>
      <ReservationForm />
    </Layout>
  )
}

export default Resrvation

