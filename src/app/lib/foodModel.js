const { default: mongoose } = require("mongoose");


const foodModel=new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    description:String,
    resto_id:mongoose.Schema.Types.ObjectId,
})



const foodSchema=mongoose.models.foods || mongoose.model("foods",foodModel);

export default foodSchema
