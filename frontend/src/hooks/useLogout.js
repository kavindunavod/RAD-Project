import { useAuthContext } from './useAuthContext'
import { useReservationContext } from './useReservationContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: reservationDispatch } = useReservationContext()
    
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        reservationDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}
}