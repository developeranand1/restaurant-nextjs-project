import { connectionStr } from "@/app/lib/db";
import foodSchema from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
    const payload=await request.json();
    console.log("Received Payload:", payload);

    await mongoose.connect(connectionStr, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });

     let success=false
    const food=new foodSchema(payload);

    const result=await food.save();

    if(result){
      success=true;
    }

    return NextResponse.json({result,success});

}