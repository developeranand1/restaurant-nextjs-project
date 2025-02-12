import { connectionStr } from "@/app/lib/db";
import Restaurant from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let success = false;

  let result = await Restaurant.find();

  result = result.map(
    (item) => item.city.charAt(0).toUpperCase() + item.city.slice(1)
  );
  result = [...new Set(result.map((item) => item))];
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
