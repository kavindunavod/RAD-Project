import { useEffect } from "react";
import { useFoodContext } from "../hooks/useFoodContext";
import { useAuthContext } from "../hooks/useAuthContext"

// components
import FoodDetails from "../components/FoodDetails";
import Layout from "../components/Layout";
import FoodForm from "../components/FoodForm";

const Food = () => {
  const { foods, dispatch } = useFoodContext();
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchFood = async () => {
      const response = await fetch("/api/foods", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_FOODS", payload: json });
      }
    };

    if(user){
      fetchFood();
    }

    
    
  }, [dispatch, user]);

  return (
    <Layout>
      <div>
        {foods &&
          foods.map((food) => <FoodDetails food={food} key={food._id} />)}
      </div>
      <FoodForm />
    </Layout>
  );
};

export default Food;
