import { createContext, useReducer } from "react"

export const EmployeeContext = createContext()

export const employeeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                employees: action.payload
            }
        case 'CREATE_ITEM':
            return {
                employees: [action.payload, ...state.employees]
            }
        case 'DELETE_ITEM':
            return {
                employees: state.employees.filter((employee) => employee._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const EmployeeContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(employeeReducer, {
        employees: null
    })

    return (
        <EmployeeContext.Provider value={{...state, dispatch}}>
            {children}
        </EmployeeContext.Provider>
    )
}