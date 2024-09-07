import { useState } from "react"
import { useEmployeeContext } from "../hooks/useEmployeeContext"
import { useAuthContext } from '../hooks/useAuthContext'

const EmployeeForm = () => {

    const {dispatch} = useEmployeeContext()
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [job, setJob] = useState('')
    const [salary, setSalary] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return
        }

        const employee = {name, contact, job, salary}

        const response = await fetch('/api/employee', {
            method: 'POST',
            body: JSON.stringify(employee),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok){
            setName('')
            setContact('')
            setJob('')
            setSalary('')
            setError(null)
            setEmptyFields([])
            console.log('New employee added', json)
            dispatch({type: 'CREATE_ITEM', payload: json})
        }
    }

    return (
        <form className="enter-details" onSubmit={handleSubmit}>
            <h2><center>Add new Employee</center></h2>

            <label>Employee name:</label>
            <input 
                type="text" 
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : null}
            />

            <label>Employee Contact:</label>
            <input 
                type="number" 
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                className={emptyFields.includes('contact') ? 'error' : null}
            />

            <label>Employee Job:</label>
            <input 
                type="text" 
                onChange={(e) => setJob(e.target.value)}
                value={job}
                className={emptyFields.includes('job') ? 'error' : null}
            />

            <label>Employee Salary:</label>
            <input 
                type="number" 
                onChange={(e) => setSalary(e.target.value)}
                value={salary}
                className={emptyFields.includes('salary') ? 'error' : null}
            />

            <button>Add Employee</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EmployeeForm