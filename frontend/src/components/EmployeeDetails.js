import { useEmployeeContext } from "../hooks/useEmployeeContext"
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'

//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const EmployeeDetails = ({employee}) => {
    const {dispatch} = useEmployeeContext()
    const  { user } = useAuthContext()
    const navigate = useNavigate()

    const handleDelete = async () => {
        if(!user){
            return
        }
        console.log(user.token)
        const response = await fetch('/api/employee/' + employee._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_ITEM', payload: json})
        }
    }

    const handleUpdate = async () => {
        if(!user){
            return
          }
        navigate('/employee-update', {state: {employee}})
      }

    return(
        <div className="details">
            <h4>{employee.name}</h4>
            <p><strong>Contact: </strong>{employee.contact}</p>
            <p><strong>Job: </strong>{employee.job}</p>
            <p><strong>Salary: </strong>{employee.salary}</p>
            <p>{formatDistanceToNow(new Date(employee.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
            <button className="material-symbols-outlined" onClick={handleUpdate}>edit</button>
        </div>
    )
}

export default EmployeeDetails