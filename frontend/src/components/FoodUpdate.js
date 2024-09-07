import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const UpdatedFood = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();
  const food = location.state?.food;
    
  const [Name, setName] = useState(food.Name);
  const [Price, setPrice] = useState(food.Price);
  const [Type, setType] = useState(food.Type);
  const [Description, setDescription] = useState(food.Description);
  const [error, setUpdateError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const updatedFood = { Name, Price, Type, Description };

    const response = await fetch("/api/foods/" + food._id, {
      method: "PATCH",
      body: JSON.stringify(updatedFood),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setUpdateError(json.error);
    }
    if (response.ok) {
      navigate("/food");
    }
  };

  return (
    <form className="update" onSubmit={handleUpdate}>
      <h3>Update Food </h3>

      <label>Food Name: </label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={Name}
      />

      <label>Food Price: </label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={Price}
      />

      <label>Food Type: </label>
      <input
        type="text"
        onChange={(e) => setType(e.target.value)}
        value={Type}
      />

      <label>Description: </label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={Description}
      />

      <button type="submit">Update</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default UpdatedFood;
