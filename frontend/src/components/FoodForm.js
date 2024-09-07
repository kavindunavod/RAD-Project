import { useState } from "react";
import { useFoodContext } from "../hooks/useFoodContext";
import { useAuthContext } from '../hooks/useAuthContext'

const FoodForm = () => {
  const { dispatch } = useFoodContext();
  const { user } = useAuthContext()

  const [Name, setName] = useState("");  
  const [Price, setPrice] = useState("");
  const [Type, setType] = useState("");
  const [Description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user) {
      setError('You must be logged in')
      return
    }

    const food = { Name, Price, Type, Description };

    const response = await fetch("/api/foods", {
      method: "POST",
      body: JSON.stringify(food),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
        setName("");
        setPrice("");
        setType("");
        setDescription("");
        setError(null);
        setEmptyFields([]);
      console.log("New food added", json);
      dispatch({ type: "CREATE_FOOD", payload: json });
    }
  };

  return (
    <form className="enter-details" onSubmit={handleSubmit}>
      <h2>
        <center>Add new Food</center>
      </h2>

      <label>Food name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={Name}
        className={emptyFields.includes("Name") ? "error" : null}
      />

      <label>Food Price:</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={Price}
        className={emptyFields.includes("Price") ? "error" : null}
      />

      <label>Food Type:</label>
      <input
        type="text"
        onChange={(e) => setType(e.target.value)}
        value={Type}
        className={emptyFields.includes("Type") ? "error" : null}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={Description}
        className={emptyFields.includes("escription") ? "error" : null}
      />

      <button>Add Food</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default FoodForm;
