const Food = require("../models/foodmodels");
const mongoose = require("mongoose");


const getFoods = async (req, res) => { 
  const user_id = req.user._id
  const foods = await Food.find({user_id}).sort({ createdAt: -1 })
  
  res.status(200).json(foods) 
}


const getFood = async (req, res) => {
    const { id } = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: 'No Such food'})
    }

    const food = await Food.findById(id)

    if (!food) {
        return res.status(404).json({ error: 'Not Found' })
    }

    res.status(200).json(food)
}



const createFood = async (req, res) => {
     const { Name, Price, Type, Description} = req.body;

     try {
      const user_id = req.user._id
       const food = await Food.create({ Name, Price, Type, Description, user_id});
       res.status(200).json(food);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
}



const deleteFood = async (req, res) => {
    const { id } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such food" });
    }

    const food = await Food.findOneAndDelete({ _id: id });
    
     if (!food) {
       return res.status(404).json({ error: "Not Found" });
    }
    
    res.status(200).json(food);
}


const updateFood = async (req, res) => { 
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No Such food" });
    }    

    const food = await Food.findOneAndUpdate({ _id: id }, {
       ...req.body  
    })

     if (!food) {
       return res.status(404).json({ error: "Not Found" });
    }
    
    res.status(200).json(food);
}

module.exports = {
    getFoods,
    getFood,
    createFood,
    deleteFood,
    updateFood,
}