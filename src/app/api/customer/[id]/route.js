import { connectionStr } from "@/app/lib/db";
import foodSchema from "@/app/lib/foodModel";
import Restaurant from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content){
    console.log(content.params.id);
    const id=content.params.id;
    await mongoose.connect(connectionStr,{useNewUrlParser:true, useUnifiedTopology:true});
  
    const details=await Restaurant.findOne({_id:id});
    const foodItems=await foodSchema.find({resto_id:id});
 
    return NextResponse.json({success:true,details,foodItems});
}