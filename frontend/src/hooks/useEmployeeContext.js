import {EmployeeContext} from '../context/EmployeeContext'
import {useContext} from 'react'

export const useEmployeeContext = () => {
    const context = useContext(EmployeeContext)

    if (!context){
        throw Error('useEmployeeContext must be used within a EmployeeContextProvider')
    }
    return context
}