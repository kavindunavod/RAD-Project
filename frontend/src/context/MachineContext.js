import { createContext, useReducer } from 'react'

export const MachinesContext = createContext()

export const machinesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MACHINES':
            return {
                machines: action.payload
            }
        case 'CREATE_MACHINE':
            return {
                machines: [action.payload, ...state.machines]
            }
        case 'DELETE_MACHINE':
            return {
                machines: state.machines.filter((m) => m._id !== action.payload._id)
            }
        case 'UPDATE_MACHINE':
            return {
                machines: state.machines.map(machine => machine._id === action.payload._id ? action.payload : machine)
            }
        default:
            return state
    }
}

export const MachinesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(machinesReducer, {
        machines: null
    })

    return (
        <MachinesContext.Provider value={{...state, dispatch}}>
            { children }
        </MachinesContext.Provider>
    )
}