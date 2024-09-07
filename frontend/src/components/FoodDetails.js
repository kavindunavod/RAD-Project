import { useFoodContext } from "../hooks/useFoodContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext'

const FoodDetails = ({ food }) => {
  const { dispatch } = useFoodContext();
  const  { user } = useAuthContext()
  const navigate = useNavigate();

  const handleDelete = async () => {
    if(!user){
      return
    }
    
    const response = await fetch("/api/foods/" + food._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_FOOD", payload: json });
    }
  };

  const handleUpdate = async () => {
    if(!user){
      return
    }
    navigate("/food-update", { state: { food } });
  }

  return (
    <div className="details">
      <h4>
        <strong>Food Name: </strong>
        {food.Name}
      </h4>
      <p>
        <strong>Food Price: </strong>
        {food.Price}
      </p>
      <p>
        <strong>Food Type: </strong>
        {food.Type}
      </p>
      <p>
        <strong>Description </strong>
        {food.Description}
      </p>
      <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
      <button className="material-symbols-outlined" onClick={handleUpdate}>edit</button>
    </div>
  );
};

export default FoodDetails;
