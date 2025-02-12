import { connectionStr } from "@/app/lib/db";
import Restaurant from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){
    const queryParams=request.nextUrl.searchParams
    console.log(queryParams.get("location"))
    let filter={};

    let success=false;
    if(queryParams.get("location")){
        let city=queryParams.get("location");
        filter={city:{$regex:new RegExp(city,'i')}};
    }
    else if(queryParams.get("restaurant")){
        let name=queryParams.get('restaurant');
        filter={name:{$regex:new RegExp(name,'i')}};
    }
    await mongoose.connect(connectionStr,{useNewUrlParser:true, useUnifiedTopology:true});
    let result=await Restaurant.find(filter);
    if(result){
        success=true
    }
    return NextResponse.json({success,result})
} 