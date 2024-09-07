import { useState } from "react"
import { useMachinesContext } from '../hooks/useMachinesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const MachineForm = () => {
    const { dispatch } = useMachinesContext()
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return
        }

        const machine = {name, description, status}

        const response = await fetch('/api/machines', {
            method: 'POST',
            body: JSON.stringify(machine),
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
            setName('')
            setDescription('')
            setStatus('')
            setError(null)
            setEmptyFields([])
            console.log('new machine added', json)
            dispatch({type: 'CREATE_MACHINE', payload: json})
        }
    }

    return (
        <form className="enter-details" onSubmit={handleSubmit}>
            <h3>Add a New Machine</h3>

            <label>Machine Name:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Description:</label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Status:</label>
            <input 
                type="text"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className={emptyFields.includes('status') ? 'error' : ''}
            />

            <button>Add Machine</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default MachineForm