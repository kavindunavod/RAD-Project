import React, { useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate, useLocation} from 'react-router-dom';

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext()
  const employee = location.state?.employee;

  const [name, setUpdatedName] = useState(employee.name);
  const [contact, setUpdatedContact] = useState(employee.contact);
  const [job, setUpdatedJob] = useState(employee.job);
  const [salary, setUpdatedSalary] = useState(employee.salary);
  const [error, setUpdateError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault()

    if(!user) {
      return
    }
    
    const updatedEmployee = {name, contact, job, salary}
    
    const response = await fetch('/api/employee/' + employee._id , {
      method: 'PATCH',
      body: JSON.stringify(updatedEmployee),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json();

    if (!response.ok){
      setUpdateError(json.error);
    }
    if (response.ok) {
      navigate("/employee");
    }
    
  };

  return (
    <form className="update" onSubmit={handleUpdate}>
      <h3>Update Employee </h3>
       
      <label>Employee Name: </label>
      <input
        type="text"
        onChange={(e) => setUpdatedName(e.target.value)}
        value={name}
      />

      <label>Employee Contact: </label>
     <input
        type="number"
        onChange={(e) => setUpdatedContact(e.target.value)}
        value={contact}
        
      />

      <label>Employee Job: </label>
      <input
        type="text"
        onChange={(e) => setUpdatedJob(e.target.value)}
        value={job}
        
      />
    
      <label>Employee Salary: </label>
     <input
        type="text"
        onChange={(e) => setUpdatedSalary(e.target.value)}
        value={salary}
        
      />

      <button type="submit">Update</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default UpdateEmployee
