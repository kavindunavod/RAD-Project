import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages & componments
import Reservation from './pages/Reservation'
import Employee from './pages/Employee'
import EmployeeUpdate from './components/EmployeeUpdate'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Update from './components/UpdateReservation'
import Food from "./pages/Food";
import FoodUpdate from './components/FoodUpdate'
import RoomUpdate from './components/RoomUpdate'
import Room from './pages/Room'
import Gym from './pages/Gym'
import MachineUpdate from './components/MachineUpdate'


function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Reservation /> : <Navigate to="/login" />}
            />
            <Route
              path="/food"
              element={user ? <Food /> : <Navigate to="/login" />}
            />
            <Route
              path="/food-update"
              element={user ? <FoodUpdate /> : <Navigate to="/login" />}
            />
            <Route 
              path="/room"
              element={user ? <Room /> : <Navigate to="/login" />}
            />
            <Route 
              path="/room-update"
              element={user ? <RoomUpdate /> : <Navigate to="/login" />}
            />
            <Route 
              path="/gym"
              element={user ? <Gym /> : <Navigate to="/login" />}
            />
            <Route 
              path="/machine-update"
              element={user ? <MachineUpdate /> : <Navigate to="/login" />}
            />
            <Route
              path="/employee"
              element={user ? <Employee /> : <Navigate to="/login" />}
            />
            <Route
              path="/employee-update"
              element={user ? <EmployeeUpdate /> : <Navigate to="/login" />}
            />
            <Route
              path="/reservation-update"
              element={user ? <Update /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
