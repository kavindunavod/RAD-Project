import { useEffect } from 'react'
import { useRoomContext } from '../hooks/useRoomContext'
import { useAuthContext } from "../hooks/useAuthContext"

// components 
import RoomDetails from '../components/RoomDetails'
import RoomForm from '../components/RoomForm'
import Layout from "../components/Layout"

const Room = () => {
    const {rooms, dispatch} = useRoomContext()
    const {user} = useAuthContext()

    useEffect (()=> {
        const fetchRooms = async () => {
            const response = await fetch('api/room', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch(({type: 'SET_ROOMS', payload: json}))
            }
        }
        
        if(user){
            fetchRooms()
          }
    }, [dispatch, user]) 

    return(
        <Layout>
            <div className="rooms">
                {rooms && rooms.map((room)=> (
                    <RoomDetails key={room._id} room={room}/>
                ))}
            </div>
            <RoomForm/>
        </Layout>
    )
}

export default Room 