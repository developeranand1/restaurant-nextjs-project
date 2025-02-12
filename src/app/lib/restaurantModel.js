import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: String,
    email:String,
    address:String,
    city:String,
    password:String,
    contact:String,
});

// Prevent redefining the model if it already exists
const Restaurant = mongoose.models.restaurants || mongoose.model("restaurants", restaurantSchema);

export default Restaurant;
