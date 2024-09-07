import React, { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

const MachineUpdate = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuthContext()
    const machine = location.state?.machine

    const [name, setUpdatedName] = useState(machine.name)
    const [description, setUpdatedDescription] = useState(machine.description)
    const [status, setUpdatedStatus] = useState(machine.status)
    const [error, setUpdatedError] = useState(null)

    const handleUpdate = async (e) => {
        e.preventDefault()

        if(!user) {
            return
        }
        
        const updatedMachine = { name, description, status }

        const response = await fetch('/api/machines/' + machine._id, {
            method: 'PATCH',
            body: JSON.stringify(updatedMachine),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setUpdatedError(json.error)
        }
        if (response.ok) {
            console.log('Employee updated', json)
            navigate("/gym")
        }
    }

    return (
        <form className="update" onSubmit={handleUpdate}>
            <h3>Update Machine</h3>

            <label>Machine Name:</label>
            <input 
                type="text"
                onChange={(e) => setUpdatedName(e.target.value)}
                value={name}
                
            />

            <label>Description:</label>
            <input 
                type="text"
                onChange={(e) => setUpdatedDescription(e.target.value)}
                value={description}
                
            />

            <label>Status:</label>
            <input 
                type="text"
                onChange={(e) => setUpdatedStatus(e.target.value)}
                value={status}
            />

            <button type="submit">Update Machine</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default MachineUpdate