import { connectionStr } from "@/app/lib/db";
import Restaurant from "@/app/lib/restaurantModel"; // Import the correct model
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const data = await Restaurant.find();

  console.log("Data:", data);
  return NextResponse.json({ result: true, data });
}

export async function POST(request) {
  let payload = await request.json();
  let result;
  let success=false
  await mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (payload.login) {
    result = await Restaurant.findOne({
      email: payload.email,
      password: payload.password,
    });
    if(result){
        success=true
      }
  } else {
    const restaurant = new Restaurant(payload);
    result = await restaurant.save();
    if(result){
        success=true
      }
  }

  return NextResponse.json({ result, success});
}
