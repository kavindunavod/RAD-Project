import { useEffect }from 'react'
import { useMachinesContext } from '../hooks/useMachinesContext'
import { useAuthContext } from "../hooks/useAuthContext"

// components
import MachineDetails from '../components/MachineDetails'
import Layout from "../components/Layout";
import MachineForm from '../components/MachineForm'

const Home = () => {
    const {machines, dispatch} = useMachinesContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchMachines = async () => {
            const response = await fetch('/api/machines', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_MACHINES', payload: json})
            }
        }

        if(user){
            fetchMachines()
          } 
    }, [dispatch, user])

    return (
        <Layout>
            <div>
                {machines && machines.map((machine) => (
                    <MachineDetails key={machine._id} machine={machine} />
                ))}
            </div>
            <MachineForm />
        </Layout>
    )
}

export default Home