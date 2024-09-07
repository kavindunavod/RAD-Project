import { useMachinesContext } from "../hooks/useMachinesContext"
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const MachineDetails = ({ machine }) => {
    const { dispatch } = useMachinesContext()
    const  { user } = useAuthContext()
    const navigate = useNavigate()

    const handleClick = async () => {
        if(!user){
            return
        }
        const response = await fetch('/api/machines/' + machine._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_MACHINE', payload: json})
        }
    }

    const handleUpdate = async () => {
        if(!user){
            return
        }
        navigate('/machine-update', {state: {machine}})
    }

    return (
        <div className="details">
            <h4>{machine.name}</h4>
            <p><strong>Description: </strong>{machine.description}</p>
            <p><strong>Status: </strong>{machine.status}</p>
            <p>{formatDistanceToNow(new Date(machine.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            <button className="material-symbols-outlined" onClick={handleUpdate}>edit</button>
        </div>
    )
}

export default MachineDetails