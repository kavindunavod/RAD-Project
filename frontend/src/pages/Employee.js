import { useEffect } from "react"
import { useEmployeeContext } from "../hooks/useEmployeeContext"
import { useAuthContext } from "../hooks/useAuthContext"

//components
import EmployeeDetails from '../components/EmployeeDetails'
import EmployeeForm from '../components/EmployeeForm'
import Layout from "../components/Layout"



const Employee = () => {

    const {employees, dispatch} = useEmployeeContext()
    const {user} = useAuthContext()

    useEffect(() =>{
        const fetchItems = async () => {
            const response = await fetch('/api/employee', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_ITEMS', payload: json})
            }
        }

        if(user){
            fetchItems()
        }

        
    }, [dispatch, user])

    return (
        <Layout>
            <div className="employees">
                {employees && employees.map((employee) => (
                    <EmployeeDetails key={employee._id} employee={employee} />
                ))}
            </div>
            <EmployeeForm />
        </Layout>
    )
}

export default Employee