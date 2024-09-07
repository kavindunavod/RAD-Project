import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ReservationContextProvider } from './context/ReservationContext';
import { EmployeeContextProvider } from './context/EmployeeContext';
import { FoodContextProvider } from "./context/FoodContext";
import { AuthContextProvider } from './context/AuthContext';
import { RoomsContextProvider } from './context/RoomContext';
import { MachinesContextProvider } from './context/MachineContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ReservationContextProvider>
        <EmployeeContextProvider>
          <FoodContextProvider>
            <RoomsContextProvider>
              <MachinesContextProvider>
                <App />
              </MachinesContextProvider>
            </RoomsContextProvider>
          </FoodContextProvider>
        </EmployeeContextProvider>
      </ReservationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);